import { AfterContentInit, AfterViewInit, Component, HostBinding } from '@angular/core';
import { share } from 'rxjs';
import { sharedModule } from '../../shared.module';
import { trigger, transition, animate, style, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';
import { LocalService } from '../../service/local.service';
import { loginExpansion } from '../../shared/animation/animate';
import { APP_CONSTANTS } from '../../shared/constants/app.constant';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [sharedModule.import],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    loginExpansion
  ]
})
export class LoginComponent implements AfterContentInit {
  userName = '';
  state: any = APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.COLLAPSED;
  innerContentEnabled: boolean = false;
  ngAfterContentInit(): void {
    this.state = APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.EXPANDED;
    setTimeout(() => {
      this.innerContentEnabled = true;
    },2000  )
  }
  constructor(public router: Router,
    public localService: LocalService
  ) {

  }
  navigateTo() {
    this.localService.saveData(APP_CONSTANTS.COMMON_CONSTANTS.USER_NAME, this.userName);
    this.router.navigate([APP_CONSTANTS.ROUTE.CHAT_TECH]);
  }
 
}
