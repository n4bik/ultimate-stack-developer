import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GraphQLService} from '../../api/graphql.service';
import {ResponseModel} from '../../common/models/response.model';
import {Category} from '../../common/models/category.model';

@Component({
  selector: 'app-architect-list-of-categories',
  templateUrl: './architect-list-of-categories.component.html',
  styleUrls: ['./architect-list-of-categories.component.scss']
})
export class ArchitectListOfCategoriesComponent implements OnInit {
  categories = new Array<Category>();

  constructor(private router: Router,
              private graphqlService: GraphQLService) { }

  ngOnInit(): void {
    this.graphqlService
        .getAllCategoriesWithIdTitleTag()
        .then((response: ResponseModel) => {
          response
              .data
              .findAllCategories
              .forEach((category) => {
            this.categories.push(new Category().deserialize(category));
          });
        });
  }

  navigateToEditCategory(id) {
      this.router.navigate(['the/architect/category'], {queryParams: {categoryId: id}});
  }
}
