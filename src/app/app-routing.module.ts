import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// q1. url path가 home/{userId}로 접속하면 main page component를 출력하도록 완성 하시오.
// TODO: Write JS code here!'
const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'enter',
        loadChildren: () => import('./pages/enter/enter.module').then(m => m.EnterModule)
    },
    {
        path: 'example',
        loadChildren: () => import('./pages/example/example.module').then(m => m.ExampleModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
