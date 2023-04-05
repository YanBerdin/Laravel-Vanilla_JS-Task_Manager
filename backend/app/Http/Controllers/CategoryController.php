<?php

//! S07E06 Création Table et Controler et Model Category

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    // Création de la méthode list
    public function list ()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tasks = Task::all();
        // Retour automatique au format JSON 👌
        return $tasks;
    }

    // Création de la méthode show($id)
    public function show($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        $task = Task::find($id);

        if (!$task) {
            return response(null, 404);// 404 : not found
        }
        // Retour auto au format JSON
        return $task;
    }
}
