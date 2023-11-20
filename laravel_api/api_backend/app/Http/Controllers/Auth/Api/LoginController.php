<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request){
        $credenciais = $request->only('email', 'password');

        if(!auth()->attempt($credenciais)) 
            abort(401, 'Login ou senha inválidos!');

        $user = auth()->user();

        $token = auth()->user()->createToken('login_token', [$user->id]);

        return response()->json(['token' => $token->plainTextToken,
                                 'name' =>$user->name
        ]);
    }

    public function logout(){
        auth()->user()->currentAccessToken()->delete();

        return response()->json([]);
    }
}


