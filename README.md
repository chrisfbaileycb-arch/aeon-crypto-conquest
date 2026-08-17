# Aeon Crypto Conquest

A polished mobile-first, casino-style **simulated entertainment game** built from the supplied Aeon/Crypto Vegas concepts. It uses fictional coins only: no real cryptocurrency, wagering, prizes, cash value, exchange, or withdrawal.

## Product foundation

- Playable 5×3 slot machine with weighted symbols, five paylines, wilds, scatters, and bonus payouts
- Persistent balance, daily refill, piggy vault, bet selector, play limits, and sound
- Free route: sponsored/reward breaks can extend the daily allowance
- VIP route: larger allowance and no interruption ads (production billing still to be connected)
- House promotions/affiliate placements are explicitly labeled
- Fair-play and no-real-money disclosures are visible inside the product
- Responsive web app ready to test in Google AI Studio and wrap for Android with Capacitor

## Run locally

```bash
npm install
npm run dev
```

Validation:

```bash
npm test
npm run build
```

## Android path

After installing dependencies and building:

```bash
npx cap add android
npm run build
npx cap sync android
npx cap open android
```

Google Play billing and a compliant ad SDK should be integrated as native services before release. Do not simulate purchase success in production. See [`docs/RELEASE_ROADMAP.md`](docs/RELEASE_ROADMAP.md).

## Monetization model

| Route | Experience | Production integration |
|---|---|---|
| Free | Daily coin drop, reasonable play allowance, optional rewarded promotions | Google AdMob rewarded ads |
| VIP | Larger allowance, interruption-free play | Google Play Billing subscription |
| House/affiliate | Clearly labeled offers in reward-break surfaces | Curated campaign feed + affiliate disclosures |

## Responsible product boundaries

The project deliberately avoids deposits, crypto wallets, investment language, cash-outs, purchasable random prizes, peer-to-peer transfers, and claims of financial return. Store classification, age rating, ad disclosures, privacy policy, consent, billing verification, and responsible-play controls still require final review before publishing.
