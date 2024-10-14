import { setFailed } from '@actions/core';

import { setupReact } from './setup-react.mjs';

const run = async () => {
  try {
    const success = await setupReact();
    process.exit(success ? 0 : 1);
  } catch (err) {
    if (err instanceof Error) {
      setFailed(err);
    }
  }
};

run();
