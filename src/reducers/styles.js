import { handleActions } from '../modules/helpers';

export const styleState = {
  header: {
    css: {},
    hideBar: true,
  },
  homePage: {
    left: {
      css: {
        width: '50vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    right: {
      css: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    dateButton: {
      css: {
        width: '20vw',
        height: '6rem',
        fontSize: '2em',
      },
    },
  },
  getStartedPage: {
    fullPageContainer: {
      css: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed',
      },
    },
    backButton: {
      css: {
        position: 'fixed',
        top: '5px',
        left: '5px',
        zIndex: '1000',
      },
      icon: {
        css: {
          fontSize: '3em',
        },
      },
    },
    homeButton: {
      css: {
        position: 'fixed',
        top: '5px',
        right: '5px',
        zIndex: '1000',
      },
      icon: {
        css: {
          fontSize: '3em',
        },
      },
    },
    nextStep: {
      css: {
        position: 'fixed',
        top: '80%',
        left: '50%',
        width: '50vw',
        maxHeight: '20vh',
        marginLeft: '-25vw',
        marginTop: '-10vh',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        css: {
          fontSize: '1.5em',
          width: '180px',
        },
      },
      stepper: {
        step: {
          label: {
            css: {
              fontSize: '1.7em',
            },
          },
        },
      },
    },
    namePage: {
      title: {
        css: {
          fontSize: '1.5em',
        },
      },
      input: {
        css: {
          width: '250px',
          fontSize: '1.5em',
        },
      },
    },
    roomSelectPage: {
      title: {
        css: {
          fontSize: '1.5em',
        },
      },
      input: {
        css: {
          width: '250px',
          fontSize: '1.5em',
        },
      },
    },
    roomPasscodePage: {
      title: {
        css: {
          fontSize: '1.5em',
        },
      },
      input: {
        css: {
          width: '250px',
          fontSize: '1.5em',
        },
      },
    },
  },
  movieRoomPage: {
    fullPageContainer: {
      css: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed',
      },
    },
    mainScreen: {
      css: {
        width: '75vw',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      wrapper: {
        css: {
          position: 'relative',
          width: '90%',
          paddingTop: '56.25%',
        },
        player: {
          css: {
            position: 'absolute',
            top: 0,
            left: 0,
          },
        },
      },
    },
    subScreen: {
      css: {
        width: '25vw',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      wrapper: {
        css: {
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
        },
        player: {
          css: {
            position: 'absolute',
            top: 0,
            left: 0,
          },
        },
      },
    },
    controllerPane: {
      css: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '75vw',
        height: 'calc(100vh - 75vw * 0.5625)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        tooltip: {
          css: {
            fontSize: '2em !important',
          },
        },
        icon: {
          css: {
            fontSize: '2em',
          },
        },
        css: {},
      },
    },
    chatBoxPane: {
      css: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '25vw',
        height: 'calc(100vh - 25vw * 0.5625)',
        backgroundColor: 'green',
      },
    },
  },
};

export default {
  style: handleActions({}, styleState),
};
