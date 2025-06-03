<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ConferenceController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user()->toResource();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/roles', [AdminUserController::class, 'roles']);
    Route::apiResource('users', AdminUserController::class);

<<<<<<< Updated upstream
    Route::get('roles', function () {
        return Cache::rememberForever('roles', function () {
            return Role::pluck('name')->all();
        });
    });

=======
    Route::get('/editors', [ConferenceController::class, 'editors']);
>>>>>>> Stashed changes
    Route::apiResource('conferences', ConferenceController::class);
    Route::get('/editors', [AdminUserController::class, 'editors']);
});
