import { Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { TechChatComponent } from "./component/tech-chat/tech-chat.component";
import { AuthGuardService } from "./service/auth.service";
import { FavChatComponent } from "./component/fav-chat/fav-chat.component";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "chat-tech",
    component: TechChatComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "fav",
    component: FavChatComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "history",
    component: TechChatComponent,
    canActivate: [AuthGuardService],
  },
];
