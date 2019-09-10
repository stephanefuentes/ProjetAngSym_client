import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CustomersService } from "../customers.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({ 
  selector: "app-customer-form",
  template: `
    <div class="alert alert-primary">
     <h2>{{ customer ? "Modifier un client" : "Créer une client" }}</h2>
      <p>
        Utilisez ce formulaire pour ajouter un nouveau client à votre base
        clients !
      </p>
    </div>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          formControlName="firstName"
          type="text"
          class="form-control"
          [class.is-invalid]="form.get('firstName').hasError('violation')"
          placeholder="Prénom du client"
        />

        <div
          class="invalid-feedback"
          *ngIf="form.get('firstName').hasError('violation')"
        >
          {{ form.get("firstName").getError("violation") }}
        </div>
      </div>
      <div class="form-group">
        <input
          formControlName="lastName"
          type="text"
          class="form-control"
          [class.is-invalid]="form.get('lastName').hasError('violation')"
          placeholder="Nom de famille du client"
        />
        <div
          class="invalid-feedback"
          *ngIf="form.get('lastName').hasError('violation')"
        >
          {{ form.get("lastName").getError("violation") }}
        </div>
      </div>
      <div class="form-group">
        <input
          formControlName="email"
          type="email"
          class="form-control"
          [class.is-invalid]="form.get('email').hasError('violation')"
          placeholder="Adresse email du client"
        />
        <div
          class="invalid-feedback"
          *ngIf="form.get('email').hasError('violation')"
        >
          {{ form.get("email").getError("violation") }}
        </div>
      </div>

      <div class="alert alert-danger" *ngIf="error">
          Nous n'avons pas pu sauvegarder votre client, veuillez ré-essayer plus
          tard.
      </div>

      <button type="submit" class="btn btn-success">
        {{ customer ? "Enregistrer les modifications" : "Créer le client" }}
      </button>

      <a routerLink="/customers" class="btn btn-link">
        Annuler et revenir à la liste
      </a>
    </form>
  `,
  styles: []
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;

  error = false;

  customer: Customer;

  constructor(private service: CustomersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initiliazeForm();

    // Nous observons les paramètres de la route (/customers/__:id__)
    // nous réagissons si ils changent
    this.route.paramMap
      // Transformation de l'observable
      .pipe(
        // On transforme une liste de paramètres en un simple nombre (l'id)
        map(params => +params.get("id")),
        // On transforme l'id en un observable
        switchMap(id => {
          if (id) {
            // Si on a un id, on tranforme en un observable d'un customer
            return this.service.find(id);
          }
          // Sinon on transforme en un observable de undefined
          return of(undefined);
        })
      )
      // On souscrit à l'observable qui va nous donner soit un customer soit undefined
      .subscribe(httpCustomer => {
        this.customer = httpCustomer;
        this.initiliazeForm();
      });

  }


  initiliazeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("")
    });

    if (this.customer)
      this.form.setValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email
      });


  }

  handleSubmit() {

    if(this.customer)
    {
      // update
      
      const customer = { ...this.customer, ...this.form.value };

      // On envoie une requête d'update et on observe le résultat 
      this.service.update(customer).subscribe(
        () => {
          this.router.navigateByUrl("/customers/" + customer.id);
        },
        httpError => this.handleHttpError(httpError)
      );

      return;

    }

    this.service.create(this.form.value).subscribe(
      (customer: Customer) => {
        // Redirection vers la page du customer
        // /customers/:id
        this.router.navigateByUrl('/customers/' + customer.id);

       },
      httpError => this.handleHttpError(httpError)
    );
  }



  handleHttpError(httpError) {
    // Si ce n'est pas des violations du formulaire
    // Plus un problème de connexion / serveur
    if (!httpError.error.violations) {
      this.error = true;
      return;
    }

    // Si c'est un soucis sur les données du formulaire
    this.error = false;
    for (let violation of httpError.error.violations) {
      // destructuration
      const { propertyPath, message } = violation;

      this.form.get(propertyPath).setErrors({
        violation: message
      });
    }
  }




  // pour le html ( pas mis dans le html par moi pour l'instant)
  hasViolation(fieldName: string) {
    return this.form.get(fieldName).hasError("violation");
  }

   // pour le html ( pas mis dans le html par moi pour l'instant)
  getViolationMessage(fieldName: string) {
    return this.form.get(fieldName).getError("violation");
  }




}
