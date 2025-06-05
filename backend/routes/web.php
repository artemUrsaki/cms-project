<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/password-reset', function (Request $request) {
    $token = $request->query('token');
    $email = $request->query('email');

    $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173') . '/password-reset';

    $redirectUrl = $frontendUrl . '?token=' . urlencode($token) . '&email=' . urlencode($email);

    return redirect($redirectUrl);
})->name('password.reset');

Route::middleware('web')->group(function () {
    Route::get('/csrf-cookie', function () {
        return response()->json(['message' => 'CSRF cookie set']);
    });

    Route::post('/login', function (Request $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Logged in']);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    });

    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out']);
    });
});

