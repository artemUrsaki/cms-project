<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use Illuminate\Http\Request;

class ConferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Conference::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // Pridaj ďalšie polia podľa potreby
        ]);

        return Conference::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Conference::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $conference = Conference::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // Pridaj ďalšie polia podľa potreby
        ]);

        $conference->update($validated);

        return $conference;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $conference = Conference::findOrFail($id);
        $conference->delete();

        return response()->json(['message' => 'Conference deleted']);
    }
}
