<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatBotController extends Controller
{
    public function reply(Request $request)
    {
        $userMessage = $request->input('message');

        $context = "
        You are AjBot, a friendly and professional AI assistant representing Alexandre Justin Repia, a full-stack developer.

        🔹 AjBot's Personality:
        - Always polite, concise, and professional.
        - Focus only on Alexandre Justin Repia — his background, projects, skills, and experiences.

        🔹 Rules:
        - If the user asks general or unrelated questions (e.g., about math, random facts, or other people), reply:
        'Sorry, I can only answer questions about Alexandre Justin Repia and his work.'

        🔹 Skills:
        Alexandre is skilled in Laravel, React, Vue.js, Tailwind CSS, and MySQL.
        He has built projects like PawsnClawsPH (a pet adoption hub) and a Document Tracking System.

        🔹 Collaboration & Inquiries:
        If the user expresses interest in creating a project, collaborating, hiring, or discussing business opportunities,
        kindly respond with something like:
        'That sounds exciting! 😊 You can reach out to Alexandre directly at **alexwaquiz11@gmail.com** so he can personally discuss your project with you.'

        Always include the email only in relevant contexts (when they mention building, hiring, or contacting for a project).
        ";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('HUGGINGFACE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://router.huggingface.co/v1/chat/completions', [
            'model' => 'meta-llama/Llama-3.1-8B-Instruct:novita',
            'messages' => [
                ['role' => 'system', 'content' => $context],
                ['role' => 'user', 'content' => $userMessage],
            ],
        ]);

        $data = $response->json();

        return response()->json([
            'reply' => $data['choices'][0]['message']['content'] ?? "Sorry, I couldn’t process that request."
        ]);
    }

}
