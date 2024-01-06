import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayWith6CardsComponent } from './play-with6-cards/play-with6-cards.component';
import { PlayWith12CardsComponent } from './play-with12-cards/play-with12-cards.component';
import { CardComponent } from './card/card.component';
import { ScoreCardComponent } from './score-card/score-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayWith6CardsComponent,
    PlayWith12CardsComponent,
    CardComponent,
    ScoreCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
