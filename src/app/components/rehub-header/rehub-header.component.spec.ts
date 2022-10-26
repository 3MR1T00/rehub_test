import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehubHeaderComponent } from './rehub-header.component';

describe('RehubHeaderComponent', () => {
  let component: RehubHeaderComponent;
  let fixture: ComponentFixture<RehubHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RehubHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RehubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
