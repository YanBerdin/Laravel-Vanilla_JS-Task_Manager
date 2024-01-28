<?php

//!  => Déclarer la Classe vide héritant des capacités de Model
//!  => 'extends' au Model implémenté par l'ORM 'Eloquent'

namespace App\Models; // <=  Déjà implémenté par l'ORM Eloquent

use Illuminate\Database\Eloquent\Model; // <=  Déjà implémenté par Eloquent

use App\Models\Category; //FIXME: Christ-H
use App\Models\Tag; //FIXME: Christ-H
// use Illuminate\Database\Eloquent\Relations\BelongsTo; //FIXME: Christ-H
// use Illuminate\Database\Eloquent\Relations\BelongsToMany; //FIXME: Christ-H

// Déclaration de la classe Task qui hérite des méthodes de Model)
class Task extends Model
{

    //Une tâche appartient à une seule catégorie
    // One TO Many inversée
    // https://laravel.com/docs/10.x/eloquent-relationships#one-to-many-inverse

    // On crée la méthode category() qui nous retournera
    // les infos de la catégorie à laquelle appartient l'instance de tâche courante

    //* exemple d'utilisation possible :
    // $myTask = Task::find(1);
    // $myTaskCateg = myTask->category();
    //* on peut maintenant utiliser load() !! Eager Loading


    /**
     * Get the category that owns the task. Une seule category appartient à une tâche
     */
    public function category() //FIXME: : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * The tags that belong to the tasks.
     */
    public function tags() //FIXME: : BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
        //FIXME: return $this->belongsToMany(Tag::class, 'tag_task', 'task_id', 'tag_id');
    }
}

// Héritage de méthodes find(), all(), save(), delete()...
