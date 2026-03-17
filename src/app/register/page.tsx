"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    schoolName: "",
    district: "",
    state: "",
    contactName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    const userId = authData.user?.id
    if (!userId) {
      setError("Registration failed. Please try again.")
      setIsLoading(false)
      return
    }

    // 2. Create the school
    const { data: school, error: schoolError } = await supabase
      .from('schools')
      .insert({
        name: formData.schoolName,
        district: formData.district || null,
        state: formData.state || null,
        contact_name: formData.contactName,
        contact_email: formData.email,
        license_type: 'school',
      })
      .select()
      .single()

    if (schoolError) {
      setError("Failed to create school: " + schoolError.message)
      setIsLoading(false)
      return
    }

    // 3. Create the teacher record
    const { error: teacherError } = await supabase
      .from('teachers')
      .insert({
        id: userId,
        school_id: school.id,
        name: formData.contactName,
        email: formData.email,
        role: 'admin',
      })

    if (teacherError) {
      setError("Failed to create teacher profile: " + teacherError.message)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-[#1a1a2e] border-white/10">
          <CardContent className="p-8 text-center">
            <span className="text-6xl block mb-4">🦞</span>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Clawnagers!</h2>
            <p className="text-white/50 mb-6">
              Your school has been registered. Check your email to confirm your account.
            </p>
            <Link href="/login">
              <Button className="bg-[#FF6B35] hover:bg-[#E55A25] text-white w-full">
                Go to Login →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
              Log In
            </Button>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 py-16">
        <Card className="max-w-lg w-full bg-[#1a1a2e] border-white/10">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-white">Register Your School</CardTitle>
            <CardDescription className="text-white/50">
              Get access to the full Clawnagers curriculum and dashboard
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
                <Label htmlFor="schoolName" className="text-white/70">School Name *</Label>
                <Input
                  id="schoolName"
                  placeholder="Lincoln High School"
                  required
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district" className="text-white/70">District</Label>
                  <Input
                    id="district"
                    placeholder="Bay Area Unified"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white/70">State *</Label>
                  <Input
                    id="state"
                    placeholder="CA"
                    required
                    maxLength={2}
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-white/70">Your Name *</Label>
                <Input
                  id="contactName"
                  placeholder="Sarah Chen"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="schen@lincolnhs.edu"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/70">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/70">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 focus:border-[#FF6B35]"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold mt-2"
              >
                {isLoading ? "Creating Account..." : "Register School"}
              </Button>
              <p className="text-center text-white/40 text-sm mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-[#FF6B35] hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
