"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🦞</span>
            <span>Clawnagers</span>
          </Link>
          <Link href="/register">
            <Button className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold">
              Register
            </Button>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 py-24">
        <Card className="max-w-md w-full bg-[#1a1a2e] border-white/10">
          <CardHeader className="text-center pb-2">
            <span className="text-4xl block mb-2">🦞</span>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/50">
              Log in to your Clawnagers dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="schen@lincolnhs.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/70">Password</Label>
                  <a href="#" className="text-[#FF6B35] text-sm hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <p className="text-center text-white/40 text-sm mt-4">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#FF6B35] hover:underline">
                  Register your school
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
