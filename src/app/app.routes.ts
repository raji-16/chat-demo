import { Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { TechChatComponent } from "./component/tech-chat/tech-chat.component";
import { AuthGuardService } from "./service/auth.service";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "chat-tech",
    component: TechChatComponent,
    canActivate: [AuthGuardService],
  },
];
