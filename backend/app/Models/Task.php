<?php

//!  => Déclarer la Classe vide héritant des capacités de Model
//!  => 'extends' au Model implémenté par l'ORM 'Eloquent'

namespace App\Models;// <=  Déjà implémenté par l'ORM Eloquent

use Illuminate\Database\Eloquent\Model; // <=  Déjà implémenté par Eloquent

// Déclaration de la classe Task qui hérite des méthodes de Model)
class Task extends Model {

    //Une tâche appartient à une seule catégorie
    // One TO Many inversée
    // https://laravel.com/docs/10.x/eloquent-relationships#one-to-many-inverse

    // On crée la méthode category() qui nous retournera
    // les infos de la catégorie à laquelle appartient l'instance de tâche courante

    //* exemple d'utilisation possible :
    // $myTask = Task::find(1);
    // $myTaskCateg = myTask->category();
    //* on peut maintenant utiliser load() !! Eager Loading
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}

// Héritage de méthodes find(), all(), save(), delete()...
