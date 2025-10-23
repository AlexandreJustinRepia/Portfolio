<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function sendMessage(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
            'g-recaptcha-response' => 'required',
        ]);

        // Verify reCAPTCHA
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $data['g-recaptcha-response'],
        ]);

        $result = $response->json();

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => 'Captcha verification failed.']);
        }

        // ✅ Continue sending email
        \Mail::raw("From: {$data['name']} ({$data['email']})\n\nMessage:\n{$data['message']}", function ($mail) use ($data) {
            $mail->to('alexwaquiz11@gmail.com')->subject("Portfolio Contact Form from {$data['name']}");
        });

        return response()->json(['success' => true, 'message' => 'Message sent successfully!']);
    }
}
