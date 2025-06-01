<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use App\Models\User;
use Illuminate\Http\Request;

class ConferenceController extends Controller
{
    /**
     * Zoznam konferencií aj s editormi.
     */
    public function index()
    {
        return Conference::with('users')->get(); // <-- Toto je bod č. 3
    }

    /**
     * Uloženie novej konferencie + napojenie editorov.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'year'    => 'required|integer',
            'editors' => 'array', // e-maily editorov
        ]);

        $conference = Conference::create([
            'name' => $validated['name'],
            'year' => $validated['year'],
        ]);

        if (!empty($validated['editors'])) {
            $userIds = User::whereIn('email', $validated['editors'])->pluck('id');
            $conference->users()->sync($userIds);
        }

        return $conference->load('users');
    }

    /**
     * Zobrazenie konkrétnej konferencie.
     */
    public function show(string $id)
    {
        return Conference::with('users')->findOrFail($id);
    }

    /**
     * Aktualizácia konferencie + editorov.
     */
    public function update(Request $request, string $id)
    {
        $conference = Conference::findOrFail($id);

        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'year'    => 'required|integer',
            'editors' => 'array',
        ]);

        $conference->update([
            'name' => $validated['name'],
            'year' => $validated['year'],
        ]);

        if (!empty($validated['editors'])) {
            $userIds = User::whereIn('email', $validated['editors'])->pluck('id');
            $conference->users()->sync($userIds);
        }

        return $conference->load('users');
    }

    /**
     * Zmazanie konferencie.
     */
    public function destroy(string $id)
    {
        $conference = Conference::findOrFail($id);
        
        $conference->delete();

        return response()->json(['message' => 'Conference deleted']);
    }
}
