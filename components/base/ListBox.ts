import {Locator, Page} from "@playwright/test";

export class ListBox {
    private locator: Locator;

    constructor(page: Page) {
        this.locator = page.getByRole('listbox')
    }

    async selectOption(option: string): Promise<void> {

        await this.locator.click()
        await this.locator.getByText(option).click();

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

    async isRequiredErrorPresent(): Promise<boolean> {

        //*[@id="email"]/../../div[2]


        //TODO:  get error locator using component as root locator
        try {
            // await this.locator(this.testDataId).isVisible()
            return true
        } catch (error) {
            return false;
        }
    }
}
