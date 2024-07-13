import { test, expect } from '@playwright/test';

test('Order Placement Test', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('https://automationexercise.com/');

    // Verify Home Page title
    const title = await page.title();
    if (title === 'Automation Exercise') {
        console.log('Home page is visible successfully!');
    } else {
        console.log('Home page title is incorrect.');
    }

    // Navigate to Cart
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByRole('link', { name: 'here' }).click();

    // Add first product to cart
    await page.locator('(//a[contains(text(),"Add to cart") and @data-product-id="1"])[1]').click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // Add second product to cart
    await page.locator('(//a[contains(text(),"Add to cart") and @data-product-id="2"])[1]').click();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify "Blue Top" is present in the cart
    const isItemVisible = await page.locator("//a[contains(text(),'Blue Top')]").isVisible();
    if (isItemVisible) {
        console.log('"Blue Top" is present in the cart!');
    } else {
        console.log('"Blue Top" is not visible in the cart.');
    }

    // Proceeding to the checkout page
    await page.getByText('Proceed To Checkout').click();

    // Clicking Register/Login button
    await page.getByRole('link', { name: 'Register / Login' }).click();

    // Fill details in Sign up and create an account
    await page.getByPlaceholder('Name').fill('pranto hassan');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('prantohasan6@gmail.com');
    await page.getByRole('button', { name: 'Signup' }).click();

    // Fill in personal details
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill('@Du108551');
    await page.locator('#days').selectOption('30');
    await page.locator('#months').selectOption('11');
    await page.locator('#years').selectOption('1995');
    await page.getByLabel('First name *').fill('pranto');
    await page.getByLabel('Last name *').fill('hassan');
    await page.getByLabel('Company', { exact: true }).fill('kinetik');
    await page.getByLabel('Address * (Street address, P.').fill('14 lorancelane');
    await page.getByLabel('Address 2').fill('kushtia');
    await page.getByLabel('Country *').selectOption('United States');
    await page.getByLabel('State *').fill('Boston');
    await page.getByLabel('City *').fill('MA');
    await page.locator('#zipcode').fill('02111');
    await page.getByLabel('Mobile Number *').fill('1771389287');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.getByRole('link', { name: 'Continue' }).click();

    // Verify logged in as username
    const isLoggedInTextVisible = await page.locator('text=Logged in as pranto hassan').isVisible();
    if (isLoggedInTextVisible) {
        console.log('User is logged in as pranto hassan!');
    } else {
        console.log('User is not logged in or the text is not visible.');
    }

    // Proceed to Cart and Checkout
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();

    // Fill in order message and place order
    await page.locator('textarea[name="message"]').fill('I would like to order this');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').fill('MD Pranto Hassan');
    await page.locator('input[name="card_number"]').fill('4242424242424242');
    await page.getByPlaceholder('ex.').fill('076');
    await page.getByPlaceholder('MM').fill('09');
    await page.getByPlaceholder('YYYY').fill('2028');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // Verify the success message
    const isOrderConfirmed = await page.locator('text=Congratulations! Your order has been confirmed!').isVisible();
    if (isOrderConfirmed) {
        console.log('Order confirmation message is displayed successfully!');
    } else {
        console.log('Order confirmation message is not visible.');
    }
});
