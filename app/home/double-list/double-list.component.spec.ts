import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleListComponent } from './double-list.component';

describe('DoubleListComponent', () => {
  let component: DoubleListComponent;
  let fixture: ComponentFixture<DoubleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
