import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMenuComponent } from './teacher-menu.component';

describe('TeacherMenuComponent', () => {
  let component: TeacherMenuComponent;
  let fixture: ComponentFixture<TeacherMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
