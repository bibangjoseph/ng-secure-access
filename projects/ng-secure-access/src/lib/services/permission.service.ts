import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    // Tableau de permissions
    private permissions: WritableSignal<string[]> = signal<string[]>([]);
    private permissionsLoaded: WritableSignal<boolean> = signal(false);

    constructor() {
    }

    // Charger les permissions
    loadPermissions(permissions: string[]) {
        this.permissions.set(permissions);
        this.permissionsLoaded.set(true);
    }

    // Vérifier si l'utilisateur possède au moins une des permissions
    hasPermission(requiredPermissions: string[]): boolean {
        return requiredPermissions.some(permission => this.permissions().includes(permission));
    }

    // Obtenir toutes les permissions
    getPermissions(): string[] {
        return this.permissions();
    }

    // Vérifier si les permissions sont chargées
    arePermissionsLoaded(): boolean {
        return this.permissionsLoaded();
    }
}
