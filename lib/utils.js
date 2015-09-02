import path from 'path';
import { exec } from 'teen_process';
import log from './logger';


const ROTATE_SCRIPT_PATH = path.resolve(__dirname, '..', '..', 'osa', 'Rotate.applescript');

let rotateImage = async function (imgPath, deg) {
  log.debug(`Rotating image '${imgPath}' ${deg} degrees`);
  await exec('osascript', [ROTATE_SCRIPT_PATH, imgPath, deg]);
};

export { rotateImage };
