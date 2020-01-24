import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePresentismComponent } from './course-presentism.component';

describe('CoursePresentismComponent', () => {
  let component: CoursePresentismComponent;
  let fixture: ComponentFixture<CoursePresentismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePresentismComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePresentismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
