import { AfterContentInit, AfterViewInit, Component, HostBinding } from '@angular/core';
import { share } from 'rxjs';
import { sharedModule } from '../shared.module';
import { trigger, transition, animate, style, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';
import { LocalService } from '../service/local.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [sharedModule.import],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('expansion', [
      state('collapse, void', style({ width: '0px', visibility: 'hidden', overflow: 'hidden' })),
      state('expand', style({ width: '*', visibility: 'visible', overflow: '*' })),
      transition(
        'expand <=> collapse, void => collapse, void => expand',
        animate('2000ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ])
  ]
})
export class LoginComponent implements AfterContentInit {
  userName = '';
  state: 'expand' | 'collapse' = 'collapse';
  innerContentEnabled: boolean = false;
  fadeOpt = 'in'
  ngAfterContentInit(): void {
    this.state = 'expand';
    setTimeout(() => {
      this.innerContentEnabled = true;
    },2000  )
  }
  constructor(public router: Router,
    public localService: LocalService
  ) {

  }
  navigateTo() {
    this.localService.saveData('user-name', this.userName);
    this.router.navigate(['/chat-tech']);
  }
 
}
