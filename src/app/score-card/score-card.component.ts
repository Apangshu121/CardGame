import { Component, OnInit, inject } from '@angular/core';
import { ScoreCard } from '../card/scoreCard.model';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.scss'
})
export class ScoreCardComponent implements OnInit{
  scoreCard!:ScoreCard
  total_rounds!:number 

  private scoreCardService = inject(ScoreService)

  constructor(){
    this.scoreCard = {
      moves:0,
      score:0,
      misses:0
    }
  }
  
  ngOnInit(): void {
    this.scoreCardService.scoreCard$.subscribe((scoreCard) => {
      this.scoreCard = scoreCard;
    });

    this.scoreCardService.rounds$.subscribe((rounds) => {
      this.total_rounds = rounds
    })
  }
  
}
