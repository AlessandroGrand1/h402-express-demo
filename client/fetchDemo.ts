// client/fetchDemo.ts
import fetch from "node-fetch";

/**
 * Fetch a URL. If it responds 402 with an x-h402 header we:
 *   • log the payment options   (so viewers see what the agent would pay)
 *   • immediately retry sending BOTH x-h402 and x-paid headers
 */
async function fetchWithFakePay(url: string) {
  const first = await fetch(url);

  if (first.status === 402) {
    const h402 = first.headers.get("x-h402");
    console.log("🧾 402 received – payment options:\n", h402);

    // ----- normally a wallet signs & pays here -----
    const second = await fetch(url, {
      headers: {
        "x-h402": h402 ?? "",   // echo the challenge
        "x-paid": "true"        // unit-test bypass
      },
    });
    return second;
  }

  return first;
}

/* ---- demo run -------------------------------------------------- */
(async () => {
  // JSON endpoint behind the pay-wall
  const premiumRes = await fetchWithFakePay(
    "http://localhost:3000/premium/content"
  );
  console.log("⭐ Premium JSON:", await premiumRes.json());

  // HTML article behind the same pay-wall
  const articleRes = await fetchWithFakePay(
    "http://localhost:3000/article/why-layers"
  );
  console.log("📰 Article HTML:\n", await articleRes.text());
})();
