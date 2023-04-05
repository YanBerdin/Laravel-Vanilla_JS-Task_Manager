function handleDeleteTask(event) {
    console.log(event);

// on veut récupérer l'élément qui vient d'être cliqué
const deleteButton = event.target;
// on veut récupérer le li qui le contient 
// TODO utiliser parentNode ou closest() (Atelier E05)
const liElement = deleteButton.parentNode; 
console.log(liElement);
liElement.remove();
}