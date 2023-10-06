/**
 * Supprime la tâche du DOM
 * Callback exécuté lorsqu'on clique sur une des icones de poubelles
 * @param  event
 */
function handleDeleteTask(event) {
  console.log(event);

  // on veut récupérer l'élément qui vient d'être cliqué
  const deleteButton = event.target;

  // on veut récupérer le li qui le contient
  //! utiliser parentNode ou closest() (Atelier E05)
  const liElement = deleteButton.parentNode;

  console.log(liElement);

  liElement.remove();
}

/**
 * supprime la tâche via l'API
 */
async function deleteTaskFromApi(task_id) {
  const result = await fetch(apiConfiguration.endpoint + "/tasks/" + task_id, {
    method: "DELETE",
  });
  if (result.status === 200) {
    return true;
  }
  return false;
}
