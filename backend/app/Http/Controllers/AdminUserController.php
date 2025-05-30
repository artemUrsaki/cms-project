<?php

namespace App\Http\Controllers;

use App\Mail\AccountCreated;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cache::rememberForever('users', function () {
            return User::all()->toResourceCollection();
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')],
            'role' => 'required|string|exists:roles,name',
        ]);

        $tempPassword = Str::random(12);
        $data['password'] = Hash::make($tempPassword);

        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
        
        $role = Role::where('name', $request->role)->first();
        $user->role()->associate($role);
        $user->save();

        Mail::to($user->email)->send(new AccountCreated($user->first_name, $user->last_name, $tempPassword));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return User::findOrFail($id)->toResource();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($id)],
            'role' => 'required|string|exists:roles,name',
        ]);

        $role = Role::where('name', $request->role)->first();

        $user = User::findOrFail($id);
        $user->fill([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
        ]);
        $user->role()->associate($role);
        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return User::findOrFail($id)->delete();
    }
}
