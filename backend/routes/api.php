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


// TODO
// Route de récupération des films
// Type : get
// Chemin : http://127.0.0.1:8000/movies
// Controller : MovieController
// Méthode : list
// Exemple : Route::get('/movies', [MovieController::class, 'list']);
// TODO
// Route de récupération des Tâches à effectuer
// Type : get
// Chemin : http://127.0.0.1:8002/tasks
// Controller : TaskController
// Méthode : list
 Route::get('/tasks', [TaskController::class, 'list']);

// TODO
// Route d'un film selon son id
// Type : get
// Chemin : http://127.0.0.1:8000/tasks/{id}
// Controller : MovieController
// Méthode : show
// Route::get('/movies/{id}', [MovieController::class, 'show'])->where('id', '[0-9]+');

// TODO
 Route::get('/tasks/{id}', [TaskController::class, 'show'])->where('id', '[0-9]+');
