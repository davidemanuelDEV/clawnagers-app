# Deploy Notes — Stripe Integration

## Environment Variables to Add in Vercel

```
STRIPE_SECRET_KEY=sk_live_[your_stripe_secret_key]
STRIPE_SCHOOL_PRICE_ID=price_1TC1mlGb2BujzFpfu0IuEWxl
STRIPE_DISTRICT_PRICE_ID=price_1TC1mzGb2BujzFpfiIYRKhAr
NEXT_PUBLIC_APP_URL=https://clawnagers.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your_stripe_publishable_key]
```

## What Was Added

1. **`/api/checkout`** — Creates Stripe Checkout Sessions for School License ($899/yr subscription)
2. **`/api/invoice-request`** — Creates Stripe customer + net-30 invoice for PO/invoice requests
3. **`/payment/success`** — Post-checkout success page
4. **`/payment/cancel`** — Cancelled payment page with retry + PO fallback
5. **`/payment/invoice`** — PO/Invoice request form (School or District license)
6. **Landing page pricing** — School License button → Stripe Checkout, District → Invoice request form

## Downloadable Resources Added

- **Sample Lesson Week 1** — Curriculum preview for teacher evaluation
- **Technical Requirements** — IT setup guide for school infrastructure
- **Implementation Timeline** — 8-week deployment roadmap
- **ROI Calculator & Pricing Guide** — Financial justification for administrators
- **Title IV-A Eligibility Guide** — Federal funding compliance documentation

## Next Steps

- [ ] Add Stripe webhook endpoint for subscription lifecycle events
- [ ] Add Stripe webhook secret env var
- [ ] Set up Stripe webhook in dashboard pointing to `/api/webhooks/stripe`
- [ ] Configure Vercel environment variables from the list above