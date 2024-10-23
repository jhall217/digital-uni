import {test, expect} from '@playwright/test';
import {SupportPage} from "../pages/Support";
import {SendMessageComponent} from "../components/SendMessageComponent";

let supportPage: SupportPage;
let messageComponent: SendMessageComponent

test.beforeEach(async ({page}) => {
    supportPage = new SupportPage(page, 'https://portal.dev.digitalu.teambespin.us/app/support');
    await supportPage.gotoPage();
    messageComponent = supportPage.messageComponent
});

test('message component contains expected fields', async ({page}) => {

    expect(await supportPage.getTitle()).toContain('Expected');

    // Message Component assertions
    expect(await messageComponent.submitButton.isDisplayed()).toBe(true);
    expect(await messageComponent.nameInput.isDisplayed()).toBe(true);
    expect(await messageComponent.branchLocationInput.isDisplayed()).toBe(true);
    expect(await messageComponent.emailInput.isDisplayed()).toBe(true);
    expect(await messageComponent.phoneNumberInput.isDisplayed()).toBe(true);
    expect(await messageComponent.reasonInput.isDisplayed()).toBe(true);
    expect(await messageComponent.questionInput.isDisplayed()).toBe(true);

});

test('Submit no data results in required flags', async ({page}) => {

    await messageComponent.submitButton.click()

    // Required flags present
    expect(await messageComponent.nameInput.isRequiredErrorPresent()).toBe(true);
    expect(await messageComponent.emailInput.isRequiredErrorPresent()).toBe(true);
    expect(await messageComponent.branchLocationInput.isRequiredErrorPresent()).toBe(true);
    expect(await messageComponent.phoneNumberInput.isRequiredErrorPresent()).toBe(true);
    expect(await messageComponent.reasonInput.isRequiredErrorPresent()).toBe(true);
    expect(await messageComponent.questionInput.isRequiredErrorPresent()).toBe(true);

})

async function populateRequestForm(nameInput: string, email: string, branch: string, phone: string, reason: string, question: string) {
    await messageComponent.nameInput.inputText(nameInput)
    await messageComponent.emailInput.inputText(email)
    await messageComponent.branchLocationInput.inputText(branch)
    await messageComponent.reasonInput.inputText(reason)
    await messageComponent.phoneNumberInput.inputText(phone)
    await messageComponent.questionInput.inputText(question)

}

test('Question Field should be flagged as required', async ({page}) => {
    await populateRequestForm("josh", "email@address.com", "Navy", "phone", "reason", "question");

    await messageComponent.submitButton.click()

    expect(await messageComponent.questionInput.isRequiredErrorPresent()).toBe(true);

    await messageComponent.questionInput.inputText("test");

    expect(await messageComponent.questionInput.isRequiredErrorPresent()).toBe(false);

})

