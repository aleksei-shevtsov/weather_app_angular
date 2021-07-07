import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderstantdObservableComponent } from './understantd-observable.component';

describe('UnderstantdObservableComponent', () => {
  let component: UnderstantdObservableComponent;
  let fixture: ComponentFixture<UnderstantdObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderstantdObservableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderstantdObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
