import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // body: { schoolName, contactName, contactEmail, billingAddress, poNumber, licenseType, notes }

    // Create customer in Stripe
    const customer = await stripe.customers.create({
      name: body.schoolName,
      email: body.contactEmail,
      metadata: {
        contactName: body.contactName,
        poNumber: body.poNumber || '',
        licenseType: body.licenseType,
        notes: body.notes || '',
      },
      address: body.billingAddress
        ? {
            line1: body.billingAddress,
          }
        : undefined,
    })

    // Select price based on license type
    const priceId =
      body.licenseType === 'district'
        ? process.env.STRIPE_DISTRICT_PRICE_ID!
        : process.env.STRIPE_SCHOOL_PRICE_ID!

    // Create subscription with send_invoice collection method (net-30)
    await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      collection_method: 'send_invoice',
      days_until_due: 30,
      metadata: {
        schoolName: body.schoolName,
        poNumber: body.poNumber || '',
      },
    })

    return NextResponse.json({
      success: true,
      message:
        'Invoice request received. You will receive an invoice via email within 1 business day.',
      customerId: customer.id,
    })
  } catch (error) {
    console.error('Invoice request error:', error)
    return NextResponse.json(
      { error: 'Failed to process invoice request' },
      { status: 500 }
    )
  }
}
