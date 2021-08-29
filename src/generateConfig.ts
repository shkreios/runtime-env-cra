import { constants } from 'fs';

import { generateJSON, constants as recConstants } from './utils';
import { promises as fsp } from 'fs';

const runtimeConfig: Record<string, string> = {};

async function generateConfig({
  envConfig,
  envFile,
}: {
  envConfig: string;
  envFile: string;
}): Promise<string> {
  let envConfigExists = true;

  try {
    await fsp.access(envConfig, constants.F_OK);
  } catch (err) {
    console.log(`${envConfig} does not exist. Creating one...`);
    envConfigExists = false;
  }

  if (envConfigExists) {
    await fsp.unlink(envConfig);
  }

  try {
    await fsp.access(envFile, constants.F_OK);
  } catch (err) {
    throw err;
  }

  const content = await fsp.readFile(envFile, 'utf8');

  content
    .split(/\r?\n/)
    .map((line) => line.split('#')[0].trim())
    .forEach((line) => {
      const equalSignIndex = line.indexOf('=');
      const lengthOfString = line.length;

      if (equalSignIndex !== -1) {
        const key = line.slice(0, equalSignIndex);
        const value = line.slice(equalSignIndex + 1, lengthOfString);
        runtimeConfig[key] = value;
      }
    });

  if (!Object.keys(runtimeConfig).length) {
    throw new Error(
      'Could not generate runtime config. Check your .env format!',
    );
  }

  const result = generateJSON(runtimeConfig);

  await fsp.writeFile(envConfig, result, 'utf-8');

  return result;
}

export default generateConfig;
