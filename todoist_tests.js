require('custom-env').env('local');
import { Selector } from 'testcafe';

fixture `Todoist tests`
.page `https://todoist.com/`
.meta('Todoist fixture', 'tf-01')
.meta;

test('Successful login', async t => {
    const loginLink = Selector('a')
    .withText('Log in');

    await t
        .click(loginLink)
        .typeText('#email', process.env.TODOIST_USER)
        .typeText('#password', process.env.TODOIST_PASS)
        .click('.submit_btn');
});

