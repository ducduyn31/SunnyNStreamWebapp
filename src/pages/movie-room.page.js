import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Replay10Icon from '@material-ui/icons/Replay10';
import Replay30Icon from '@material-ui/icons/Replay30';
import Replay5Icon from '@material-ui/icons/Replay5';
import Forward5Icon from '@material-ui/icons/Forward5';
import Forward30Icon from '@material-ui/icons/Forward30';
import Forward10Icon from '@material-ui/icons/Forward10';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { VIDEO_STATE } from '../constants';

class MovieRoomPage extends Component {
  subVideoRef = player => {
    console.log('[Duy] MovieRoom.subVideoRef: %o', player);
  };

  render(): React.ReactNode {
    const { styles, videoState } = this.props;

    return (
      <Grid container style={styles.fullPageContainer.css}>
        <Grid item style={styles.mainScreen.css}>
          <div style={styles.mainScreen.wrapper.css}>
            <ReactPlayer
              url="http://192.168.0.101:5555/playlist.m3u8"
              width="100%"
              height="100%"
              playing
              muted
              style={styles.mainScreen.wrapper.player.css}
            />
          </div>
        </Grid>
        <Grid item style={styles.subScreen.css}>
          <div style={styles.subScreen.wrapper.css}>
            <ReactPlayer
              url="self"
              width="100%"
              height="100%"
              playing
              style={styles.subScreen.wrapper.player.css}
              ref={this.subVideoRef}
            />
          </div>
        </Grid>
        <Grid item style={styles.subScreen.css}>
          <div style={styles.subScreen.wrapper.css}>
            <ReactPlayer
              url="self"
              width="100%"
              height="100%"
              playing
              style={styles.subScreen.wrapper.player.css}
              ref={this.subVideoRef}
            />
          </div>
        </Grid>
        <Grid item style={styles.controllerPane.css}>
          <Tooltip
            title="Previous 30s"
            placement="bottom"
            style={styles.controllerPane.button.tooltip.css}
          >
            <IconButton style={styles.controllerPane.button.css}>
              <Replay30Icon style={styles.controllerPane.button.icon.css} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Previous 10s"
            placement="bottom"
            style={styles.controllerPane.button.tooltip.css}
          >
            <IconButton style={styles.controllerPane.button.css}>
              <Replay10Icon style={styles.controllerPane.button.icon.css} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Previous 5s"
            placement="bottom"
            style={styles.controllerPane.button.tooltip.css}
          >
            <IconButton style={styles.controllerPane.button.css}>
              <Replay5Icon style={styles.controllerPane.button.icon.css} />
            </IconButton>
          </Tooltip>
          {videoState === VIDEO_STATE.PLAYING ? (
            <Tooltip
              title="Pause"
              placement="bottom"
              style={styles.controllerPane.button.tooltip.css}
            >
              <IconButton style={styles.controllerPane.button.css} onClick={this.onPlayVideo}>
                <PlayArrowIcon style={styles.controllerPane.button.icon.css} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              title="Play"
              placement="bottom"
              style={styles.controllerPane.button.tooltip.css}
            >
              <IconButton style={styles.controllerPane.button.css} onClick={this.onPlayVideo}>
                <PlayArrowIcon style={styles.controllerPane.button.icon.css} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip
            title="Forward 5s"
            placement="bottom"
            style={styles.controllerPane.button.tooltip.css}
          >
            {}
            <IconButton style={styles.controllerPane.button.css}>
              <Forward5Icon style={styles.controllerPane.button.icon.css} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Forward 10s"
            placement="bottom"
            style={styles.controllerPane.button.tooltip.css}
          >
            <IconButton style={styles.controllerPane.button.css}>
              <Forward10Icon style={styles.controllerPane.button.icon.css} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Forward 30s"
            placement="bottom"
            style={styles.controllerPane.button.tooltip.css}
          >
            <IconButton style={styles.controllerPane.button.css}>
              <Forward30Icon style={styles.controllerPane.button.icon.css} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item style={styles.chatBoxPane.css}>
          Hello
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.style.movieRoomPage,
    videoState: state.room.videoState,
  };
}

export default connect(mapStateToProps)(MovieRoomPage);
