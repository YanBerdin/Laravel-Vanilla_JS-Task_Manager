console.log("Yo app.js");

//TODO adresse pour navigateur => http://localhost:8080/

/**
 * Charge la liste de toutes les Tasks depuis l'API Task
 * @return {array} taskList
 */
async function getTasks() {
  console.log("Chargement de la liste des tâches");
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
    console.log(taskFromAPI);

    // Je crée un objet qui contient les informations nécessaires d'une seule Task,
    // => la Task courante

    const title = {
      title: taskFromAPI,
    };
    // Puis je l'ajoute à mon grand tableau
    tasksList.push(title);
  }
  // TODO  console.log(tasksList);

  return tasksList;
}

/**
 * Fonction appelée lors de la soumission du formulaire
 */
async function handleLoadTasks(event) {
  // On empêche la page de se recharger
  event.preventDefault(); // on empêche le formulaire de se soumettre

  // On vide la liste des Tasks sur la page
  // document.querySelector(".tasklist li > p").textContent = "";

  // On récupère la liste des Tasks au format JSON
  const tasks = await getTasks(); //! <=  Mise en 'async' de la requete pour que le reste continue de s'executer

  // On boucle sur la liste des pays pour les insérer dans la page
  for (const task of tasks) {
    insertTaskInDom(task);
    console.log(tasks);
  }
}

/**
 * Insérer une task dans la page 
 * 
 * @param {Object} task
 */
function insertTaskInDom(task) {
  //!  <=  <= Methode qui affiche les données sur le DOM
  // On crée un <p>
  const titleElement = document.createElement("p");
  console.log(titleElement);

  // On écrit le nom du pays dans ce <span>
  titleElement.textContent = task.title;

  console.log(titleElement);

  // On insère le <p> dans le <li>
  //  taskElement.append(titleElement);

  //  const taskElement = document.createElement(".tasklist li");

  // console.log(task);

  // On insère le titre dans le <p>
  //   taskElement.append(titleElement);
}

getTasks();
insertTaskInDom();
