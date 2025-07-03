import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I spin the reels and force a win', async function () {
  await this.slotMachinePage.clickSpin();

  // Wait for spin to finish - check data-spinning false
  await this.page.waitForFunction(() => {
    const container = document.getElementById('game-container');
    return container?.getAttribute('data-spinning') === 'false';
  }, { timeout: 15000 });
});

Then('I should see the win animation', async function () {
  // Wait for the victory animation to become visible
  await this.page.waitForFunction(() => (window as any).winAnimationVisible === true, { timeout: 10000 });

  // Confirm visibility by page object function
  const visible = await this.slotMachinePage.isWinAnimationVisible();
  expect(visible).toBe(true);
});

Then('the win animation should appear and disappear', async function () {
  // Wait for the victory animation to become visible
  await this.page.waitForFunction(() => (window as any).winAnimationVisible === true, { timeout: 10000 });

  // Confirm visibility by page object function
  const visible = await this.slotMachinePage.isWinAnimationVisible();
  expect(visible).toBe(true);

  // Wait for the animation to disappear
  await this.page.waitForFunction(() => (window as any).winAnimationVisible === false, { timeout: 15000 });

  // Confirm that it's gone
  const notVisible = await this.slotMachinePage.isWinAnimationVisible();
  expect(notVisible).toBe(false);
});
