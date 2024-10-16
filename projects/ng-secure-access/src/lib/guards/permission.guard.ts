import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PermissionService} from '../services/permission.service';

@Injectable({
    providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
    private permissionService = inject(PermissionService);

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const requiredPermissions = route.data['permissions'] as string[];
        const redirectTo = route.data['redirectTo'] || 'access-denied';
        if (!this.permissionService.arePermissionsLoaded()) {
            // Rediriger vers l'URL dynamique ou par défaut si les permissions ne sont pas chargées
            this.router.navigate([redirectTo]);
            return false;
        }

        // Vérifier si l'utilisateur possède les permissions requises
        if (this.permissionService.hasPermission(requiredPermissions)) {
            return true;
        } else {
            // Redirection vers l'URL dynamique si l'utilisateur n'a pas les permissions
            this.router.navigate([redirectTo]);
            return false;
        }
    }
}
