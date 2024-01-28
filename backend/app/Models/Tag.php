<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; //FIXME: Christ-H
use App\Models\Task; //FIXME: Christ-H


// Création de la classe Tag héritant de toutes les capacités de Model
class Tag extends Model
{
    /**
     * The tasks that belong to the tags.
     */
    public function tasks() //FIXME: : BelongsToMany
    {
        return $this->belongsToMany(Task::class);
        //FIXME: return $this->belongsToMany(Task::class, 'tag_task', 'tag_id', 'task_id');
    }
}
// Héritage de méthodes find(), all(), save(), delete()...
