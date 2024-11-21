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

  constructor(private authService: AuthService, private router: Router) {

  }


  logout(){
     this.authService.logout()
     this.router.navigate(['login'])
  }
}
