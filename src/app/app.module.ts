import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeModule } from 'ng-qrcode'; // Importar el módulo de ng-qrcode
import { provideHttpClient } from '@angular/common/http';  // Importa la nueva función


//FIREBASE
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,QrCodeModule,AngularFireModule.initializeApp(environment.firebaseConfig),AngularFireAuthModule,AngularFirestoreModule,QRCodeModule, IonicModule.forRoot({
    swipeBackEnabled: false
  }), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient() // Agregar el proveedor de HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
