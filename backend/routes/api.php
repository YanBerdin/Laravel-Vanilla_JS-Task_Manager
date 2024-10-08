<?php

//TODO  routes  >  api.php (web.php c'etait QUE pour le test)

//  Déclarer la route :
//      =>    exemple :  use App\Http\Controllers\MovieController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//TODO =>   Penser à 'USE' le Controller Utilisé
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController; //! => S07E06
use App\Http\Controllers\TagController; //! => S07E06

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

// Routes tasks ============================================================

// EXEMPLE -> Route de récupération de la liste des films
// Type : get
// Chemin : http://127.0.0.1:8000/movies
// Controller : MovieController
// Méthode : list
// Exemple : Route::get('/movies', [MovieController::class, 'list']);

//! Route de récupération de la liste des Tâches à effectuer
//TODO | `/api/tasks` | GET | - | Get all tasks details | - | <= <= api-endpoints.md
// Type : get
// Chemin : http://127.0.0.1:8000/tasks
// Controller : TaskController
//? Méthode : list
Route::get('/tasks', [TaskController::class, 'list']);

//! Route pour récupérer une task selon son id
//TODO | `/api/tasks/[id]` | GET | - | Get a single task details | `id` - ID of the task to find |
// Type : get
// Chemin : http://127.0.0.1:8000/tasks/{id}
// Controller : TaskController
//? Méthode : find
Route::get('/tasks/{id}', [TaskController::class, 'find'])->where('id', '[0-9]+');


//! Route pour créer une nouvelle task dans la table tasks
//TODO | `/api/tasks`      | POST | `title` | Create a new task | - |
// Chemin : http://127.0.0.1:8000/tasks
// Methode HTTP : POST
// Controller : TaskController
//? Méthode : create
Route::post('/tasks', [TaskController::class, 'create']);
// FIXME: Route::post('/tasks', [TaskController::class, 'create'])->name('task-create');

//! Route pour Update une tâche parmis la liste
//TODO | `/api/tasks/[id]` | PUT  | `title` | Update a task | `id` - ID of the task to update |
// Chemin : http://127.0.0.1:8000/api/tasks/{id}
// Methode HTTP : PUT
// Controller : TaskController
//? Méthode : update
Route::put('/tasks/{id}', [TaskController::class, 'update'])->where('id', '[0-9]+');
//? Attention de ne pas oublier de préciser: ->where('id', '[0-9]+');


//! Route pour supprimer une task dans la table tasks
//? | `/api/tasks/[id]` | DELETE | - | Delete a task | `id` - ID of the task to delete |
// Chemin : http://127.0.0.1:8000/api/tasks/{id}
// Methode HTTP : DELETE
// Controller : TaskController
//? Méthode : delete
Route::delete('/tasks/{id}', [TaskController::class, 'delete'])->where('id', '[0-9]+');

// 'id','[0-9]+'
//! INFO  => $id  ne peut etre composé que de au minimum 1 caractere composé de chiffre de 0 à 9 inclus

// Routes categories ============================================================

//? Route de récupération des categories dans la table categories
// Chemin : http://127.0.0.1:8000/api/categories/
//TODO | `/api/categories` | GET | - | Get all categories details | - |
Route::get('/categories', [CategoryController::class, 'list']);

//? Route pour afficher une categorie selon son id dans la table categories
//TODO | `/api/categories/[id]` | GET | - | Get a single category details | `id` - ID of the category to find |
Route::get('/categories/{id}', [CategoryController::class, 'find'])->where('id', '[0-9]+');

//? Route pour créer une catégorie
//TODO | `/api/categories`      | POST | `title` | Create a new category | - |
Route::post('/categories', [CategoryController::class, 'create'])->name('category-create');

//* Pour modifier une category dans la table category
// Chemin : /categories/{id}
// Methode HTTP : PUT
// Controller : CategoryController
// Méthode : update
Route::put('/categories/{id}', [CategoryController::class, 'update'])->where('id', '[0-9]+');

//* Pour supprimer une category dans la table category
// Chemin : /categories/{id}
// Methode HTTP : DELETE
// Controller : CategoryController
// Méthode : delete
Route::delete('/categories/{id}', [CategoryController::class, 'delete'])->where('id', '[0-9]+');

// Routes tags ============================================================

//? Route pour afficher la liste tout les tags dans la table tags
// Type : get
// Chemin : http://127.0.0.1:8000/api/tags
// Controller : TagController
// Méthode : list
//TODO | `/api/tags` | GET | - | Get all tags details | - |
Route::get('/tags', [TagController::class, 'list']);



//? Route pour afficher un tag selon son id dans la table tags
//TODO | `/api/tags/[id]` | GET | - | Get a single tag details | `id` - ID of the tag to find |
// Type : get
// Chemin : http://127.0.0.1:8000/api/tags/{id}
// Controller : TagController
// Méthode : find
Route::get('/tags/{id}', [TagController::class, 'find'])->where('id', '[0-9]+');

//? Pour créer un nouveau tag dans la table tag
//TODO | `/api/tags`      | POST | `title` | Create a new tag | - |
// Chemin : /tags
// Methode HTTP : POST
// Controller : TagController
// Méthode : create
Route::post('/tags', [TagController::class, 'create']);


//* Pour modifier un tag dans la table tag
// Chemin : /tags/{id}
// Methode HTTP : PUT
// Controller : TagController
// Méthode : update
Route::put('/tags/{id}', [TagController::class, 'update'])->where('id', '[0-9]+');

//* Pour supprimer un tag dans la table tag
// Chemin : /tags/{id}
// Methode HTTP : DELETE
// Controller : TagController
// Méthode : delete
Route::delete('/tags/{id}', [TagController::class, 'delete'])->where('id', '[0-9]+');
