import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWith6CardsComponent } from './play-with6-cards.component';

describe('PlayWith6CardsComponent', () => {
  let component: PlayWith6CardsComponent;
  let fixture: ComponentFixture<PlayWith6CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayWith6CardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayWith6CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
