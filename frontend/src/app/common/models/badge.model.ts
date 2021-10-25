import {Deserializable} from './deserializable.model';

export class Badge implements Deserializable{
    categoryTag: string;
    categoryTitle: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
