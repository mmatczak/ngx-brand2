import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {enTelekomLabels} from './i18n/labels-en-telekom';
import {enNordwestLabels} from './i18n/labels-en-nordwest';
import {RouterModule} from '@angular/router';
import { Dialog1Component } from './dialog1/dialog1.component';
import { Dialog2Component } from './dialog2/dialog2.component';
import {TokenService} from './services/token.service';
import { InvalidTokenComponent } from './invalid-token/invalid-token.component';

@NgModule({
  declarations: [
    AppComponent,
    Dialog1Component,
    Dialog2Component,
    InvalidTokenComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'invalid-token',
        component: InvalidTokenComponent
      },
      {
        path: 'dialog1/:token',
        component: Dialog1Component,
        resolve: {
          token: TokenService
        }
      },
      {
        path: 'dialog2/:token',
        component: Dialog2Component,
        resolve: {
          token: TokenService
        }
      },
      {path: '**', redirectTo: '/invalid-token'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en-telekom');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en-telekom');
    translate.setTranslation('en-telekom', enTelekomLabels);
    translate.setTranslation('en-nordwest', enNordwestLabels);
  }
}
