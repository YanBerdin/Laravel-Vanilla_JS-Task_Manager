## Business Logic

### Task Management

#### Component Name

TaskController, Task Model

#### Purpose

- Gérer la création, la modification, la suppression et la consultation des tâches.
- Représenter le concept métier de "tâche" dans le système.

#### Key Responsibilities

- Permettre aux utilisateurs de créer une tâche avec un titre, une catégorie et des tags.
- Valider que le titre de la tâche est requis et non vide.
- Associer chaque tâche à une catégorie et à plusieurs tags.
- Empêcher la création ou la modification de tâches sans titre valide.
- Permettre la suppression d'une tâche par son identifiant.

#### Workflows / Use Cases

- **Création de tâche** :
  - L'utilisateur soumet un formulaire avec titre, catégorie, tags.
  - Le backend valide les données, crée la tâche et la persiste.
  - Retourne la tâche créée ou une erreur de validation.
- **Modification de tâche** :
  - L'utilisateur modifie une tâche existante.
  - Le backend valide et met à jour la tâche.
- **Suppression de tâche** :
  - L'utilisateur demande la suppression d'une tâche.
  - Le backend supprime la tâche si elle existe.
- **Consultation** :
  - L'utilisateur demande la liste des tâches (avec catégories et tags).

#### Inputs and Outputs

- **Inputs** : titre, catégorie, tags, identifiant de tâche
- **Outputs** : objet tâche (JSON), messages d'erreur, codes HTTP (201, 422, 500)

#### Dependencies

- Modèles : Task, Category, Tag
- Services : Eloquent ORM, Validator
- Base de données MariaDB

#### Business Rules & Constraints

- Le titre de la tâche est obligatoire et ne doit pas être vide.
- Une tâche appartient à une seule catégorie, mais peut avoir plusieurs tags.
- Les identifiants doivent être numériques et valides.

#### Design Considerations

- Utilisation de l'Eager Loading pour optimiser les requêtes et charger les relations.
- Validation centralisée via Laravel Validator pour garantir la cohérence métier.
- Gestion des erreurs HTTP explicites pour faciliter le debug et l'expérience utilisateur.

---

### Category Management

#### Component Name

CategoryController, Category Model

#### Purpose

- Gérer la création, la modification, la suppression et la consultation des catégories.
- Représenter le concept métier de "catégorie" pour organiser les tâches.

#### Key Responsibilities

- Permettre la création d'une catégorie avec un nom.
- Valider que le nom de la catégorie est requis et non vide.
- Associer chaque catégorie à plusieurs tâches.
- Permettre la suppression d'une catégorie par son identifiant.

#### Workflows / Use Cases

- **Création de catégorie** :
  - L'utilisateur soumet un nom de catégorie.
  - Le backend valide et crée la catégorie.
- **Modification de catégorie** :
  - L'utilisateur modifie le nom d'une catégorie existante.
  - Le backend valide et met à jour la catégorie.
- **Suppression de catégorie** :
  - L'utilisateur demande la suppression d'une catégorie.
  - Le backend supprime la catégorie si elle existe.
- **Consultation** :
  - L'utilisateur demande la liste des catégories (avec tâches associées).

#### Inputs and Outputs

- **Inputs** : nom, identifiant de catégorie
- **Outputs** : objet catégorie (JSON), messages d'erreur, codes HTTP (201, 422, 500)

#### Dependencies

- Modèles : Category, Task
- Services : Eloquent ORM, Validator
- Base de données MariaDB

#### Business Rules & Constraints

- Le nom de la catégorie est obligatoire et ne doit pas être vide.
- Une catégorie peut contenir plusieurs tâches.

#### Design Considerations

- Utilisation de l'Eager Loading pour charger les tâches associées.
- Validation centralisée pour garantir la cohérence métier.

---

### Tag Management

#### Component Name

TagController, Tag Model

#### Purpose

- Gérer la création, la modification, la suppression et la consultation des tags.
- Représenter le concept métier de "tag" pour catégoriser les tâches de façon transversale.

#### Key Responsibilities

- Permettre la création d'un tag avec un label.
- Valider que le label du tag est requis et non vide.
- Associer chaque tag à plusieurs tâches.
- Permettre la suppression d'un tag par son identifiant.

#### Workflows / Use Cases

- **Création de tag** :
  - L'utilisateur soumet un label de tag.
  - Le backend valide et crée le tag.
- **Modification de tag** :
  - L'utilisateur modifie le label d'un tag existant.
  - Le backend valide et met à jour le tag.
- **Suppression de tag** :
  - L'utilisateur demande la suppression d'un tag.
  - Le backend supprime le tag si il existe.
- **Consultation** :
  - L'utilisateur demande la liste des tags (avec tâches associées).

#### Inputs and Outputs

- **Inputs** : label, identifiant de tag
- **Outputs** : objet tag (JSON), messages d'erreur, codes HTTP (201, 422, 500)

#### Dependencies

- Modèles : Tag, Task
- Services : Eloquent ORM, Validator
- Base de données MariaDB

#### Business Rules & Constraints

- Le label du tag est obligatoire et ne doit pas être vide.
- Un tag peut être associé à plusieurs tâches.

#### Design Considerations

- Utilisation de l'Eager Loading pour charger les tâches associées.
- Validation centralisée pour garantir la cohérence métier.

---

### User Management

#### Component Name

User Model

#### Purpose

- Représenter les utilisateurs du système (non détaillé dans les extraits actuels).

#### Key Responsibilities

Permettre l'inscription et la connexion des utilisateurs.
Gérer l'authentification et la sécurité des accès (ex : via Laravel Sanctum ou Passport).
Attribuer des rôles ou permissions pour restreindre l'accès à certaines fonctionnalités (ex : admin, utilisateur standard).
Assurer la gestion des informations personnelles et la modification du profil utilisateur.

#### Workflows / Use Cases

**Inscription** :
  - L'utilisateur soumet un formulaire d'inscription avec ses informations.
  - Le backend valide, crée le compte et retourne un token d'authentification.
**Connexion** :
  - L'utilisateur soumet ses identifiants.
  - Le backend vérifie et retourne un token d'authentification si les informations sont valides.
**Modification du profil** :
  - L'utilisateur modifie ses informations personnelles.
  - Le backend valide et met à jour le profil.
**Gestion des rôles** :
  - Un administrateur peut attribuer ou modifier les rôles des utilisateurs.

#### Inputs and Outputs

**Inputs** : nom, email, mot de passe, rôles, informations de profil
**Outputs** : objet utilisateur (JSON), token d'authentification, messages d'erreur, codes HTTP (201, 401, 403, 422)

#### Dependencies

- Modèle : User
- Base de données MariaDB

#### Business Rules & Constraints

L'email doit être unique et valide.
Le mot de passe doit respecter des critères de sécurité (longueur, complexité).
Les rôles déterminent l'accès aux fonctionnalités (ex : seul un admin peut supprimer un utilisateur).
Les actions sensibles nécessitent une authentification préalable.

#### Design Considerations

Utilisation de Laravel Sanctum ou Passport pour la gestion des tokens et de l'authentification.
Validation centralisée pour garantir la sécurité et la cohérence des données utilisateur.
Gestion des erreurs explicites pour améliorer l'expérience utilisateur et la sécurité.
