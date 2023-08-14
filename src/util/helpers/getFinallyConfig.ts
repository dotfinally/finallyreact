/**
 * Look for a config file called "finally.config.js".
 * If it exists, return values from it as a JS object.
 * If it doesn't exist, return an empty object.
 */

interface IFinallyConfig {
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  simple?: boolean;
}

const configDefaults: IFinallyConfig = {
  breakpoints: {
    xs: 600,
    sm: 900,
    md: 1200,
    lg: 1600,
    xl: 2000,
    xxl: 2400
  },
  simple: false
};

function setDefaults(config: IFinallyConfig): IFinallyConfig {
  return {
    breakpoints: {
      ...(configDefaults?.breakpoints || {}),
      ...config.breakpoints
    }
  };
}

export function getFinallyConfig(): IFinallyConfig {
  return setDefaults(getConfig());
}

function getConfig() {
  try {
    const config = require('../../../../finally.config.js');
    const data = config?.default || config;

    if (!data) {
      return {};
    }

    return data;
  } catch (error) {
    return {};
  }
}
