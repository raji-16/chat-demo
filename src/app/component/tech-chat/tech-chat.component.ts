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
import { CommonService } from "../../service/common.service";
import _, { cloneDeep } from "lodash";
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
  botReply: any = [];
  postInput: any = [];
  @ViewChildren(APP_CONSTANTS.COMMON_CONSTANTS.CHAT_AREA)
  MyProp: QueryList<ElementRef>;
  sideNavWidth: string = APP_CONSTANTS.NUMBER_CONSTANTS.POINT_TWO;
  extendedPanel: boolean = false;
  isLoader: boolean = false;
  state: any = APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.COLLAPSED;
  profileUrl: string = "";
  finalData: any = [];
  messageLoader: boolean = false;
  constructor(
    public localService: LocalService,
    public router: Router,
    public socialAuthService: SocialAuthService,
    public commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.userName = this.localService.getData(APP_CONSTANTS.AUTH.USER_NAME);
    this.profileUrl = this.localService.getData(APP_CONSTANTS.AUTH.PROFILE_URL);
    this.fetchExcelData();
  }

  ngAfterContentInit(): void {
    this.state = APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.EXPANDED;
  }

  /**
   * @method: User input
   * @param event
   */
  updateInput(event: any) {
    this.postInput.push({ value: this.userInput, type: "user" });
    this.messageLoader = true;
    this.scrollBottom();
    setTimeout(() => {
      let botReply = this.respondToClient(this.userInput);
      botReply.length >= 0
        ? this.postInput.push({ value: botReply, type: "bot" })
        : "";
      this.userInput = "";
      this.messageLoader = false;
      this.scrollBottom();
    }, 500);
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
    setTimeout(() => {
      this.postInput = [];
      this.botReply = [];
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
  /**
   * @method: Fetch Initial data
   */
  fetchExcelData() {
    this.commonService.fetchData().subscribe((response) => {
      let temp: any = [];
      let keyVal: any = {};
      response.forEach((element, i) => {
        if (element.Question) {
          {
            _.isEmpty(keyVal[element.Question])
              ? (keyVal[element.Question] = [])
              : "";
            keyVal[element.Question].push(element.Answer);
          }
        } else {
          let index = this.findPreviousQnIndex(response, i);
          element.Answer
            ? keyVal[response[index].Question].push(element.Answer)
            : "";
        }
      });
      this.finalData = _.cloneDeep(keyVal);
    });
  }
  /**
   * @method: Find previous index
   */
  findPreviousQnIndex(res, ind) {
    for (let i = ind; i <= res.length; i--) {
      if (res[i - 1].Question) {
        return i - 1;
      }
    }
    return "";
  }
  /**
   *
   * @param userInp
   * @returns
   */
  respondToClient(userInp) {
    const data = Object.keys(this.finalData);
    let found = data.find((element) =>
      element
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(userInp.toLowerCase().replace(/\s+/g, ""))
    );
    if (!found) {
      found = data.find((element) =>
        userInp
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(element.toLowerCase().replace(/\s+/g, ""))
      );
    }
    return found
      ? this.finalData[found]
      : [
          "I'm not quite sure I understand that. Could you please clarify or provide more details?",
        ];
  }
  /**
   * @method: Scroll to the bottom of the chat
   */
  scrollBottom() {
    setTimeout(() => {
      this.MyProp.last.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  }
}
