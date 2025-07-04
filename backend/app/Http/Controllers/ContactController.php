<?php

namespace App\Http\Controllers;

use App\Models\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'full_name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:20',
                'company_name' => 'nullable|string|max:255',
                'message' => [
                    'required',
                    'string',
                    'max:255',
                    'regex:/^[A-Za-z0-9\s]+$/'
                ],
                'interests' => 'required|array',
            ],
           
            [
                'full_name.required' => 'Le nom complet est requis.',
                'phone_number.required' => 'Le numéro de téléphone est requis.',
                'message.required' => 'Le message est requis.',
                'message.string' => 'Le message doit être une chaîne de caractères.',
                'message.max' => 'Le message ne doit pas dépasser 255 caractères.',
                'message.regex' => 'Le message ne doit contenir que des lettres, des chiffres et des espaces. Les caractères spéciaux ne sont pas autorisés.',
                'interests.array' => 'Les intérêts doivent être un tableau valide.'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Veuillez corriger les erreurs ci-dessous.',
                'errors' => $validator->errors()
            ], 422);
        }

        $contact = Contact::create([
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
            'company_name' => $request->company_name,
            'message' => $request->message,
            'interests' => $request->interests ?? [],
        ]);

        return response()->json([
            'message' => 'Contact créé avec succès.',
            'data' => $contact
        ], 201);
    }
}
