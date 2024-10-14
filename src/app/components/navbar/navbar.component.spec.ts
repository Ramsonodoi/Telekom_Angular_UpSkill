import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";
import { provideHttpClient } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { provideHttpClientTesting } from "@angular/common/http/testing";




describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterModule ],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting(),{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => '1'
            }
          }
        }
      }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent)
    component= fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have red <h2>', () => {
     const h2: HTMLElement = fixture.nativeElement.querySelector('h2')
     const computedStyle = window.getComputedStyle(h2)
     expect(computedStyle.color).toBe('red')
})

})