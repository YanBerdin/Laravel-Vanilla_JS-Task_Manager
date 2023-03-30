<?php

// TODO Dans dossier app > http > Controllers
//     => créer MovieController.php
//! attention le fichier doit avoir le même nom que la classe qu'il définit


// class MovieController extends Controller
//{
// Création de la méthode list
//    public function list ()
//    {
// Utilisation de la méthode all() grâce à l'héritage
//        $movies = Movie::all();
// Retour automatique au format JSON 👌
//        return $movies;
//    }
//}

namespace App\Http\Controllers;

use App\Models\Task;
//! =>   Penser à 'USE' le Model Utilisé
use Illuminate\Http\Request;

class TaskController extends Controller
//!  => 'extends' 'Controller' implémenté par 'Eloquent' héritant de ses méthodes
{
    // Création de la méthode list
    public function list()
    {
        //  Utilisation de la méthode all() grâce à l'héritage
        $tasks = Task::all();
        //  Retour automatique au format JSON 👌
        return $tasks;
    }
    // Création de la méthode show
    public function show($id)
    {
        // Utilisation de la méthode find() grâce à l'héritage
                $task = Task::find($id);
        // Retour automatique au format JSON 👌
        return $task;
    }
}
// namespace App\Http\Controllers;

// use App\Models\Movie;
// use Illuminate\Http\Request;

// class MovieController extends Controller
// {
     // Création de la méthode show
//     public function show($id)
//     {
         // Utilisation de la méthode find() grâce à l'héritage
//         $movie = Movie::find($id);
         // Retour automatique au format JSON 👌
//         return $movie;
//     }
// }
