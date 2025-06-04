<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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