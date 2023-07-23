module.exports = {
  apps: [
    {
      name: "proxy",
      script: "index.js",
      env: {
        PORT: 9002,
        HTTP_PROXY: 'http://localhost:7890'
      },
    },
  ],
};
