import {Page} from '@playwright/test';
import {BaseComponent} from './BaseComponent';

export class DropdownComponent extends BaseComponent {

    constructor(page: Page, selector: string) {
        super(page, page.getByTestId(selector));
    }

    async click(): Promise<void> {
        await this.locator.click()
    }
}