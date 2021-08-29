import { promises as fsp } from 'fs';
import { isError } from '../src/utils';
import childProcess from 'child_process';
describe('runtime-env-cra', () => {
  afterAll(async () => {
    await fsp.unlink('./tests/utils/runtime-config.js').catch(() => {});
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw error if NODE_ENV is production and env var is not found in shell', async () => {
    process.env.NODE_ENV = 'production';

    let result: string | undefined;
    let error: Error | undefined;

    try {
      result = await new Promise((resolve, reject) =>
        childProcess.exec(
          'npm start -- --config-name ./tests/utils/runtime-config.js',

          (err, stdout, stderr) => {
            console.log();
            if (err) reject(err);
            else resolve(stdout);
          },
        ),
      );
    } catch (err) {
      error = isError(err)
        ? err
        : new Error(
            'Error doesn not follow formatting : ' + JSON.stringify(error),
          );
    }
    expect(result).toBeUndefined();
    expect(error).toBeDefined();
    expect(error?.message).toContain('no such file or directory, access ');
  });
});
