import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BuildUrPizzaPageComponent } from './build-ur-pizza-page.component';

describe('BuildUrPizzaPageComponent', () => {
  let component: BuildUrPizzaPageComponent;
  let fixture: ComponentFixture<BuildUrPizzaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BuildUrPizzaPageComponent]
    });
    fixture = TestBed.createComponent(BuildUrPizzaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
