import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import NamePage from './name.page';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { nextStep, previousStep } from '../../actions';
import Lottie from 'react-lottie';
import lovingTiger from '../../private_assets/lottie-json/loving-tiger.json';
import RoomSelectPage from './room-select.page';
import RoomPasscodePage from './room-passcode.page';
import CompletePage from './complete.page';

const HomeButton = props => (
  <Tooltip title={'Home'}>
    <IconButton style={props.styles.homeButton.css}>
      <Link to="/">
        <HomeIcon style={props.styles.homeButton.icon.css} />
      </Link>
    </IconButton>
  </Tooltip>
);

const BackButton = props => {
  const { styles, progress, dispatch, steps } = props;
  const match = useRouteMatch();

  const handleGoBack = () => {
    dispatch(previousStep());
  };

  return (
    <Tooltip title={'Back'}>
      <IconButton onClick={handleGoBack} style={styles.backButton.css} disabled={progress === 0}>
        <Link to={`${match.path}/${progress > 0 ? steps[progress - 1].label : ''}`}>
          <ArrowBackIcon style={styles.backButton.icon.css} />
        </Link>
      </IconButton>
    </Tooltip>
  );
};

const NextStep = props => {
  const { styles, steps, progress, dispatch } = props;
  const match = useRouteMatch();

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleComplete = () => {};

  return (
    <div style={styles.nextStep.css}>
      {progress < steps.length - 1 ? (
        <Button
          variant="outlined"
          style={styles.nextStep.button.css}
          color="primary"
          disabled={progress === steps.length}
          onClick={handleNext}
        >
          <Link
            to={
              progress < steps.length - 1 ? `${match.url}/${steps[progress + 1].label}` : match.url
            }
          >
            Next
          </Link>
        </Button>
      ) : (
        <Button
          variant="outlined"
          style={styles.nextStep.button.css}
          color="primary"
          onClick={handleComplete}
        >
          <Link to={'/movie-booth'}>Complete</Link>
        </Button>
      )}

      <Stepper activeStep={progress}>
        {steps.map(step => {
          const { label, description } = step;

          return (
            <Step key={label}>
              <StepLabel>
                <Typography style={styles.nextStep.stepper.step.label.css}>
                  {description}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

class SlidingWindowPage extends Component {
  render(): React.ReactNode {
    const { path, url } = this.props.match;
    const { styles, steps, progress, dispatch } = this.props;

    return (
      <Grid container style={styles.fullPageContainer.css} spacing={4}>
        <BackButton styles={styles} progress={progress} dispatch={dispatch} steps={steps} />
        <HomeButton styles={styles} />
        <Switch>
          <Route exact path={`${path}`}>
            <Redirect to={`${url}/${steps[progress].label}`} />
          </Route>
          <Route path={`${path}/name`} component={NamePage} />
          <Route path={`${path}/room`} component={RoomSelectPage} />
          <Route path={`${path}/auth`} component={RoomPasscodePage} />
          <Route path={`${path}/complete`} component={CompletePage} />
        </Switch>
        <NextStep styles={styles} steps={steps} progress={progress} dispatch={dispatch} />

        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: lovingTiger,
            renderSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={400}
          width={400}
          isClickToPauseDisabled={true}
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
          }}
        />
      </Grid>
    );
  }
}

function mapStatesToProps(state) {
  return {
    styles: state.style.getStartedPage,
    steps: state.getStarted.steps,
    progress: state.getStarted.progress,
  };
}

export default connect(mapStatesToProps)(withRouter(SlidingWindowPage));
