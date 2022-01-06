const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    args: ['--start-maximized'],
    headless: false 
  });
  const context = await browser.newContext({
    viewport: null
  });
  const page = await context.newPage();
  await page.goto("https://dev3.freento.com/");
  
  await page.click("//html/body/div[2]/header/div[1]/div/ul/li[3]/a"); 
  await page.fill('input[name="firstname"]', "igor");
  await page.fill('input[name="lastname"]', "igor");
  var gen_email = Math.floor(Math.random() * 10000);
  var email = "test+" + gen_email + "@test.com";
  await page.fill('input[name="email"]', email);
  
  var enter_password = generatePassword();
  await page.fill('input[name="password"]', enter_password);
  await page.fill('input[name="password_confirmation"]', enter_password);
  //screenshot
  await page.screenshot({ path: "page.png", fullPage: true });
  await page.click('button:has-text("Create an Account")');
  // wait text "Thank you for..."
  await page.waitForSelector("text=Thank you for registering with Main Website Store.");
  await page.screenshot({ path: "finalpage.png", fullPage: true });
  // generation password
  function generatePassword() {
    var password = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 9; i++) {
      password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    password = password.charAt(0).toUpperCase() + password.substring(1);
    password += Math.floor(Math.random() * 10);
    return password;
  }

  await context.close();
  await browser.close();

})();
