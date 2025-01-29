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
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { SharedService } from "../../shared/service/shared.service";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { cloneDeep } from "lodash";
@Component({
  selector: "app-fav-chat",
  standalone: true,
  imports: [sharedModule.import, SideNavComponent],
  templateUrl: "./fav-chat.component.html",
  styleUrls: ["./fav-chat.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [bodyExpansion, messageAnimation],
})
export class FavChatComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter<any>();
  @Input() userData: any;
  events: string[] = [];
  opened: boolean = false;
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
    // let fav: any = this.localService.getData(
    //   APP_CONSTANTS.AUTH.FAVOURITE,
    //   false
    // );
    // this.favList = fav;

    this.inputData.userName = cloneDeep(
      this.localService.getData(APP_CONSTANTS.AUTH.USER_NAME)
    );
    console.log(this.inputData.userName);
    this.inputData.profileUrl = cloneDeep(
      this.localService.getData(APP_CONSTANTS.AUTH.PROFILE_URL)
    );
    this.inputData.isDark = cloneDeep(
      this.localService.getData(APP_CONSTANTS.AUTH.DARK_MODE)
    );
    this.fetchFavList();
  }

  fetchFavList() {
    this.commonService
      .fetchFavList({ name: this.inputData.userName })
      .subscribe((response) => {
        if (response.type === "success") {
          console.log("Success");
          this.favList = response.data;
          this.favList.map((e: any) => {
            e.isDelete = false;
          });
        }
      });
  }
  /**
   * @method: Parent menu selection from side panel
   * @param menu
   */
  triggerMenuEvent(menu: any) {
    this.selectionEvent.emit({ menu: menu.type });
  }

  /**
   * @method: Removing favourite
   */
  removeFav() {
    let removeList = this.favList.filter((e: any) => e.isDelete);
    removeList.forEach((e: any) => {
      this.favList.splice(
        this.favList.findIndex((a: any) => a.id === e.id),
        1
      );
    });
    this.isRemove = this.favList.some((e: any) => e.isDelete);
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
  selectFavItem(fav: any) {
    fav.isDelete = !fav?.isDelete;
    this.isRemove = this.favList.some((e: any) => e.isDelete);
  }
}
