<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()
        ->for(Role::create(['name' => 'admin']))
        ->create([
            'first_name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'admin',
        ]);

        User::factory()
        ->for(Role::create(['name' => 'editor']))
        ->create([
            'email' => 'test@gmail.com',
            'password' => 'password',
        ]);
    }
}
