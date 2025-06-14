<?php

namespace App\Providers;

use App\Models\Conference;
use App\Models\User;
use App\Observers\UserObserver;
use App\Observers\ConferenceObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
        JsonResource::withoutWrapping();
        User::observe(UserObserver::class);
        Conference::observe(ConferenceObserver::class);
    }
}
