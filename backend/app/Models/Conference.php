<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
    protected $fillable = [
        'year',
        'name',
    ];

    public function subpages()
    {
        return $this->hasMany(Subpage::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_conference');
    }
}
