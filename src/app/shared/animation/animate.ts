import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { APP_CONSTANTS } from "../constants/app.constant";
import { AppComponent } from "../../app.component";

export const bodyExpansion = trigger(
  APP_CONSTANTS.ANIMATE_CONSTANTS.ANIMATE_CONVENTION.BODY_EXPANSION,
  [
    state(
      `${APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.COLLAPSED},${APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.VOID}`,
      style({
        width: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.LABEL_ZERO_PX,
        visibility: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.HIDDEN,
        overflow: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.HIDDEN,
      })
    ),
    state(
      APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.EXPANDED,
      style({
        width: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.SYMBOL_ASTERICK,
        visibility: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.VISIBLE,
        overflow: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.SYMBOL_ASTERICK,
      })
    ),
    transition(
      "expanded <=> collapsed, void => collapsed, void => expanded",
      animate(APP_CONSTANTS.ANIMATE_CONSTANTS.ANIMATE.ANIMATE_CUBIC)
    ),
  ]
);

export const messageAnimation = trigger(
  APP_CONSTANTS.ANIMATE_CONSTANTS.ANIMATE_CONVENTION.MESSAGE_ANIMATION,
  [
    state(APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.IN, style({ opacity: 1 })),
    transition(APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.ENTER, [
      style({ opacity: 0 }),
      animate(300),
    ]),
    transition(
      APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.LEAVE,
      animate(0, style({ opacity: 0 }))
    ),
  ]
);

export const loginExpansion = trigger(
  APP_CONSTANTS.ANIMATE_CONSTANTS.ANIMATE_CONVENTION.LOGIN_EXPANSION,
  [
    state(
      `${APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.COLLAPSED},${APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.VOID}`,
      style({
        height: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.LABEL_ZERO_PX,
        visibility: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.HIDDEN,
        overflow: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.HIDDEN,
      })
    ),
    state(
      APP_CONSTANTS.ANIMATE_CONSTANTS.TRANSITION.EXPANDED,
      style({
        height: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.SYMBOL_ASTERICK,
        visibility: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.VISIBLE,
        overflow: APP_CONSTANTS.ANIMATE_CONSTANTS.STYLE.SYMBOL_ASTERICK,
      })
    ),
    transition(
      "expand <=> collapse, void => collapse, void => expand",
      animate("1500ms 2000ms cubic-bezier(0.680, -0.550, 0.265, 1.550)")
    ),
  ]
);
