import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCreateOrderComponent } from './manager-create-order.component';

describe('ManagerCreateOrderComponent', () => {
  let component: ManagerCreateOrderComponent;
  let fixture: ComponentFixture<ManagerCreateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCreateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
