import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassDialogComponent } from './new-class-dialog.component';

describe('NewClassDialogComponent', () => {
  let component: NewClassDialogComponent;
  let fixture: ComponentFixture<NewClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
