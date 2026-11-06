import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderPizzaPageComponent } from './order-pizza-page.component';

describe('OrderPizzaPageComponent', () => {
  let component: OrderPizzaPageComponent;
  let fixture: ComponentFixture<OrderPizzaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [OrderPizzaPageComponent]
    });
    fixture = TestBed.createComponent(OrderPizzaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
