<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('tasks',\App\Http\Controllers\Api\TaskController::class)
        ->middleware('auth:sanctum');

Route::post('tasks/{id}/update', [\App\Http\Controllers\Api\TaskController::class, 'update'])
        ->middleware('auth:sanctum');        

Route::apiResource('tasks.users',\App\Http\Controllers\Api\UserController::class)
        ->only(['index'])
        ->middleware('auth:sanctum');

Route::prefix('auth')->group(function(){
    Route::post('login', [\App\Http\Controllers\Auth\Api\LoginController::class,'login']);
    Route::post('logout', [\App\Http\Controllers\Auth\Api\LoginController::class,'logout'])
            ->middleware('auth:sanctum');
    Route::post('register', [\App\Http\Controllers\Auth\Api\RegisterController::class,'register']);
});

