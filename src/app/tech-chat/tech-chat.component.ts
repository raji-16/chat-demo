import { AfterContentInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { sharedModule } from '../shared.module';
import { LocalService } from '../service/local.service';
import {cloneDeep} from 'lodash';
import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { SidebarCloseAnimation, SidebarOpenAnimation } from '../shared/animate';
import { Router } from '@angular/router';
const animationParams = {
  menuWidth: "250px",
  animationStyle: "500ms ease"
};
@Component({
  selector: 'app-tech-chat',
  standalone: true,
  imports: [sharedModule.import],
  templateUrl: './tech-chat.component.html',
  styleUrl: './tech-chat.component.scss',
  encapsulation: ViewEncapsulation.None,
 animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden', overflow: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible', overflow: '*' })),
      transition(
        'expanded <=> collapsed, void => collapsed, void => expanded',
        animate('2000ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('messageAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(300 )
      ]),
      transition(':leave',
        animate(0, style({opacity: 0})))
    ]),
  ],

})
export class TechChatComponent implements OnInit, AfterContentInit {
  userName: String = '';
  userInput: String = '';
  botReply: String = '';
  postInput: any = [];
  @ViewChildren("chatArea") MyProp: QueryList<ElementRef>;
  sideNavWidth: string = '.2';
  extendedPanel: boolean = false;
  isLoader: boolean = false;
  state: 'expanded' | 'collapsed' = 'collapsed';
  constructor(public localService: LocalService, public router: Router) { }
  ngOnInit(): void {
    this.userName = this.localService.getData('user-name');
  }

  ngAfterContentInit(): void {
    this.state = 'expanded';
  }

  /**
   * @method: User input
   * @param event 
   */
  updateInput(event: any) {
    this.postInput.push(this.userInput);
    this.userInput = '';
    setTimeout(() => {
      this.MyProp.last.nativeElement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    },100)
  }
  /**
   * @method: User cick on side panel
   * @param event 
   */
  openSideNav(event:any) {
   // this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.extendedPanel  ? this.sideNavWidth = '.02' : this.sideNavWidth = '1';
    this.extendedPanel = !this.extendedPanel
  }
  /**
   * @method: To clear chat 
   */
  clearChat() {
    this.isLoader =true;
    this.postInput = [];
    setTimeout(() => {
      this.postInput = [];
      this.isLoader =false;
    }, 1000);
  }
  /**
   * @method: Navigate to login page
   */
  navigateToLogin() {
    this.localService.clearData();
    this.router.navigate(['/login']);
  }
}
