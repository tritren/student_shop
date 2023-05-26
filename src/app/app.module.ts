import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';

import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { AuthorizationMenuComponent } from './common/authorization-menu/authorization-menu.component';
import { JwtModule } from '@auth0/angular-jwt';


// import { CategoryComponent } from './modules/common/category/category.component';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}


registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"],
        disallowedRoutes: []
      },
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,


    //NZ-ZORRO
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzTypographyModule,
    NzLayoutModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
