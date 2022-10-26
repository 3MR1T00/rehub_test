import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExcerciseComponent } from './components/edit-excercise/edit-excercise.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: LandingComponent }, 
  { path: 'edit-excercise/:id', component: EditExcerciseComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
