# Task manager : frontend

Bienvenue sur le repo front du projet "Task manager" !

Quelques infos concernant le code :

- HTML
  - minimaliste
  - validé W3C
  - 100% perf/accessibilité/bonnes pratiques/SEO (rapport lighthouse)
- CSS
  - minimaliste
  - généré à partir de Sass (mais les étudiants n'ont pas, nécessairement, à le savoir)
  - repose sur un petit [reset moderne](https://www.joshwcomeau.com/css/custom-css-reset/)
- JS
  - TODO (à faire, mais toujours en mode minimaliste)

## Fonctionnement de la page

Une seule et même page permet plusieurs modes d'affichage distincts :

1. mode par défaut : listing des tâches
2. mode formulaire (ajout/édition d'une tâche)
   - `<header>` est grisé, grâce à l'ajout d'une classe : `<header class="muted">`
   - le bouton "nouvelle tâche" est caché, grâce à l'ajout d'un attribut "hidden" : `<div class="create-task-container" hidden>`
   - la liste de tâche est cachée, de la même manière : `<ul class="tasklist" hidden>`
   - le formulaire d'ajout/édition de tâche est affiché, grâce à l'ajout d'une classe : `<div class="modal-dialog show">`
3. mode par défaut avec message success/error
   - revenir à l'affichage par défaut
     - `<header>`
     - `<div class="create-task-container">`
     - `<ul class="tasklist">`
     - `<div class="modal-dialog">`
   - puis afficher un message de succès :
     ```html
     <div class="message success">
       la nouvelle tâche a bien été ajoutée
     </div>
     ```
   - ou un message d'erreur :
     ```html
     <div class="message danger">
       oops, impossible de sauvegarder la tâche
     </div>
     ```