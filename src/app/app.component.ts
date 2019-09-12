import { Component, OnInit } from '@angular/core';
import { Router, ResolveStart, ResolveEnd } from '@angular/router';
import { UiService } from './ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  isLoading = false;

  constructor(private router: Router, private ui: UiService) {}

  ngOnInit()
  {

    this.ui.loadingState.subscribe(state => {
      this.isLoading = state;
    })


    this.router.events.subscribe( event => {
      if(event instanceof ResolveStart)
      {
        // on va charger 
        this.isLoading = true;
      }
      else if(event instanceof ResolveEnd)
      {
        // on a fini de charger
        this.isLoading = false;
      }
      //console.log(event);
    })
  }
    
}
