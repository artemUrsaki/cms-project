<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ConferenceController;

Route::get('/user', function (Request $request) {
    return $request->user()->toResource();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/roles', [AdminUserController::class, 'roles']);
    Route::apiResource('users', AdminUserController::class);

    Route::get('/conference-editors', [ConferenceController::class, 'editors']);   
    Route::apiResource('conferences', ConferenceController::class);
});

Route::get('/password-reset', function (Request $request) {
    $token = $request->query('token');
    $email = $request->query('email');

    $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173') . '/password-reset';

    $redirectUrl = $frontendUrl . '?token=' . urlencode($token) . '&email=' . urlencode($email);

    return redirect($redirectUrl);
})->name('password.reset');
