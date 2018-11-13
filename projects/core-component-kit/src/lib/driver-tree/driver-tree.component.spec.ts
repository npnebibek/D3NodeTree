import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTreeComponent } from './driver-tree.component';

describe('DriverTreeComponent', () => {
  let component: DriverTreeComponent;
  let fixture: ComponentFixture<DriverTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
