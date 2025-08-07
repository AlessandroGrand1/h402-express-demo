// ─────────────────────────  src/index.ts  ─────────────────────────
import "dotenv/config";

import express from "express";
import {
  paymentMiddleware,
  type RouteConfig,
} from "@bit-gpt/h402-express";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT ?? 3000;

/* 1️⃣  pay-to address (anything 0x… is fine for dry-run) */
const payTo = (process.env.ADDRESS ??
  "0x000000000000000000000000000000000000dead") as `0x${string}`;

/* 2️⃣  single premium pay-wall: user can pay on BSC **or** Solana */
const premiumRoute: RouteConfig = {
  paymentRequirements: [
    {
      scheme: "exact",
      namespace: "evm",
      tokenAddress: "0x55d398326f99059ff775485246999027b3197955", // USDT (BSC)
      amountRequired: 0.01,
      amountRequiredFormat: "humanReadable",
      payToAddress: payTo,
      networkId: "56",
      description: "Premium content — 0.01 USDT on BSC", //
    },
    {
      scheme: "exact",
      namespace: "solana",
      tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC (Sol)
      amountRequired: 0.01,
      amountRequiredFormat: "humanReadable",
      payToAddress: payTo,
      networkId: "mainnet",
      description: "Premium content — 0.01 USDC on Solana",
    },
  ],
};

/* 3️⃣  plug the pay-wall—guards ALL /premium/* AND /article/* */
app.use(
  paymentMiddleware(payTo, {
    "/premium/*": premiumRoute,
    "/article/*": premiumRoute,
  }),
);

/* 4️⃣  JSON example behind same pay-wall (optional) */
app.get("/premium/content", (_, res) =>
  res.json({ secret: "🎉 You paid!", ts: new Date().toISOString() }),
);

/* 5️⃣  nice article URLs → static HTML */
app.get("/article/:slug", (req, res) => {
  const file = join(
    __dirname,
    "../public/articles",
    `${req.params.slug}.html`,
  );
  res.sendFile(file);
});

/* 6️⃣  serve any other assets (CSS, images, …) */
app.use(express.static("public"));

/* ────────────────────────────────────────────────────────────────── */
app.listen(PORT, () =>
  console.log(`🚀  Demo server listening on http://localhost:${PORT}`),
);
