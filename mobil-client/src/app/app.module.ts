import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { deployConf } from './utils/config';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: deployConf.apiLocalUrl/* deployConf.apiUrl */, options: {}};

//Libreria para el bluetooth
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    OpenNativeSettings,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
