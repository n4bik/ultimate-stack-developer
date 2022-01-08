import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {Router} from '@angular/router';
import {ArticleService} from '../../common/article.service';
import {TokenService} from '../../common/token.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-article-display',
    templateUrl: './article-display.component.html'
})
export class ArticleDisplayComponent implements OnInit, OnDestroy {
    article: Article;
    articleSubscription: Subscription;

    constructor(private router: Router,
                private dataPreloaderService: DataPreloaderService,
                private articleService: ArticleService,
                private tokenService: TokenService) {
    }

    ngOnInit(): void {
        if (this.tokenService.isTokenValid()) {
            if (!this.articleSubscription) {
                this.subscribeToArticleChange();
            }
            if (!this.dataPreloaderService.isLoaded) {
                this.dataPreloaderService
                    .loadData()
                    .then(() => this.initArticle());
            } else {
                this.initArticle();
            }
        } else {
            this.router.navigate(['/']);
        }
    }

    ngOnDestroy() {
        this.article = null;
        if (this.articleSubscription) {
            this.articleSubscription.unsubscribe();
        }
    }

    private initArticle() {
        this.dataPreloaderService.getArticleDetailsByArticleId();
    }

    private subscribeToArticleChange() {
        this.articleSubscription = this.dataPreloaderService.articleChange
            .asObservable()
            .subscribe((article) => {
                this.article = article;
            });
    }
}

