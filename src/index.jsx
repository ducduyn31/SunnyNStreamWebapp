import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import { showAlert } from 'actions';

import Loader from 'components/CatLoader';
import Reload from 'components/Reload';
import { store, persistor } from './store/index';

import App from './App';
import { register } from './serviceWorker';
import ReactPlayer from 'react-player';
import CamPlayer from './components/CamPlayer';

ReactPlayer.addCustomPlayer(CamPlayer);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

/* istanbul ignore next */
register({
  onUpdate: () => {
    store.dispatch(showAlert(<Reload />, { id: 'sw-update', icon: 'bolt', timeout: 0 }));
  },
});
