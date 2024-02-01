console.log("Yo taskUpdate.js");

/**
 * Fonction appelée lors du click sur le bouton.
 * Pour modifier une tache, on va utiliser le même formulaire que pour la création d'une tâche
 *
 * @param {Event} event
 */
function handleEditTask(event) {
  console.log("chargement handleEditTask");

  // on veut récupérer l'élément qui vient d'être cliqué (<div class="edit">)
  // let editButton = event.target;
  // console.log(editButton);

  // Récupérer le <li> qui contient la tache clickée
  // let taskElement = editButton.closest("li");
  // console.log(taskElement);

  let taskElement = event.currentTarget.closest("li");
  console.log(taskElement);

  // Récupérer l'id de la tâche
  let id = taskElement.dataset.id;

  // Récupérer son titre
  let title = taskElement.querySelector("p").textContent;

  // Récupérer l'id de sa catégorie (clé étrangère)
  let category_id = taskElement.querySelector("em").dataset.id;
  console.log(category_id);

  // Récupère les champs du formulaire,
  // et les remplir avec les données extraites ci-dessus

  // Récupère le formulaire
  let dialogElement = document.querySelector(".modal-dialog");
  console.log(dialogElement);

  // Récupère l'id de la tâche
  let taskIdField = dialogElement.querySelector('input[name="id"]');
  //console.log(taskIdField);
  taskIdField.value = id;
  //console.log(id);

  // Récupère le titre de la tâche
  let taskTitleField = dialogElement.querySelector('input[name="title"]');
  taskTitleField.value = title;
  console.log(title);

  // Récupère sa catégorie
  let categoryIdSelect = dialogElement.querySelector(
    'select[name="category_id"]'
  );
  categoryIdSelect.value = category_id;
  console.log(category_id);

  // puis on affiche le formulaire
  displayCreateForm();
}

/**
 * Envoie une requête à l'API pour modifier une tâche.
 *
 * @param {FormData} data
 */
async function updateTaskFromApi(id, data) {
  let result = await fetch(apiConfiguration.endpoint + "/tasks/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (result.ok) {
    let task = result.json(); // transforme le retour de l'api en un objet JSON
    return task;
  } else {
    return false;
  }
}
