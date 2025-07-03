import { Browser, Page, chromium } from '@playwright/test';
import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch();
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
