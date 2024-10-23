import {Locator, Page} from '@playwright/test';


export class BaseComponent {
    page: Page;
    locator: Locator;

    constructor(page: Page, locator: Locator) {
        this.page = page;
        this.locator = locator;
    }

    async isDisplayed(timeout: number = 10 * 1000): Promise<boolean> {
        try {
            await this.locator.waitFor({state: 'visible', timeout});
            return true;
        } catch (error) {
            console.log(this.locator + ' was never visible after ' + timeout)
            return false;
        }
    }

}