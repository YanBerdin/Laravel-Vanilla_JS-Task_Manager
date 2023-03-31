# Laravel

## Création d’un projet avec Laravel

```bash
composer create-project laravel/laravel backend
```

C’est déjà fini ! Même pas le temps de se faire un café 🤭

> ℹ️ La commande `composer create-project` s'occupe de (presque) tout : elle crée les fichiers de notre backend, le `composer.json` et fait même le `composer install` !
> 
> [Lien Packagist de Laravel](https://packagist.org/packages/laravel/laravel)

**Et voilà le résultat**

Les points qui nous intéressent pour le moment sont :

- `./app/Http/Controllers`
- `./app/Models`
- `./routes`
    - `web.php`
    - `api.php`
- `.env` qui contiendra la configuration de notre application

<aside>
🥳 Ca ressemble vachement au MVC !
</aside>

## Création d’une BDD de test

###  ->  ATTENTION
###  ->  Class/Model Au SINGULIER = nom de la Table aU PLURIEL 

On crée une base de données `moviedb` avec un utilisateur spécifique.

On ajoute une table `movies` dans laquelle on insère la trilogie des "Tuche".
Convention => NomdelaTable au PLURIEL

```sql
CREATE DATABASE `moviedb`;
USE `moviedb`;

CREATE USER 'moviedb'@'localhost' IDENTIFIED BY PASSWORD '*94BDCEBE19083CE2A1F959FD02F964C7AF4CFC29';
GRANT ALL PRIVILEGES ON `moviedb`.* TO 'moviedb'@'localhost';

CREATE TABLE `movies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `movies` (`title`)
VALUES ('Les tuche'), ('Les tuche 2'), ('Les tuche 3');
```
> Laravel est un framework. Par conséquent il attend un standard au niveau de la base de donnée (on verra plus précisemment 😶‍🌫️)
> => NomduModel (au singulier)
> => NomdelaTables au pluriel

## Configuration et lancement

Dans le fichier `.env` à la racine de `/backend` :

```
DB_DATABASE=moviedb
DB_USERNAME=moviedb
DB_PASSWORD=test
```

Il ne nous reste déjà plus qu'à lancer le serveur ! :rocket:

```bash

  php artisan serve

```

Cette commande est le raccourci pour lancer le serveur PHP comme vu dans les saisons précédentes : `php -S 127.0.0.1:8000 server.php`

⇒ Maintenant on vérifie le fonctionnement : [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

⇒  => => Verifier si port 8000 ou 8001 ou 8002 ou 8003 ...

## Codons !

**Création d’une route web de test dans le fichier `web.php` (=> QUE Test) :**

```php
// TODO  Dans dossier routes  > web.php  ( => c'est QUE pour le test )

// Route Test : 
//? Une route, c'est quoi ?
// - un chemin
// - (optionnel) un nom unique
// - un verbe HTTP (GET, POST, PUT, DELETE...)
// - un truc à afficher via par exemple : une méthode de controleur
//     Ou ci dessous : un callback sous forme de fonction anonyme

Route::get('/test', function () {  //  <=   <=  FONCTION ANONYME = CALL BACK
    return 'Bienvenue sur ma future API de test !';
});
```

⇒ Direction [http://127.0.0.1:8000/test](http://127.0.0.1:8000/test)

> 🤓 Pourquoi `web.php` au lieu de `api.php` ?

Il existe 3 différences entre web et api :

1. `api` est configuré par défaut avec une limite d’appel (60 requêtes par minute)    => Sécurité => Parade aux attaques DDOS
2. Le “middleware group” est soit `api` soit `web`

    Les “middleware” permettent de filtrer les requêtes en entrée et les réponses en sortie ; pour [en savoir plus](https://www.conciergerie.dev/blog/laravel-les-middlewares)

3. Les routes `api`sont préfixées par `/api/`

## Et l'api alors ?

Dans Laravel, on copie la formule du MVC et on va faire ces étapes :
- Créer une route
- Créer la méthode dans le Controller (et créer le Controller si besoin)
- Utiliser ou créer le Model

### :one: La liste des films

**Ajout de la route (endpoint)**

```php

// TODO  Dans dossier routes  >  api.php (web.php c'etait QUE pour le test)

//  Déclarer la route :
//      =>    exemple :  use App\Http\Controllers\MovieController;

use Illuminate\Http\Request; // <= <= <= deja en place
use Illuminate\Support\Facades\Route; // <= <= <= deja en place
//! =>   Penser à 'USE' le Controller Utilisé
use App\Http\Controllers\MovieController;
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

// Route de récupération des films
// Type : get
// Chemin : http://127.0.0.1:8000/movies
// Controller : MovieController
// Méthode : list
Route::get('/movies', [MovieController::class, 'list']);
```

**Création d’un contrôleur**

```php
// TODO Dans dossier app > http > Controllers
//     => créer MovieController.php
//! attention le fichier doit avoir le même nom que la classe qu'il définit


namespace App\Http\Controllers;

use App\Models\Movie;
//! =>   Penser à 'USE' le Model Utilisé

use Illuminate\Http\Request; // <=  Déjà implémenté par Eloquent
class MovieController extends Controller // => Controller implémenté par Eloquent'
{
    // Création de la méthode list
    public function list ()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $movies = Movie::all();
        // Retour automatique au format JSON 👌
        return $movies;
    }
}
```

**Création d’une classe Model**

```php
// TODO => Dans app > Models   => Créer le Model Movie.php

