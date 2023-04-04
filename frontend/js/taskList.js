console.log("Yo taskList.js");
//TODO INFO : adresse pour navigateur => http://localhost:8080/

/**
 * Charge la liste de toutes les Tasks depuis l'API Task
 * @return {array} taskList
 */
async function getTasks() {
  console.log("Chargement de getTasks() pour récupérer la liste des tâches");
  //! Async => Penser à Await
  // Début de l'exercice
  // Notre but : aller chercher la liste des pays sur RestCountries
  //! API REST suis architecture REST alors que FETCH ne fait que envoyer / recevoir les requetes
  // On précise l'url du endpoint en argument de fetch.
  // C'est fetch qui se charge de contacter l'API
  //et récupérer sa réponse dans la constante response.
  // const response = await fetch('http://mon-api.com/endpoint');
  const response = await fetch("http://127.0.0.1:8000/api/tasks"); // envoi d'une requête HTTP vers un autre site !
  //! On ne sait pas combien de temps l'API restcountries mettra à nous répondre : await
  // fetch renvoie un objet qui est aussi Promess
  console.log(response);

  // On traduit la réponse de notre API qui est au format JSON au format JavaScript
  const data = await response.json();
  // TODO console.log(data);

  // Pour le moment, on obtient un tableau d'objets avec beaucoup d'informations, trop complexe.
  // TODO On veut extraire les données qui nous sont nécessaire : le titre des taches

  // On crée un tableau vide pour stocker les pays à afficher
  const tasksList = [];

  //! Pour chaque objet du tableau récupéré depuis l'API restcountries...
  for (const taskFromAPI of data) {
    // console.log(taskFromAPI);

    // Je crée un objet qui contient les informations nécessaires d'une seule Task,
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

// TODO On veut une fonction qui nous créer le DOM pour afficher UNE tâche !
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
 */
function insertTaskInDom(data) {
  //!  <=  <= Methode qui affiche les données sur le DOM

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
