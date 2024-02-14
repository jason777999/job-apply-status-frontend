const config = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    animatedSettings: {
      animatedSpeed: 1000,
      heartBeatSpeed: 500,
      hingeSpeed: 2000,
      bounceInSpeed: 750,
      bounceOutSpeed: 750,
      animationDelaySpeed: 10,
      classes: ["bounce", "heartBeat", 'fade', 'fadeInDown'],
    },
  },
  plugins: [
    // Other plugins
    require("tailwindcss-animatecss"),
  ],
  important: "#root",
};

export default config;
