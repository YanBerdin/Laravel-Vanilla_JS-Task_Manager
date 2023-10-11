<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Création de la classe Tag héritant de toutes les capacités de Model
class Tag extends Model
{
    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }
}
// Héritage de méthodes find(), all(), save(), delete()...
