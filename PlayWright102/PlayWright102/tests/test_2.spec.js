const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('PlayWright Vanilla JS - 2', () => {
  test('Scenario 2: Drag & Drop Sliders - Set value to 95', async ({ page }) => {
    const dragAndDropSlider = page.locator("//a[normalize-space(text())='Drag & Drop Sliders']");
    const slider = page.locator("#slider3");
    const output = page.locator("#rangeSuccess");

    // Navigate to the Selenium Playground
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    console.log("Navigated to Selenium Playground");

    // Click on 'Drag & Drop Sliders'
    await dragAndDropSlider.click();
    console.log("Clicked on 'Drag & Drop Sliders'");

    // Initial value
    let currentValue = await output.textContent();
    console.log('Initial slider value:', currentValue);

    // Target value
    const targetValue = 95;

    // Adjust slider position
    if (slider) {
        let isCompleted = false;
        while (!isCompleted) {
            const sliderBox = await slider.boundingBox();
            if (sliderBox) {
                const initialX = sliderBox.x + sliderBox.width / 2;
                const initialY = sliderBox.y + sliderBox.height / 2;

                // Move the slider to the right
                await page.mouse.move(initialX, initialY);
                await page.mouse.down();
                await page.mouse.move(initialX + 195, initialY); // Adjust movement based on slider behavior
                await page.mouse.up();

                // Check the updated value
                currentValue = await output.textContent();
                console.log('Current slider value:', currentValue);

                if (parseInt(currentValue) === targetValue) {
                    isCompleted = true;
                }
            }
        }
    }

    // Final validation
    console.log('Final slider value:', currentValue);
    await expect(output).toHaveText(`${targetValue}`);
})
})