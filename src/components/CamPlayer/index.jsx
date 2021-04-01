import React, { Component } from 'react';

import { isMediaStream, supportsWebKitPresentationMode } from 'react-player/lib/utils';

const HAS_NAVIGATOR = typeof navigator !== 'undefined';
const IS_IPAD_PRO =
  HAS_NAVIGATOR && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
const IS_IOS =
  HAS_NAVIGATOR &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) || IS_IPAD_PRO) &&
  !window.MSStream;

export default class CamPlayer extends Component {
  static displayName = 'CamPlayer';
  static canPlay = src => {
    if (src === 'self') return true;
    else if (src === 'not_implemented') return true;
    return false;
  };

  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
    this.addListeners(this.player);
    if (IS_IOS) {
      this.player.load();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
      this.removeListeners(this.prevPlayer);
      this.addListeners(this.player);
    }
  }

  componentWillUnmount() {
    this.removeListeners(this.player);
    if (this.hls) {
      this.hls.destroy();
    }
  }

  addListeners(player) {
    const { playsinline } = this.props;
    player.addEventListener('canplay', this.onReady);
    player.addEventListener('play', this.onPlay);
    player.addEventListener('waiting', this.onBuffer);
    player.addEventListener('playing', this.onBufferEnd);
    player.addEventListener('pause', this.onPause);
    player.addEventListener('seeked', this.onSeek);
    player.addEventListener('ended', this.onEnded);
    player.addEventListener('error', this.onError);
    player.addEventListener('enterpictureinpicture', this.onEnablePIP);
    player.addEventListener('leavepictureinpicture', this.onDisablePIP);
    player.addEventListener('webkitpresentationmodechanged', this.onPresentationModeChange);
    if (playsinline) {
      player.setAttribute('playsinline', '');
      player.setAttribute('webkit-playsinline', '');
      player.setAttribute('x5-playsinline', '');
    }
  }

  removeListeners(player) {
    player.removeEventListener('canplay', this.onReady);
    player.removeEventListener('play', this.onPlay);
    player.removeEventListener('waiting', this.onBuffer);
    player.removeEventListener('playing', this.onBufferEnd);
    player.removeEventListener('pause', this.onPause);
    player.removeEventListener('seeked', this.onSeek);
    player.removeEventListener('ended', this.onEnded);
    player.removeEventListener('error', this.onError);
    player.removeEventListener('enterpictureinpicture', this.onEnablePIP);
    player.removeEventListener('leavepictureinpicture', this.onDisablePIP);
    player.removeEventListener('webkitpresentationmodechanged', this.onPresentationModeChange);
  }

  // Proxy methods to prevent listener leaks
  onReady = (...args) => this.props.onReady(...args);
  onPlay = (...args) => this.props.onPlay(...args);
  onBuffer = (...args) => this.props.onBuffer(...args);
  onBufferEnd = (...args) => this.props.onBufferEnd(...args);
  onPause = (...args) => this.props.onPause(...args);
  onEnded = (...args) => this.props.onEnded(...args);
  onError = (...args) => this.props.onError(...args);
  onEnablePIP = (...args) => this.props.onEnablePIP(...args);

  onDisablePIP = e => {
    const { onDisablePIP, playing } = this.props;
    onDisablePIP(e);
    if (playing) {
      this.play();
    }
  };

  onPresentationModeChange = e => {
    if (this.player && supportsWebKitPresentationMode(this.player)) {
      const { webkitPresentationMode } = this.player;
      if (webkitPresentationMode === 'picture-in-picture') {
        this.onEnablePIP(e);
      } else if (webkitPresentationMode === 'inline') {
        this.onDisablePIP(e);
      }
    }
  };

  onSeek = e => {
    this.props.onSeek(e.target.currentTime);
  };

  shouldUseAudio(props) {
    // if (props.config.forceVideo) {
    //   return false
    // }
    // if (props.config.attributes.poster) {
    //   return false // Use <video> so that poster is shown
    // }
    // return AUDIO_EXTENSIONS.test(props.url) || props.config.forceAudio
    return false;
  }

  load(url) {
    if (url === 'self') {
      navigator.getUserMedia(
        {
          video: true,
          audio: false,
        },
        webcamStream => {
          this.player.srcObject = webcamStream;
        },
        error => {
          console.warn(error);
        },
      );
    }
  }

  play() {
    const promise = this.player.play();
    if (promise) {
      promise.catch(this.props.onError);
    }
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.removeAttribute('src');
    if (this.dash) {
      this.dash.reset();
    }
  }

  seekTo(seconds) {
    this.player.currentTime = seconds;
  }

  setVolume(fraction) {
    this.player.volume = fraction;
  }

  mute = () => {
    this.player.muted = true;
  };

  unmute = () => {
    this.player.muted = false;
  };

  enablePIP() {
    if (this.player.requestPictureInPicture && document.pictureInPictureElement !== this.player) {
      this.player.requestPictureInPicture();
    } else if (
      supportsWebKitPresentationMode(this.player) &&
      this.player.webkitPresentationMode !== 'picture-in-picture'
    ) {
      this.player.webkitSetPresentationMode('picture-in-picture');
    }
  }

  disablePIP() {
    if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) {
      document.exitPictureInPicture();
    } else if (
      supportsWebKitPresentationMode(this.player) &&
      this.player.webkitPresentationMode !== 'inline'
    ) {
      this.player.webkitSetPresentationMode('inline');
    }
  }

  setPlaybackRate(rate) {
    this.player.playbackRate = rate;
  }

  getDuration() {
    if (!this.player) return null;
    const { duration, seekable } = this.player;
    // // on iOS, live streams return Infinity for the duration
    // // so instead we use the end of the seekable timerange
    // if (duration === Infinity && seekable.length > 0) {
    //   return seekable.end(seekable.length - 1)
    // }
    // return duration
    return 0;
  }

  getCurrentTime() {
    if (!this.player) return null;
    return this.player.currentTime;
  }

  getSecondsLoaded() {
    if (!this.player) return null;
    const { buffered } = this.player;
    if (buffered.length === 0) {
      return 0;
    }
    const end = buffered.end(buffered.length - 1);
    const duration = this.getDuration();
    if (end > duration) {
      return duration;
    }
    return end;
  }

  renderSourceElement = (source, index) => {
    if (typeof source === 'string') {
      return <source key={index} src={source} />;
    }
    return <source key={index} {...source} />;
  };

  ref = player => {
    if (this.player) {
      // Store previous player to be used by removeListeners()
      this.prevPlayer = this.player;
    }
    this.player = player;
  };

  render() {
    const { url, playing, loop, controls, muted, config, width, height } = this.props;
    const useAudio = this.shouldUseAudio(this.props);
    const Element = useAudio ? 'audio' : 'video';
    const style = {
      width: width === 'auto' ? width : '100%',
      height: height === 'auto' ? height : '100%',
    };
    return (
      <Element
        ref={this.ref}
        style={style}
        preload="auto"
        autoPlay={playing || undefined}
        controls={controls}
        muted={muted}
        loop={loop}
        {...config.attributes}
      />
    );
  }
}
