"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    })

    if (resetError) {
      setError(resetError.message)
      setIsLoading(false)
      return
    }

    setSent(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <span className="text-3xl">🦞</span>
            <span>Clawnagers</span>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50">
              Back to Login
            </Button>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 py-24">
        <Card className="max-w-md w-full bg-white border border-zinc-200">
          <CardHeader className="text-center pb-2">
            <span className="text-4xl block mb-2">🔑</span>
            <CardTitle className="text-2xl font-bold text-zinc-900">Reset Password</CardTitle>
            <CardDescription className="text-zinc-500">
              {sent
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            {sent ? (
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  Check your email for a reset link. It may take a minute to arrive.
                </div>
                <p className="text-zinc-400 text-sm">
                  Didn&apos;t receive it?{" "}
                  <button
                    onClick={() => { setSent(false); setEmail("") }}
                    className="text-amber-600 hover:underline"
                  >
                    Try again
                  </button>
                </p>
                <Link href="/login">
                  <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900">
                    ← Back to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-600">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="schen@lincolnhs.edu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <p className="text-center text-zinc-400 text-sm mt-4">
                  Remember your password?{" "}
                  <Link href="/login" className="text-amber-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
