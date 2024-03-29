import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "src/app/shared/services/auth-service/auth.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SignedInGuard implements CanActivate {

    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn !== false) {
            this.router.navigate(['/dashboard'])
        }
        return true;
    }

}
