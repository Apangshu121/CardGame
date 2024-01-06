import { Injectable } from '@angular/core';
import { ScoreCard } from './card/scoreCard.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor() {}

  private scoreCardSubject: BehaviorSubject<ScoreCard> =
    new BehaviorSubject<ScoreCard>({ moves: 0, score: 0, misses: 0 });

  private roundsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  scoreCard$: Observable<ScoreCard> = this.scoreCardSubject.asObservable();

  rounds$: Observable<number> = this.roundsSubject.asObservable();


  getScoreCard(): ScoreCard {
    return this.scoreCardSubject.value;
  }

  getRounds(): number {
    return this.roundsSubject.value;
  }
  
  updateScoreCard(scoreCard: ScoreCard): void {
    console.log(scoreCard);
    
    this.scoreCardSubject.next(scoreCard);
  }

  updateRounds():void{

    let total_rounds = this.roundsSubject.value;
    total_rounds++;

    this.roundsSubject.next(total_rounds)
  }

}
