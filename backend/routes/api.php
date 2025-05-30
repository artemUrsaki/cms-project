<?php

use App\Http\Controllers\AdminUserController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user()->toResource();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('users', AdminUserController::class);
    Route::get('roles', function () {
        return Cache::rememberForever('roles', function ()  {
            return Role::pluck('name')->all();
        });
    });
});