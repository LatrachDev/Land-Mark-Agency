<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AdminLoginController extends Controller
{
    public function login(Request $request): JsonResponse
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $adminEmail = config('admin.email');
        $adminPasswordHash = config('admin.password_hash');

        if ($request->email === $adminEmail && Hash::check($request->password, $adminPasswordHash)) {

            // return response()->json([
            //     'status' => 'success',
            //     'message' => 'Admin logged in successfully',
            //     'token' => 'dummy-admin-token-123456'
            // ]);
            
            return response()->json(['message' => 'Login successful']);
        
        }
        
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
