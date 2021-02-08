import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
    {
        path: 'activity',
        loadChildren: () => import('./modules/activity/activity.module').then((m) => m.ActivityModule)
    },
    {
        path: 'statistics',
        loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule)
    },
    {
        path: 'enterData',
        loadChildren: () => import('./modules/enter-data/enter-data.module').then((m) => m.EnterDataModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
