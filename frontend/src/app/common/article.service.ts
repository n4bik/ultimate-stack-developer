import {Injectable} from '@angular/core';
import {Article} from './models/article.model';
import {ResponseModel} from './models/response.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphQLService} from '../api/graphql.service';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    articleList = new Array<Article>();
    articleListChange = new Subject<Array<Article>>();
    selectedArticleChange = new Subject<Article>();
    articleListByCategory = new Array<Article>();
    articleListByCategoryChange = new Subject<Array<Article>>();

    constructor(private graphQlService: GraphQLService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    public getAllArticles() {
        this.graphQlService.getAllArticles()
            .then((response: ResponseModel) => {
                response.data.findAllArticles.forEach((article) => {
                    if (this.articleList.filter((articleFromList) => articleFromList.id === article.id).length === 0) {
                        this.articleList.push(new Article().deserialize(article));
                        this.articleListChange.next(this.articleList);
                    }
                });
            });
    }

    public getArticlesByCategoryId() {
        this.route.queryParams.subscribe((params) => {
            this.graphQlService
                .getArticlesByCategoryId(params.categoryId)
                .then((response: ResponseModel) => {
                    response.data.findCategoryById.articles.forEach((article) => {
                        if (this.articleListByCategory.filter((articleFromList) => articleFromList.id === article.id).length === 0) {
                            this.articleListByCategory.push(new Article().deserialize(article));
                            this.articleListByCategoryChange.next(this.articleListByCategory);
                        }
                    });
                });
        }).unsubscribe();

        return this.articleListByCategory;
    }

    public getArticleByIdFromUrlParams(): Article {
        let selectedArticle;

        this.route.queryParams.subscribe((params) => {
            this.graphQlService
                .getArticleById(params.articleId)
                .then((response: ResponseModel) => {
                    selectedArticle = new Article().deserialize(response.data.findArticleById);
                    this.selectedArticleChange.next(selectedArticle);
                });
        }).unsubscribe();

        return selectedArticle;
    }

    public createNewArticle(newArticleTitle: string) {
        let articleId;
        this.graphQlService
            .createNewArticle(newArticleTitle)
            .toPromise()
            .then((response: ResponseModel) => articleId = response.data.newArticle.id)
            .finally(() => {
                if (articleId !== null) {
                    this.router.navigateByUrl('/the/architect/article?articleId=' + articleId);
                }
            });
    }

    editArticleById(newArticleTitle: string, newArticleSummary: string, newArticleContent: string) {
        this.route.queryParams.subscribe((params) => {
            this.graphQlService
                .editArticleById(
                    newArticleTitle,
                    newArticleSummary,
                    newArticleContent,
                    params.articleId)
                .subscribe(() => {
                    this.router.navigate(['the/architect/article/list']);
                });
        }).unsubscribe();
    }
}
