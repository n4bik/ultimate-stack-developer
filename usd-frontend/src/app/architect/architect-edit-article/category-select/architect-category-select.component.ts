import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../common/models/article.model';
import {GraphQLService} from '../../../api/graphql.service';
import {Category} from '../../../common/models/category.model';
import {ResponseModel} from '../../../common/models/response.model';

@Component({
    selector: ' app-architect-category-select',
    templateUrl: './architect-category-select.component.html'
})
export class ArchitectCategorySelectComponent implements OnInit {
    @Input() article: Article;

    categoriesAssignedToArticle: Category[];
    availableCategories: Category[];

    constructor(private graphQLService: GraphQLService) {
    }

    ngOnInit(): void {
        this.updateAvailableCategories();
        this.updateCategoriesAssignedToArticle();
    }

    private updateAvailableCategories() {
        this.graphQLService
            .getAllCategoriesWithIdTitleTag()
            .then((response: ResponseModel) => {
                const allCategories = response.data.findAllCategories;
                const assignedCategories = this.categoriesAssignedToArticle;

                this.availableCategories = allCategories
                    .filter((x) => !assignedCategories
                        .filter((y) => y.title === x.title).length);
            });
    }

    private updateCategoriesAssignedToArticle() {
        this.categoriesAssignedToArticle = this.article.categories;
    }

    removeCategoryFromArticle(categoryTitle: string) {
        // Getting 0 index as there should be only one category available
        const selectedCategory: Category = this.categoriesAssignedToArticle
            .filter((category) => category.title === categoryTitle)[0];
        this.categoriesAssignedToArticle = this.categoriesAssignedToArticle
            .filter((category) => category !== selectedCategory);
        this.availableCategories.push(selectedCategory);

        this.graphQLService.removeCategoryFromArticle(this.article.id, selectedCategory.id);
    }

    assignCategoryToArticle(categoryTitle: string) {
        // Getting 0 index as there should be only one category available
        const selectedCategory: Category = this.availableCategories
            .filter((category) => category.title === categoryTitle)[0];
        this.availableCategories = this.availableCategories
            .filter((category) => category !== selectedCategory);
        this.categoriesAssignedToArticle.push(selectedCategory);
        this.graphQLService.assignCategoryToArticle(this.article.id, selectedCategory.id);
    }
}
