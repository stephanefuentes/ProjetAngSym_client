import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  template: `
    <h2>Creer un compte</h2>
    <form  [formGroup] = "form" (ngSubmit)="handleSubmit()">
    <div class="form-group">
        <input type="email"
              class="form-control"
                placeholder="email"
                formControlName="email"
        />

        <p *ngIf="email.hasError('violation')">
          {{ email.getError('violation') }}
        </p>
      </div>


    <div class="form-group">
        <input type="password"
              class="form-control"
                placeholder="password"
                formControlName="password"
        />

        <p *ngIf="form.get('password').hasError('violation')">
          {{ form.get('password').getError('violation') }}
        </p>

    </div>


    <div class="form-group">
        <input type="text"
              class="form-control"
                placeholder="url de l'avatar"
                formControlName="avatar"
        />
        
        <p *ngIf="form.get('avatar').hasError('violation')">
          {{ form.get('avatar').getError('violation') }}
        </p>

    </div>
    
    <div class="alert alert-danger" *ngIf="error">
      Une erreur inconnu est survenu ...
    </div>

    <button type="submit" class="btn btn-success">Inscription</button>
    </form>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {

  error = false;

  form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      avatar: new FormControl('')
  })

  constructor(private auth: AuthService,
               private router: Router,
                private ui: UiService) { }

  ngOnInit() { 
  }

  get email()
  {
    return this.form.get('email');
  }


  handleSubmit()
  {

    this.ui.activateLodading();

    this.auth.register(this.form.value).subscribe(
      () => {
        this.ui.deactivatedLoading();
        this.router.navigateByUrl('/login');

      },
      (httpError: HttpErrorResponse) => {
        this.ui.deactivatedLoading();
 
        if(httpError.status === 400)
        {
          // violation retourne par symfony

          // les 2 lignes en dessous sont identiques
              // const violations: Violation[] = httpError.error.violations;
              const violations = httpError.error.violations as Violation[];

              for(let apiViolation of violations)
              {
                this.form.get(apiViolation.propertyPath).setErrors({
                  violation: apiViolation.message
                })
              }
              return;
        }
        this.error = true;

      }
    );

  }


}

export interface Violation 
{
  propertyPath: string;
  message: string;
}
