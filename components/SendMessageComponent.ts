import {type Page} from "@playwright/test";
import {InputBox} from "./base/InputBox";
import {ButtonComponent} from "./base/ButtonComponent";
import {ListBox} from "./base/ListBox";

export class SendMessageComponent {
    page: Page;
    nameInput: InputBox;
    emailInput: InputBox;
    phoneNumberInput: InputBox;
    baseLocationInput: InputBox;
    howToHelpInput: ListBox
    questionInput: InputBox;
    submitButton: ButtonComponent;


    constructor(page: Page) {
        this.page = page;
        this.nameInput = new InputBox(page, 'name');
        this.emailInput = new InputBox(page, 'email');
        this.phoneNumberInput = new InputBox(page, 'phoneNumber');
        this.baseLocationInput = new InputBox(page, 'dutyStation');
        this.howToHelpInput = new ListBox(page);
        this.questionInput = new InputBox(page, 'message')
        this.submitButton = new ButtonComponent(page, 'submit-button');

    }

}