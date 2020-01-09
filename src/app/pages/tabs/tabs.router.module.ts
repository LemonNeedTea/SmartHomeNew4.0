import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'main',
                children: [{
                    path: '',
                    loadChildren: '../main/main.module#MainPageModule'
                }]
            },
            {
                path: 'shop',
                children: [{
                    path: '',
                    loadChildren: '../shop/shop.module#ShopPageModule'
                }]
            },
            {
                path: 'smart',
                children: [{
                    path: '',
                    loadChildren: '../smart/smart.module#SmartPageModule'
                }]
            },
            // {
            //     path: 'profile',
            //     children: [{
            //         path: '',
            //         loadChildren: '../profile/profile.module#ProfilePageModule'

            //     }]
            // }


        ]
    },
    {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
