import {Deserializable} from './deserializable.model';

export class ResponseModel implements Deserializable {
    data: any;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
