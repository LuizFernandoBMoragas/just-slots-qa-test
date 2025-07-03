// TODO: Implement sound player using the "howler" package
// @ts-ignore
import { Howl } from 'howler';

type SoundMap = {
  [alias: string]: Howl;
};

const sounds: SoundMap = {};

export const sound = {
  add: (alias: string, url: string): void => {
    if (!sounds[alias]) {
      sounds[alias] = new Howl({ src: [url] });
      console.log(`Sound added: ${alias} from ${url}`);
    }
  },

  play: (alias: string): void => {
    const s = sounds[alias];
    if (s) {
      s.play();
      console.log(`Playing sound: ${alias}`);
    } else {
      console.warn(`Sound not found: ${alias}`);
    }
  }
};
