import {Page} from '@playwright/test';
import {BaseComponent} from "./BaseComponent";

export class InputBox extends BaseComponent {
    testDataId: string;

    constructor(page: Page, testDataId: string) {
        super(page, page.getByTestId(testDataId));
        this.testDataId = testDataId;
    }

    /**
     * Inputs the given text into the designated locator after clearing any existing text.
     *
     * @param text - The string to be input.
     * @return A promise that resolves when the text has been input successfully.
     */
    async inputText(text: string): Promise<void> {
        await this.clear();
        await this.locator.fill(text);
    }

    async clear(): Promise<void> {
        await this.locator.fill('');
    }

    async getValue(): Promise<string> {
        return await this.locator.inputValue();
    }

}