import {
  AfterContentInit,
  AfterViewInit,
  Component,
  HostBinding,
  ViewEncapsulation,
} from "@angular/core";
import { share } from "rxjs";
import { sharedModule } from "../../shared/module/shared.module";
import {
  trigger,
  transition,
  animate,
  style,
  query,
  stagger,
  state,
  group,
} from "@angular/animations";
import { Router, withDebugTracing } from "@angular/router";
import { LocalService } from "../../service/local.service";
import { loginExpansion } from "../../shared/animation/animate";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialUser,
} from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "../../shared/service/shared.service";

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
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.innerContentEnabled = true;
    }, 2000);
  }
  constructor(
    public router: Router,
    public sharedService: SharedService,
    private socialAuthService: SocialAuthService,
    public localService: LocalService
  ) {}
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.sharedService.setLocalStorageInfo(user);

      this.isLoggedin = user != null;
      this.router.navigate(["/chat-tech"]);
      console.log(this.socialUser);
    });
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
  navigateTo() {
    this.localService.saveData("user-name", this.userInfo.userName);
    this.router.navigate(["/chat-tech"]);
  }
}
