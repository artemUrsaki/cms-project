<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ConferenceController;
use App\Http\Controllers\SubpageController;
use App\Models\Conference;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum',
])->get('/user', function (Request $request) {
    return $request->user()->toResource();
});

Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum',
    'admin'
])->group(function () {
    Route::apiResource('users', AdminUserController::class);

    Route::get('roles', function () {
        return Cache::rememberForever('roles', function () {
            return Role::pluck('name')->all();
        });
    });

    Route::get('/editors', [AdminUserController::class, 'editors']);

    Route::apiResource('conferences', ConferenceController::class);


    Route::post('/subpages', [SubpageController::class, 'store']);
    Route::put('/subpages/{subpage}', [SubpageController::class, 'update']);
    Route::delete('/subpages/{subpage}', [SubpageController::class, 'destroy']);
});


Route::get('/conferences', fn () => Conference::all());

Route::get('/subpages', [SubpageController::class, 'index']);
Route::get('/subpages/{subpage}', [SubpageController::class, 'show']);
