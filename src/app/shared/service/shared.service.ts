import { Injectable } from "@angular/core";
import { LocalService } from "../../service/local.service";
import { APP_CONSTANTS } from "../constants/app.constant";
@Injectable({
    providedIn: 'root'
  })
export class SharedService {

    constructor(public localService: LocalService){

    }
    setLocalStorageInfo(user? : any) {
        this.localService.saveData(
            APP_CONSTANTS.AUTH.USER_NAME,
            user.name
          );
          this.localService.saveData(
            APP_CONSTANTS.AUTH.FIRST_NAME,
            user.firstName
          );
          this.localService.saveData(
            APP_CONSTANTS.AUTH.LAST_NAME,
            user.lastName
          );
          this.localService.saveData(
            APP_CONSTANTS.AUTH.EMAIL_ID,
            user.email
          );
          this.localService.saveData(
            APP_CONSTANTS.AUTH.PROFILE_URL,
            user.photoUrl
          );
          this.localService.saveData(
            APP_CONSTANTS.AUTH.USER_ID,
            user.id
          );
          this.localService.saveData(
            APP_CONSTANTS.AUTH.TOKEN_ID,
            user.idToken
          );
    }
}