import {Locator, Page} from "@playwright/test";

export class SuccessPage {
    private page: Page;
    private readonly locator: Locator;
    private rootLocator: string;

    constructor(page: Page, rootLocator: string) {
        this.page = page;
        this.rootLocator = rootLocator;
        this.locator = this.page.locator(rootLocator)
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