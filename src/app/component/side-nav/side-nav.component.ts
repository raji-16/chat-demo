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
    Renderer2
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
  import _, { cloneDeep } from "lodash";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { SharedService } from "../../shared/service/shared.service";
import { ThemeService } from "../../shared/service/theme.service";
import { Theme } from "../../shared/interface/theme";
  @Component({
    selector: "app-side-nav",
    standalone: true,
    imports: [sharedModule.import],
    templateUrl: "./side-nav.component.html",
    styleUrl: "./side-nav.component.scss",
    encapsulation: ViewEncapsulation.None,
    animations: [bodyExpansion, messageAnimation],
  })
  export class SideNavComponent implements OnInit, OnDestroy {
  @Output() selectionEvent = new EventEmitter<any>;
  @Input() userData;
  events: string[] = [];
  opened: boolean;
  menuList: any = [];
  showChildHistory: boolean = false;
    constructor(
      public localService: LocalService,
      public router: Router,
      public socialAuthService: SocialAuthService,
      public commonService: CommonService,
      public sharedService: SharedService,
      public themeService: ThemeService,
      private renderer2: Renderer2
    ) {}
    ngOnInit(): void {
      this.themeService.setTheme(Theme.BLACK, this.renderer2);
      this.sharedService.getMenuHistoryItems().subscribe((e)=> {
          if(e.length > 0) {
            this.menuList = [];
            this.menuList = e;
          }
      })
    }

    /**
     * @method: Parent menu trigger from side nav
     * @param menu 
     */
    triggerMenuEvent(menu) {
      if(menu.type !== 'history') {
        this.selectionEvent.emit({menu: menu.type})
      } else {
        this.showChildHistory = !this.showChildHistory;
      }
    }
    /**
     * @method: History item navigation
     * @param val 
     */
    triggerSideMenu(val) {
      this.router.navigate(['/history'], {queryParams: {id: val.id}})
    }

    updateTheme() {
      this.themeService.setTheme(this.userData.isDark ? Theme.BLACK : Theme.WHITE, this.renderer2);
    }

    ngOnDestroy(): void {
    }
  }
  