import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './homepage/homepage-login/login.component';
import {CategoryListComponent} from './homepage/homepage-category-list/category-list.component';
import {ArticleListComponent} from './homepage/homepage-article-list/article-list.component';
import {ArticleDisplayComponent} from './homepage/homepage-article-display/article-display.component';
import {ArchitectLoginComponent} from './architect/architect-login/architect-login.component';
import {ArchitectDashboardComponent} from './architect/architect-dashboard/architect-dashboard.component';
import {ArchitectEditArticleComponent} from './architect/architect-edit-article/architect-edit-article.component';
import {ArchitectNewArticleComponent} from './architect/architect-new-article/architect-new-article.component';
import {ArchitectListOfArticlesComponent} from './architect/architect-list-of-articles/architect-list-of-articles.component';
import {ArchitectListOfCategoriesComponent} from './architect/architect-list-of-categories/architect-list-of-categories.component';
import {ArchitectEditCategoryComponent} from './architect/architect-edit-category/architect-edit-category.component';
import {ArchitectNewCategoryComponent} from './architect/architect-new-category/architect-new-category.component';

const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'categories', component: CategoryListComponent
    },
    {
        path: 'articles', component: ArticleListComponent
    },
    {
        path: 'article', component: ArticleDisplayComponent
    },
    {
        path: 'the/architect', component: ArchitectLoginComponent
    },
    {
        path: 'the/architect/dashboard', component: ArchitectDashboardComponent
    },
    {
        path: 'the/architect/article', component: ArchitectEditArticleComponent
    },
    {
        path: 'the/architect/article/new', component: ArchitectNewArticleComponent
    },
    {
        path: 'the/architect/article/list', component: ArchitectListOfArticlesComponent
    },
    {
        path: 'the/architect/category', component: ArchitectEditCategoryComponent
    },
    {
        path: 'the/architect/category/new', component: ArchitectNewCategoryComponent
    },
    {
        path: 'the/architect/category/list', component: ArchitectListOfCategoriesComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
