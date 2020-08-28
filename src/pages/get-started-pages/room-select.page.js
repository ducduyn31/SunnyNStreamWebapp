import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class RoomSelectPage extends Component {
  render() {
    const { styles } = this.props;
    return (
      <React.Fragment>
        <Grid container style={styles.fullPageContainer.css} spacing={4}>
          <Grid item>
            <Typography style={styles.roomSelectPage.title.css}>
              {' '}
              Which room you do want to join{' '}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Eg: S324, F331,..."
              variant="outlined"
              style={styles.roomSelectPage.input.css}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.style.getStartedPage,
  };
}

export default connect(mapStateToProps)(RoomSelectPage);
