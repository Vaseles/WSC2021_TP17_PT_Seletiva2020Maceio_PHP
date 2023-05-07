<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    # Login
    public function login(LoginRequest $request) {
        // Check auth
        if (!auth()->check()) {
            if (Auth::attempt($request->only(['username','password' ]))) {
                $user = User::where('email', $request->email)->first();
    
                return response()->success([
                    'token' => $user->createToken($user->username)->plainTextToken,
                ]);
            } else {
                return response()->json(['message' => 'Invalid credentials'], 400);
            }
        }
    }

    # Registration 
    public function register(LoginRequest $request) {
        $request->validated($request->all());

        if (User::where('username', $request->username)->first()) {
            return response([
                'status' => 'error',
                'message' => 'username already registered'
            ], 403);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'accessToken' => ''
        ]);
        
        return response([
            'token' => $user->createToken($user->username)->plainTextToken,
        ]);
    }

    # Logout 
    public function logout(Request $request) {
       if (auth()->check()) {
            if (Auth::user()) {
                Auth::user() -> currentAccessToken() -> delete();

                return response([
                    'message' => 'logout successfully'
                ]);
            } else {
                return response()->json(['message' => 'Invalid credentials'], 400);
            }
       } else {
            return response()->json(['message' => 'Invalid Token']);
       }
    }
}
