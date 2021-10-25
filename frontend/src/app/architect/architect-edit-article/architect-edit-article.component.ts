import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Article} from '../../common/models/article.model';
import {Category} from '../../common/models/category.model';
import {Subscription} from 'rxjs';
import {ArticleService} from '../../common/article.service';
import {CategoryService} from '../../common/category.service';

@Component({
    selector: 'app-architect-edit-article',
    templateUrl: './architect-edit-article.component.html',
    styleUrls: ['../architect-new-article/architect-new-article.component.scss']
})
export class ArchitectEditArticleComponent implements OnInit, OnDestroy {
    @ViewChild('articleTitle') public articleTitleElemRef: ElementRef;
    @ViewChild('articleDate') public articleDateElemRef: ElementRef;
    @ViewChild('authorName') public authorNameElemRef: ElementRef;
    @ViewChild('articleSummary') public articleSummaryElemRef: ElementRef;
    @ViewChild('articleContent') public articleContentElemRef: ElementRef;

    article: Article;
    articleSubscription: Subscription;
    categoryList: Category[];
    categoryListSubscription: Subscription;

    newArticleForm: any;
    currentArticleTitle: any;
    currentArticleSummary: any;
    currentArticleContent: any;

    isPreviewHidden = true;
    isArticleFormSetUp = false;

    constructor(private articleService: ArticleService,
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        if (!this.articleSubscription) {
            this.subscribeToSelectedArticleChange();
        }
        if (!this.categoryListSubscription) {
            this.subscribeToCategoryListChange();
        }

        this.categoryService.getAllCategoriesWithIdTitleTag();
        this.articleService.getArticleByIdFromUrlParams();
    }

    ngOnDestroy() {
        if (this.articleSubscription) {
            this.articleSubscription.unsubscribe();
        }
        if (this.categoryListSubscription) {
            this.categoryListSubscription.unsubscribe();
        }
    }

    private subscribeToSelectedArticleChange() {
        this.articleSubscription = this.articleService.selectedArticleChange
            .asObservable()
            .subscribe((article) => {
                this.article = article;
                this.setupArticleForm();
            });
    }

    private subscribeToCategoryListChange() {
        this.categoryListSubscription = this.categoryService.categoryListChange
            .asObservable()
            .subscribe((categoryList) => {
                this.categoryList = categoryList;
            });
    }

    private setupArticleForm() {
        if (this.isArticleFormSetUp === false) {
            this.newArticleForm = new FormGroup({
                newArticleTitle: new FormControl(this.article.title),
                newArticleSummary: new FormControl(this.article.summary),
                newArticleContent: new FormControl(this.article.content)
            });
            this.isArticleFormSetUp = true;
        }
    }

    async saveChangedArticle() {
        const newArticleTitle = this.newArticleForm.controls.newArticleTitle.value;
        const newArticleSummary = this.newArticleForm.controls.newArticleSummary.value.replace(/\n/g, '<br>');
        const newArticleContent = this.newArticleForm.controls.newArticleContent.value.replace(/\n/g, '<br>');

        await this.articleService.editArticleById(newArticleTitle, newArticleSummary, newArticleContent);
    }

    runArticlePreview() {
        this.isPreviewHidden = false;
        const newArtTitle = this.newArticleForm.controls.newArticleTitle.value;
        const newArtSummary = this.newArticleForm.controls.newArticleSummary.value;
        const newArtContent = this.newArticleForm.controls.newArticleContent.value;

        this.articleTitleElemRef.nativeElement.innerHTML = newArtTitle;
        this.articleSummaryElemRef.nativeElement.innerHTML = newArtSummary;
        this.articleContentElemRef.nativeElement.innerHTML = newArtContent;
    }
}
