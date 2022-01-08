import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ArticleService} from '../../common/article.service';
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
                private cookieService: CookieService,
                private articleService: ArticleService) {
    }

    ngOnInit(): void {
        const tokenCookie = this.cookieService.get('token');
        const tokenExpectedCharCount = 179;

        if (tokenCookie === '' || tokenCookie.length !== tokenExpectedCharCount) {
            this.router.navigate(['/']);
        } else {
            if (!this.articleSubscription) {
                this.subscribeToSelectedArticleChange();
            }

            if (!this.dataPreloaderService.isLoaded) {
                this.dataPreloaderService.loadData()
                    .then(() => {
                        this.initArticle();
                    }).catch(() => {
                    this.router.navigate(['/']);
                });
            } else {
                this.initArticle();
            }
        }
    }

    ngOnDestroy() {
        this.article = null;
        if (this.articleSubscription) {
            this.articleSubscription.unsubscribe();
        }
    }

    private subscribeToSelectedArticleChange() {
        this.articleSubscription = this.articleService.selectedArticleChange
            .asObservable()
            .subscribe((article) => {
                this.article = article;
            });
    }

    private async initArticle() {
        await this.articleService.getArticleByIdFromUrlParams();
    }
}

