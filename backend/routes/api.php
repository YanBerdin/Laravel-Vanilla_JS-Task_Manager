<?php

// TODO  Dans dossier routes  >  api.php (web.php c'etait QUE pour le test)

//  Déclarer la route :
//      =>    exemple :  use App\Http\Controllers\MovieController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//! =>   Penser à 'USE' le Controller Utilisé
use App\Http\Controllers\TaskController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//      <= <= <=      deja en place      =>   =>   =>
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// TODO EXEMPLE -> Route de récupération de la liste des films
// Type : get
// Chemin : http://127.0.0.1:8000/movies
// Controller : MovieController
// Méthode : list
// Exemple : Route::get('/movies', [MovieController::class, 'list']);

//! Route de récupération de la liste des Tâches à effectuer
//TODO | `/api/tasks` | GET | - | Get all tasks details | - |
// Type : get
// Chemin : http://127.0.0.1:8000/tasks
// Controller : TaskController
// Méthode : list
//  | `/api/tasks`      | GET | - | Get all tasks details | - |  <= <=  <= api-endpoints.md
 Route::get('/tasks', [TaskController::class, 'list']);

//! Route pour récupérer une task selon son id
//TODO | `/api/tasks/[id]` | GET | - | Get a single task details | `id` - ID of the task to show |
// Type : get
// Chemin : http://127.0.0.1:8000/tasks/{id}
// Controller : TaskController
// Méthode : show

 Route::get('/tasks/{id}', [TaskController::class, 'show'])->where('id', '[0-9]+');


//! Route pour créer une nouvelle task dans la table tasks
//TODO | `/api/tasks`      | POST | `title` | Create a new task | - |
// Chemin : http://127.0.0.1:8000/tasks
// Methode HTTP : POST
// Controller : TaskController
// Méthode : create

Route::post('/tasks', [TaskController::class, 'create']);

//! Route pour Update une tâche parmis la liste
//TODO | `/api/tasks/[id]` | PUT  | `title` | Update a task | `id` - ID of the task to update |
// Chemin : http://127.0.0.1:8000/api/tasks/[id
// Methode HTTP : PUT
// Controller : TaskController
// Méthode : create

Route::put('/tasks/{id}', [TaskController::class, 'update']);



//! Route pour supprimer une task dans la table tasks
//TODO | `/api/tasks/[id]` | DELETE | - | Delete a task | `id` - ID of the task to delete |
// Route::get('/tasks/{id}', [TaskController::class, 'show'])->where('id', '[0-9]+');
// Chemin : http://127.0.0.1:8000/api/tasks/{id}
// Methode HTTP : DELETE
// Controller : TaskController
// Méthode : delete
Route::delete('/tasks/{id}', [TaskController::class, 'delete'])->where('id', '[0-9]+');

// 'id','[0-9]+'
//!  => $id  ne peut etre composé que de au minimum 1 caractere composéé de chiffre de 0 à 9 inclus
