<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// Héritage de méthodes find(), all(), save(), delete()...

use Illuminate\Database\Eloquent\Relations\HasMany; //FIXME: Christ-H
use App\Models\Task; //FIXME: Christ-H

// Création de la classe Category héritant de toutes les capacités de Model
class Category extends Model
{

    // Une catégorie peut catégoriser plusieurs tâches
    // One Category to Many Tasks : One TO Many
    // https://laravel.com/docs/10.x/eloquent-relationships#one-to-many
    // => Has Many
    // la méthode tasks() nous retournera toutes les tâches associées à l'instance courante de Category

    /**
     * Get the task for the categoy : category est lié à plusieurs tâches
     */
    public function tasks() //FIXME: : HasMany  //? Fonction prend nom de la relation avec ‘S’ => il y en a Many
    {
        // $this (1 catégorie) -> a plusieurs tâches (plusieurs instanciations)
        return $this->hasMany(Task::class);
    }        // FQCN du Model Task 🔝 (même space App\Model que Category)
}
