import {test, expect} from '@playwright/test';
import {SupportPage} from "../pages/Support";
import {SendMessageComponent} from "../components/Support/SendMessageComponent";

let supportPage: SupportPage;
let messageComponent: SendMessageComponent

test.beforeEach(async ({page}) => {
    supportPage = new SupportPage(page, 'https://portal.dev.digitalu.teambespin.us/app/support');
    await supportPage.gotoPage();
    messageComponent = supportPage.messageComponent
});

test('message component contains expected fields', async ({page}) => {

    expect(await supportPage.getTitle()).toContain('Digital University | Support');

    // Message Component assertions
    expect(await messageComponent.getHeaderText()).toContain('Send Us a Message');
    expect(await messageComponent.submitButton.isDisplayed()).toBe(true);
    expect(await messageComponent.nameInput.isDisplayed()).toBe(true);
    expect(await messageComponent.baseLocationInput.isDisplayed()).toBe(true);
    expect(await messageComponent.emailInput.isDisplayed()).toBe(true);
    expect(await messageComponent.phoneNumberInput.isDisplayed()).toBe(true);
    // expect(await messageComponent.howToHelpInput.isDisplayed()).toBe(true);
    expect(await messageComponent.questionInput.isDisplayed()).toBe(true);

});

test('Submit no data results in required flags', async ({page}) => {

    await messageComponent.submitButton.click()

    // Required flags present
    expect(await messageComponent.nameInput.isFlaggedAsRequired()).toBe(true);
    expect(await messageComponent.emailInput.isFlaggedAsRequired()).toBe(true);
    expect(await messageComponent.baseLocationInput.isFlaggedAsRequired()).toBe(true);
    expect(await messageComponent.phoneNumberInput.isFlaggedAsRequired()).toBe(true);
    // expect(await messageComponent.howToHelpInput.isFlaggedAsRequired()).toBe(true);
    expect(await messageComponent.questionInput.isFlaggedAsRequired()).toBe(true);

})

test('Question Field should be flagged as required', async ({page}) => {

    await populateRequestForm("josh", "email@army.mil", "Navy", "1234567890", "Logging in");
    expect(await messageComponent.howToHelpInput.getSelectedOption()).toContain("Logging in")
    await messageComponent.submitButton.click()

    expect(await messageComponent.questionInput.isFlaggedAsRequired()).toBe(true);

})

test('Can continue after correcting requirement', async ({page}) => {
    await populateRequestForm("josh", "email@army.mil", "Navy", "1234567890", "Logging in");

    await messageComponent.submitButton.click()

    expect(await messageComponent.questionInput.isFlaggedAsRequired()).toBe(true);

    await messageComponent.questionInput.inputText("test");
    await messageComponent.submitButton.click()
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible({ timeout: 10000 });

})

// Helper Utility methods
async function populateRequestForm(nameInput: string, email: string, branch: string, phone: string, reason: string, question?: string,) {
    await messageComponent.nameInput.inputText(nameInput)
    await messageComponent.emailInput.inputText(email)
    await messageComponent.phoneNumberInput.inputText(phone)
    await messageComponent.baseLocationInput.inputText(branch)
    await messageComponent.howToHelpInput.selectOption(reason)

    if (question) {
        await messageComponent.questionInput.inputText(question)
    }
}


