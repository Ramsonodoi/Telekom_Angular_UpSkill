import { AddTechComponent } from "./add-tech.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('AddTechComponent', () => {
  let component: AddTechComponent
  let fixture: ComponentFixture<AddTechComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AddTechComponent]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechComponent)
    component = fixture.componentInstance;
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})