import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let fixture = new AppComponent;

  beforeEach(() => {
    fixture = new AppComponent()
  })

  it ('should have a title angular-Interceptors', () => {
    expect(fixture.title).toEqual('angular-Interceptors')
  })
})