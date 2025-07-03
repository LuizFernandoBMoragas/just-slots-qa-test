import * as PIXI from 'pixi.js';
import { AssetLoader } from '../utils/AssetLoader';

const SYMBOL_TEXTURES = [
    'symbol1.png',
    'symbol2.png',
    'symbol3.png',
    'symbol4.png',
    'symbol5.png',
];

const SPIN_SPEED = 50; // Pixels per frame
const SLOWDOWN_RATE = 0.95; // Rate at which the reel slows down

export class Reel {
    public container: PIXI.Container;
    private symbols: PIXI.Sprite[];
    private symbolSize: number;
    private symbolCount: number;
    private speed: number = 0;
    private isSpinning: boolean = false;

    constructor(symbolCount: number, symbolSize: number) {
        this.container = new PIXI.Container();
        this.symbols = [];
        this.symbolSize = symbolSize;
        this.symbolCount = symbolCount;

        this.createSymbols();
    }

    private createSymbols(): void {
        // Create symbols for the reel, arranged horizontally

        for (let i = 0; i < this.symbolCount; i++) {
            const symbol = this.createRandomSymbol();

            symbol.x = i * this.symbolSize;
            symbol.y = 0;
            symbol.width = this.symbolSize;
            symbol.height = this.symbolSize;

            this.container.addChild(symbol);
            this.symbols.push(symbol);
        }
    }

    private createRandomSymbol(): PIXI.Sprite {
        // TODO:Get a random symbol texture

        // TODO:Create a sprite with the texture
        
        const randomIndex = Math.floor(Math.random() * SYMBOL_TEXTURES.length);
        const textureName = SYMBOL_TEXTURES[randomIndex];
        const texture = AssetLoader.getTexture(textureName);

        return new PIXI.Sprite(texture);
    }

    public update(delta: number): void {
        if (!this.isSpinning && this.speed === 0) return;

        // TODO:Move symbols horizontally
        for (const symbol of this.symbols) {
            symbol.x -= this.speed * delta;
        }

        const firstSymbol = this.symbols[0];

        if (firstSymbol.x + this.symbolSize < 0) {
            const removed = this.symbols.shift()!;
            const lastSymbol = this.symbols[this.symbols.length - 1];

            removed.x = lastSymbol.x + this.symbolSize;
            removed.texture = this.createRandomSymbol().texture;

            this.symbols.push(removed);
        }

        // If we're stopping, slow down the reel
        if (!this.isSpinning && this.speed > 0) {
            this.speed *= SLOWDOWN_RATE;

            // If speed is very low, stop completely and snap to grid
            if (this.speed < 0.5) {
                this.speed = 0;
                this.snapToGrid();
            }
        }
    }

    private snapToGrid(): void {
        // TODO: Snap symbols to horizontal grid positions
        for (let i = 0; i < this.symbols.length; i++) {
            this.symbols[i].x = i * this.symbolSize;
        }
    }

    public startSpin(): void {
        this.isSpinning = true;
        this.speed = SPIN_SPEED;
    }

    public stopSpin(): void {
        this.isSpinning = false;
        // The reel will gradually slow down in the update method
    }
}
