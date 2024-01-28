<?php

//! S07E06 Création Table et Controler et Model Category

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request; //FIXME: Christ-H
use Illuminate\Support\Facades\Validator; //FIXME: Christ-H

class CategoryController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $categories = Category::all()->load('tasks');
        // Retour automatique au format JSON 👌
        // return $categories; // renvoie toutes les tâches liées à chaque catégory
        if ($categories) {
            return $categories;
        } else {
            return response(null, 404);
        }
    }

    // Création de la méthode find($id)
    public function find($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        $category = Category::find($id);

        if (!$category) {
            return response(null, 404); // 404 : not found
        }
        // Retour auto au format JSON
        return $category;
    }

    //FIXME:
    // Ne sera exécutée que si l'url http://127.0.0.1:8000/categories en méthode POST est appelée
    // Création de la méthode create
    public function create(Request $request) //? $request = contenu de la requête
    {
        //? Dans la variable $validator, je mets le résultat d'une vérification de l'input name
        $validator = Validator::make($request->input(), [
            //? avec l'outil Facade Validator on vérifie :
            //? - title existe bien : required
            //? - title n'est pas vide : filled
            'name' => ['required', 'filled']
        ]);

        // Vérifier si validation KO
        if ($validator->fails()) {
            // si oui, renvoyer un code HTTP 422,
            // avec un message d'erreur à l'API plus explicite que erreur500
            // Permet de faire savoir que c’est une erreur de requête
            // (pas le serveur planté (erreur 500)
            return response()->json($validator->errors(), 422);
        }
        //? Extraction des valeurs passées de la body de la requête
        // Récupérer la donnée name dans le json de la requete
        $name = $request->input('name');

        //? Créer une nouvelle instance de la classe Task,
        // puis définir sa propriété name
        $category = new Category();
        // Insérer variable $title dans la propriété name de l’instance
        // de Category du Model Category
        // on lui attribue la valeur récupérée dans la requête
        $category->name = $name;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        $category->saveOrFail();
        return $category;
    }

    // Méthode pour modifier les propriétés selon son id
    // Ne sera exécutée que si l'url http://127.0.0.1:8000/api/categories/$id en méthode PUT est appelée
    public function update(Request $request, $id) //?contenu requete + identifiant
    {
        // Récupérer la categorie à modifier avec l'id
        $category = Category::findOrFail($id);

        //? Vérifier si la donnée name est bien dans le corps de la requête S07E06
        //!? Dans la variable $validator, je mets le résultat d'une vérification de l'input name
        // Avec la Façade (outil de Laravel) Validator, je vérifie que :
        // - name existe bien : required
        // - name n'est pas vide : filled
        $validator = Validator::make($request->input(), [
            'name' => ['required', 'filled']
        ]);

        // On vérifie si la validation a raté
        if ($validator->fails()) {
            // si oui, renvoyer un code HTTP 422, avec un message d'erreur
            return response()->json($validator->errors(), 422);
        }

        //? Extraction des valeurs passées dans le body de la requête
        $name = $request->input('name');

        //? Ecraser l'ancienne valeur stockée dans la propriété name
        // (avec la nouvelle valeur)
        // dans l’instance de Category du Model Category
        $category->name = $name;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        $category->updateOrFail();
        return $category;
    }

    //Ne sera exécutée que si l'url http://127.0.0.1:8000/api/categories/$id en méthode DELETE est appelée
    // Création méthode delete
    public function delete($id)
    {
        // Récupérer tâche (objet) avec l'id
        $category = Category::findOrFail($id);

        // suppression dans la BDD
        // réponse HTTP : 200 -> Delete
        // réponse HTTP : 500 -> Internal Server Error
        $category->deleteOrFail();
        return $category;
    }
}
