import * as R from 'ramda';

import commonConfig from './common.config';

export default () => {
  const env = process.env.NODE_ENV || 'dev';
  // eslint-disable-next-line
  const envSpecificConfig = require(`./environments/${env}`);
  return R.mergeDeepRight(commonConfig(), envSpecificConfig);
};