//!  => Déclarer la Classe vide mais héritant des capacités de 'Model'
//!  => 'extends' au Model 'Model' implémenté par l'ORM 'Eloquent'

namespace App\Models;       // <=  Déjà implémenté par l'ORM Eloquent

use Illuminate\Database\Eloquent\Model; // <=  Déjà implémenté Eloquent

// TODO => Déclaration de la classe Task (vide et extends à Model)
class Task extends Model {}

```

**Tests avec le navigateur**

Direction [http://127.0.0.1:8000/api/movies](http://127.0.0.1:8000/api/movies)

**Tests du barbu 🥸**

Utiliser l'extension VSCode "Rest Client" et créer un fichier `list.http` à la racine => dossier backend
Coller dedans la ligne ci-dessous
```
GET http://127.0.0.1:8000/api/movies HTTP/1.1
```
ou selon port ouvert
```
GET http://127.0.0.1:8002/api/movies HTTP/1.1
```

### :two: Un film en particulier

**Ajout de la route**


```php
|//? Une route, c'est quoi ?

// - un chemin
// - (optionnel) un nom unique
// - un verbe HTTP (GET, POST, PUT, DELETE...)
// - un truc à afficher via par exemple : une méthode de controleur
//     Ou ci dessous : un callback sous forme de fonction anonyme
Route::get('/test', function () {  //      <=      <=      <=  FONCTION ANONYME = CALL BACK
    return 'Bienvenue sur ma future API de test !';  
});         // on passe en argument une fonction() à un autre fonction()
            // Elle sera executée par GET() 
            // Anonyme car executée QUE dans ce contexte
```


```php
use App\Http\Controllers\MovieController;

// Route d'un film selon son id
// Type : get
// Chemin : http://127.0.0.1:8000/movies/{id}
// Controller : MovieController
// Méthode : show
Route::get('/movies/{id}', [MovieController::class, 'show'])->where('id', '[0-9]+');
```

**Ajout de la méthode dans contrôleur**

```php
namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    // Création de la méthode show
    public function show($id)
    {
        // Utilisation de la méthode find() grâce à l'héritage
        $movie = Movie::find($id);
        // Retour automatique au format JSON 👌
        return $movie;
    }
}
```

**Ajout de la méthode find dans le model Movie**

:warning: Mais non, pas besoin ! la méthode find() est héritée naturellement de la classe parente Model !

**Tests avec le navigateur**

Direction [http://127.0.0.1:8000/api/movies/2](http://127.0.0.1:8000/api/movies/2)

**Tests du barbu 🥸**

Utiliser l'extension VSCode "Rest Client" et créer un fichier `show.http`

```
GET http://127.0.0.1:8000/api/movies/1 HTTP/1.1
```

