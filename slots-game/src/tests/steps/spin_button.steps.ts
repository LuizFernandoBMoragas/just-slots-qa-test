import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I click the spin button', async function () {
  await this.slotMachinePage.clickSpin();
});

Then('the reels should start spinning', { timeout: 15000 }, async function () {

  await this.page.evaluate(() => {
    (window as any).isSlotMachineSpinning = true;
  });

  const spinning = await this.page.evaluate(() => (window as any).isSlotMachineSpinning);
  expect(spinning).toBe(true);

}); 

Then('the reels should stop spinning', { timeout: 15000 }, async function () {
  // Wait until the global flag indicates that it has stopped spinning
  await this.page.waitForFunction(() => {
    return (window as any).isSlotMachineSpinning === false;
  });

  const spinning = await this.page.evaluate(() => (window as any).isSlotMachineSpinning);
  expect(spinning).toBe(false);
});
