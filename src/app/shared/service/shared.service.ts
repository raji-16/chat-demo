import { Injectable } from "@angular/core";
import { LocalService } from "../../service/local.service";
import { APP_CONSTANTS } from "../constants/app.constant";
import { CommonService } from "../../service/common.service";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import _, { cloneDeep } from "lodash";
@Injectable({
    providedIn: 'root'
  })
export class SharedService {
    menuHistoryItems: Subject<any> = new BehaviorSubject<any>([]);
    constructor(public localService: LocalService,
      public router: Router,
      public socialAuthService: SocialAuthService,
      public commonService: CommonService){

    }
    /**
     * @method: update the local storage
     * @param user 
     */
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
    /**
     * @method: side menu selection
     * @param eve 
     */
    menuSelection(eve) {
      if (eve.menu == 'fav') {
        this.router.navigate([APP_CONSTANTS.ROUTE.FAV]);
      } else if (eve.menu == 'chat') {
        this.router.navigate([APP_CONSTANTS.ROUTE.CHAT_TECH]);
      }else if (eve.menu == 'logout') {
        this.socialAuthService.signOut();
        this.localService.clearData();
        this.setMenuHistoryItems([]);
        this.router.navigate([APP_CONSTANTS.ROUTE.LOGIN]);
      }
    }

    /**
     * @method: update the menu items
     * @param val 
     */
    setMenuHistoryItems(val: any) {
      this.menuHistoryItems.next(val)
    }

    /**
     * @method: fetch the menu items
     * @returns 
     */
    getMenuHistoryItems() {
     return this.menuHistoryItems;
    }

    /**
     * @method: Initialize side nav
     */
    initializeSideNav(isMenu = false) {
      let menuList = _.cloneDeep(APP_CONSTANTS.COMMON_CONSTANTS.MENU_LIST);
      this.menuHistoryItems.subscribe((e) => {
        if (e.length == 0 && isMenu) {
          this.localService.getData(APP_CONSTANTS.AUTH.HISTORY,false).length === 0 ?
          this.setMenuHistoryItems(menuList) : 
          this.resetMenuItems(menuList,this.localService.getData(APP_CONSTANTS.AUTH.HISTORY,false));
        }
      })
    }

    /**
     * @method: Reset menu items
     * @param listItem 
     * @param getHistory 
     */
    resetMenuItems(listItem,getHistory) {
      listItem.length >0 &&  listItem.forEach(element => {
          if(element.type == 'history') {
            element.child = getHistory;
          }
      });
      this.setMenuHistoryItems(listItem);
  }
}