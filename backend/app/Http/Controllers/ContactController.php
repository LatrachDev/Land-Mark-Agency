<?php

namespace App\Http\Controllers;

use App\Models\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'message' => 'required|string',
            'interests' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Veuillez remplir tous les champs',
                'errors' => $validator->errors()
            ], 422);
        }

        $contact = Contact::create([
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
            'company_name' => $request->company_name,
            'message' => $request->message,
            // 'interests' => json_encode($request->interests ?? []),
            'interests' => $request->interests ?? [],
        ]);

        return response()->json([
            'message' => 'Contact created successfully',
            'data' => $contact
        ], 201);
    }

}
