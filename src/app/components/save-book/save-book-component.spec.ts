import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBookComponent } from './save-book-component';

describe('AddBookComponent', () => {
  let component: SaveBookComponent;
  let fixture: ComponentFixture<SaveBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
