import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExcerciseComponent } from './edit-excercise.component';

describe('EditExcerciseComponent', () => {
  let component: EditExcerciseComponent;
  let fixture: ComponentFixture<EditExcerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExcerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExcerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
