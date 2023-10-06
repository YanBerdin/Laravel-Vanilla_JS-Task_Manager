console.log("Yo taskList.js");
//TODO INFO : adresse pour navigateur => http://localhost:8080/

//? Plan d'action : 
//? - on attend que le DOM soit complètement chargé
//? - on envoie une requête à l'API REST pour récupérer la liste des tâches
//? - si la réponse est ok, alors, on convertit le json en tableau d'objets JS
//? - on boucle sur le tableau pour créer des <li>, puis les insérer dans le <ul>


/**
 * Charge la liste de toutes les Tasks depuis l'API Task
 * Va chercher la liste des tâches via l'API REST
 * @return {array} taskList
 */
async function getTasks() {
  console.log("Chargement de getTasks() pour récupérer la liste des tâches");
  //! Async => Penser à Await
  // Début de l'exercice
  // Notre but : aller chercher la liste des pays sur RestCountries

  //! API REST suis architecture REST 
  //! alors que FETCH ne fait que envoyer / recevoir les requetes
  // On précise l'url du endpoint en argument de fetch.
  // C'est fetch qui se charge de contacter l'API
  // et récupérer sa réponse dans la constante response.
  // const response = await fetch('http://mon-api.com/endpoint');
  //! On ne sait pas combien de temps l'API restcountries mettra à nous répondre :
  //! await
  const response = await fetch("http://127.0.0.1:8000/api/tasks"); // envoi d'une requête HTTP vers un autre site !
  
  //! fetch renvoie un objet qui est aussi Promess
  console.log(response);

  //! On traduit la réponse de notre API qui est au format JSON au format JavaScript
  const data = await response.json();
  // TODO console.log(data);

  // Pour le moment, on obtient un tableau d'objets avec beaucoup d'informations, trop complexe.
  //! La réponse ne contient pas que du json mais aussi des headers entre autres
  //? On veut extraire les données qui nous sont nécessaire : le titre des taches

  // On crée un tableau vide pour stocker les pays à afficher
  let tasksList = []; // (Déclaré par erreur au début avec const)

  //! Pour chaque objet du tableau récupéré depuis l'API restcountries...
  for (const taskFromAPI of data) {
    // console.log(taskFromAPI);

    //? Je crée un objet qui contient les informations nécessaires d'une seule Task,
    // => la Task courante (son id + son titre)

    const taskById = {
      id: taskFromAPI.id,
      title: taskFromAPI.title,
    };
    //console.log(taskById);

    // Puis je l'ajoute à mon grand tableau
    tasksList.push(taskById);
  }
  // TODO  console.log(tasksList);
  console.log("getTasks() -> liste des taches récupérée");
  return tasksList;
}

//! PAS BESOIN !! de : event.preventDefault();  => pas de formulaire !
/**
 * Fonction appelée lors de la soumission du formulaire
 */
// async function handleLoadTasks(event) {
//     console.log("Chargement de handleLoadTasks(event)");
// On empêche la page de se recharger

//? On veut une fonction qui nous créer le DOM pour afficher UNE tâche !
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
 * @param {object} Data
 *//! Methode qui affiche les données sur le DOM 
function insertTaskInDom(data) { //! et ne return rien

  // Créer un <li>
  const liElement = document.createElement("li");

  // Recuperer et Inserer l'id de la Task dans le <li>
  liElement.dataset.id = data.id;

  // Créer un <p>
  const pElement = document.createElement("p");

  // Recuperer et Inserer le titre de la Task dans <p>
  pElement.textContent = data.title;

  // Inserer le <p> dans le <li>
  liElement.append(pElement);

  // Créer une <div class="delete"></div>
  const divDeleteElement = document.createElement("div");
  // Inserer la classe 'delete'
  divDeleteElement.classList.add("delete");
  //console.log(divDeleteElement);

//!  je place l'écouteur d'événement click (Atelier E05)
divDeleteElement.addEventListener('click', handleDeleteTask);


  // Inserer la div dans le <li>
  liElement.append(divDeleteElement);

  // Créer <div class="edit"></div>
  const divEditElement = document.createElement("div");
  divEditElement.classList.add("edit");

  // Inserer la div dans le <li>
  liElement.append(divEditElement);

  // On récupere le ul
  // nomDeLaVariableContenantUnElément.closest(.classeDuParentRecherché )
  //   const cardElement = clickedElement.closest('.card');
  //  const ulElement = pElement.closest(".tasklist");

  // Selectionner le container <ul>
  const ulElement = document.querySelector(".tasklist");
  // Inserer le <li> dans le container <ul>
  ulElement.append(liElement);

  console.log("log de -> insertTaskInDom(data)");
  console.log(data);
  console.log("log de -> insertTaskInDom(data)");
  console.log(pElement);
}

/**
 * ! Coordonne les 2 fonctions de récupération et d'insertion dans le Dom
 * supprime tout le DOM dans le <ul>
 * exécute getAllTasksFromApi()
 * boucle sur le résultat de la fonction getAllTasksFromApi()
 * à l'intérieur de la boucle, exécute insertTaskInDOM(taskData)
 */
async function displayTasks() {
  // Selectionner le container <ul>
  const ulElement = document.querySelector(".tasklist");
  // on supprime tout ce qu'il y a dans le <ul>
  ulElement.textContent = "";

  // appeler la fonction qui va chercher les taches
  // on va chercher la liste des tâches actuellement enregistrées en BDD
  // On récupère la liste des Tasks au format JSON
  const data = await getTasks(); //! <=  Mise en 'async' de la requete pour que le reste continue de s'executer

  // faire une boucle sur le résultat, pour créer le DOM correspondant
  // for (const iterator of object)
  for (const task of data) {
    insertTaskInDom(task);
  }
}

//! Methode qui affiche les données sur le DOM
//? async function removeTaskFromDom() {
//?     addEvents:  function() {
        // on sélectionne les boutons delete
//?     const deleteButtons = document.querySelectorAll("delete");
//? console.log(deleteButtons);
        // lorsqu'on click sur le bouton delete
        // on lance la méthode handleClickDeleteButton
//?     deleteButtons.addEventListener('click', slider.handleClickDeleteButton);
//? }
//? }