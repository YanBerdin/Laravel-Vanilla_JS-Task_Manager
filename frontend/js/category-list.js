console.log("Yo category-List.js");

//? Plan d'action :
// - Attendre que le DOM soit complètement chargé
// - Envoyer une requête à l'API REST pour récupérer la liste des tâches
// - si la réponse est ok, alors, on convertit le json en tableau d'objets JS

/**
 * Charge la liste de toutes les Tasks depuis l'API REST
 *
 * @return {array} taskList
 */
async function getCategories() {
  console.log(
    "Chargement de getCategories() pour récupérer la liste des Categories"
  );
  //! Async => Penser à Await
  // Début de l'exercice
  // Notre but : aller chercher la liste des categories sur RestCountries
  //! API REST suis architecture REST
  //! FETCH ne fait que envoyer / recevoir les requetes
  // On précise l'url du endpoint en argument de fetch.
  // C'est fetch qui se charge de contacter l'API
  // et récupérer sa réponse dans la constante response.
  // const response = await fetch('http://mon-api.com/endpoint');
  // const response = await fetch("http://127.0.0.1:8000/api/categories");
  const response = await fetch(apiConfiguration.endpoint + "/categories");
  //! fetch renvoie un objet qui est aussi Promess
  console.log(response);

  // Pour le moment, on obtient un tableau d'objets avec beaucoup d'informations, trop complexe.
  // On veut extraire les données qui nous sont nécessaires : le titre des taches

  // On crée un tableau vide pour stocker les pays à afficher
  let categoriesList = []; // (Déclaré par erreur au début avec const)

  if (response.status === 200) {
    //Réponse de l'API au format JSON
    categoriesList = await response.json();
  }
  console.log(categoriesList);
  console.log("getTasks() -> liste des taches récupérée");
  return categoriesList;
}

async function fillCategoryOption() {
  const selectElt = document.querySelector(
    '.modal-dialog select[name="category_id"]'
  );
  // Récupère la liste des catégories
  const categoryList = await getCategories();

  // Créer l'option de titre
  const titleOptionElt = document.createElement("option");
  titleOptionElt.value = "";
  titleOptionElt.textContent = "Choisissez une catégorie";
  selectElt.append(titleOptionElt);

  // Créer les options pour chaque catégorie
  categoryList.forEach(function (category) {
    const optionElt = document.createElement("option");
    optionElt.value = category.id;
    optionElt.textContent = category.name;
    selectElt.append(optionElt);
  });
}
