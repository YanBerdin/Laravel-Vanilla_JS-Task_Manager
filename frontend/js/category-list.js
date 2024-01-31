console.log("Yo category-List.js");
//TODO INFO : adresse pour navigateur => http://localhost:8080/

//? Plan d'action :
// - on attend que le DOM soit complètement chargé
// - on envoie une requête à l'API REST pour récupérer la liste des tâches
// - si la réponse est ok, alors, on convertit le json en tableau d'objets JS

/**
 * Charge la liste de toutes les Tasks depuis l'API Task
 * Va chercher la liste des tâches via l'API REST
 * @return {array} taskList
 */
async function getCategories() {
  console.log(
    "Chargement de getCategories() pour récupérer la liste des Categories"
  );
  //! Async => Penser à Await
  // Début de l'exercice
  // Notre but : aller chercher la liste des categories sur RestCountries
  //! API REST suis architecture REST alors que FETCH ne fait que envoyer / recevoir les requetes
  // On précise l'url du endpoint en argument de fetch.
  // C'est fetch qui se charge de contacter l'API
  //et récupérer sa réponse dans la constante response.
  // const response = await fetch('http://mon-api.com/endpoint');
  // const response = await fetch("http://127.0.0.1:8000/api/categories"); // envoi d'une requête HTTP vers un autre site !
  const response = await fetch(apiConfiguration.endpoint + "/categories");

  //! On ne sait pas combien de temps l'API restcountries mettra à nous répondre : await
  // fetch renvoie un objet qui est aussi Promess
  console.log(response);

  // On traduit la réponse de notre API qui est au format JSON au format JavaScript
  //* const data = await response.json();
  // console.log(data);

  // Pour le moment, on obtient un tableau d'objets avec beaucoup d'informations, trop complexe.
  // On veut extraire les données qui nous sont nécessaires : le titre des taches

  // On crée un tableau vide pour stocker les pays à afficher
  let categoriesList = []; // (Déclaré par erreur au début avec const)

  //TODO
  //! Pour chaque objet du tableau récupéré depuis l'API restcountries...
  //* for (const categoryFromAPI of data) {
  // console.log(taskFromAPI);

  // Je crée un objet qui contient les informations nécessaires d'une seule Task,
  // => la Task courante (son id + son titre)

  //* const categoryById = {
  //*   id: categoryFromAPI.id,
  //*   title: categoryFromAPI.title,
  //* };
  //console.log(taskById);

  // Puis je l'ajoute à mon grand tableau
  //* categoriesList.push(categoryById);
  //* }

  if (result.status === 200) {
    // On traduit la réponse de notre API qui est au format JSON au format JavaScript
    categoriesList = await result.json();
  }

  console.log("getTasks() -> liste des taches récupérée"); //FIXME:
  return categoriesList;
}
// console.log(categoriesList);

//? PAS BESOIN de : event.preventDefault();  => pas de formulaire !

// faire une boucle sur le résultat
//! for (const iterator of object)
// for (const category of data) {
// insertCategoryInDom(category);

async function fillCategoryOption() {
  const selectElt = document.querySelector(
    '.modal-dialog select[name="category_id"]'
  );
  const categoryList = await getAllCategoriesFromApi();
  categoryList.forEach(function (category) {
    const optionElt = document.createElement("option");
    optionElt.value = category.id;
    optionElt.textContent = category.name;
    selectElt.append(optionElt);
  });
}
