import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class RoomPasscodePage extends Component {
  render() {
    const { styles } = this.props;
    return (
      <>
        <Grid container style={styles.fullPageContainer.css} spacing={4}>
          <Grid item>
            <Typography style={styles.roomPasscodePage.title.css}> Enter room password </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Passcode"
              variant="outlined"
              style={styles.roomPasscodePage.input.css}
              type="password"
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

export default connect(mapStateToProps)(RoomPasscodePage);
