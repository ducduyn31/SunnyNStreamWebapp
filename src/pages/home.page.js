import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Lottie from 'react-lottie';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import peekabooCat from '../private_assets/lottie-json/peekaboo-cat.json';
import TextShifter from '../components/TextShifter';
import { connect } from 'react-redux';

const getCompliment = () => {
  const compliments = [
    'Adorable',
    'Bewitching',
    'Charming',
    'Delightful',
    'Exciting',
    'Fascinating',
    'Good to you',
    'the one you like',
    'Heavenly',
    'Kissable',
    'the love-light in your eyes',
  ];

  return `Isn't she ${compliments[Math.floor(Math.random() * compliments.length)]}?`;
};

class HomePage extends Component {
  render() {
    const { styles } = this.props;

    return (
      <Grid container style={{ position: 'fixed' }}>
        <Grid item xs={12} md={6} style={styles.left.css}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: peekabooCat,
              renderSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={400}
            width={400}
            isClickToPauseDisabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6} style={styles.left.css}>
          <Grid container style={styles.right.css} spacing={2}>
            <Grid item>
              <TextShifter variant="h4" generator={getCompliment}>
                Don't you find her cute?
              </TextShifter>
            </Grid>
            <Grid item>
              <Typography variant="h4">What are you waiting for?</Typography>
            </Grid>
            <Grid item>
              <Link to="/get-started">
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  style={styles.dateButton.css}
                >
                  Let's Date
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.style.homePage,
  };
}

export default connect(mapStateToProps)(HomePage);
