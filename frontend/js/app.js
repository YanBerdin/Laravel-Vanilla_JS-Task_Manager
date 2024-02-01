const apiConfiguration = {
  endpoint: "http://127.0.0.1:8000/api", // adresse HTTP de l'API REST
  // on pourrait avoir besoin d'autres valeurs de config, du coup, on crée un objet qui les condiendra toutes
};

async function initApp() {
  console.log("démarrage...initApp()");
  // debugger;
  console.log("Yo app.js");

  // ajout écouteur d'événement sur le bouton ajouter nouvelle tâche
  const createTaskBtn = document.querySelector(".create-task-container button");
  createTaskBtn.addEventListener("click", displayCreateForm);

  // ajout écouteur d'événement submit sur le formulaire d'ajout
  const newTaskForm = document.querySelector(".modal-dialog form");
  newTaskForm.addEventListener("submit", handleTaskFormSubmit);

  //TODO Ecoute du clic sur le bouton de fermeture de la modal
  // let closeModalButtonElement = document.querySelector(
  //   ".modal-dialog-close-button"
  // );
  // closeModalButtonElement.addEventListener(
  //   "click",
  //   taskAdd.handleClickCloseModal
  // );

  // affiche la liste des tâches
  await displayTasks();
  // debugger;

  // remplit le select du formulaire avec les options
  await fillCategoryOption();
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

  //* Dans le cas où on "modifie" une tâche, l'input type hidden aura bien une valeur !

  // permettra de stocker le bon élément à afficher
  let messageElt = null;

  if (taskId === "") {
    // Appel de l'API pour créer une nouvelle tâche
    // en argument : un objet qui a pour valeur de prop title le contenu de la constante TaskTitle
    const result = await createTaskFromApi({
      title: taskTitle,
      category_id: taskCategory,
    });
    console.log(result);
    if (result === false) {
      messageElt = document.querySelector(".message.danger");
    } else {
      messageElt = document.querySelector(".message.create");
    }
    messageElt.removeAttribute("hidden");

    //* Ajouter un événement de clic à l'alerte pour la fermer manuellement
    messageElt.addEventListener("click", function () {
      messageElt.setAttribute("hidden", "true");
    });

    //* Masquer l'alerte après 5 secondes
    setTimeout(function () {
      messageElt.setAttribute("hidden", "true");
    }, 50000); // Rappel: 1000ms => 1 sec
  } else {
    //? Appel de l'API pour mettre à jour la tâche dont on a récupéré l'id dans l'input type hidden
    //? en argument :
    //?   l'id de la tâche à modifier
    //?   un objet qui a pour valeur de prop title le contenu de la constante TaskTitle
    const result = await updateTaskFromApi(taskId, {
      title: taskTitle,
      category_id: taskCategory,
    });

    if (result === false) {
      messageElt = document.querySelector(".message.danger");
    } else {
      messageElt = document.querySelector(".message.update");
      console.log("appel handleTaskFormSubmit");
      console.log(" Mise à jour Effectuée");
    }
    messageElt.removeAttribute("hidden");

    //* Ajouter un événement de clic à l'alerte pour la fermer manuellement
    messageElt.addEventListener("click", function () {
      messageElt.setAttribute("hidden", "true");
    });

    //* Masquer l'alerte après 5 secondes
    setTimeout(function () {
      messageElt.setAttribute("hidden", "true");
    }, 50000); // Rappel: 1000ms => 1 sec
  }
  // on rafraichit notre liste de tâches
  displayTasks();

  // cacher le formulaire pour afficher la liste des taches
  hideCreateForm();

  resetTaskForm();
}

document.addEventListener("DOMContentLoaded", initApp);
