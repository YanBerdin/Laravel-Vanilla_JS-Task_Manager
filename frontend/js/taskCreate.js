console.log("Yo taskCreate.js");

/**
 * affiche l'interface pour créer une nouvelle tâche
 */
function displayCreateForm() {
  //* Formulaire
  //on sélectionne la div qui contient le formulaire
  let dialogElement = document.querySelector(".modal-dialog");

  // on lui ajoute la classe CSS show
  dialogElement.classList.add("show");

  //* Liste des tâches
  //on sélectionne le ul qui contient la liste des tâches
  let taskListElement = document.querySelector(".tasklist");

  // on lui ajoute un attribut hidden
  taskListElement.setAttribute("hidden", "true");

  //* Entête
  // on sélectionne le header
  let headerElement = document.querySelector("header");

  // on lui ajoute la classe CSS muted
  headerElement.classList.add("muted");

  //* Bouton ajout nouvelle tâche
  // on sélectionne la div qui contient le bouton d'affichage du formulaire
  let createTaskContElement = document.querySelector(".create-task-container");

  // on lui ajoute un attribut hidden
  createTaskContElement.setAttribute("hidden", "true");

  //* Messages d'echec //FIXME:
  let messageDgrElt = document.querySelector(".message.danger");
  // on lui ajoute un attribut hidden
  messageDgrElt.setAttribute("hidden", "true");
  //* Message de réussite //FIXME:
  let messageScsElt = document.querySelector(".message.success");
  // on lui ajoute un attribut hidden
  messageScsElt.setAttribute("hidden", "true");
}

/**
 * cache l'interface pour créer une nouvelle tâche
 */
function hideCreateForm() {
  //* Formulaire
  //on sélectionne la div qui contient le formulaire
  let dialogElement = document.querySelector(".modal-dialog");

  // on lui ajoute la classe CSS show
  dialogElement.classList.remove("show");

  //* Liste des tâches
  //on sélectionne le ul qui contient la liste des tâches
  let taskListElement = document.querySelector(".tasklist");

  // on lui ajoute un attribut hidden
  taskListElement.removeAttribute("hidden");

  //* Entête
  // on sélectionne le header
  let headerElement = document.querySelector("header");

  // on lui supprime la classe CSS muted
  headerElement.classList.remove("muted");

  //* Bouton ajout nouvelle tâche
  // on sélectionne la div qui contient le bouton d'affichage du formulaire
  let createTaskContElement = document.querySelector(".create-task-container");

  // on lui ajoute un attribut hidden
  createTaskContElement.removeAttribute("hidden");
}

/**
 * Inserer une nouvelle tâche en BDD
 * @param {object} data
 *
 */
async function createTaskFromApi(data) {
  let result = await fetch(apiConfiguration.endpoint + "/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.ok) {
    // transforme le retour de l'api en un objet JSON
    let task = await result.json();

    return task;
  } else {
    return false;
  }
}
