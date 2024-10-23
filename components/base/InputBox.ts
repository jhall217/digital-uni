import {Page} from '@playwright/test';
import {BaseComponent} from "./BaseComponent";

export class InputBox extends BaseComponent {
    testDataId: string;

    constructor(page: Page, testDataId: string) {
        super(page, page.getByTestId(testDataId));
        this.testDataId = testDataId;
    }

    async inputText(text: string): Promise<void> {
        await this.locator.fill(text);
    }

    async clear(): Promise<void> {
        await this.locator.fill('');
    }

    async getValue(): Promise<string> {
        return await this.locator.inputValue();
    }

    async isRequiredErrorPresent(): Promise<boolean> {

        //*[@id="email"]/../../div[2]


        //TODO:  get error locator using component as root locator
        try {
            await this.page.locator(this.testDataId).isVisible()
            return true
        } catch (error) {
            return false;
        }
    }

}