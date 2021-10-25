import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ArticleService} from '../../common/article.service';

@Component({
    selector: 'app-architect-new-article',
    templateUrl: './architect-new-article.component.html',
    styleUrls: ['./architect-new-article.component.scss']
})
export class ArchitectNewArticleComponent implements OnInit {
    newArticleForm: any;

    constructor(private articleService: ArticleService) {
    }

    ngOnInit() {
        this.setupArticleForm();
    }

    private setupArticleForm() {
        this.newArticleForm = new FormGroup({
            newArticleTitle: new FormControl('')
        });
    }

    createNewArticle() {
        const newArticleTitle = this.newArticleForm.controls.newArticleTitle.value;

        if (newArticleTitle !== null && newArticleTitle !== '' ) {
            this.articleService.createNewArticle(newArticleTitle);
        }
    }
}
