// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { RehubHeaderComponent } from './components/rehub-header/rehub-header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ExcerciseComponent } from './components/excercise/excercise.component';
import { EditExcerciseComponent } from './components/edit-excercise/edit-excercise.component';



@NgModule({
  declarations: [
    AppComponent,
    RehubHeaderComponent,
    ExcerciseComponent,
    EditExcerciseComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
