import cookie from './cookie-manager';
import exitIntent from './exit-intent';
import getElement from './get-element';
import observeDom from './observe-dom'
import onError from './on-error';
import onUrlChange from './on-SPA-url-change';
import waitForConditions from './wait-for-conditions';

const feUtils = {
  cookie,
  exitIntent,
  getElement,
  observeDom,
  onError,
  onUrlChange,
  waitForConditions,
};

export default feUtils;
