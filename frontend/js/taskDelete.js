console.log("Yo taskDelete.js");
/**
 * Supprime la tâche du DOM
 * Callback exécuté lorsqu'on clique sur une des icones de poubelles
 * @param {Event} event
 */
async function handleDeleteTask(event) {
  console.log(event);

  // on veut récupérer l'élément qui vient d'être cliqué
  const deleteButton = event.target;

  // on veut récupérer le li qui le contient
  //! utiliser parentNode ou closest() (Atelier E05)

  // On récupère la <li> parente la plus proche
  // DOC : https://developer.mozilla.org/fr/docs/Web/API/Element/closest
  const taskElement = deleteButton.closest("li");
  // console.log( clickedButtonElement.parentElement );
  // console.log( clickedButtonElement.parentNode );

  // console.log( taskElement );

  // Récupération de l'id de la tache pour le delete
  // je récupère l'identifiant de la tâche à supprimer via le dataset id
  const taskID = taskElement.dataset.id;

  // je tente d'appeler l'API pour supprimer la tâche
  const result = await deleteTaskFromApi(taskID); // await que l’API ai Delete la tâche

  // On retire l'élement du DOM
  if (result === true) {
    taskElement.remove();
    messageElt = document.querySelector(".message.success.delete");
    messageElt.removeAttribute("hidden");

    console.log("Tâche supprimée"); //?log-order->2

    //* Ajouter un événement de clic à l'alerte pour la fermer manuellement
    messageElt.addEventListener("click", function () {
      messageElt.setAttribute("hidden", "true");
    });

    //* Masquer l'alerte après 5 secondes
    setTimeout(function () {
      messageElt.setAttribute("hidden", "true");
    }, 50000); // Rappel: 1000ms => 1 sec
  } else {
    alert("la suppression n'est pas possible");
  }
}

/**
 * supprime la tâche via l'API
 */
async function deleteTaskFromApi(task_id) {
  // await la réponse de suppression
  const response = await fetch(
    // Concaténation avec +
    // 1er parametre de fetch = URL
    apiConfiguration.endpoint + "/tasks/" + task_id,
    {
      method: "DELETE", // 2nd param de fetch = options
    }
  );
  if (response.status === 200) {
    console.log("Tâche supprimée de la BDD"); //? log-order->1
    console.log(response);
    return true;
  }
  return false;
}
