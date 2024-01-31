console.log("Yo taskUpdate.js");
/**
 * Fonction appelée lors du click sur le bouton.
 * Pour modifier une tache, on va utiliser le même formulaire que pour la création d'une tâche
 *
 * @param {Event} event
 */
function handleEditTask(event) {
  // console.log("chargement handleEditTask"); //FIXME:

  // on veut récupérer l'élément qui vient d'être cliqué
  const editButton = event.target;
  const taskElement = editButton.closest("li");
  console.log(taskElement);

  const id = taskElement.dataset.id;
  const title = taskElement.querySelector("p").textContent;
  const category_id = taskElement.querySelector("em").dataset.id;

  // récupère les champs du formulaire, et on les remplit avec les données extraites ci-dessus
  const dialogElement = document.querySelector(".modal-dialog");
  const taskIdField = dialogElement.querySelector('input[name="id"]');
  taskIdField.value = id;
  const taskTitleField = dialogElement.querySelector('input[name="title"]');
  taskTitleField.value = title;
  const categoryIdSelect = dialogElement.querySelector(
    'select[name="category_id"]'
  );
  categoryIdSelect.value = category_id;

  // puis on affiche le formulaire
  displayCreateForm();
}

/**
 * Envoie une requête à l'API pour modifier une tâche.
 *
 * @param {FormData} data
 */
async function updateTaskFromApi(id, data) {
  const result = await fetch(apiConfiguration.endpoint + "/tasks/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (result.ok) {
    const task = result.json(); // transforme le retour de l'api en un objet JSON
    return task;
  } else {
    return false;
  }
}
