import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {Subscription} from 'rxjs';
import {ArticleService} from '../../common/article.service';

@Component({
    selector: 'app-architect-list-of-articles',
    templateUrl: './architect-list-of-articles.component.html'
})
export class ArchitectListOfArticlesComponent implements OnInit, OnDestroy {
    articleList: Array<Article>;
    articleListSubscription: Subscription;

    constructor(private articleService: ArticleService) {
    }

    ngOnInit(): void {
        if (!this.articleListSubscription) {
            this.subscribeToArticleListChange();
        }
        this.articleService.getAllArticles();
    }

    ngOnDestroy() {
        if (this.articleListSubscription) {
            this.articleListSubscription.unsubscribe();
        }
    }

    private subscribeToArticleListChange() {
        this.articleListSubscription = this.articleService.articleListChange
            .asObservable()
            .subscribe((articleList) => {
                this.articleList = articleList;
            });
    }
}
