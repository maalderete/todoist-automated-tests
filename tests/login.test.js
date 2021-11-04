require('custom-env').env('local');
import { Selector, ClientFunction, t } from 'testcafe';

const loginLink = Selector('a').withText('Log in');
const emailBox = Selector('#email');
const passwordBox = Selector('#password');
const submitButton = Selector('.submit_btn');
const gotItButton = Selector('button').withText('Got it!');
const settingsButton = Selector('button').withAttribute('aria-label', 'Settings');
const loggedUserMail = Selector('.user_menu_email');

const getLocation = ClientFunction(() => document.location.href)

fixture `Login page test`
.page `https://todoist.com/`
.meta('Todoist fixture', 'tf-01');

test('As todoist user, providing valid credentials should allow succeful login', async t => {
    await t
        .click(loginLink)
        .typeText(emailBox, process.env.TODOIST_USER)
        .typeText(passwordBox, process.env.TODOIST_PASS)
        .click(submitButton)
        .wait(5000)
        .expect(getLocation()).contains('/app/today');

        if(await gotItButton.exists){
            await t.click(gotItButton);    
        }

       await t.click(settingsButton)
       .expect(loggedUserMail.innerText).contains(process.env.TODOIST_USER);
});


