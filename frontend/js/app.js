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

  // affiche la liste des tâches
  await displayTasks();
  // debugger;
  
  // remplit le select du formulaire avec les options
  await fillCategoryOption();
}

document.addEventListener("DOMContentLoaded", initApp);
