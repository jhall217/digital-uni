import {Locator, Page} from '@playwright/test';


export class BaseComponent {
    page: Page;
    locator: Locator;
    locatorAsString: string;

    constructor(page: Page, locator: string | Locator) {
        this.page = page;

        if (typeof locator === 'string') {
            this.locatorAsString = locator;
            this.locator = this.page.locator(locator);
        } else {
            this.locator = locator;
        }
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