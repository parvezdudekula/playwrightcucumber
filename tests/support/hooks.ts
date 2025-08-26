import { Before, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30000);

Before(async function () {
  await this.init();
});
