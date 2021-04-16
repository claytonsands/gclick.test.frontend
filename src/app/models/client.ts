import { Email } from './email';

export class Client {
    id: number;
    subscription: string;
    name: string;
    nickname: string;
    status: number;
    emails: Email[];
    urlPhoto: string;
}
