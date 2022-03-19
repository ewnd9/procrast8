'use strict';

const choo = require('choo');
const html = require('choo/html');
const styles = require('./options-styles');

chrome.storage.sync.get({
  badDomains: 'twitter.com',
  redirectTo: 'reddit.com'
}, function({ badDomains, redirectTo }) {
  const app = choo();

  console.log(app);
  app.model({
    state: {
      badDomains,
      redirectTo
    },
    effects: {
      save({ field, value }, state, send, done) {
        const nextState = { ...state, [field]: value };
        const { badDomains, redirectTo } = nextState;

        send('update', nextState, () => {});

        chrome.storage.sync.set({
          badDomains,
          redirectTo
        }, function() {
          chrome.runtime.sendMessage({ type: 'reload' }, () => done());
        });
      }
    },
    reducers: {
      update: data => data
    }
  });

  const Input = (state, send, field) => html`
    <input type="text" class=${styles.formControl} value=${state[field]} oninput=${e => send('save', { field, value: e.target.value })} />
  `;

  const mainView = (state, prev, send) => html`
    <main class=${styles.container}>
      <label class=${styles.formLabel}>
        Bad domains:
        ${Input(state, send, 'badDomains')}
      </label>

      <label class=${styles.formLabel}>
        Redirect to:
        ${Input(state, send, 'redirectTo')}
      </label>
    </main>
  `;

  app.router(route => [
    route('/', mainView)
  ]);

  const tree = app.start();
  document.body.appendChild(tree);
});
