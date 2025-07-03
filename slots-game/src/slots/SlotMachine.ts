import * as PIXI from 'pixi.js';
import 'pixi-spine';
import { Reel } from './Reel';
import { sound } from '../utils/sound';
import { AssetLoader } from '../utils/AssetLoader';
import { Spine } from "pixi-spine";

const REEL_COUNT = 4;
const SYMBOLS_PER_REEL = 6;
const SYMBOL_SIZE = 150;
const REEL_HEIGHT = SYMBOL_SIZE;
const REEL_SPACING = 10;

export class SlotMachine {
    public container: PIXI.Container;
    private reels: Reel[];
    private app: PIXI.Application;
    private isSpinning: boolean = false;
    private spinButton: PIXI.Sprite | null = null;
    private frameSpine: Spine | null = null;
    private winAnimation: Spine | null = null;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();
        this.reels = [];

        // Center the slot machine
        this.container.x = this.app.screen.width / 2 - ((SYMBOL_SIZE * SYMBOLS_PER_REEL) / 2);
        this.container.y = this.app.screen.height / 2 - ((REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1)) / 2);

        this.createBackground();

        this.createReels();

        this.initSpineAnimations();
    }

    private createBackground(): void {
        try {
            const background = new PIXI.Graphics();
            background.beginFill(0x000000, 0.5);
            background.drawRect(
                -20,
                -20,
                SYMBOL_SIZE * SYMBOLS_PER_REEL + 40, // Width now based on symbols per reel
                REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1) + 40 // Height based on reel count
            );
            background.endFill();
            this.container.addChild(background);
        } catch (error) {
            console.error('Error creating background:', error);
        }
    }

    private createReels(): void {
        // Create each reel
        for (let i = 0; i < REEL_COUNT; i++) {
            const reel = new Reel(SYMBOLS_PER_REEL, SYMBOL_SIZE);
            reel.container.y = i * (REEL_HEIGHT + REEL_SPACING);
            this.container.addChild(reel.container);
            this.reels.push(reel);
        }
    }

    public update(delta: number): void {
        // Update each reel
        for (const reel of this.reels) {
            reel.update(delta);
        }
    }

    public spin(): Promise<void> {
        if (this.isSpinning) return Promise.resolve();

        this.isSpinning = true;

        // Play spin sound
        sound.play('Reel spin');

        // Disable spin button
        if (this.spinButton) {
            this.spinButton.texture = AssetLoader.getTexture('button_spin_disabled.png');
            this.spinButton.interactive = false;
        }

        // Start spinning each reel with staggered delay
        for (let i = 0; i < this.reels.length; i++) {
            setTimeout(() => {
                this.reels[i].startSpin();
            }, i * 200);
        }

        return new Promise((resolve) => {
            // Stop reels sequentially
            for (let i = 0; i < this.reels.length; i++) {
                setTimeout(() => {
                    this.reels[i].stopSpin();

                    // When last reel stops, finalize spin
                    if (i === this.reels.length - 1) {
                        setTimeout(() => {
                            this.checkWin();
                            this.isSpinning = false;

                            if (this.spinButton) {
                                this.spinButton.texture = AssetLoader.getTexture('button_spin.png');
                                this.spinButton.interactive = true;
                            }

                            resolve();
                        }, 500); // wait a bit for stop animation to show
                    }
                }, i * 400);
            }
        });
    }

    private checkWin(): void {
        // const randomWin = Math.random() < 0.3; // 30% chance to win
        const randomWin = Math.random() < 1.0; // for tests purpouse only

        if (randomWin) {
            sound.play('win');
            console.log('Winner!');

            if (this.winAnimation) {
            this.winAnimation.visible = true;
            // Update global flag for test
            (window as any).winAnimationVisible = true;

            this.winAnimation.state.setAnimation(0, 'start', false);

            this.winAnimation.state.addListener({
                complete: (entry) => {
                if ((entry as any).animation.name === 'start') {
                    this.winAnimation!.visible = false;
                    // Update flag to false when animation ends
                    (window as any).winAnimationVisible = false;

                    if (this.winAnimation!.state.hasAnimation('idle')) {
                    this.winAnimation!.state.setAnimation(0, 'idle', true);
                    }
                }
                }
            });
            }
        } else {
            (window as any).winAnimationVisible = false;
        }
    }

    public setSpinButton(button: PIXI.Sprite): void {
        this.spinButton = button;
    }

    private initSpineAnimations(): void {
        try {
            const frameSpineData = AssetLoader.getSpine('base-feature-frame.json');
            if (frameSpineData) {
                this.frameSpine = new Spine(frameSpineData.spineData);

                // Position frame centered over reels
                this.frameSpine.x = (SYMBOL_SIZE * SYMBOLS_PER_REEL) / 2;
                this.frameSpine.y = (REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1)) / 2;

                if (this.frameSpine.state.hasAnimation('idle')) {
                    this.frameSpine.state.setAnimation(0, 'idle', true);
                }

                this.container.addChild(this.frameSpine);
            }

            const winSpineData = AssetLoader.getSpine('big-boom-h.json');
            if (winSpineData) {
                this.winAnimation = new Spine(winSpineData.spineData);

                // Position win animation in center
                this.winAnimation.x = (SYMBOL_SIZE * SYMBOLS_PER_REEL) / 2;
                this.winAnimation.y = (REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1)) / 2;

                this.winAnimation.visible = false;

                this.container.addChild(this.winAnimation);
            }
        } catch (error) {
            console.error('Error initializing spine animations:', error);
        }
    }

}
