import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I click the spin button', async function () {
  await this.slotMachinePage.clickSpin();
});

Then('the reels should start spinning', { timeout: 15000 }, async function () {
  // Expect data-spinning=true in the container
  await this.page.waitForFunction(() => {
    const container = document.querySelector('[data-spinning]');
    return container?.getAttribute('data-spinning') === 'true';
  });

  // Check with the page method
  const spinning = await this.slotMachinePage.reelsAreSpinning();
  expect(spinning).toBe(true);
});


Then('the reels should stop spinning', { timeout: 15000 }, async function () {
  // Expect data-spinning=false in the container (here it was true, I adjusted it)
  await this.page.waitForFunction(() => {
    const container = document.getElementById('game-container');
    return container?.getAttribute('data-spinning') === 'false';
  }, { timeout: 15000 });

  const spinning = await this.slotMachinePage.reelsAreSpinning();
  expect(spinning).toBe(false);
});
