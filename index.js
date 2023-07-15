const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const server = express();

const router = express.Router();

router.use(
  "/openai",
  createProxyMiddleware({
    target: "https://api.openai.com",
    changeOrigin: true,
    pathRewrite: { "^/proxy/openai": "" },
  })
);

router.use(
  "/midjourney",
  createProxyMiddleware({
    target: "https://cdn.discordapp.com",
    changeOrigin: true,
    pathRewrite: { "^/proxy/midjourney": "" },
  })
);

server.use("/proxy", router);

server.listen(process.env.PORT, () => {
  console.log(`http proxy service run on http://localhost:${process.env.PORT}`);
});
