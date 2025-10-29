<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;

class ChatBotController extends Controller
{
    public function reply(Request $request)
    {
        \Log::info('✅ Laravel logging test works!');

        $userMessage = trim($request->input('message'));
        $conversation = $request->input('conversation', []);
        $sessionId = $request->input('session_id', 'default');
        $lowerMsg = strtolower($userMessage);

        // Load remembered data
        $userData = Cache::get("aelex_user_{$sessionId}", [
            'email' => null,
            'name' => null,
            'features' => null,
            'asking_for_features' => false,
        ]);

        // Keyword sets
        $interestKeywords = ['hire', 'buy', 'inquire', 'project', 'services', 'collab', 'work with', 'build', 'create', 'develop'];
        $emailKeywords = ['@', 'gmail', 'yahoo', 'email', 'mail'];

        $isInquiry = collect($interestKeywords)->contains(fn($w) => str_contains($lowerMsg, $w));
        $hasEmail = collect($emailKeywords)->contains(fn($w) => str_contains($lowerMsg, $w));
        $isYes = str_contains($lowerMsg, 'yes') || str_contains($lowerMsg, 'sure') || str_contains($lowerMsg, 'okay');

        // --- Step 1: Handle initial inquiry ---
        if ($isInquiry && !$userData['asking_for_features']) {
            $userData['asking_for_features'] = true;
            Cache::put("aelex_user_{$sessionId}", $userData, now()->addMinutes(30));

            $botReply = "Sure! What features would you like to include in your project?";
            return response()->json(['reply' => $botReply]);
        }

        // --- Step 2: Capture email ---
        if ($hasEmail && preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $userMessage, $matches)) {
            $userData['email'] = $matches[0];
            Cache::put("aelex_user_{$sessionId}", $userData, now()->addMinutes(30));

            $botReply = "Perfect! 📩 I’ve saved your email **{$userData['email']}**. Should I send your project details to Alexandre now?";
            return response()->json(['reply' => $botReply]);
        }

        // --- Step 3: Capture features ONLY if bot asked for them ---
        if ($userData['asking_for_features']) {
            $features = [];
            $parts = preg_split('/,|\n|\./', $userMessage);

            foreach ($parts as $part) {
                $part = trim($part);
                if (strlen($part) > 5) {
                    $features[] = "• **" . ucfirst($part) . "**";
                }
            }

            $cleanFeatures = implode("\n", $features);

            if ($cleanFeatures) {
                $userData['features'] = $cleanFeatures;
                $userData['asking_for_features'] = false; // reset flag
                Cache::put("aelex_user_{$sessionId}", $userData, now()->addMinutes(30));

                $botReply = "Awesome! Here are the features you mentioned:\n\n{$cleanFeatures}\n\nWould you like me to forward these to Alexandre so he can reach out personally?";
                return response()->json(['reply' => $botReply]);
            }
        }

        // --- Step 4: Generate bot reply via API for normal conversation ---
        $context = "
        You are Aelex, a friendly and professional AI assistant representing Alexandre Justin Repia, a full-stack developer.

        🔹 Aelex's Personality:
        - Polite, concise, and professional.
        - Focus only on Alexandre Justin Repia — his background, projects, skills, and experiences.

        🔹 Skills:
        Alexandre is skilled in Laravel, React, Vue.js, Tailwind CSS, and MySQL.
        He has built projects like PawsnClawsPH (a pet adoption hub) and a Document Tracking System.

        🔹 Latest Projects:
        'Currently, Alexandre is working on his personal portfolio website and a Document Tracking System for the Department of Environment and Natural Resources (DENR).'
        ";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('HUGGINGFACE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://router.huggingface.co/v1/chat/completions', [
            'model' => 'meta-llama/Llama-3.1-8B-Instruct:novita',
            'messages' => [
                ['role' => 'system', 'content' => $context],
                ...collect($conversation)->map(fn($m) => [
                    'role' => $m['role'],
                    'content' => $m['text']
                ])->toArray(),
                ['role' => 'user', 'content' => $userMessage],
            ],
        ]);

        $data = $response->json();
        $botReply = $data['choices'][0]['message']['content'] ?? "Sorry, I couldn’t process that request right now.";
        \Log::info('$Response:', $data);

        // --- Step 5: Send email if ready ---
        if ($isYes && $userData['email'] && $userData['features']) {
            try {
                // 1️⃣ Send email to Alexandre
                Mail::raw(
                    "📧 From: {$userData['email']}\n\n" .
                    "📝 Inquiry:\n{$userMessage}\n\n" .
                    "📝 Features:\n{$userData['features']}\n\n",
                    function ($message) {
                        $message->to('alexwaquiz11@gmail.com')
                                ->subject('🚀 New Project Inquiry from Aelex Chatbot');
                    }
                );

                // 2️⃣ Send confirmation email to client
                $htmlMessage = "
                <html>
                <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 30px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                    h2 { color: #333; }
                    p { color: #555; line-height: 1.5; }
                    .features { background: #f1f1f1; padding: 10px; border-radius: 5px; margin-top: 10px; }
                </style>
                </head>
                <body>
                <div class='container'>
                    <h2>Hello!</h2>
                    <p>Thank you for reaching out. I’ve received your project inquiry and here’s what you mentioned:</p>
                    <div class='features'>
                    <strong>Features you listed:</strong><br>
                    {$userData['features']}
                    </div>
                    <p>I will review your message and get back to you shortly. 😊</p>
                    <p>— Aelex, Alexandre’s assistant</p>
                </div>
                </body>
                </html>
                ";

                Mail::html($htmlMessage, function ($message) use ($userData) {
                    $message->to($userData['email'])
                            ->subject('✅ We received your project inquiry');
                });

                $botReply = "Got it! 📧 I’ve sent your project details to Alexandre and also sent you a confirmation email. He’ll reach out to you soon!";
                Cache::forget("aelex_user_{$sessionId}");
            } catch (\Exception $e) {
                \Log::error('❌ Mail send failed: ' . $e->getMessage());
                $botReply = "Hmm, something went wrong while sending your details. Could you try again later?";
            }

            return response()->json(['reply' => $botReply]);
        }

        // --- Step 6: Ask for email if missing ---
        if ($isYes && !$userData['email']) {
            $botReply = "Sure! Could you please share your email so Alexandre can personally reach out to you?";
        }

        return response()->json(['reply' => $botReply]);
    }
}