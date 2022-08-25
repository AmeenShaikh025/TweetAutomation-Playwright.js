const { chromium, firefox, webkit, Browser, BrowserContext, Page } = require('playwright');

(async () => {

  const browser = await chromium.launch({
    headless: false
  });  // Or 'firefox' or 'webkit'.
  const context = await browser.newContext();
  const page = await context.newPage();


  // Go to https://twitter.com/i/flow/login
  await page.goto('https://twitter.com/i/flow/login');
  // Click label div >> nth=3
  await page.locator('label div').nth(3).click();
  //-----------
  // Fill input[name="text"]
  await page.locator('input[name="text"]').fill('Fill-email');
  // Click div[role="button"]:has-text("Next")
  await page.locator('div[role="button"]:has-text("Next")').click();
  //-----------
  
  let acceptedData = 'Enter your phone number or username';
  let isUsername = await page.locator('h1[role="heading"]').textContent();

  // If user logs in multiple times it's asking for username
  if(isUsername == acceptedData) {

    // Fill [data-testid="ocfEnterTextTextInput"]
    await page.locator('[data-testid="ocfEnterTextTextInput"]').fill('Fill-password');

    // Press Enter
    await page.locator('[data-testid="ocfEnterTextTextInput"]').press('Enter');
    // Fill input[name="password"]
    await page.locator('input[name="password"]').fill('Fill-userame');
    // Press Enter
    await page.locator('input[name="password"]').press('Enter');

  } else {

    // Click input[name="password"]
    await page.locator('input[name="password"]').click();
    // Fill input[name="password"]
    await page.locator('input[name="password"]').fill('Fill-password');
    // Click [data-testid="LoginForm_Login_Button"]
    await page.locator('[data-testid="LoginForm_Login_Button"]').click();

  }

//-------------------
  // Click [data-testid="tweetTextarea_0"] div >> nth=2
  await page.locator('[data-testid="tweetTextarea_0"] div').nth(2).click();

  await page.locator('[data-testid="tweetTextarea_0"] div').nth(2).fill('#GlazersOut   is the only way!');


  // Click [data-testid="tweetButtonInline"]
  await page.locator('[data-testid="tweetButtonInline"]').click();
//-------------------


  // Go to https://twitter.com/logout
  await page.goto('https://twitter.com/logout');

  // Click [data-testid="confirmationSheetConfirm"]
  await page.locator('[data-testid="confirmationSheetConfirm"]').click();

  await browser.close();

})();
