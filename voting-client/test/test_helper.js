import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// Create fake document and window for React
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// Hoist properties of window onto global to mimic browser environment
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// Connect chai-immutable
chai.use(chaiImmutable);