import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error404',
  template: `
   <div class="alert alert-warning">
   <h2>La page recherché n'existe pas mon ami ...</h2>
   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rerum, sequi, nisi facere aspernatur eveniet unde nesciunt aperiam ad, aliquid dicta est reprehenderit. Ab deleniti quasi aut laborum consequuntur quas.</p>
   </div>
   <h2>L'adresse <strong>{{ currentUrl }} </strong>ne mène nulle part .... </h2>

   <div *ngIf="proposition">
   
    Aviez vous pensez <a routerLink="{{ proposition }}">{{ proposition }}</a>
   </div> 


  `,
  styles: []
})
export class Error404Component implements OnInit {


  currentUrl = window.location.pathname;
  proposition: string;


  constructor() { }


  ngOnInit() {

    let proposition: string;

    if(this.currentUrl.includes('cus')  || this.currentUrl.includes('omer') )
    {
      this.proposition = '/customers';
    }

    // console.log(this.route.snapshot.url[0].path);
  }

}
