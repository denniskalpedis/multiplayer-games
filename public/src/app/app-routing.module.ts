import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { MemoryComponent } from './memory/memory.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: 'user',component: UserComponent },
  { path: 'ttt/:id',component: TicTacToeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'memory', component: MemoryComponent},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
