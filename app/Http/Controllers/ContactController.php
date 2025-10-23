<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendMessage(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::raw("From: {$data['name']} ({$data['email']})\n\nMessage:\n{$data['message']}", function ($mail) use ($data) {
            $mail->to('alexwaquiz11@gmail.com')
                ->subject("Portfolio Contact Form from {$data['name']}");
        });

        return response()->json(['success' => true, 'message' => 'Message sent successfully!']);
    }
}
