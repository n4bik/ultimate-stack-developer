import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class GraphQLService {
    // for prod server use: private httpPrefix = 'https://';
    // for dev server use: private httpPrefix = 'http://';
    private httpPrefix = 'http://';

    // for production server use: private backendUrl = 'ultimatestackdeveloper.herokuapp.com';
    // for local server use: private backendUrl = 'localhost:8082';
    private backendUrl = 'localhost:8082'

    constructor(private httpClient: HttpClient,
                private cookieService: CookieService) {
    }

    getAllCategoriesWithIdTitleTag() {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                this.queryCreator(
                    'findAllCategories',
                    'id title tag',
                    null,
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    getCategoryById(categoryId: any) {
        if (typeof categoryId !== 'undefined') {
            return this.httpClient
                .post(
                    `${this.httpPrefix}${this.backendUrl}/graphql`,
                    this.queryCreator(
                        `findCategoryById(id: ${categoryId})`,
                        'id title tag',
                        null,
                        null),
                    this.createRequestOptions());
        }
    }

    getArticlesByCategoryId(categoryId: number) {
        if (typeof categoryId !== 'undefined') {
            return this.httpClient
                .post(
                    `${this.httpPrefix}${this.backendUrl}/graphql`,
                    this.queryCreator(
                        `findCategoryById(id: ${categoryId})`,
                        'title tag ' +
                        'articles { id title authorFirstName authorLastName createDate publishDate categories { id title tag } }',
                        null,
                        null),
                    this.createRequestOptions())
                .toPromise();
        }
    }

    getArticleById(articleId: any) {
        if (typeof articleId !== 'undefined') {
            return this.httpClient
                .post(
                    `${this.httpPrefix}${this.backendUrl}/graphql`,
                    this.queryCreator(
                        `findArticleById(id: ${articleId})`,
                        'id title authorFirstName authorLastName createDate publishDate summary content categories { id title tag }',
                        null,
                        null),
                    this.createRequestOptions());
        }
    }

    getAllArticles() {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                this.queryCreator(
                    `findAllArticles`,
                    'id title authorFirstName authorLastName createDate publishDate summary content categories { id title tag }',
                    null,
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    editArticleById(newTitle: string,
                    newSummary: string,
                    newContent: string,
                    articleId: any) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `editArticleById`,
                    `newTitle: \\"${newTitle}\\", newSummary: \\"${newSummary}\\", newContent: \\"${newContent}\\", id: ${articleId}`,
                    'id title summary content',
                    null),
                this.createRequestOptions());
    }

    editCategoryTitle(newCategoryTitle: any,
                      categoryId: any) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `updateCategoryTitleById`,
                    `newTitle: \\"${newCategoryTitle}\\", id: ${categoryId}`,
                    'id title tag',
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    editCategoryTag(newCategoryTag: any,
                    categoryId: any) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `updateCategoryTagById`,
                    `newTag: \\"${newCategoryTag}\\", id: ${categoryId}`,
                    'id title tag',
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    assignCategoryToArticle(articleId: number, categoryId: any) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `assignCategoryToArticle`,
                        `articleId: \\"${articleId}\\", categoryId: \\"${categoryId}\\"`,
                    'id title summary content',
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    removeCategoryFromArticle(articleId: number, categoryId: any) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `removeCategoryFromArticle`,
                    `articleId: \\"${articleId}\\", categoryId: \\"${categoryId}\\"`,
                    'id title summary content',
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    createNewArticle(articleTitle: string) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `newArticle`,
                        `title: \\"${articleTitle}\\", authorFirstName: \\"Tomasz\\", authorLastName: \\"Buga\\"`,
                    `id title`,
                    null),
                this.createRequestOptions());
    }

    createNewCategory(newCategoryTitle: any,
                      newCategoryTag: any) {
        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/graphql`,
                // mutationArgs uses \\" because GraphQL won't work properly with a single quote marks
                // response will be 200 status, but the values won't be persisted in the database
                this.mutationCreator(
                    `newCategory`,
                    `title: \\"${newCategoryTitle}\\", tag: \\"${newCategoryTag}\\"`,
                    `id title tag`,
                    null),
                this.createRequestOptions())
            .toPromise();
    }

    queryCreator(
        queryName: string,
        queryResponseItems: string,
        operationName: string,
        variables: string) {
        return `{
        "query":"{ ${queryName} { ${queryResponseItems} }}",
        "variables":${variables},
        "operationName":${operationName}
        }`;
    }

    mutationCreator(mutationName: string,
                    mutationArgs: string,
                    mutationResponseItems: string,
                    variables: string) {
        return `{"query":"mutation { ${mutationName}(${mutationArgs}) { ${mutationResponseItems} }}","variables":${variables}}`;
    }

    // default setting is token passed as header and CORS config (accept */*)
    createRequestOptions() {
        const httpOptions = {
            headers: new HttpHeaders()
        };

        httpOptions.headers = httpOptions.headers
            .set('Authorization', 'Bearer ' + this.cookieService.get('token'));

        httpOptions.headers = httpOptions.headers
            .set('Content-Type', 'application/json');

        httpOptions.headers = httpOptions.headers
            .set('Accept', '*/*');
        return httpOptions;
    }
}
