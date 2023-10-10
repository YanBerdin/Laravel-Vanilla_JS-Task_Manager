/**
 * Supprime la tâche du DOM
 * Callback exécuté lorsqu'on clique sur une des icones de poubelles
 * @param  event
 */
async function handleDeleteTask(event) {
  console.log(event);

  // on veut récupérer l'élément qui vient d'être cliqué
  const deleteButton = event.target;

  // on veut récupérer le li qui le contient
  //! utiliser parentNode ou closest() (Atelier E05)

  // On récupère la <li> parente la plus proche
  // DOC : https://developer.mozilla.org/fr/docs/Web/API/Element/closest
  let taskElement = deleteButton.closest("li");
  // console.log( clickedButtonElement.parentElement );
  // console.log( clickedButtonElement.parentNode );
  // console.log( taskElement );

  // Récupération de l'id de la tache pour le delete
  // je récupère l'identifiant de la tâche à supprimer via le dataset id
  let taskID = taskElement.dataset.id;

  // je tente d'appeler l'API pour supprimer la tâche
  const result = await deleteTaskFromApi(taskID); // await que l’API ai Delete la tâche

  // On retire l'élement du DOM
  if (result === true) {
    taskElement.remove();
  } else {
    alert("la suppression n'est pas possible");
  }
}

/**
 * supprime la tâche via l'API
 */
async function deleteTaskFromApi(task_id) {
  // await la réponse de suppression 
  const response = await fetch(apiConfiguration.endpoint + "/tasks/" + task_id, { // Concaténation avec +
    // 1er parametre de fetch = URL
    method: "DELETE", // 2nd param de fetch = options
  });
  if (response.status === 200) {
    console.log(response);
    return true;
  }
  return false;
}
