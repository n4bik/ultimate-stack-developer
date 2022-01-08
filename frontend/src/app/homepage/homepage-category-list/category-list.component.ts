import {Component, OnDestroy, OnInit} from '@angular/core';
import {GraphQLService} from '../../api/graphql.service';
import {Router} from '@angular/router';
import {Category} from '../../common/models/category.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
    categories: Array<Category>;
    subtitleContent = 'Please select category';

    constructor(private router: Router,
                private graphqlService: GraphQLService,
                private dataPreloaderService: DataPreloaderService,
                private cookieService: CookieService) {
    }

    ngOnInit(): void {
        if (this.cookieService.get('token') === '') {
            this.router.navigate(['/']);
        }
        if (!this.dataPreloaderService.isLoaded) {
            this.dataPreloaderService.loadData().then(() => this.initCategoryList());
        } else {
            this.initCategoryList();
        }
    }

    ngOnDestroy(): void {
        this.categories = [];
    }

    navigateToArticlesList(id: number) {
        this.router.navigate(['/articles'], {queryParams: {categoryId: id}});
    }

    private initCategoryList() {
        this.categories = this.dataPreloaderService.categoryList;
    }
}
