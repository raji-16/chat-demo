import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
} from "@angular/core";
import { sharedModule } from "../../shared/module/shared.module";
import { LocalService } from "../../service/local.service";
import {
  bodyExpansion,
  messageAnimation,
} from "../../shared/animation/animate";
import { Router } from "@angular/router";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { CommonService } from "../../service/common.service";
import _, { cloneDeep } from "lodash";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { SharedService } from "../../shared/service/shared.service";
import { SideNavComponent } from "../side-nav/side-nav.component";
@Component({
  selector: "app-fav-chat",
  standalone: true,
  imports: [sharedModule.import, SideNavComponent],
  templateUrl: "./fav-chat.component.html",
  styleUrl: "./fav-chat.component.scss",
  encapsulation: ViewEncapsulation.None,
  animations: [bodyExpansion, messageAnimation],
})
export class FavChatComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter<any>();
  @Input() userData;
  events: string[] = [];
  opened: boolean;
  menuList: any = [];
  inputData: any = {};
  favList: any = [];
  isRemove: boolean = false;

constructor(
    public localService: LocalService,
    public router: Router,
    public socialAuthService: SocialAuthService,
    public commonService: CommonService,
    public sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.initializeSideNav(true);
    let fav: any = 
      this.localService.getData(APP_CONSTANTS.AUTH.FAVOURITE, false);
    this.favList = fav;
    this.inputData.userName = _.cloneDeep(
      this.localService.getData(APP_CONSTANTS.AUTH.USER_NAME)
    );
    this.inputData.profileUrl = _.cloneDeep(
      this.localService.getData(APP_CONSTANTS.AUTH.PROFILE_URL)
    );
    this.inputData.isDark = _.cloneDeep(
      this.localService.getData(APP_CONSTANTS.AUTH.DARK_MODE)
    );
  }

  /**
   * @method: Parent menu selection from side panel
   * @param menu 
   */
  triggerMenuEvent(menu) {
    this.selectionEvent.emit({ menu: menu.type });
  }

  /**
   * @method: Removing favourite
   */
  removeFav() {
    let removeList = this.favList.filter((e) => e.isDelete);
    removeList.forEach((e) => {
      this.favList.splice(
        this.favList.findIndex((a) => a.id === e.id),
        1
      );
    });
    this.isRemove = this.favList.some((e) => e.isDelete);
    this.localService.saveData(
      APP_CONSTANTS.AUTH.FAVOURITE,
      JSON.stringify(this.favList),
      false
    );
  }

  /**
   * @method: Select the listed item
   * @param fav 
   * @param type 
   */
  selectFavItem(fav, type) {
    if (type) {
      !fav?.isDelete ? (fav.isDelete = true) : (fav.isDelete = false);
    }
    this.isRemove = this.favList.some((e) => e.isDelete);
  }
}
