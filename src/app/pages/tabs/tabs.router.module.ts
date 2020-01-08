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
            {
                path: 'setting',
                children: [{
                    path: '',
                    loadChildren: '../setting/setting.module#SettingPageModule'

                }]
            }


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
