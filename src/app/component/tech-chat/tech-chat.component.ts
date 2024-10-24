import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { sharedModule } from "../../shared/module/shared.module";
import { LocalService } from "../../service/local.service";
import {
  bodyExpansion,
  messageAnimation,
} from "../../shared/animation/animate";
import { Router } from "@angular/router";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
  selector: "app-tech-chat",
  standalone: true,
  imports: [sharedModule.import],
  templateUrl: "./tech-chat.component.html",
  styleUrl: "./tech-chat.component.scss",
  encapsulation: ViewEncapsulation.None,
  animations: [bodyExpansion, messageAnimation],
})
export class TechChatComponent implements OnInit, AfterContentInit {
  userName: String = "";
  userInput: String = "";
  botReply: String = "";
  postInput: any = [];
  @ViewChildren(APP_CONSTANTS.COMMON_CONSTANTS.CHAT_AREA)
  MyProp: QueryList<ElementRef>;
  sideNavWidth: string = APP_CONSTANTS.NUMBER_CONSTANTS.POINT_TWO;
  extendedPanel: boolean = false;
  isLoader: boolean = false;
  state: any = APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.COLLAPSED;
  profileUrl: string = "";
  constructor(
    public localService: LocalService,
    public router: Router,
    public socialAuthService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.userName = this.localService.getData(APP_CONSTANTS.AUTH.USER_NAME);
    this.profileUrl = this.localService.getData(APP_CONSTANTS.AUTH.PROFILE_URL);
  }

  ngAfterContentInit(): void {
    this.state = APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.EXPANDED;
  }

  /**
   * @method: User input
   * @param event
   */
  updateInput(event: any) {
    this.postInput.push(this.userInput);
    this.userInput = "";
    setTimeout(() => {
      this.MyProp.last.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  }
  /**
   * @method: User cick on side panel
   * @param event
   */
  openSideNav(event: any) {
    this.extendedPanel
      ? (this.sideNavWidth = APP_CONSTANTS.NUMBER_CONSTANTS.POINT_TWO)
      : (this.sideNavWidth = APP_CONSTANTS.NUMBER_CONSTANTS.NUMBER_ONE);
    this.extendedPanel = !this.extendedPanel;
  }
  /**
   * @method: To clear chat
   */
  clearChat() {
    this.isLoader = true;
    this.postInput = [];
    setTimeout(() => {
      this.postInput = [];
      this.isLoader = false;
    }, 1000);
  }
  /**
   * @method: Navigate to login page
   */
  navigateToLogin() {
    this.socialAuthService.signOut();
    this.localService.clearData();
    this.router.navigate([APP_CONSTANTS.ROUTE.LOGIN]);
  }
}
