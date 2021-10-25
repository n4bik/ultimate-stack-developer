import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './homepage/homepage-login/login.component';
import {HeaderComponent} from './homepage/homepage-common/ui/header/header.component';
import {FooterComponent} from './homepage/homepage-common/ui/footer/footer.component';
import {SubtitleComponent} from './homepage/homepage-common/ui/subtitle/subtitle.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategoryButtonComponent} from './common/category/category-button/category-button.component';
import {GraphQLService} from './api/graphql.service';
import {CategoryListComponent} from './homepage/homepage-category-list/category-list.component';
import {ArticleListComponent} from './homepage/homepage-article-list/article-list.component';
import {ArticleRowComponent} from './common/article/article-row/article-row.component';
import {CategoryBadgeComponent} from './common/category/category-badge/category-badge.component';
import {ArticleDisplayComponent} from './homepage/homepage-article-display/article-display.component';
import {ArchitectLoginComponent} from './architect/architect-login/architect-login.component';
import {ArchitectHeaderComponent} from './architect/architect-common/ui/header/architect-header.component';
import {ArchitectDashboardComponent} from './architect/architect-dashboard/architect-dashboard.component';
import {ArchitectEditArticleComponent} from './architect/architect-edit-article/architect-edit-article.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {ArchitectNewArticleComponent} from './architect/architect-new-article/architect-new-article.component';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {ArchitectCategorySelectComponent} from './architect/architect-edit-article/category-select/architect-category-select.component';
import {ArchitectListOfArticlesComponent} from './architect/architect-list-of-articles/architect-list-of-articles.component';
import {ArchitectListOfCategoriesComponent} from './architect/architect-list-of-categories/architect-list-of-categories.component';
import {ArchitectEditCategoryComponent} from './architect/architect-edit-category/architect-edit-category.component';
import {ArchitectNewCategoryComponent} from './architect/architect-new-category/architect-new-category.component';
import {LoaderComponent} from './common/loader/loader.component';
import {LoaderService} from './common/loader/services/loader.service';
import {LoaderInterceptor} from './common/loader/services/loader-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        SubtitleComponent,
        CategoryButtonComponent,
        CategoryListComponent,
        ArticleListComponent,
        ArticleRowComponent,
        CategoryBadgeComponent,
        ArticleDisplayComponent,
        ArchitectLoginComponent,
        ArchitectHeaderComponent,
        ArchitectDashboardComponent,
        ArchitectEditArticleComponent,
        ArchitectNewArticleComponent,
        ArchitectCategorySelectComponent,
        ArchitectListOfArticlesComponent,
        ArchitectListOfCategoriesComponent,
        ArchitectEditCategoryComponent,
        ArchitectNewCategoryComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        TextareaAutosizeModule
    ],
    providers: [
        GraphQLService,
        CookieService,
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
