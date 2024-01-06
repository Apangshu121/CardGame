import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWith12CardsComponent } from './play-with12-cards.component';

describe('PlayWith12CardsComponent', () => {
  let component: PlayWith12CardsComponent;
  let fixture: ComponentFixture<PlayWith12CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayWith12CardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayWith12CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
