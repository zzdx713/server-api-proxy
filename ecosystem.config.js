module.exports = {
  apps: [
    {
      name: "proxy",
      script: "index.js",
      env: {
        PORT: 9001,
      },
    },
  ],
};
