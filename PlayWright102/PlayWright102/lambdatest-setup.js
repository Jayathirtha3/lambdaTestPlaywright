require("dotenv").config();
const { chromium } = require("playwright");

const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

const caps = {
  browserName: "Chrome",
  browserVersion: "latest",
  lt: {
    'platform': process.env.HYPEREXECUTE_PLATFORM,
    'build': 'Playwright-102 HyperExecute Build Matrix',
    'name': 'Playwright HyperExecute Test',
    'user': process.env.LT_USERNAME,
    'accessKey': process.env.LT_ACCESS_KEY,
    'network': true,
    'video': true,
    'console': true
  }
};

exports.getBrowser = async () => {
  if (!LT_USERNAME || !LT_ACCESS_KEY) {
    throw new Error("LambdaTest username or AccessKey missing from .env");
  }

  const wsEndpoint =
    `wss://${LT_USERNAME}:${LT_ACCESS_KEY}` +
    `@cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(caps))}`;

  console.log("🔗 Connecting to LambdaTest...");
  return chromium.connect(wsEndpoint);
};
