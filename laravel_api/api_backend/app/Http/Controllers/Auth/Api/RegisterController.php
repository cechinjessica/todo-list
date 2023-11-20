<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class RegisterController extends Controller
{
    public function register(Request $request, User $user){
        $dataUser = $request->only('name', 'email', 'password');
        $dataUser['password'] = bcrypt($dataUser['password']); 

        if(!$user = $user->create($dataUser)) abort(500, "Erro ao criar um novo usuário");

        return response()->json(['usuario' => $user ]);
    }
}
