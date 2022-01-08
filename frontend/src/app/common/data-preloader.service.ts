import {Injectable} from '@angular/core';
import {ArticleService} from './article.service';
import {CategoryService} from './category.service';
import {Article} from './models/article.model';
import {Subject, Subscription} from 'rxjs';
import {Category} from './models/category.model';
import {ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DataPreloaderService {
    isLoaded = false;
    article: Article;
    articleSubscription: Subscription;
    articleChange = new Subject<Article>();

    articleList = new Array<Article>();
    articleListSubscription: Subscription;
    articleListChange = new Subject<Array<Article>>();

    categoryList = new Array<Category>();
    categoryListSubscription: Subscription;
    categoryListChange = new Subject<Array<Category>>();

    constructor(private articleService: ArticleService,
                private categoryService: CategoryService,
                private route: ActivatedRoute) {
    }

    public async loadData() {
        this.setSubscriptions();
        await this.articleService.getAllArticles();
        await this.categoryService.getAllCategoriesWithIdTitleTag();
        this.isLoaded = true;
    }

    private setSubscriptions() {
        this.subscribeToArticleChange();
        this.subscribeToArticleListChange();
        this.subscribeToCategoryListChange();
    }

    private subscribeToArticleListChange() {
        this.articleListSubscription = this.articleService.articleListChange
            .asObservable()
            .subscribe((articleList) => {
                this.articleList = articleList;
                this.articleListChange.next(this.articleList);
            });
    }

    private subscribeToCategoryListChange() {
        this.categoryListSubscription = this.categoryService.categoryListChange
            .asObservable()
            .subscribe((categoryList) => {
                this.categoryList = categoryList;
                this.categoryListChange.next(this.categoryList);
            });
    }

    private subscribeToArticleChange() {
        this.articleSubscription = this.articleService.selectedArticleChange
            .asObservable()
            .subscribe((article) => {
                this.article = article;
                this.articleChange.next(this.article);
            });
    }

    getArticlesByCategoryId() {
        const articlesWithSelectedCategory = new Array<Article>();

        this.route.queryParams.subscribe((params) => {
            this.articleList.forEach((article) => {
                article.categories.forEach((category) => {
                    if (category.id === params.categoryId) {
                        articlesWithSelectedCategory.push(article);
                    }
                });
            });
        }).unsubscribe();

        return articlesWithSelectedCategory;
    }

    getArticleById() {
        let foundArticle;
        this.route.queryParams.subscribe((params) => {
            this.articleList.forEach((article) => {
                if (article.id === params.articleId) {
                    foundArticle = article;
                }
            });
        }).unsubscribe();

        return foundArticle;
    }
}
