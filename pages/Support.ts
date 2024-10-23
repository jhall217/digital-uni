import {Page} from '@playwright/test';
import {SendMessageComponent} from "../components/Support/SendMessageComponent";
import {SuccessPage } from './SuccessPage'

export class SupportPage {
    page: Page;
    messageComponent: SendMessageComponent;
    supportUrl: string;

    constructor(page: Page, supportUrl: string) {
        this.page = page;
        this.messageComponent = new SendMessageComponent(page);
        this.supportUrl = supportUrl;
    }

    async gotoPage(): Promise<SupportPage> {
        await this.page.goto(this.supportUrl);
        return this;
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getSuccessMessage(): Promise<SuccessPage> {
        //TODO:  handle success
        return undefined

    }
}
