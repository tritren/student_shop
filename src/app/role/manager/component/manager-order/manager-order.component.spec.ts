import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrderComponent } from './manager-order.component';

describe('ManagerOrderComponent', () => {
  let component: ManagerOrderComponent;
  let fixture: ComponentFixture<ManagerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
