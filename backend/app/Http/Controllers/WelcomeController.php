<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conference;

class WelcomeController extends Controller
{
    public function welcome()
    {
        $conferences = Conference::with('subpages')->latest()->take(5)->get();

        return view('welcome', compact('conferences'));
    }
}