import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const pagesRoutes: Routes = [{
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
        children: [ { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        { path: 'accout-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
        
        //MAntenimetos
        { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimientos de usuario'} },
        { path: '**', component: NopagefoundComponent}

    ]
}];

// tslint:disable-next-line: variable-name
export const Pages_Routes = RouterModule.forChild(pagesRoutes);
