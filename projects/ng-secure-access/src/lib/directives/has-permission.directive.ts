import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {PermissionService} from "../services/permission.service";

@Directive({
    selector: '[appHasPermission]',
    standalone: true
})
export class HasPermissionDirective {
    private permissionsRequired: string[] = [];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permissionService: PermissionService
    ) {
    }

    @Input() set appHasPermission(permissions: string[]) {
        this.permissionsRequired = permissions;
        this.updateView();
    }


    private updateView(): void {
        if (this.checkPermissions()) {
            // Affiche l'élément si une permission est présente
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            // Masque l'élément sinon
            this.viewContainer.clear();
        }
    }

    private checkPermissions(): boolean {
        // Vérifie si l'utilisateur a au moins une des permissions requises
        return this.permissionService.hasPermission(this.permissionsRequired);
    }
}
