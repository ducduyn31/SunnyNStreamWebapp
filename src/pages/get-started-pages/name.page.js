import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class NamePage extends Component {
  render() {
    const { styles, nickname, onNickChange } = this.props;

    return (
      <>
        <Grid container style={styles.fullPageContainer.css} spacing={4}>
          <Grid item>
            <Typography style={styles.namePage.title.css}>
              {' '}
              What do you want people to call you{' '}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Your Nickname"
              variant="outlined"
              style={styles.namePage.input.css}
              defaultValue={nickname}
              onChange={e => onNickChange(e.target.value)}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.style.getStartedPage,
  };
}

export default connect(mapStateToProps)(NamePage);
