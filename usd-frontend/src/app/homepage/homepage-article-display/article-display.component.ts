import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../common/models/article.model';
import {DataPreloaderService} from '../../common/data-preloader.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-article-display',
    templateUrl: './article-display.component.html'
})
export class ArticleDisplayComponent implements OnInit, OnDestroy {
    article: Article;

    constructor(private router: Router,
                private dataPreloaderService: DataPreloaderService) {
    }

    ngOnInit(): void {
        if (!this.dataPreloaderService.isLoaded) {
            this.router.navigate(['/']);
        }
        this.initArticle();
    }

    ngOnDestroy() {
        this.article = null;
    }

    private initArticle() {
        this.article = this.dataPreloaderService.getArticleById();
    }
}

