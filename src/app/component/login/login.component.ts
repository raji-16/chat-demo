import { AfterContentInit, Component, ViewEncapsulation } from "@angular/core";
import { sharedModule } from "../../shared/module/shared.module";
import { Router, withDebugTracing } from "@angular/router";
import { LocalService } from "../../service/local.service";
import { loginExpansion } from "../../shared/animation/animate";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FormGroup } from "@angular/forms";
import { SharedService } from "../../shared/service/shared.service";
import { CommonService } from "../../service/common.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [sharedModule.import],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  animations: [loginExpansion],
  providers: [SharedService],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements AfterContentInit {
  userInfo = {
    userName: "",
    emailID: "",
  };
  state: "expand" | "collapse" = "collapse";
  expand: "expand" | "collapse" = "expand";
  innerContentEnabled: boolean = false;
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  data: any;
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.innerContentEnabled = true;
    }, 2000);
  }
  constructor(
    public router: Router,
    public sharedService: SharedService,
    private socialAuthService: SocialAuthService,
    public localService: LocalService,
    public commonService: CommonService
  ) {}
  ngOnInit() {
    this.authenticateSignedAccount();
  }
  /**
   * @method: Authenticate using google account
   */
  authenticateSignedAccount() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.sharedService.setLocalStorageInfo(user);
      this.isLoggedin = user != null;
      this.router.navigate(["/chat-tech"]);
    });
  }
  /**
   * @method: Logout upon close button
   */
  logOut(): void {
    this.socialAuthService.signOut();
  }
  /**
   * @method: Login using user-name & email-Id
   */
  navigateTo() {
    this.localService.saveData("user-name", this.userInfo.userName);
    this.router.navigate(["/chat-tech"]);
  }
}
