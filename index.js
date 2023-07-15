const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const server = express();

server.use(
  "/openai",
  createProxyMiddleware({
    target: "https://api.openai.com",
    changeOrigin: true,
    pathRewrite: { "^/openai": "" },
  })
);

server.use(
  "/midjourney",
  createProxyMiddleware({
    target: "https://cdn.discordapp.com",
    changeOrigin: true,
    pathRewrite: { "^/midjourney": "" },
  })
);

server.listen(process.env.PORT, () => {
  console.log(`http proxy service run on http://localhost:${process.env.PORT}`);
});
