import * as PIXI from 'pixi.js';
import { SlotMachine } from '../slots/SlotMachine';
import { AssetLoader } from '../utils/AssetLoader';
import { sound } from '../utils/sound';

export class UI {
    public container: PIXI.Container;
    private app: PIXI.Application;
    private slotMachine: SlotMachine;
    private spinButton!: PIXI.Sprite;

    constructor(app: PIXI.Application, slotMachine: SlotMachine) {
        this.app = app;
        this.slotMachine = slotMachine;
        this.container = new PIXI.Container();

        this.createSpinButton();
    }

    private createSpinButton(): void {
        try {
            this.spinButton = new PIXI.Sprite(AssetLoader.getTexture('button_spin.png'));

            this.spinButton.anchor.set(0.5);
            this.spinButton.x = this.app.screen.width / 2;
            this.spinButton.y = this.app.screen.height - 50;
            this.spinButton.width = 150;
            this.spinButton.height = 80;

            this.spinButton.interactive = true;
            this.spinButton.cursor = 'pointer';

            this.spinButton.on('pointerdown', this.onSpinButtonClick.bind(this));
            this.spinButton.on('pointerover', this.onButtonOver.bind(this));
            this.spinButton.on('pointerout', this.onButtonOut.bind(this));

            this.container.addChild(this.spinButton);

            this.slotMachine.setSpinButton(this.spinButton);
        } catch (error) {
            console.error('Error creating spin button:', error);
        }
    }

    private async onSpinButtonClick(): Promise<void> {
        sound.play('Spin button');

        // Update attribute before starting the spin
        this.updateSpinningAttr(true);

        // Wait for the spin to finish (slotMachine.spin must return Promise)
        await this.slotMachine.spin();

        // Update attribute after spin ends
        this.updateSpinningAttr(false);
    }

    private updateSpinningAttr(isSpinning: boolean): void {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;

        if (isSpinning) {
            gameContainer.setAttribute('data-spinning', 'true');
        } else {
            gameContainer.removeAttribute('data-spinning');
        }
    }

    private onButtonOver(event: PIXI.FederatedPointerEvent): void {
        (event.currentTarget as PIXI.Sprite).scale.set(1.05);
    }

    private onButtonOut(event: PIXI.FederatedPointerEvent): void {
        (event.currentTarget as PIXI.Sprite).scale.set(1.0);
    }
}
