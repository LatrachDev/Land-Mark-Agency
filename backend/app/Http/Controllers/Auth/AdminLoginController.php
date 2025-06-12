<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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

            // $adminUser = User::firstOrNew(['email' => $adminEmail]);
            $adminUser = User::firstOrCreate(
            ['email' => $adminEmail],
                ['name' => 'Admin', 'password' => $adminPasswordHash]
            );
            
            $token = $adminUser->createToken('admin-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
            ]);
            
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
