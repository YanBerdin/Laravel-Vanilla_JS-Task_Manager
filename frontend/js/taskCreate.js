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
  const createTaskContElement = document.querySelector(
    ".create-task-container"
  );

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
  const createTaskContElement = document.querySelector(
    ".create-task-container"
  );

  // on lui ajoute un attribut hidden
  createTaskContElement.removeAttribute("hidden");
}

/**
 * handler pour soumettre nouvelle tâche à l'API et l'insérer en BDD
 */
async function handleTaskFormSubmit(event) {
  // blocage du comportement par défaut du formulaire
  event.preventDefault();

  // On récupère le formulaire qui vient d'être soumis
  const formElement = event.currentTarget;

  // On crée un nouvel objet FormData à partir de ce formulaire
  const formData = new FormData(formElement);

  // je récupère le titre :
  const taskTitle = formData.get("title");

  // je récupère sa catégorie :
  const taskCategory = formData.get("category_id");
  // je récupère l'id :
  const taskId = formData.get("id");

  //! Dans le cas où on "modifie" une tâche, l'input type hidden aura bien une valeur !

  // permettra de stocker le bon élément à afficher
  let messageElt = null;

  if (taskId === "") {
    // Appel de l'API pour créer une nouvelle tâche
    // en argument : un objet qui a pour valeur de prop title le contenu de la constante TaskTitle
    const result = await createTaskFromApi({
      title: taskTitle,
      category_id: taskCategory,
    });

    if (!result) {
      messageElt = document.querySelector(".message.danger");
    } else {
      messageElt = document.querySelector(".message.create");
    }
    messageElt.removeAttribute("hidden");
  } else {
    //? Appel de l'API pour mettre à jour la tâche dont on a récupéré l'id dans l'input type hidden
    //? en argument :
    //?   l'id de la tâche à modifier
    //?   un objet qui a pour valeur de prop title le contenu de la constante TaskTitle

    //* Appel à l'API pour créer une nouvelle tâche
    // en argument :
    // un objet qui a pour valeur de propriété 'title' le contenu de la constante taskTitle
    const task = await createTaskFromApi({
      title: taskTitle,
      category_id: taskCategory,
    });

    if (!result) {
      messageElt = document.querySelector(".message.danger");
    } else {
      messageElt = document.querySelector(".message.update");
    }
    messageElt.removeAttribute("hidden");
  }

  // on rafraichit notre liste de tâches
  displayTasks();

  // cacher le formulaire pour afficher la liste des taches
  hideCreateForm();

  //FIXME: console.log(" appel handleTaskFormSubmit");
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
