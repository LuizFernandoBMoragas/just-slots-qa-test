import { Given } from '@cucumber/cucumber';
import { SlotMachinePage } from '../../pages/SlotMachinePage';

let slotMachinePage: SlotMachinePage;

Given('I open the slot machine game page', async function () {
  slotMachinePage = new SlotMachinePage(this.page);
  await slotMachinePage.goto();
  
  // Checks if the victory animation is visible via Pixi displayed in window or DOM
  this.slotMachinePage = slotMachinePage;
});
