import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStructureComponentComponent } from './leave-structure-component.component';

describe('LeaveStructureComponentComponent', () => {
  let component: LeaveStructureComponentComponent;
  let fixture: ComponentFixture<LeaveStructureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveStructureComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveStructureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
