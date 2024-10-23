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

    async click(): Promise<void> {
        await this.locator.click()
    }

    async isFlaggedAsRequired(): Promise<boolean> {
        try {
            let requiredFlagXpath = 'xpath=./../../div[2]';
            return await this.locator.locator(requiredFlagXpath).isVisible();
        } catch (error) {
            console.error('Error checking if flagged as required');
            return false;
        }
    }

}