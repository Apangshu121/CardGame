import { Component, Input, OnInit, inject } from '@angular/core';
import { Card } from './card.model';
import { NavigationEnd, Router } from '@angular/router';
import { ScoreCard } from './scoreCard.model';
import { ScoreService } from '../score.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  
  @Input() noOfCards!:number;
  @Input() rows!:number;
  @Input() cols!:number

  cards: Card[] = [];
  flippedCards: Card[] = [];
  showWinMessage = false;
  scoreCard: ScoreCard={
    moves:0,
    score:0,
    misses:0
  }

  private scoreService = inject(ScoreService)

  constructor(private router: Router, private location:Location) {
  }

  ngOnInit(): void {
    this.initializeCards();
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Reset the game when navigation occurs
        this.resetGame();
      }
    });

    this.scoreService.updateRounds()
  }

  resetGame(): void {
    this.showWinMessage = false;
    this.initializeCards();
    
    this.scoreCard={
      moves:0,
      score:0,
      misses:0
    }

    this.scoreService.updateScoreCard(this.scoreCard)
  }

  initializeCards(): void {
    const availableImages = [
      'assets/apple.png',
      'assets/avocado.png',
      'assets/grapes.png',
      'assets/lemon.png',
      'assets/mango.png',
      'assets/strawberry.png'
    ];

    if (this.noOfCards % 2 === 0 && this.noOfCards <= availableImages.length * 2) {
      const numberOfPairs = this.noOfCards / 2;

      //  The Array.from() is used to create an array of length numberOfPairs. Each pair is represented by 
      //  an array of two objects. The .flat() method is then applied to flatten this array of pairs into an     single-dimensional array.

      // Before flat()
      //  [
      // [{/* pair 1 */}, {/* pair 1 */}],
      // [{/* pair 2 */}, {/* pair 2 */}],
      // [{/* pair 3 */}, {/* pair 3 */}]
      //  ]

      // After flat()
      // [
      //   {/* pair 1 */},
      //   {/* pair 1 */},
      //   {/* pair 2 */},
      //   {/* pair 2 */},
      //   {/* pair 3 */},
      //   {/* pair 3 */}
      // ]
      
      const pairs = Array.from({ length: numberOfPairs }, (_, pairIndex) => {
        const mySet = new Set()
        const imageIndex = Math.floor(Math.random() * availableImages.length);

        while(mySet.has(imageIndex))
        {
          const imageIndex = Math.floor(Math.random() * availableImages.length);
          mySet.add(imageIndex)
        }

        const image = availableImages[imageIndex];
        
        return [
          { id: pairIndex * 2 + 1, flipped: false, matched: false, imagePath: image },
          { id: pairIndex * 2 + 2, flipped: false, matched: false, imagePath: image }
        ];
      }).flat();

      this.cards = this.shuffleCards([...pairs]);
    } else {
      console.error('Invalid number of cards or noOfCards is not divisible by 2.');
    }
  }

  //  Fisher-Yates (also known as Knuth) shuffle algorithm.
  shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const random = Math.random()

      // The value of j is between 0 and i (inclusive) to ensure that the random index is within the portion of the array that has not been shuffled yet.
      const j = Math.floor(random * (i + 1));
      
      // The elements at indices i and j are swapped using destructuring assignment. 
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    return cards;
  }

  flipCard(card: Card): void {
    if (!card.flipped && this.flippedCards.length < 2) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.scoreCard.moves+=1;
        this.scoreService.updateScoreCard(this.scoreCard)
        setTimeout(() => this.checkMatch(), 1000); // Delay for better visibility
      }
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.id !== card2.id && card1.imagePath === card2.imagePath) {
      card1.matched = true;
      card2.matched = true;
      this.flippedCards = [];
      this.scoreCard.score+=1;
      this.scoreService.updateScoreCard(this.scoreCard)

      if (this.cards.every(card => card.matched)) {
        this.showWinMessage = true;
      }
    } else {
      setTimeout(() => this.flipBack(), 1000); // Delay for better visibility
    }
  }

  flipBack(): void {
    this.flippedCards.forEach(card => card.flipped = false);
    this.flippedCards = [];
    this.scoreCard.misses+=1;
    this.scoreService.updateScoreCard(this.scoreCard)
  }

  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
