import {type Page} from "@playwright/test";
import {InputBox} from "./base/InputBox";
import {ButtonComponent} from "./base/ButtonComponent";

export class SendMessageComponent {
    page: Page;
    nameInput: InputBox;
    submitButton: ButtonComponent;
    emailInput: InputBox;
    branchLocationInput: InputBox;
    phoneNumberInput: InputBox;
    reasonInput: InputBox
    questionInput: InputBox;


    constructor(page: Page) {
        this.page = page;
        this.nameInput = new InputBox(page, 'name');
        this.submitButton = new ButtonComponent(page, 'submit-button');
        this.emailInput = new InputBox(page, 'email');
        this.branchLocationInput = new InputBox(page, 'branch-location');
        this.phoneNumberInput = new InputBox(page, 'phone-number');
        this.reasonInput = new InputBox(page, 'reason');
        this.questionInput = new InputBox(page, 'question')

    }

}