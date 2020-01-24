import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassPresentListComponent } from './teacher-class-present-list.component';

describe('TeacherClassPresentListComponent', () => {
  let component: TeacherClassPresentListComponent;
  let fixture: ComponentFixture<TeacherClassPresentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherClassPresentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherClassPresentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
