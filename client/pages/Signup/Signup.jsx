import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CheckboxBasic from "@/components/Checkbox/CheckBox"
import { useState, useEffect } from "react"
import { signupUser, googleLogin } from "@/api/auth"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setUser, setVerified } from "@/redux/userSlice"
import { Spinner } from "@/components/ui/spinner"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from "axios"

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.isVerified) {
      navigate("/")
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const response = await signupUser({
        email,
        password,
        username: username.trim(),
      })

      console.log(response)
      // store the entire user object; it will include isVerified === false
      dispatch(setUser(response.user))
      // we still update the flag in case other parts rely on it
      dispatch(setVerified(response.user.isVerified))
      navigate("/verify-email")

    } catch (error) {
      setError(error?.response?.data?.message ?? "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[85dvh] w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>

          <CardAction>
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/90 p-3 rounded-md border border-red-600">
                  <p className="text-white text-sm font-medium text-center">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center space-x-2">
                <CheckboxBasic
                  id="showPassword"
                  checked={showPassword}
                  onCheckedChange={(checked) =>
                    setShowPassword(checked === true)
                  }
                />
                <Label htmlFor="showPassword">Show Password</Label>
              </div>

            </div>
          </form>

        </CardContent>
        <div className="w-full flex justify-center px-4 py-2">
          <div className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => console.log("Login Failed")}
              theme="outline"
              size="large"
            />
          </div>
        </div>
        <CardFooter>
          <Button
            type="submit"
            form="signup-form"
            className="w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <Spinner className="size-4" />}
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup