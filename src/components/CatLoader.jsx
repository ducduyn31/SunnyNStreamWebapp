import React from 'react';
import Lottie from 'react-lottie';
import lovingTiger from '../private_assets/lottie-json/tail-wagging-cat.json';

const Loader = () => (
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
    style={{}}
  />
);

export default Loader;
