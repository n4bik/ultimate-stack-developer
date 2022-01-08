import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {Router} from '@angular/router';
import {ArticleService} from '../../common/article.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnDestroy {
    articleList: Array<Article>;
    subtitleContent = 'Please select article';

    constructor(private router: Router,
                private dataPreloaderService: DataPreloaderService,
                private articleService: ArticleService,
                private cookieService: CookieService) {
    }

    ngOnInit(): void {
        if (this.cookieService.get('token') === '') {
            this.router.navigate(['/']);
        }
        if (!this.dataPreloaderService.isLoaded) {
            this.dataPreloaderService.loadData().then(() => this.initArticleList());
        } else {
            this.initArticleList();
        }
    }

    ngOnDestroy(): void {
        this.articleList = [];
    }

    private initArticleList() {
        this.articleList = this.articleService.getArticlesByCategoryId();
    }
}
