<?php

//! S07E06 Création Table et Controler et Model Category

namespace App\Http\Controllers;

use App\Models\Tag;

class TagController extends Controller
{
    // Création de la méthode list
    public function list ()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tags = Tag::all();
        // Retour automatique au format JSON 👌
        return $tags;
    }

    // Création de la méthode find($id)
    public function find($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        $tag = Tag::find($id);

        if (!$tag) {
            return response(null, 404);// 404 : not found
        }
        // Retour auto au format JSON
        return $tag;
    }
}
