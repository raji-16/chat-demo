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
import { ActivatedRoute, Router } from "@angular/router";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { CommonService } from "../../service/common.service";
import _, { cloneDeep } from "lodash";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { SharedService } from "../../shared/service/shared.service";
import { timeStamp } from "node:console";
@Component({
  selector: "app-tech-chat",
  standalone: true,
  imports: [sharedModule.import, SideNavComponent],
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
  inputData: any = {};
  isDark: boolean = true;
  showHoverElem: boolean = false;
  favouriteList: any = [];
  showChat: boolean = true;
  constructor(
    public localService: LocalService,
    public router: Router,
    public socialAuthService: SocialAuthService,
    public commonService: CommonService,
    public sharedService: SharedService,
    public activatedRouter: ActivatedRoute
  ) {
    this.sharedService.initializeSideNav();
  }
  ngOnInit(): void {
    let getHistory: any = this.localService.getData(
      APP_CONSTANTS.AUTH.HISTORY,
      false
    );
    this.activatedRouter.queryParamMap.subscribe((e: any) => {
      if (!_.isEmpty(e.params) && getHistory.length > 0) {
        getHistory.forEach((element) => {
          if (element.id === e.params.id) {
            this.showChat = false;
            this.postInput = element.value;
          }
        });
      }
    });
    this.localService.saveData(
      APP_CONSTANTS.AUTH.DARK_MODE,
      this.isDark.toString()
    );
    this.userName = this.localService.getData(APP_CONSTANTS.AUTH.USER_NAME);
    this.profileUrl = this.localService.getData(APP_CONSTANTS.AUTH.PROFILE_URL);
    this.inputData.userName = _.cloneDeep(this.userName);
    this.inputData.profileUrl = _.cloneDeep(this.profileUrl);
    this.inputData.isDark = _.cloneDeep(this.isDark);
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
        ? this.postInput.push({
            value: botReply,
            isFav: false,
            type: "bot",
            showHoverFav: false,
          })
        : "";
      this.userInput = "";
      this.messageLoader = false;
      this.scrollBottom();
    }, 500);
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
  /**
   * @method: Mouse hover on user input
   * @param val 
   * @param inp 
   */
  mouseHovering(val, inp) {
    if (!val) {
      setTimeout(() => {
        inp.showHoverFav = false;
      }, 1000);
    } else {
      inp.showHoverFav = val;
    }
  }
  /**
   * @method: Selecting favourite
   * @param val 
   * @param remove 
   */
  markFav(val, remove) {
    let favList: any = 
      this.localService.getData(APP_CONSTANTS.AUTH.FAVOURITE, false) ? this.localService.getData(APP_CONSTANTS.AUTH.FAVOURITE, false) : [];
    if (remove) {
      val.isFav = true;
      let obj = {
        id: `id${favList.length + 1}`,
        timeStamp: new Date(Date.now()),
        message: val.value,
        isDelete: false,
      };
      favList.push(obj);
      this.localService.saveData(
        APP_CONSTANTS.AUTH.FAVOURITE,
        JSON.stringify(favList),
        false
      );
    } else {
      val.isFav = false;
      favList.splice(favList.findIndex((e) => e.message == val.message));
      favList.length > 0
        ? this.localService.saveData(
            APP_CONSTANTS.AUTH.FAVOURITE,
            JSON.stringify(this.favouriteList),
            false
          )
        : this.localService.removeData(APP_CONSTANTS.AUTH.FAVOURITE);
    }
  }

  /**
   * @method: Menu navigation
   * @param eve 
   */
  menuNavigation(eve) {
    this.sharedService.menuSelection(eve);
  }

  /**
   * @method: Storing history when user navigates to other component
   */
  saveHistory(){
    let history: any = [];
    if (this.postInput.length > 0) {
      history.push({
        id: Math.random().toString(36).slice(2),
        key: this.postInput[0].value,
        value: this.postInput,
      });
      let getHistory: any = this.localService.getData(
        APP_CONSTANTS.AUTH.HISTORY,
        false
      );
      if (getHistory.length > 0) {
        getHistory=  this.checkHistoryList(getHistory);
      } else {
        getHistory = history;
      }
      this.localService.saveData(
        APP_CONSTANTS.AUTH.HISTORY,
        JSON.stringify(getHistory),
        false
      );
      let listItem : any = [];
    this.sharedService.menuHistoryItems.subscribe((list) => {
      listItem = list;
   
    });
      this.sharedService.resetMenuItems(listItem,getHistory);
    }
  }
  
  /**
   * @method: Verify the history list 
   * @param getHistory 
   * @returns 
   */
  checkHistoryList(getHistory) {
    if(getHistory.length < 3) {
      getHistory.push({
          id: Math.random().toString(36).slice(2),
          key: this.postInput[0].value,
          value: this.postInput,
        });
    } else {
      getHistory.splice(0,1);
      getHistory.push({
        id: Math.random().toString(36).slice(2),
        key: this.postInput[0].value,
        value: this.postInput,
      });
    }
    return getHistory;
  }

  ngOnDestroy(){
    if (this.activatedRouter.snapshot.url[0].path === 'chat-tech'   ) {
      this.saveHistory();
    } 
  }
}
