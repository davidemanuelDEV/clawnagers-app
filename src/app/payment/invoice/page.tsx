"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, CircleCheck, FileText, ArrowLeft } from "lucide-react"

export default function InvoiceRequestPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    schoolName: "",
    contactName: "",
    contactEmail: "",
    billingAddress: "",
    poNumber: "",
    licenseType: "school" as "school" | "district",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/invoice-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error("Failed to submit request")
      }

      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or email hello@clawnagers.com.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased flex flex-col">
      {/* Nav */}
      <nav className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center">
              <Bot className="w-5 h-5 text-zinc-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">Clawnagers</span>
          </Link>
          <Link href="/#pricing" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to pricing
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <CircleCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-3">
                Invoice request submitted! 📨
              </h1>
              <p className="text-lg text-zinc-500 mb-2">
                We&apos;ll send a net-30 invoice to your email within 1 business day.
              </p>
              <p className="text-zinc-400 mb-8">
                PO and check payments accepted. We&apos;ll include payment instructions with the invoice.
              </p>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-8"
                >
                  Back to Home
                </Button>
              </Link>
              <p className="text-sm text-zinc-400 mt-6">
                Questions?{" "}
                <a href="mailto:hello@clawnagers.com" className="text-amber-600 hover:underline">
                  hello@clawnagers.com
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h1 className="text-2xl font-bold tracking-tight">
                    Request a Purchase Order / Invoice
                  </h1>
                </div>
                <p className="text-zinc-500">
                  We&apos;ll send a net-30 invoice you can pay by check, ACH, or credit card. PO numbers accepted.
                </p>
              </div>

              <Card className="border-zinc-200">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School / District Name *</Label>
                      <Input
                        id="schoolName"
                        required
                        value={form.schoolName}
                        onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                        placeholder="Lincoln High School"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        required
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        placeholder="Dr. Jane Smith"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        required
                        value={form.contactEmail}
                        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                        placeholder="jsmith@lincoln.edu"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input
                        id="billingAddress"
                        value={form.billingAddress}
                        onChange={(e) => setForm({ ...form, billingAddress: e.target.value })}
                        placeholder="123 Main St, City, State ZIP"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poNumber">PO Number (optional)</Label>
                      <Input
                        id="poNumber"
                        value={form.poNumber}
                        onChange={(e) => setForm({ ...form, poNumber: e.target.value })}
                        placeholder="PO-2026-001"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>License Type *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, licenseType: "school" })}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            form.licenseType === "school"
                              ? "border-amber-400 bg-amber-50"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <p className="font-semibold text-sm">School License</p>
                          <p className="text-sm text-zinc-500">$899/year</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, licenseType: "district" })}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            form.licenseType === "district"
                              ? "border-amber-400 bg-amber-50"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <p className="font-semibold text-sm">District License</p>
                          <p className="text-sm text-zinc-500">$3,999/year</p>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Any additional details (number of schools, special requirements, etc.)"
                        className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold"
                      size="lg"
                    >
                      {loading ? "Submitting..." : "Submit Invoice Request"}
                    </Button>

                    <p className="text-xs text-zinc-400 text-center">
                      PO and check payments accepted. Questions?{" "}
                      <a href="mailto:hello@clawnagers.com" className="text-amber-600 hover:underline">
                        hello@clawnagers.com
                      </a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
