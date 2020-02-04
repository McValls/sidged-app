import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyStudentsDialogComponent } from './notify-students-dialog.component';

describe('NotifyStudentsDialogComponent', () => {
  let component: NotifyStudentsDialogComponent;
  let fixture: ComponentFixture<NotifyStudentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyStudentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyStudentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
