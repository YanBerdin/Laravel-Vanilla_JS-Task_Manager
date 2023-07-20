<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// Héritage de méthodes find(), all(), save(), delete()...


// Création de la classe Category héritant de toutes les capacités de Model
class Category extends Model {

    //!E05 => tasks()
    // Un catégorie peut catégoriser plusieurs tâches
    // One Category to Many Tasks : One TO Many
    // https://laravel.com/docs/10.x/eloquent-relationships#one-to-many
    // => Has Many
    // la méthode tasks() nous retournera toutes les tâches associées à l'instance courant de Category

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}


