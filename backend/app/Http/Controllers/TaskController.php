<?php

//? attention le fichier doit avoir le même nom que la classe qu'il définit

namespace App\Http\Controllers;

//!Penser à 'USE' le Model Utilisé
use App\Models\Task;

//!Penser à 'USE' le Request
use Illuminate\Http\Request;

//! Implémentation de VALIDATOR => Dans create() et update() => S07E06
use Illuminate\Support\Facades\Validator;

//? 'extends' du 'Controller' implémenté par 'Eloquent' héritant de ses méthodes
class TaskController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        //  Utilisation de la méthode all() grâce à l'héritage
        // $tasks = Task::all(); // V1 sans load

        //? grâce à la relation One To Many mise en place dans les modèles Task et Category,
        //? nous pouvons maintenant faire appel à la méthode load()
        // https://laravel.com/docs/10.x/eloquent-relationships#lazy-eager-loading

        $tasks = Task::all()->load('category');
        // TODO $tasks = Task::all()->load('category', 'tags');

        //  Retour automatique au format JSON 👌
        return $tasks;
    }

    // Création de la méthode find
    public function find($id)
    {
        // Utilisation de la méthode find() grâce à l'héritage
        $task = Task::findOrFail($id)->load('category');

        // Retour automatique au format JSON 👌
        return $task;
    }

    // Ne sera exécutée que si l'url http://127.0.0.1:8000/tasks en méthode POST est appelée
    public function create(Request $request) //? $request = contenu de la requête
    {
        //! Dans la variable $validator, je mets le résultat d'une vérification de l'input title

        //! Avec la Façade (outil de Laravel) Validator, je vérifie que :
        //! - title existe bien : required
        //! - title n'est pas vide : filled
        $validator = Validator::make($request->input(), [
            'title' => ['required', 'filled']
        ]);

        // On vérifie si la validation a raté
        if ($validator->fails()) {
            // si oui, on renvoie un code HTTP 422, avec un message d'erreur à l'API plus explicite que erreur500
            // Permet de faire savoir que c’est une erreur de requête (pas le serveur planté (erreur 500)
            return response()->json($validator->errors(), 422);
        }

        //! Segment VALIDATOR ligne 50 à 63 => S07E06
        // Extraction des valeurs passées dans la body de la requête
        // Récupérer la donnée title dans le json de la requete
        $title = $request->input('title');

        // On crée une nouvelle instance de la classe Movie, puis on lui définit la propriété title
        // Instancier une nouvelle tâche
        $task = new Task();

        // Insérer variable $title dans la propriété title de l’instance
        // de Task du Model Task
        // on lui attribue la valeur récupérée dans la requête
        $task->title = $title;

        // On sauvegarde dans la BDD, puis on gère la réponse avec le code HTTP qui convient
        if ($task->save()) {
            return response()->json($task, 201); // 201 : Created
        } else {
            return response(null, 500); // 500 : Internal Server Error
        }
    }

    //Ne sera exécutée que si l'url http://127.0.0.1:8000/api/tasks/$id en méthode PUT est appelée
    public function update(Request $request, $id) // identifiant + contenu requete
    {
        // On recupère la tâche à modifier avec l'id
        $task = Task::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$task) {
            return response(null, 404);
        }

        //? On vérifie si la donnée title est bien dans le corps de la requête S07E06
        //! Dans la variable $validator, je mets le résultat d'une vérification de l'input title
        //! Avec la Façade (outil de Laravel) Validator, je vérifie que :
        //! - title existe bien : required
        //! - title n'est pas vide : filled
        $validator = Validator::make($request->input(), [ // Récupérer title dans le json de requête
            'title' => ['required', 'filled']
        ]);

        // On vérifie si la validation a raté
        if ($validator->fails()) {
            // si oui, on renvoie un code HTTP 422, avec un message d'erreur
            return response()->json($validator->errors(), 422);
        }

        // Extraction des valeurs passées dans le body de la requête
        $title = $request->input('title');
        // Ecraser l'ancienne valeur stockée dans la propriété title, et mettre la nouvelle
        // dans l’instance de Task du Model Task
        $task->title = $title;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        if ($task->save()) {
            return response()->json($task, 201); // On renvoie l'objet modifié au format JSON
        } else {
            return response(null, 500); // 500 : Internal Server Error
        }
    }

    //Ne sera exécutée que si l'url http://127.0.0.1:8000/api/tasks/$id en méthode DELETE est appelée
    public function delete($id)
    {
        // On recherche avec l'id
        $task = Task::find($id);
        // Si on n'a rien, on ne peut pas faire de suppression
        if (!$task) {
            return response(null, 404); // 404 : not found
        }

        // On supprime puis on gère la réponse avec le code HTTP qui convient
        if ($task->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500); // 500 : Internal Server Error
        }
    }
}
// Dans le cadre d’une API Rest
// on ne peut pas supprimer plusieurs occurrences en même temps
// La normalisation des routes ne permet de modifier qu’1 par 1
// Avec une architecture non Rest => On peut sans problème le faire
