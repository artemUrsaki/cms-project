<?php

namespace App\Http\Controllers;

use App\Models\Subpage;
use Illuminate\Http\Request;

class SubpageController extends Controller
{
    public function index()
    {
        return response()->json(Subpage::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
            'conference_id' => 'nullable|exists:conferences,id',
        ]);
        return Subpage::create($data);
    }

    public function show(Subpage $subpage)
    {
        return $subpage;
    }

    public function update(Request $request, Subpage $subpage)
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'content' => 'nullable|string',
            'conference_id' => 'nullable|exists:conferences,id',
        ]);
        $subpage->update($data);
        return $subpage;
    }

    public function destroy(Subpage $subpage)
    {
        $subpage->delete();
        return response()->noContent();
    }
}
