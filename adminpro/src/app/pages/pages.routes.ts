import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';


const pagesRoutes: Routes = [{
    path: '',
    component: PagesComponent,
        children: [ { path: 'dashboard', component: DashboardComponent},
        { path: 'progress', component: ProgressComponent},
        { path: 'graficas1', component: Graficas1Component},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        { path: 'accout-settings', component: AccoutSettingsComponent},
        { path: '**', component: NopagefoundComponent}
    ]
}];

// tslint:disable-next-line: variable-name
export const Pages_Routes = RouterModule.forChild(pagesRoutes);
