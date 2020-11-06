import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'us',
    loadChildren: () => import('./views/us/us.module').then( m => m.UsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./views/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'us',
    loadChildren: () => import('./views/us/us.module').then( m => m.UsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./views/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'home-test',
    loadChildren: () => import('./views/home-test/home-test.module').then( m => m.HomeTestPageModule)
  },
  {
    path: 'selection-type-user',
    loadChildren: () => import('./views/users/selection-type-user/selection-type-user.module').then( m => m.SelectionTypeUserPageModule)
  },
  //Monitor
  {
    path: 'monitor-user-register',
    loadChildren: () => import('./views/users/monitor/monitor-user-register/monitor-user-register.module').then( m => m.MonitorUserRegisterPageModule)
  },
  {
    path: 'monitor-select-client',
    loadChildren: () => import('./views/users/monitor/monitor-select-client/monitor-select-client.module').then( m => m.MonitorSelectClientPageModule)
  },
  {
    path: 'monitor-load-client',
    loadChildren: () => import('./views/users/monitor/monitor-load-client/monitor-load-client.module').then( m => m.MonitorLoadClientPageModule)
  },
  {
    path: 'monitor-home',
    loadChildren: () => import('./views/users/monitor/monitor-home/monitor-home.module').then( m => m.MonitorHomePageModule)
  },
  //Cliente
  {
    path: 'client-user-register',
    loadChildren: () => import('./views/users/client/client-user-register/client-user-register.module').then( m => m.ClientUserRegisterPageModule)
  },
  {
    path: 'client-home',
    loadChildren: () => import('./views/users/client/client-home/client-home.module').then( m => m.ClientHomePageModule)
  },
  {
    path: 'client-monitors-list',
    loadChildren: () => import('./views/users/client/client-monitors-list/client-monitors-list.module').then( m => m.ClientMonitorsListPageModule)
  },
  {
    path: 'client-user-settings',
    loadChildren: () => import('./views/users/client/client-user-settings/client-user-settings.module').then( m => m.ClientUserSettingsPageModule)
  },
  {
    path: 'monitor-user-settings',
    loadChildren: () => import('./views/users/monitor/monitor-user-settings/monitor-user-settings.module').then( m => m.MonitorUserSettingsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
