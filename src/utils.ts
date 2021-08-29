export const constants = {
  DEVELOPMENT: 'development',
  runtimeConfigPath: 'window.__RUNTIME_CONFIG__',
} as const;

export const generateJSON = (config: Record<string, string>): string =>
  `${constants.runtimeConfigPath} = ${JSON.stringify(config)};`;

export const isError = (value: unknown): value is Error =>
  typeof value === 'object' &&
  !!value &&
  'message' in value &&
  typeof (value as { message: unknown }).message === 'string';
