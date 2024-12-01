import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import { sharedModule } from '../../shared/module/shared.module';
import { LocalService } from '../../service/local.service';
import {
  bodyExpansion,
  messageAnimation,
} from '../../shared/animation/animate';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { CommonService } from '../../service/common.service';
import { APP_CONSTANTS } from '../../shared/constants/app.constant';
import { SharedService } from '../../shared/service/shared.service';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [sharedModule.import],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [bodyExpansion, messageAnimation],
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Output() selectionEvent = new EventEmitter<any>();
  @Input() userData: any;
  events: string[] = [];
  opened: boolean = false;
  menuList: any = [];
  showChildHistory: boolean = false;
  constructor(
    public localService: LocalService,
    public router: Router,
    public socialAuthService: SocialAuthService,
    public commonService: CommonService,
    public sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.getMenuHistoryItems().subscribe((e) => {
      if (e.length > 0) {
        this.menuList = [];
        this.menuList = e;
      }
    });
  }

  /**
   * @method: Parent menu trigger from side nav
   * @param menu
   */
  triggerMenuEvent(menu: any) {
    if (menu.type !== 'history') {
      this.selectionEvent.emit({ menu: menu.type });
    } else {
      this.showChildHistory = !this.showChildHistory;
    }
  }
  /**
   * @method: History item navigation
   * @param val
   */
  triggerSideMenu(val: any) {
    this.router.navigate(['/history'], { queryParams: { id: val.id } });
  }

  ngOnDestroy(): void {}
}
