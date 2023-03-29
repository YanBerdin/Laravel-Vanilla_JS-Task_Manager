# TodoList - saison 7

## Back-end

Le back-end du projet sera fait avec le framework _Laravel_.

### Installer Laravel

Avant toute chose, il va falloir installer le framework. C'est possible avec Composer ! La commande suivante va créer créer un répertoire `backend` dans le répertoire actuel, y installer Laravel et générer le squelette :

```bash
composer create-project laravel/laravel backend
```

:information_source: La commande `composer create-project` s'occupe de (presque) tout : elle crée les fichiers de notre backend, même le `composer.json` et fait même le `composer install` !

### Créer la base de données

Pour stocker les données utiles à notre application, il va nous falloir une base de données.

On vous propose de créer une base de données `todolist`, et éventuellement l'utilisateur associé (facultatif).

Une fois la base de données créée, exécuter le script SQL `docs/db.dump.sql` pour créer ses tables.

### Configurer Laravel

On y est presque ! Pour finir de rendre notre backend opérationnel et pouvoir coder sereinement, il nous faut faire un petit peu de configuration&hellip;

#### Connecter le back-end à la BDD

Pour que notre back-end puisse communiquer avec notre base de données, il faut lui donner les informations nécessaires pour s'y connecter. Ceci se fait dans le fichier `.env` en renseignant les variables de configuration suivantes *(utilisez les valeurs correspondant à **votre** BDD :wink: )* :

**Le nom de la base de données :**
```
DB_DATABASE=todolist
```

**Le nom de l'utilisateur avec lequel se connecter :**
```
DB_USERNAME=todolist
```

**Le mot de passe de l'utilisateur :**
```
DB_PASSWORD=todolist
```

### Générer une clef de chiffrement 

Laravel, pour son fonctionnement interne, a besoin qu'on lui génère une clef de chiffrement unique. Soit, acte : 

```
cd backend
php artisan key:generate
```

### Lancer le serveur PHP avec Laravel

Maintenant que la base de notre back-end est en place, on peut démarrer le serveur de développement de PHP.

Tout d'abord, il faut se placer dans le répertoire de notre code backend (si ça n'est pas déjà le cas) :
```
cd backend
```

Laravel propose un raccourci pour lancer le serveur PHP :
```
php artisan serve
```

Si cette commande vous perturbe, vous pouvez toujours utiliser directement la commande suivante, plus proche de ce qu'on a déjà vu les saisons précédentes :
```
php -S localhost:8000 server.php
```

### Read The Funny Manual :heart:

Pour nous aider à débuter avec Laravel, quelques liens utiles :

- [créer des routes](https://laravel.com/docs/8.x/routing)
- [les controllers](https://laravel.com/docs/8.x/controllers)
- [générer des réponses JSON](https://laravel.com/docs/8.x/responses#json-responses)
- [la doc complète](https://laravel.com/docs/8.x) (parce que pourquoi pas ?)