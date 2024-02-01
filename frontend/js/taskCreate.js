console.log("Yo taskCreate.js");

/**
 * affiche l'interface pour créer une nouvelle tâche
 */
function displayCreateForm() {
  //* Formulaire
  //on sélectionne la div qui contient le formulaire
  const dialogElement = document.querySelector(".modal-dialog");

  // on lui ajoute la classe CSS show
  dialogElement.classList.add("show");

  //* Liste des tâches
  //on sélectionne le ul qui contient la liste des tâches
  const taskListElement = document.querySelector(".tasklist");

  // on lui ajoute un attribut hidden
  taskListElement.setAttribute("hidden", "true");

  //* Entête
  // on sélectionne le header
  const headerElement = document.querySelector("header");

  // on lui ajoute la classe CSS muted
  headerElement.classList.add("muted");

  //* Bouton ajout nouvelle tâche
  // on sélectionne la div qui contient le bouton d'affichage du formulaire
  const createTaskContElement = document.querySelector(".create-task-container");

  // on lui ajoute un attribut hidden
  createTaskContElement.setAttribute("hidden", "true");

  //* Messages d'echec //FIXME:
  const messageDgrElt = document.querySelector(".message.danger");
  // on lui ajoute un attribut hidden
  messageDgrElt.setAttribute("hidden", "true");
  //* Message de réussite //FIXME:
  const messageScsElt = document.querySelector(".message.success");
  // on lui ajoute un attribut hidden
  messageScsElt.setAttribute("hidden", "true");
}

/**
 * cache l'interface pour créer une nouvelle tâche
 */
function hideCreateForm() {
  //* Formulaire
  //on sélectionne la div qui contient le formulaire
  const dialogElement = document.querySelector(".modal-dialog");

  // on lui ajoute la classe CSS show
  dialogElement.classList.remove("show");

  //* Liste des tâches
  //on sélectionne le ul qui contient la liste des tâches
  const taskListElement = document.querySelector(".tasklist");

  // on lui ajoute un attribut hidden
  taskListElement.removeAttribute("hidden");

  //* Entête
  // on sélectionne le header
  const headerElement = document.querySelector("header");

  // on lui supprime la classe CSS muted
  headerElement.classList.remove("muted");

  //* Bouton ajout nouvelle tâche
  // on sélectionne la div qui contient le bouton d'affichage du formulaire
  const createTaskContElement = document.querySelector(".create-task-container");

  // on lui ajoute un attribut hidden
  createTaskContElement.removeAttribute("hidden");
}

/**
 * Inserer une nouvelle tâche en BDD
 * @param {object} data
 *
 */
async function createTaskFromApi(data) {
  const result = await fetch(apiConfiguration.endpoint + "/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.ok) {
    // transforme le retour de l'api en un objet JSON
    const task = await result.json();

    return task;
  } else {
    return false;
  }
}
