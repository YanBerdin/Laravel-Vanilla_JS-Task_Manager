console.log("Yo taskList.js");

// INFO : adresse pour navigateur => http://localhost:8080/

//? Plan d'action :
//? - on attend que le DOM soit complètement chargé
//? - on envoie une requête à l'API REST pour récupérer la liste des tâches
//? - si la réponse est ok, alors, on convertit le json en tableau d'objets JS
//? - on boucle sur le tableau pour créer des <li>, puis les insérer dans le <ul>

/**
 * Charge la liste de toutes les Tasks depuis l'API Task (API REST)
 * @return {array} taskList
 */
async function getTasks() {
  console.log("Chargement de getTasks() pour récupérer la liste des tâches");
  //! Async => Penser à Await
  // Début de l'exercice
  // Notre but : aller chercher la liste des pays sur RestCountries

  //? API REST suis architecture REST
  //? alors que FETCH ne fait que envoyer / recevoir les requetes
  // On précise l'url du endpoint en argument de fetch.
  // C'est fetch qui se charge de contacter l'API
  // et récupérer sa réponse dans la constante response.
  // const response = await fetch('http://mon-api.com/endpoint');
  //? On ne sait pas combien de temps l'API restcountries mettra à nous répondre :
  //? On await

  //* 1) envoi d'une requête HTTP vers Endpoint (un autre site) !
  // const response = await fetch("http://127.0.0.1:8000/api/tasks");
  const response = await fetch(apiConfiguration.endpoint + "/tasks");
  //! fetch renvoie un objet qui est aussi Promess
  console.log(response);

  // Pour le moment, on obtient un tableau d'objets avec beaucoup d'informations, trop complexe.
  //? La réponse ne contient pas que du json mais aussi des headers entre autres
  //? On veut extraire les données qui nous sont nécessaire : le titre des taches

  // On crée un tableau vide pour stocker les pays à afficher
  // Ajouté suite à ma question pourquoi pas comme countries [] ?
  let tasksList = []; // (Déclaré par erreur au début avec const)
  //* 2) On récupère la réponse qui ne contient pas QUE du json
  if (response.status === 200) {
    //* 3) n’en extraire que le json
    tasksList = await response.json();
  }
  return tasksList;
}

// On veut une fonction qui nous créer le DOM pour afficher UNE tâche !
/*
    <ul class="tasklist">
      <li data-id="0">
        <p>sortir les poubelles</p>  // exemple de tache à récupérer
        <div class="delete"></div>
        <div class="edit"></div>
      </li>
      </ul>
*/

/**
 * insère un nouvel élément dans le DOM en y insérant les données stockées dans taskData
 * @param {object} taskData
 * Methode qui affiche les données sur le DOM
 */ //* et ne return rien
function insertTaskInDom(taskData) {
  console.log(taskData);
  // ligne correspondant à 1ere ligne exemple
  // <li data-id="0">

  // Créer un <li>
  const taskElement = document.createElement("li");

  // Recuperer et Inserer l'id de la Task dans le <li>
  taskElement.dataset.id = taskData.id;

  //* <p>sortir les poubelles</p>
  // Créer un <p>
  const titleElement = document.createElement("p");

  // Recuperer et Inserer le titre de la Task dans <p>
  titleElement.textContent = taskData.title;

  // Inserer le <p> dans le <li>
  taskElement.append(titleElement);

  //? E07 : Ajout de la catégorie
  // Créer l’élément => <em>catégorie</em>

  // Si la Tâche a une catégorie
  if (taskData.category) {
    let categoryElt = document.createElement("em");

    // Insérer le nom de la catégorie
    categoryElt.textContent = taskData.category.name;

    // Insérer la clé étrangère de l'id de la catégorie
    categoryElt.dataset.id = taskData.category_id;
    // Insérer l’élément dans la tâche
    FIXME: taskElement.append(categoryElt);
  }
  //* Si la Tâche n’a pas de catégorie
  //*else {
  //*  categoryElt.textContent = "Non catégorisée";
 //* }

  //? Création du bouton delete + le stocker
  // Créer => <div class="delete"></div>
  const deleteElement = document.createElement("div");

  // Ajouter la classe 'delete' à cette <div>
  deleteElement.classList.add("delete");

  //* Ajout bouton delete à l’élément tâche
  // Insérer la <div> dans le <li>
  taskElement.append(deleteElement);

  // je place l'écouteur d'événement click sur le bouton 🗑 S07E06
  deleteElement.addEventListener("click", handleDeleteTask);

  //TODO Création du bouton edit + le stocker
  // Créer <div class="edit"></div>
  const editElement = document.createElement("div");

  // lui ajouter la classe "edit"
  editElement.classList.add("edit");

  // Inserer la div "edit" dans le <li>
  taskElement.append(editElement);

  // je place l'écouteur d'événement click
  editElement.addEventListener("click", handleEditTask);

  // Selectionner le container <ul>
  const taskListElement = document.querySelector(".tasklist");

  // Inserer le <li> dans la liste (le container <ul>)
  taskListElement.append(taskElement);

  //* Version de PierreOclock avec closest() qui récupère parent ciblé le + proche
  // On récupere le ul
  // nomDeLaVariableContenantUnElément.closest(.classeDuParentRecherché )
  //  const cardElement = clickedElement.closest('.card');
  //  const ulElement = pElement.closest(".tasklist");
}

/**
 * ! Coordonne les 2 fonctions de récupération et d'insertion dans le Dom
 ** supprime tout le DOM dans le <ul>
 * exécute getAllTasksFromApi()
 * boucle sur le résultat de la fonction getAllTasksFromApi()
 * à l'intérieur de la boucle, exécute insertTaskInDOM(taskData)
 */
async function displayTasks() {
  // Ne return rien

  // Selectionner le container <ul>
  const ulElement = document.querySelector(".tasklist");
  // on supprime tout ce qu'il y a dans le <ul>
  ulElement.textContent = "";

  // appeler la fonction qui va chercher les taches
  // on va chercher la liste des tâches actuellement enregistrées en BDD
  // On récupère la liste des Tasks au format JSON
   //! Mise en 'async' de la requete pour que le reste continue de s'executer
  const data = await getTasks();

  // faire une boucle sur le résultat, pour créer le DOM correspondant
  // for (const iterator of object)
  for (const task of data) {
    insertTaskInDom(task);
  }
}
