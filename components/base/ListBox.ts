import {Locator, Page} from "@playwright/test";

export class ListBox {
    private readonly locator: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.locator = page.getByRole('combobox', { name: 'How can we help you?*' })
    }

    async selectOption(option: string): Promise<void> {

        await this.locator.click()
        await this.page.getByText(option).click()

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

    async isFlaggedAsRequired(): Promise<boolean> {
        try {
            let requiredFlagXpath = 'xpath=./../../div[2]';
            return await this.locator.locator(requiredFlagXpath).isVisible();
        } catch (error) {
            console.error('Error checking if flagged as required');
            return false;
        }
    }

    async getSelectedOption() {
        return await this.locator.textContent()
    }
}
