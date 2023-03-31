Bon, Laravel est installé, Eloquent s'occupe de presque tout, la vie est belle :D

=> Pour la suite (C. .U.D.) il faut aussi l'extension VsCode 'restapi' pour tester requêtes

Reprenons notre contrôleur pour finaliser notre API !

&nbsp;
<pre><code class="php">namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller {}
</code></pre>
&nbsp;
<h2>Read</h2>
On va ajouter à notre API la possibilité de récupérer tous les films en 2 étapes :
<ol>
 	<li>Créer une route dans api.php (on va déplacer celle qui était dans web.php)</li>
 	<li>Créer la méthode correspondante : list</li>
</ol>
<pre><code class="php">Route::get('/movies', [MovieController::class, 'list']);</code></pre>
<pre><code class="php">// Accès en lecture de tous les films
public function list () {
  // Utilisation de la méthode all grâce à l'héritage
  <span class="hljs-variable">$movies</span> = <span class="hljs-title class_">Movie</span>::<span class="hljs-title function_ invoke__">all</span>(); 
<span class="hljs-comment">  // Retour sous format JSON</span> 
<span class="hljs-keyword">  return</span> <span class="hljs-title function_ invoke__">response</span>()-&gt;<span class="hljs-title function_ invoke__">json</span>(<span class="hljs-variable">$movies</span>);
}</code></pre>
Pour améliorer la partie lecture, on permet la récupération d'un seul élément
<pre><code class="php">public function read ($id) {
  // Utilisation de find avec l'id reçu en paramètre
  $movie = Movie::find($id);
  // Retour au format json
  return response()-&gt;json($movie);
}
</code></pre>
On n'oublie pas la nouvelle route ;)
<pre><code class="php">Route::get('/movies/{id}', [MovieController::class, 'read']);</code></pre>
&nbsp;

<ul>
<li> Ajouter chaque nouvelle route</li>

=> Selon le type de routes qu'on veut créer, on peut utiliser les méthodes Route::get ou Route::post ou Route::put ou Route::delete dans notre router. Ici on utilise les 4 pour créer 4 routes !
<li> Créer les méthodes dans le controlleur </li>

=> Nous avons déjà créé la méthode read, créons les méthodes insert, update et delete dans TaskController

<li> Utiliser REST Client avec les fichiers .http pour tester </li>
=> et vérifier que les données évoluent avec Adminer
</ul>

Convention : L'identifiant de la donnée à traiter se précise dans l'url (


<h2>Create</h2>
On recommence les mêmes étapes à la différence que l'on sera désormais en HTTP POST


<pre><code class="php">Route::post('/movies', [MovieController::class, 'create']);
</code></pre>


<pre><code class="php">// Ne sera exécutée que si l'url http://127.0.0.1:8000/movies en méthode POST est appelée

public function create(Request $request) {

    // Extraction des valeurs passées ds body de la requête
        $title = $request-&gt;input('title');

        // On crée une nouvelle instance, puis on lui définit la propriété title
        $movie = new Movie();
        $movie-&gt;title = $title;

        // On sauvegarde dans la BDD, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        if ($movie-&gt;save()) {
            return response()-&gt;json($movie, 201);
        } else {
            return response(null, 500);
        }
}
</code></pre>
                                 Attention  ERROR 500 !!!



 Notre table `movies` ne remplit pas les contraintes exigées par Laravel :
<a href="https://laravel.com/docs/8.x/eloquent#timestamps">https://laravel.com/docs/8.x/eloquent#timestamps</a>

La table ne contient pas de champ `created_at` ni `updated_at`, il faut donc le préciser dans le Model de Movie
<pre><code class="php">class Movie extends Model {

    // Take care of timestamps, created_at et updated_at are not presents
    public $timestamps = false;
}
</code></pre>
<pre><code class="php">Autre option utiliser Validator() 
exemple avec create()

    public function create(Request $request) {

        // Dans la variable $validator, je mets le résultat d'une vérification de l'input title
        // Avec la Façade (outil de Laravel) Validator, je vérifie que :
            // - title existe bien : required
            // - title n'est pas vide : filled
        $validator = Validator::make($request->input(), [
            'title' => ['required', 'filled']
        ]);

        // On vérifie si la validation a raté
        if ($validator->fails()) {

            // si oui, on renvoie un code HTTP 422, avec un message d'erreur

            return response()->json($validator->errors(), 422);
        }                  <=  <=  <=  // (Fin de la partie Validator())

        $title = $request->input('title');

        $task = new Task();
        $task->title = $title;

        if ($task->save()) {
            return response()->json($task, 201);
        } else {
            return response(null, 500);
        }
    }

    public function update($id, Request $request)
    {
}
</code></pre>
&nbsp;
<h2>Update</h2>
Idem, mais cette fois ci en HTTP PUT
<pre><code class="php">Route::put('/movies/{id}', [MovieController::class, 'update']);
</code></pre>
<pre><code class="php">public function update(Request $request, $id) {
        // On recherche avec l'id
        $movie= Movie::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$movie) {
            return response(null, 404);
        }

        // Extraction des valeurs passées de la body de la requête
        $title = $request-&gt;input('title');

        $movie-&gt;title = $title;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($movie-&gt;save()) {
            return response()-&gt;json($movie);
        } else {
            return response(null, 500);
        }
}
</code></pre>
&nbsp;
<h2>Delete</h2>
La dernière, en HTTP DELETE :)
<pre><code class="php">Route::delete('/movies/{id}', [MovieController::class, 'delete']);
</code></pre>
<pre><code class="php">public function delete($id) {
        // On recherche avec l'id
        $movie= Movie::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$movie) {
            return response(null, 404);
        }

        // On supprime puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($movie-&gt;delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
}
</code></pre>