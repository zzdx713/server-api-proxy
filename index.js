const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { HttpsProxyAgent } = require("https-proxy-agent");
const server = express();
const router = express.Router();

const createProxy = (path, target, options = {}) => [
  path,
  createProxyMiddleware({
    ...options,
    target,
    changeOrigin: true,
    pathRewrite: { [`^/proxy${path}`]: "" },
    agent: new HttpsProxyAgent(process.env.HTTP_PROXY),
    onProxyRes(res) {
      res.headers["access-control-allow-origin"] = "*";
    },
  }),
];

router.use(...createProxy("/openai", "https://api.openai.com"));
router.use(...createProxy("/midjourney", "https://cdn.discordapp.com"));
router.use(
  ...createProxy("/discord", "https://gateway.discord.gg", { ws: true })
);

server.use("/proxy", router);

server.listen(process.env.PORT, () => {
  console.log(`http proxy service run on http://localhost:${process.env.PORT}`);
});
