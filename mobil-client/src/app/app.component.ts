import { UtilitiesService } from './services/utilities/utilities.service';
import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataSessionService } from './services/dataSession/data-session.service';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    //menu monitor
    {
      title: 'Home',
      url: '/monitor-home',
      icon: 'home',
      type : 0
    },
    {
      title: 'Cambiar Paciente',
      url: '/monitor-select-client',
      icon: 'medkit',
      type : 0
    },
    {
      title: 'Ajustes',
      url: '/monitor-user-settings',
      icon: 'settings',
      type : 0
    },/*
    {
      title: 'Nosotros',
      url: '/us',
      icon: 'people-circle',
      type : 0
    },*/
    //menu liente
    {
      title: 'Home',
      url: '/client-home',
      icon: 'home',
      type : 1
    },
    {
      title: 'Monitores',
      url: '/client-monitors-list',
      icon: 'people',
      type : 1
    },
    {
      title: 'Ajustes',
      url: '/client-user-settings',
      icon: 'settings',
      type : 1
    },/*
    {
      title: 'Nosotros',
      url: '/us',
      icon: 'people-circle',
      type : 1
    },*/
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    centeredSlides: true,
    spaceBetween: 20,
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataSessionService: DataSessionService,
    public utilitiesService : UtilitiesService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    //console.log(path);
    
  }

  logOut(){
    this.closeMenu();
    this.dataSessionService.logOut();
  }

  closeMenu() {
    this.menu.close('main-content');
  }
}
