import {Deserializable} from 'src/app/common/models/deserializable.model';
import {Category} from './category.model';
import {Badge} from './badge.model';

export class Article implements Deserializable {
    public id: number;
    public title: string;
    public authorFirstName: string;
    public authorLastName: string;
    public authorFullName: string;
    public createDate: string;
    public publishDate: string;
    public categories: Category[];
    public categoriesBadgeTags = new Array<Badge>();
    public summary: string;
    public content: string;

    deserialize(input: any): this {
        input.title = input.title.toString().trim();
        input.authorFirstName = input.authorFirstName.toString().trim();
        input.authorLastName = input.authorLastName.toString().trim();
        input.authorFullName = input.authorFirstName + ' ' + input.authorLastName;

        if (input.summary !== null && typeof input.summary !== 'undefined') {
            input.summary = input.summary.toString().trim();
        }
        if (input.content !== null && typeof input.content !== 'undefined') {
            input.content = input.content.toString().trim();
        }

        Object.assign(this, input);

        // flushing categories considered as Objects after Object.assign
        // so we can deserialize the Categories' list
        this.categories = [];

        input.categories.forEach((category: Category) => {
            const badge = new Badge();
            const newCategory = new Category().deserialize(category);

            badge.categoryTag = category.tag;
            badge.categoryTitle = category.title;
            this.categories.push(newCategory);
            this.categoriesBadgeTags.push(badge);
        });

        return this;
    }
}
