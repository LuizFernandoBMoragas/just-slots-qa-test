import { Locator, Page } from '@playwright/test';

export class SlotMachinePage {
    readonly page: Page;
    readonly spinButton: Locator;
    readonly slotMachineContainer: Locator;

    constructor(page: Page) {
        this.page = page;

        // As the spinButton is a PIXI sprite on canvas, we don't have an HTML button.
        // Click directly on the position of the button on the screen.
        this.spinButton = page.locator('canvas');

        // Main slot machine container (added data-spinning to it)
        this.slotMachineContainer = page.locator('[data-spinning]');
    }

    async goto() {
        await this.page.goto('http://localhost:9000');
    }

    async clickSpin() {
        // As there is no HTML button, we click on the position of the button inside the canvas
        const boundingBox = await this.spinButton.boundingBox();
        if (!boundingBox) throw new Error('Canvas not found to click on spin.');

        const clickX = boundingBox.x + boundingBox.width / 2;
        const clickY = boundingBox.y + boundingBox.height - 50; // Y position of the button according to UI.ts

        await this.page.mouse.click(clickX, clickY);
    }

    async reelsAreSpinning(): Promise<boolean> {
        return await this.page.evaluate(() => {
            const container = document.getElementById('game-container');
            return container?.getAttribute('data-spinning') === 'true';
        });
    }

    async isWinAnimationVisible(): Promise<boolean> {
        return await this.page.evaluate(() => {
            const winAnimation = document.querySelector('[data-win-animation]');
            if (!winAnimation) return false;

      // A flag no window ajuda, mas aqui vamos garantir que o elemento existe e está visível
            const style = window.getComputedStyle(winAnimation);
            return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        });
    }
}
