import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {Router} from '@angular/router';
import {ArticleService} from '../../common/article.service';
import {TokenService} from '../../common/token.service';

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
                private tokenService: TokenService) {
    }

    ngOnInit(): void {
        if (this.tokenService.isTokenValid()) {
            if (!this.dataPreloaderService.isLoaded) {
                this.dataPreloaderService
                    .loadData()
                    .then(() => this.initArticleList());
            } else {
                this.initArticleList();
            }
        } else {
            this.router.navigateByUrl('/');
        }
    }

    ngOnDestroy(): void {
        this.articleList = [];
    }

    private initArticleList() {
        this.articleList = this.dataPreloaderService.getArticlesByCategoryId();
    }

}
