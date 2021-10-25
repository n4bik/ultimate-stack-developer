import {Deserializable} from './deserializable.model';

export class Category implements Deserializable {
    public id: number;
    public title: string;
    public tag: string;

    deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }
}
