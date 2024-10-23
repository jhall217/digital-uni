import {Page} from '@playwright/test';
import {BaseComponent} from './BaseComponent';

export class ButtonComponent extends BaseComponent {

    constructor(page: Page, testDataId: string) {
        super(page, page.getByTestId(testDataId));
    }

    async click(): Promise<void> {
        await this.locator.click()
    }
}