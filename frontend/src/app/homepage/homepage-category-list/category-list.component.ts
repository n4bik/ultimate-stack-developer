import {Component, OnDestroy, OnInit} from '@angular/core';
import {GraphQLService} from '../../api/graphql.service';
import {Router} from '@angular/router';
import {Category} from '../../common/models/category.model';
import {DataPreloaderService} from '../../common/data-preloader.service';

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
                private dataPreloaderService: DataPreloaderService) {
    }

    ngOnInit(): void {
        if (!this.dataPreloaderService.isLoaded) {
            this.router.navigate(['/']);
        }
        this.initCategoryList();
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
