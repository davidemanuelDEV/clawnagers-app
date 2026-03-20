"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleCheck, ArrowRight } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <p className="text-zinc-500 mb-6">
            Thank you for registering your school with Clawnagers. You'll receive a confirmation email shortly with next steps.
          </p>
          <div className="space-y-3">
            <Link href="/login">
              <Button className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                Access Your Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
          <p className="text-xs text-zinc-400 mt-6">
            Questions? Email us at hello@clawnagers.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}