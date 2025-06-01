<?php

use App\Http\Controllers\AdminUserController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::get('/user', function (Request $request) {
    return $request->user()->toResource();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('users', AdminUserController::class);
    Route::get('roles', function () {
        return Role::pluck('name')->all();
    });
});

Route::post('/forgot-password', function (Request $request) {
    Log::info('Forgot password request received', ['email' => $request->input('email')]);
})
    ->name('password.email');
