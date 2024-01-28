<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
    // return ('welcome sur mon API en Laravel');
});
/*
|--------------------------------------------------------------------------
|//? Une route, c'est quoi ?
|--------------------------------------------------------------------------
*/
// - un chemin
// - (optionnel) un nom unique
// - un verbe HTTP (GET, POST, PUT, DELETE...)
// - un truc à afficher via par exemple : une méthode de controleur
//     Ou ci dessous : un callback sous forme de fonction anonyme
Route::get('/test', function () {      //    <=    <=   <=  FONCTION ANONYME = CALL BACK
    return 'Bienvenue sur mon API de test !';
});
