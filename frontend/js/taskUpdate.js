console.log("Yo taskUpdate.js");

/**
 * Fonction appelée lors du click sur le bouton.
 * Pour modifier une tache, on utilise le même formulaire que pour la création d'une tâche
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

  const taskElement = event.currentTarget.closest("li");
  console.log(taskElement);

  // Récupérer l'id de la tâche
  const id = taskElement.dataset.id;

  // Récupérer son titre
  const title = taskElement.querySelector("p").textContent;

  // Récupérer l'id de sa catégorie (clé étrangère)
  const category_id = taskElement.querySelector("em").dataset.id;
  console.log(category_id);

  // Récupère les champs du formulaire,
  // et les remplir avec les données extraites ci-dessus

  // Récupère le formulaire
  const dialogElement = document.querySelector(".modal-dialog");
  console.log(dialogElement);

  // Récupère l'id de la tâche
  const taskIdField = dialogElement.querySelector('input[name="id"]');
  //console.log(taskIdField);
  taskIdField.value = id;
  //console.log(id);

  // Récupère le titre de la tâche
  const taskTitleField = dialogElement.querySelector('input[name="title"]');
  taskTitleField.value = title;
  console.log(title);

  // Récupère sa catégorie
  const categoryIdSelect = dialogElement.querySelector(
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
 * @param {string} id - L'identifiant de la tâche à mettre à jour.
 * @param {object} data - Les données de la tâche à mettre à jour.
 * @returns {object|boolean} - L'objet tâche mis à jour ou false en cas d'échec.
 */
async function updateTaskFromApi(id, data) {
  try {
    const result = await fetch(apiConfiguration.endpoint + "/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.ok) {
      // Attendre la résolution de la Promise
      const task = await result.json();
      // Retour de l'api = objet JSON
      return task;
    } else {
      console.error("Échec lors de la mise à jour de la tâche.");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    return false;
  }
}
