import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { loadStoredToken } from './components/store/actions/login.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-Interceptors';

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.store.dispatch(loadStoredToken())
  }

}
