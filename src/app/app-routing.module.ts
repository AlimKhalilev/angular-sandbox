import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule), canActivate: [AuthGuard] },
    { path: 'about', loadChildren: () => import('./pages/about-page/about-page.module').then((m) => m.AboutPageModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule), canActivate: [NonAuthGuard] },
    {
        path: 'registration',
        loadChildren: () => import('./pages/registration-page/registration-page.module').then((m) => m.RegistrationPageModule),
        canActivate: [NonAuthGuard]
    },
    { path: 'products', loadChildren: () => import('./pages/products-page/products-page.module').then(m => m.ProductsPageModule), canActivate: [AuthGuard] },
    { path: 'sandbox', loadChildren: () => import('./pages/sandbox-page/sandbox-page.module').then(m => m.SandboxPageModule) },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
