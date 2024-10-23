import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TechChatComponent } from './tech-chat/tech-chat.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'chat-tech', component: TechChatComponent }
];
