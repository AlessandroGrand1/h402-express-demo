# 🪄 Layer Press • H-402 Express Demo

A minimal Express.js server and client showing pay-per-call paywall via HTTP 402 + `@bit-gpt/h402-express`. Unlock each article for just **$0.01**—no subscriptions.

---

## 🚀 Quickstart

```bash
git clone https://github.com/AlessandroGrand1/h402-express-demo.git
cd h402-express-demo
pnpm install
cp .env-local .env   # edit .env if you like
pnpm dev             # starts server on http://localhost:3000
pnpm run client      # demo “fake pay” script

```
Browse http://localhost:3000 for the landing page.

```python

Click Read – $0.01 → you’ll see a 402 response, then a retry with x-paid: true, then the article HTML.

Server (src/index.ts)
import "dotenv/config";
import express from "express";
import {
  paymentMiddleware,
  createRouteConfigFromPrice,
  type RouteConfig
} from "@bit-gpt/h402-express";

const app = express();
const payTo = (process.env.ADDRESS!) as `0x${string}`;
const network = (process.env.NETWORK! as "bsc" | "solana");

const premium: RouteConfig = {
  paymentRequirements: [
    {
      scheme: "exact", namespace: "evm",
      tokenAddress: "0x55d398326f99059ff775485246999027b3197955",
      amountRequired: 0.01, amountRequiredFormat: "humanReadable",
      payToAddress: payTo, networkId: "56",
      description: "0.01 USDT on BSC"
    },
    {
      scheme: "exact", namespace: "solana",
      tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amountRequired: 0.01, amountRequiredFormat: "humanReadable",
      payToAddress: payTo, networkId: "mainnet",
      description: "0.01 USDC on Solana"
    },
  ],
};

app.use(paymentMiddleware(payTo, { "/premium/*": premium }));
app.use(express.static("public"));
app.listen(+process.env.PORT! || 3000);

```
Demo Client (client/fetchDemo.ts)

```python
import fetch from "node-fetch";

async function fetchWithFakePay(url: string) {
  const res = await fetch(url);
  if (res.status === 402) {
    console.log("🧾 402 – pay options:", res.headers.get("x-h402"));
    return fetch(url, { headers: { "x-paid": "true" } });
  }
  return res;
}

(async () => {
  const article = await fetchWithFakePay("http://localhost:3000/article/why-layers");
  console.log(await article.text());
})();
```



