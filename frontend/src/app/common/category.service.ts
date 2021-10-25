import {Injectable} from '@angular/core';
import {GraphQLService} from '../api/graphql.service';
import {Subject} from 'rxjs';
import {Category} from './models/category.model';
import {ResponseModel} from './models/response.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categoryList = new Array<Category>();
    categoryListChange = new Subject<Array<Category>>();
    isCategoryListLoaded = false;

    constructor(private graphQlService: GraphQLService) {
    }

    public getAllCategoriesWithIdTitleTag() {
        if (this.isCategoryListLoaded !== true) {
            this.graphQlService
                .getAllCategoriesWithIdTitleTag()
                .then((response: ResponseModel) => {
                    response.data.findAllCategories.forEach((category) => {
                        if (this.categoryList
                            .filter((categoryFromList) => categoryFromList.id === category.id)
                            .length === 0) {
                            this.categoryList.push(new Category().deserialize(category));
                            this.isCategoryListLoaded = true;
                        }
                    });
                });
        }
        this.categoryListChange.next(this.categoryList);
    }
}
