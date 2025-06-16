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

        // Admin credentials from config
        $adminEmail = config('admin.email');
        $adminPasswordHash = config('admin.password_hash');

        // Check if it's the admin
        if ($request->email === $adminEmail && Hash::check($request->password, $adminPasswordHash)) {

            $adminUser = User::firstOrCreate(
                ['email' => $adminEmail],
                ['name' => 'Admin', 'password' => $adminPasswordHash]
            );

            $token = $adminUser->createToken('admin-token')->plainTextToken;

            return response()->json([
                'message' => 'Admin login successful',
                'token' => $token,
            ]);
        }

        // Check normal user from database
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('user-token')->plainTextToken;

            return response()->json([
                'message' => 'User login successful',
                'token' => $token,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

}
