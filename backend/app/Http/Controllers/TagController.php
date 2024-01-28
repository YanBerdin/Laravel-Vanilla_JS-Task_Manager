<?php

//! S07E06 Création Table et Controler et Model Category

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tags = Tag::all()->load('tasks');
        // Retour automatique au format JSON 👌
        // return $tags;
        if ($tags) {
            return $tags;
        } else {
            return response(null, 404);
        }
    }

    // Création de la méthode find($id)
    public function find($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        // $tag = Tag::find($id);
        $tag = Tag::findOrFail($id)->load('tasks');

        // if (!$tag) {
        //     return response(null, 404);// 404 : not found
        // }
        // Retour auto au format JSON
        return $tag;
    }

    //FIXME:

    // Ne sera exécutée que si l'url http://127.0.0.1:8000/tags en méthode POST est appelée
    // Création de la méthode create
    public function create(Request $request) //? $request = contenu de la requête
    {
        //? Dans la variable $validator, je mets le résultat d'une vérification de l'input label
        $validator = Validator::make($request->input(), [
            //? avec l'outil Facade Validator on vérifie :
            //? - title existe bien : required
            //? - title n'est pas vide : filled
            'label' => ['required', 'filled']
        ]);

        // Si validation ko
        if ($validator->fails()) {
            // si ko = code HTTP 422 avec un message d'erreur
            return response()->json($validator->errors(), 422);
        }

        //? Extraction des valeurs passées de la body de la requête
        // Récupérer la donnée name dans le json de la requete
        $label = $request->input('label');

        //? Créer une nouvelle instance de la classe Tag,
        // puis définir sa propriété label
        $tag = new Tag();

        // Insérer variable $title dans la propriété name de l’instance
        // de Category du Model Category
        // on lui attribue la valeur récupérée dans la requête
        $tag->label = $label;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        $tag = $tag->saveOrFail();
        return $tag;
    }

    // Méthode pour modifier les propriétés correspondant à 1 id dans la bdd
    public function update(Request $request, $id) //?contenu requete + identifiant
    {
        // recherche objet à modifier
        $tag = Tag::findOrFail($id);

        //? Vérifier si la donnée name est bien dans le corps de la requête S07E06
        //? Dans la variable $validator, je mets le résultat d'une vérification de l'input label
        // avec l'outil Facade Validator on vérifie :
        // - name existe bien : required
        // - name n'est pas vide : filled
        $validator = Validator::make($request->input(), [
            'label' => ['required', 'filled']
        ]);

        // On vérifie si la validation a raté
        if ($validator->fails()) {
            // si oui, renvoyer un code HTTP 422, avec un message d'erreur
            return response()->json($validator->errors(), 422);
        }

        //? Extraction des valeurs passées de la body à la requête
        $label = $request->input('label');

        //? Ecraser l'ancienne valeur stockée dans la propriété $label
        // (avec la nouvelle valeur)
        // dans l’instance de Tag du Model Tag
        $tag->label = $label;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        $tag->updateOrFail();
        return $tag;
    }

    //Ne sera exécutée que si l'url http://127.0.0.1:8000/api/tags/$id en méthode DELETE est appelée
    // Création méthode delete
    public function delete($id)
    {
        // Récupérer tâche (objet) avec l'id
        $tag = Tag::findOrFail($id);

        // suppression dans la BDD
        // réponse HTTP : 200 -> Delete
        // réponse HTTP : 500 -> Internal Server Error
        $tag->deleteOrFail();
        return $tag;
    }
}
