import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnDestroy {
    articleList: Array<Article>;
    subtitleContent = 'Please select article';

    constructor(private router: Router,
                private dataPreloaderService: DataPreloaderService) {
    }

    ngOnInit(): void {
        if (!this.dataPreloaderService.isLoaded) {
            this.router.navigate(['/']);
        }
        this.initArticleList();
    }

    ngOnDestroy(): void {
        this.articleList = [];
    }

    private initArticleList() {
        this.articleList = this.dataPreloaderService.getArticlesByCategoryId();
    }
}
