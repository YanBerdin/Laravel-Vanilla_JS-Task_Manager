
const apiConfiguration = {
  endpoint: 'http://127.0.0.1:8000/api', //!adresse HTTP de l'API REST
  // on pourrait avoir besoin d'autres valeurs de config, du coup, on crée un objet qui les condiendra toutes
}


async function initApp() {
  console.log('démarrage...initApp()');
  // debugger;
  console.log("Yo app.js");
  displayTasks();
  // debugger;
  //TODO displayCategories();
}

document.addEventListener('DOMContentLoaded', initApp);


