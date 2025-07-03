import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SlotMachinePage } from '../../pages/SlotMachinePage';

let slotMachinePage: SlotMachinePage;

Given('I open the slot machine game page', async function () {
  slotMachinePage = new SlotMachinePage(this.page);
  await slotMachinePage.goto();
});

When('I click the spin button', async function () {
  await slotMachinePage.clickSpin();
});

Then('the reels should start spinning', { timeout: 15000 }, async function () {
  // Wait for the data-spinning=true attribute in the container
  await this.page.waitForFunction(() => {
    const container = document.querySelector('[data-spinning]');
    return container?.getAttribute('data-spinning') === 'true';
  });

  // Check if the reels are actually rotating via the page method
  const spinning = await slotMachinePage.reelsAreSpinning();
  expect(spinning).toBe(true);
});

// Ensure that the reels stop after turning
Then('the reels should stop spinning', { timeout: 15000 }, async function () {
  await this.page.waitForFunction(() => {
  const container = document.getElementById('game-container');
  return container?.getAttribute('data-spinning') === 'true';
}, { timeout: 15000 });

  const spinning = await slotMachinePage.reelsAreSpinning();
  expect(spinning).toBe(false);
});
