import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayWith6CardsComponent } from './play-with6-cards/play-with6-cards.component';
import { PlayWith12CardsComponent } from './play-with12-cards/play-with12-cards.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play-6-cards', component: PlayWith6CardsComponent },
  { path: 'play-12-cards', component: PlayWith12CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
