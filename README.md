# ng-secure-access

`ng-secure-access` est une librairie Angular qui permet de gérer les permissions d'accès aux routes et l'affichage des éléments en fonction des permissions d'un utilisateur. Elle permet de charger dynamiquement les permissions après l'authentification et de contrôler l'accès aux différentes parties de votre application.

## Fonctionnalités

- **Gestion des permissions dynamiques** : Charge un tableau de permissions pour un utilisateur après l'authentification.
- **Protection des routes** : Utilise un `Guard` pour vérifier les permissions avant d'accéder à une route.
- **Affichage conditionnel des éléments** : Affiche ou masque des éléments en fonction des permissions.
- **Redirection dynamique** : Redirige l'utilisateur vers des pages spécifiques s'il n'a pas les permissions requises.

## Installation

1. Installez la librairie en l'ajoutant à votre projet :

   ```bash
   npm install ng-secure-access
   ```

2. Ajoutez le module de la librairie dans votre application Angular.

## Utilisation

### 1. Charger les permissions

Les permissions doivent être chargées après l'authentification de l'utilisateur, par exemple dans un `LayoutComponent` :

```typescript
import {Component, OnInit} from '@angular/core';
import {PermissionService} from 'ng-secure-access';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

    constructor(private permissionService: PermissionService) {
    }

    ngOnInit() {
        // Charger les permissions après l'authentification de l'utilisateur
        this.permissionService.loadPermissions(['update', 'delete', 'create']);
    }
}
```

### 2. Protéger une route avec des permissions

Pour protéger une route, ajoutez le `PermissionGuard` à votre route et spécifiez les permissions requises dans `data`.

```typescript
const routes: Routes = [
    {
        path: 'create',
        canActivate: [PermissionGuard],
        data: {
            permissions: ['create'], // Les permissions requises pour accéder à cette route
            redirectTo: 'access-denied' // Lien de redirection en cas de permissions insuffisantes
        },
        loadComponent: () => import('./pages/create-page/create-page.component').then(m => m.CreatePageComponent),
    }
];
```

### 3. Utiliser une directive pour afficher des éléments conditionnellement

Utilisez la directive `appHasPermission` pour afficher ou masquer des éléments en fonction des permissions d'un utilisateur.

```html
<!-- Afficher cet élément uniquement si l'utilisateur a les permissions 'update' ou 'delete' -->
<div *appHasPermission="['update', 'delete']">
    Vous avez les permissions pour mettre à jour ou supprimer.
</div>
```

### 4. Redirection dynamique en fonction des permissions

Lorsque l'utilisateur n'a pas les permissions requises, vous pouvez spécifier dynamiquement où il sera redirigé en utilisant l'option `redirectTo` dans la configuration de la route.

```typescript
const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [PermissionGuard],
        data: {
            permissions: ['viewDashboard'],
            redirectTo: 'no-access'
        },
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    }
];
```

## API

### Services

#### `PermissionService`

- **`loadPermissions(permissions: string[]): void`** : Charge les permissions pour l'utilisateur actuel.
- **`hasPermission(permissions: string[]): boolean`** : Vérifie si l'utilisateur possède au moins une des permissions spécifiées.
- **`arePermissionsLoaded(): boolean`** : Retourne `true` si les permissions sont chargées.

### Directives

#### `appHasPermission`

- Utilisation : `*appHasPermission="['permission1', 'permission2']"`
- Affiche ou masque l'élément en fonction des permissions passées en paramètre.

### Guards

#### `PermissionGuard`

- Utilisation : `canActivate: [PermissionGuard]`
- Vérifie les permissions d'un utilisateur avant de lui permettre d'accéder à une route protégée.

## Exemples

### Exemple complet d'une route protégée avec redirection

```typescript
const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [PermissionGuard],
        data: {
            permissions: ['viewDashboard'],
            redirectTo: 'no-access'
        },
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    }
];
```

### Exemple complet d'une directive pour afficher un bouton en fonction des permissions

```html

<button *appHasPermission="['admin']">
    Gérer les utilisateurs
</button>
```

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer cette librairie ou signaler un problème, merci de soumettre un pull request ou d'ouvrir une issue.

## Licence

`ng-secure-access` est sous licence MIT.
