<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\Contact;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'full_name' => 'required|string|max:255',
    //         'email' => 'required|email|max:255',
    //         'phone_number' => 'nullable|string|max:20',
    //         'company_name' => 'nullable|string|max:255',
    //         'message' => 'required|string',
    //         'interests' => 'nullable|array',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'message' => 'Validation error',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $contact = Contact::create([
    //         'full_name' => $request->full_name,
    //         'email' => $request->email,
    //         'phone_number' => $request->phone_number,
    //         'company_name' => $request->company_name,
    //         'message' => $request->message,
    //         'interests' => json_encode($request->interests ?? []),
    //     ]);

    //     return response()->json([
    //         'message' => 'Contact created successfully',
    //         'data' => $contact
    //     ], 201);
    // }

    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json([
            'data' => $contacts
        ]);
    }

    public function markAsRead(Request $request)
    {
        // dd('salam rani hna');
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:contacts,id',
        ]);

        Contact::whereIn('id', $request->ids)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json([
            'message' => 'Messages marked as read'
        ]);
    }

public function delete(Request $request)
{
    $request->validate([
        'ids' => 'required|array',
        'ids.*' => 'integer|exists:contacts,id',
    ]);

    Contact::whereIn('id', $request->ids)->delete();

    return response()->json([
        'message' => 'Messages deleted successfully'
    ]);
}



    public function destroy(string $id)
    {
        $message = Contact::findOrFail($id);

        $message->delete();

        return response()->json([
            'message' => 'Message deleted successfuly',
        ], 200);
    }
}