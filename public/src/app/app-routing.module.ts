import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemoryComponent } from './memory/memory.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'memory', component: MemoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
