import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LocalService } from "./local.service";
import { APP_CONSTANTS } from "../shared/constants/app.constant";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    public localService: LocalService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.localService.getData(APP_CONSTANTS.AUTH.USER_NAME)) {
      return this.router.navigate([APP_CONSTANTS.ROUTE.LOGIN]);
    }
    return true;
  }
}
