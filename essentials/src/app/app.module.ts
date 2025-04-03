import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { HeaderComponent } from "./components/header/header.component";
import { UserComponent } from "./components/user/user.component";
import { SharedModule } from "./components/shared/shared.module";
import { TasksModule } from "./components/tasks/tasks.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    TasksModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }