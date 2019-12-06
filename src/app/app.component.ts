import {Component, HostBinding} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {TokenService} from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class')
  brandClass = '';

  myLabel$: Observable<string>;

  constructor(private translate: TranslateService, token: TokenService) {
    token.brandChanges.subscribe(newBrand => {
      if (newBrand) {
        this.brandClass = newBrand;
        this.translate.use(`en-${newBrand}`);
      }
    });
  }
}
