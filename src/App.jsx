import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled, { css, ThemeProvider } from 'styled-components';
import treeChanges from 'tree-changes';

import history from 'modules/history';
import theme, { headerHeight } from 'modules/theme';
import { utils } from 'styled-minimal';

import config from 'config';
import { showAlert } from 'actions';
import NotFound from 'routes/NotFound';
import SystemAlerts from 'components/SystemAlerts';
import GlobalStyles from 'components/GlobalStyles';
import RoutePublic from 'components/RoutePublic';
import HomePage from './pages/home.page';
import GetStartedPage from './pages/get-started-pages';
import MovieRoomPage from './pages/movie-room.page';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const MainPrivate = ({ isAuthenticated }) =>
  isAuthenticated &&
  css`
    padding: ${utils.px(headerHeight)} 0 0;
  `;

const Main = styled.main`
  min-height: 100vh;

  ${MainPrivate};
`;

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', { variant: 'success', icon: 'bell' }));
    }
  }

  render() {
    const { dispatch, user } = this.props;

    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper logged={user.isAuthenticated}>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.name}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            {/* {user.isAuthenticated && <Header dispatch={dispatch} user={user} />}*/}
            <Main isAuthenticated={user.isAuthenticated}>
              <Switch>
                <RoutePublic
                  isAuthenticated={user.isAuthenticated}
                  path="/"
                  exact
                  component={HomePage}
                />
                <RoutePublic
                  isAuthenticated={user.isAuthenticated}
                  path="/get-started"
                  component={GetStartedPage}
                />
                <RoutePublic
                  isAuthenticated={user.isAuthenticated}
                  path="/movie-booth"
                  component={MovieRoomPage}
                />
                <Route component={NotFound} />
              </Switch>
            </Main>
            {/* <Footer />*/}
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default hot(connect(mapStateToProps)(App));
