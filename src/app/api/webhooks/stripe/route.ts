import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = headers()
  const sig = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const supabase = createClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Get the subscription
      const subscriptionId = session.subscription as string
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      
      // Extract school name and customer email from session
      const schoolName = session.metadata?.schoolName || ''
      const customerEmail = session.customer_email || session.customer_details?.email || ''
      
      // Find the school by contact email
      const { data: school, error: schoolError } = await supabase
        .from('schools')
        .select('*')
        .eq('contact_email', customerEmail)
        .single()
      
      if (schoolError || !school) {
        console.error('Failed to find school for email:', customerEmail, schoolError)
        return NextResponse.json({ error: 'School not found' }, { status: 404 })
      }

      // Update school with payment info
      const { error: updateError } = await supabase
        .from('schools')
        .update({
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscriptionId,
          subscription_status: subscription.status,
          payment_status: 'active',
          license_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq('id', school.id)

      if (updateError) {
        console.error('Failed to update school payment status:', updateError)
        return NextResponse.json({ error: 'Failed to update school' }, { status: 500 })
      }

      console.log(`School ${school.name} activated with subscription ${subscriptionId}`)
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      
      if (!subscriptionId) break
      
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      
      // Update school subscription status
      const { error } = await supabase
        .from('schools')
        .update({
          subscription_status: subscription.status,
          payment_status: 'active',
          license_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_subscription_id', subscriptionId)

      if (error) {
        console.error('Failed to update school on payment success:', error)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      
      if (!subscriptionId) break
      
      // Update school payment status
      const { error } = await supabase
        .from('schools')
        .update({
          payment_status: 'payment_failed',
        })
        .eq('stripe_subscription_id', subscriptionId)

      if (error) {
        console.error('Failed to update school on payment failure:', error)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      
      // Deactivate school
      const { error } = await supabase
        .from('schools')
        .update({
          subscription_status: 'canceled',
          payment_status: 'inactive',
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        console.error('Failed to deactivate school:', error)
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}