import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  template: `
    <div class="alert alert-primary">
      <h2>Connexion à l'application</h2>
      <p>
        Utilisez le formulaire ci-dessous pour vous authentifier et utiliser
        pleinement notre application !
      </p>
    </div>

    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          type="email"
          formControlName="username"
          class="form-control"
          [class.is-invalid]="
            form.get('username').invalid && form.get('username').touched
          "
          placeholder="Adresse email"
        />
        <div class="invalid-feedback" *ngIf="form.get('username').invalid">
          <span *ngIf="form.get('username').hasError('required')">
            Votre adresse email est obligatoire
          </span>
          <span *ngIf="form.get('username').hasError('email')">
            Le format de l'adresse fournie n'est pas valide
          </span>
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          formControlName="password"
          class="form-control"
          [class.is-invalid]="
            form.get('password').invalid && form.get('password').touched
          "
          placeholder="Mot de passe"
        />
        <div class="invalid-feedback" *ngIf="form.get('password').invalid">
          Le mot de passe est obligatoire
        </div>
      </div>

       <div class="alert alert-danger" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-success">Connexion !</button>
      <a routerLink="/register" class="btn btn-link">
        Ou créez un nouveau compte
      </a>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  handleSubmit() {
    if (this.form.invalid) return;

    this.auth.authenticate(this.form.value).subscribe(
      resultat => {
        console.log(resultat);
        this.errorMessage = "";
        this.router.navigateByUrl("/");
      },
      error => {
        if (error.status === 401) {
          this.errorMessage =
            "Nous n'avons pas trouvé de compte utilisateur qui corresponde avec cet email et ce mot de passe";

          return;
        }

        this.errorMessage =
          "Un problème est survenu, veuillez ré-essayer plus tard";
      }
    );
  }


}
