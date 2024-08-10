import React from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const Particlesone = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particleOptions = {
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 5,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        Particlesone
      </div>
    </div>
  );
};

export default Particlesone;
