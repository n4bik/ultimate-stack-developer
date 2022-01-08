import {Component, OnDestroy, OnInit} from '@angular/core';
import {GraphQLService} from '../../api/graphql.service';
import {Router} from '@angular/router';
import {Category} from '../../common/models/category.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {TokenService} from '../../common/token.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
    categories: Array<Category>;
    categoryListSubscription: Subscription;
    subtitleContent = 'Please select category';

    constructor(private router: Router,
                private graphqlService: GraphQLService,
                private dataPreloaderService: DataPreloaderService,
                private tokenService: TokenService) {
    }

    ngOnInit(): void {
        if (this.tokenService.isTokenValid()) {
            if (!this.categoryListSubscription) {
                this.subscribeToCategoryListChange();
            }
            if (!this.dataPreloaderService.isLoaded) {
                this.dataPreloaderService
                    .loadData()
                    .then(() => this.initCategoryList());
            } else {
                this.initCategoryList();
            }
        } else {
            this.router.navigateByUrl('/');
        }
    }

    ngOnDestroy(): void {
        this.categories = [];
        if (this.categoryListSubscription) {
            this.categoryListSubscription.unsubscribe();
        }
    }

    navigateToArticlesList(id: number) {
        this.router.navigate(['/articles'], {queryParams: {categoryId: id}});
    }

    private initCategoryList() {
        this.categories = this.dataPreloaderService.categoryList;
    }

    private subscribeToCategoryListChange() {
        this.categoryListSubscription = this.dataPreloaderService.categoryListChange
            .asObservable()
            .subscribe((categories) => {
                this.categories = categories;
            });
    }
}
