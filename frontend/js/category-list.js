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
    console.log("Chargement de getCategories() pour récupérer la liste des Categories");
    //! Async => Penser à Await
    // Début de l'exercice
    // Notre but : aller chercher la liste des categories sur RestCountries
  //! API REST suis architecture REST alors que FETCH ne fait que envoyer / recevoir les requetes
  // On précise l'url du endpoint en argument de fetch.
  // C'est fetch qui se charge de contacter l'API
  //et récupérer sa réponse dans la constante response.
  // const response = await fetch('http://mon-api.com/endpoint');
  const response = await fetch("http://127.0.0.1:8000/api/categories"); // envoi d'une requête HTTP vers un autre site !
  //! On ne sait pas combien de temps l'API restcountries mettra à nous répondre : await
  // fetch renvoie un objet qui est aussi Promess
  console.log(response);

  // On traduit la réponse de notre API qui est au format JSON au format JavaScript
  const data = await response.json();
  // TODO console.log(data);

  // Pour le moment, on obtient un tableau d'objets avec beaucoup d'informations, trop complexe.
  // TODO On veut extraire les données qui nous sont nécessaires : le titre des taches

  // On crée un tableau vide pour stocker les pays à afficher
  let categoriesList = []; // (Déclaré par erreur au début avec const)

  //! Pour chaque objet du tableau récupéré depuis l'API restcountries...
  for (const categoryFromAPI of data) {
    // console.log(taskFromAPI);

    // Je crée un objet qui contient les informations nécessaires d'une seule Task,
    // => la Task courante (son id + son titre)

    const categoryById = {
      id: categoryFromAPI.id,
      title: categoryFromAPI.title,
    };
    //console.log(taskById);

    // Puis je l'ajoute à mon grand tableau
    categoriesList.push(categoryById);
  }

  console.log("getTasks() -> liste des taches récupérée");
  return tasksList;
}
 // console.log(categoriesList);

 //? PAS BESOIN de : event.preventDefault();  => pas de formulaire !

//TODO On veut une fonction qui nous créer le DOM pour afficher UNE tâche !
/*
    <ul class="tasklist">
      <li data-id="0">
        <p>sortir les poubelles</p>
        <div class="delete"></div>
        <div class="edit"></div>
      </li>
      </ul>
*/
/**
 * insère un nouvel élément dans le DOM en y insérant les données stockées dans taskData
 * @param {object} taskData
 */ //! Methode qui affiche les données sur le DOM
function insertCategoryInDom(taskData) {
    
  
    // Créer un <em>
    const emElement = document.createElement("em");
  
    // Recuperer et Inserer le nom category dans le <em>
    emElement.dataset.name = data.name;
  
    // Créer un <p>
   //TODO const pElement = document.createElement("p");
  
    // Recuperer et Inserer le titre de la Task dans <p>
  //TODO  pElement.textContent = data.title;
  
    // Inserer le <p> dans le <li>
   //TODO liElement.append(pElement);
  
//     // Créer une <div class="delete"></div>
//     const divDeleteElement = document.createElement("div");
//     // Inserer la classe 'delete'
//     divDeleteElement.classList.add("delete");
//     //console.log(divDeleteElement);
//   // TODO  je place l'écouteur d'événement click (Atelier E05)
//   divDeleteElement.addEventListener('click', handleDeleteTask);
  
  
//     // Inserer la div dans le <li>
//     liElement.append(divDeleteElement);
  
//     // Créer <div class="edit"></div>
//     const divEditElement = document.createElement("div");
//     divEditElement.classList.add("edit");
  
//     // Inserer la div dans le <li>
//     liElement.append(divEditElement);
  
//     // On récupere le ul
//     // nomDeLaVariableContenantUnElément.closest(.classeDuParentRecherché )
//     //   const cardElement = clickedElement.closest('.card');
//     //  const ulElement = pElement.closest(".tasklist");
  
       // Selectionner le container <ul>
//     const ulElement = document.querySelector(".tasklist");
//     // Inserer le <li> dans le container <ul>
//     ulElement.append(liElement);
  
//     console.log("log de -> insertTaskInDom(data)");
//     console.log(data);
//     console.log("log de -> insertTaskInDom(data)");
//     console.log(pElement);
//   }
  
//   /**
//    * supprime tout le DOM dans le <ul>
//    * exécute getAllCategoriessFromApi()
//    * boucle sur le résultat de la fonction getAllTasksFromApi()
//    * à l'intérieur de la boucle, exécute insertTaskInDOM(taskData)
//    */
  async function displayCategories() {
    // Selectionner le container <ul>
    const ulElement = document.querySelector(".categorieslist");
    // on supprime tout ce qu'il y a dans le <ul>
    ulElement.textContent = "";
  
    // appeler la fonction qui va chercher les categories
    // on va chercher la liste des categories actuellement enregistrées en BDD
    // On récupère la liste des categories au format JSON
    const data = await getCategories(); //! <=  Mise en 'async' de la requete pour que le reste continue de s'executer
  
    // faire une boucle sur le résultat, pour créer le DOM correspondant
    //! for (const iterator of object)
    for (const category of data) {
      insertCategoryInDom(category);
    }
  }
}