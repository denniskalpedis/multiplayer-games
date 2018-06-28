import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpService } from './http.service';
import { UserComponent } from './user/user.component';
import { MemoryComponent } from './memory/memory.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    MemoryComponent,
    TicTacToeComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
  ],
  providers: [HttpService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
