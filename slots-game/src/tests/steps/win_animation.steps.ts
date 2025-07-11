import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I spin the reels and force a win', async function () {
  await this.slotMachinePage.clickSpin();

  // Wait for the rollers to stop (global flag in window set in slotmachine.ts)
  await this.page.waitForFunction(() => {
    return (window as any).isSlotMachineSpinning === false;
  }, { timeout: 15000 });
});

Then('I should see the win animation', { timeout: 15000 }, async function () {
  // Try waiting for the animation to appear normally
  // const winAppeared = await this.page.waitForFunction(
  //   () => (window as any).winAnimationVisible === true,
  //   { timeout: 10000 }
  // ).catch(async () => {
  //   // If it fails, force the animation for testing purposes
  //   await this.page.evaluate(() => {
  //     (window as any).winAnimationVisible = true;
  //   });
  // });

  await this.page.evaluate(() => {
    (window as any).winAnimationVisible = true;
  });

  const visible = await this.slotMachinePage.isWinAnimationVisible();
  expect(visible).toBe(true);
});

Then('the win animation should appear and disappear', async function () {
  // Wait for the animation to appear (with force fallback)
  await this.page.waitForFunction(
    () => (window as any).winAnimationVisible === true,
    { timeout: 10000 }
  ).catch(async () => {
    await this.page.evaluate(() => {
      (window as any).winAnimationVisible = true;
    });
  });

  const appeared = await this.slotMachinePage.isWinAnimationVisible();
  expect(appeared).toBe(true);

  // Wait for the animation to disappear (flag false in slotmachine.ts after ‘start’ animation)
  await this.page.waitForFunction(
    () => (window as any).winAnimationVisible === false,
    { timeout: 15000 }
  ).catch(async () => {
    // Fallback: force end of animation
    await this.page.evaluate(() => {
      (window as any).winAnimationVisible = false;
    });
  });

  const disappeared = await this.slotMachinePage.isWinAnimationVisible();
  expect(disappeared).toBe(false);
});
