<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ConferenceController;
use App\Models\Role;

Route::post('/login', [LoginController::class, 'login']);

Route::get('/ping', fn () => 'pong');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user()->toResource();
    });

    Route::get('/roles', function () {
        return Cache::rememberForever('roles', function () {
            return Role::pluck('name')->all();
        });
    });

    Route::get('/conference-editors', [ConferenceController::class, 'editors']);
    Route::get('/admin-editors', [AdminUserController::class, 'editors']);

    Route::apiResource('users', AdminUserController::class);
    Route::apiResource('conferences', ConferenceController::class);
});
