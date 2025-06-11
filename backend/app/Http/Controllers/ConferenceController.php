<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ConferenceController
{
    public function index()
    {
        return Cache::rememberForever('conferences', function () {
            return Conference::all()->load('users')->toResourceCollection();
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'year'    => 'required|integer',
            'editors' => 'nullable|array',
        ]);

        $conference = Conference::create([
            'name' => $validated['name'],
            'year' => $validated['year'],
        ]);

        $emails = collect($validated['editors'] ?? [])->filter();

        if ($emails->isNotEmpty()) {
            $userIds = User::whereIn('email', $emails)->pluck('id');
            $conference->users()->sync($userIds);
        }

        return $conference->load('users')->toResource();
    }

    public function show(string $id)
    {
        return Conference::with('users')->findOrFail($id)->toResource();
    }

    public function update(Request $request, string $id)
    {
        $conference = Conference::findOrFail($id);

        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'year'    => 'required|integer',
            'editors' => 'nullable|array',
        ]);

        $conference->update([
            'name' => $validated['name'],
            'year' => $validated['year'],
        ]);

        $emails = collect($validated['editors'] ?? [])->filter();

        if ($emails->isNotEmpty()) {
            $userIds = User::whereIn('email', $emails)->pluck('id');
            $conference->users()->sync($userIds);
        } else {
            $conference->users()->detach();
        }

        return $conference->load('users')->toResource();
    }

    public function destroy(string $id)
    {
        $conference = Conference::findOrFail($id);
        $conference->delete();

        return response()->json(['message' => 'Conference deleted']);
    }

    public function editors()
    {
        return Cache::rememberForever('editors', function () {
            return User::pluck('email');
        });
    }
}
