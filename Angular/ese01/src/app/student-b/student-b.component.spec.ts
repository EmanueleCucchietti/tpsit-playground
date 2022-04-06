import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBComponent } from './student-b.component';

describe('StudentBComponent', () => {
  let component: StudentBComponent;
  let fixture: ComponentFixture<StudentBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
