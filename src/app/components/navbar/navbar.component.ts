import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ChangecolorDirective } from '../../shared/changecolor.directive';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, ChangecolorDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})


export class NavbarComponent {
  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false)

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLoggedIn()
  }

  logout(){
     this.authService.logout()
     this.authService.setLoggedIn(false)
     this.router.navigate(['login'])
  }
}
