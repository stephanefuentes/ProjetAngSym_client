import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" routerLink="/">Notre appli</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active"> 
        <a class="nav-link" routerLink="/customers">Mes clients</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/invoices">Mes factures</a>
      </li>
      
    </ul>

       <ul class="navbar-nav">
          <li class="nav-item" *ngIf="!isAuthenticated">
            <a routerLink="/register" class="btn btn-primary">Inscription</a>
          </li>
          <li class="nav-item" *ngIf="!isAuthenticated">
            <a routerLink="/login" class="btn btn-success">Connexion</a>
          </li>
          <li class="nav-item">
            <a routerLink="/profile" class="nav-link">
              <img
                src="http://robohash.org/lior"
                alt="Avatar de Lior"
                class="avatar"
              />
              Steph
            </a>
          </li>
          <li class="nav-item" *ngIf="isAuthenticated">
            <button class="btn btn-danger" (click)="handleLogout()">Déconnexion</button>
          </li>
        </ul>  
    
  </div>
</nav>
  `,
  styles: [
    `
      img.avatar {
        max-height: 24px;
        max-width: 24px;
        border-radius: 50%;
        margin-right: 10px;
        border: 1px solid grey;
      }
    `
  ]
})
export class NabvarComponent implements OnInit {

  isAuthenticated= false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();

    this.auth.authState.subscribe( state => {
      this.isAuthenticated = state;

    })
  }


  handleLogout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl('/login');
  }

}
