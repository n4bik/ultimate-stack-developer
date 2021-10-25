import {Component, OnInit} from '@angular/core';
import {Category} from '../../common/models/category.model';
import {GraphQLService} from '../../api/graphql.service';
import {ResponseModel} from '../../common/models/response.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-architect-edit-category',
    templateUrl: './architect-edit-category.component.html',
    styleUrls: ['../architect-new-article/architect-new-article.component.scss']
})
export class ArchitectEditCategoryComponent implements OnInit {
    category: Category;
    newCategoryForm: any;
    currentCategoryTitle: any;
    currentCategoryTag: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private graphQLService: GraphQLService) {
    }

    ngOnInit(): void {
        this.loadCategory();
    }

    private loadCategory() {
        this.route.queryParams.subscribe((params) => {
            this.graphQLService
                .getCategoryById(params.categoryId)
                .toPromise()
                .then((response: ResponseModel) => {
                    this.category = response.data.findCategoryById;
                })
                .finally(() => this.setupCategoryForm());
        });
    }

    private setupCategoryForm() {
        this.newCategoryForm = new FormGroup({
            newCategoryTitle: new FormControl(this.category.title),
            newCategoryTag: new FormControl(this.category.tag)
        });
    }

    saveChangedCategory() {
        const newCategoryTitle = this.newCategoryForm.controls.newCategoryTitle.value;
        const newCategoryTag = this.newCategoryForm.controls.newCategoryTag.value;

        this.route.queryParams.subscribe((params) => {
            this.graphQLService
                .editCategoryTitle(
                    newCategoryTitle,
                    params.categoryId)
                .then(() => {
                    this.graphQLService
                        .editCategoryTag(
                            newCategoryTag,
                            params.categoryId);
                })
                .finally(() => {
                    this.router.navigate(['the/architect/category/list']);
                });
        });
    }
}
