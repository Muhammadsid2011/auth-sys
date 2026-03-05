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
import { useState } from "react"
import { loginUser } from "@/api/auth"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const user = useSelector((state) => state.user.user);

    if(user) {
        navigate('/')
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello")
        loginUser(email, password)
            .then((data) => {
                console.log("Login successful:", data);
                navigate('/')
                window.location.reload();
            })
            .catch((error) => {
                console.error("Login failed:", error);
                // Handle login error (e.g., show error message)
            });
    }

    return (
        <div className="w-screen h-[85vh] flex items-center justify-center overflow-x-hidden">

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link"><Link to="/signup">Sign Up</Link></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                    id="email"
                                    type="email"
                                    placeholder="jhondoe@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e)}
                                />
                            </div>
                            <div className="flex items-center space-x-2 justify-center">
                                <CheckboxBasic
                                    id="showPassword"
                                    checked={showPassword}
                                    onCheckedChange={(checked) => setShowPassword(checked === true)}
                                /> 
                                <Label htmlFor="showPassword" className="cursor-pointer">
                                    Show Password
                                </Label>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="login-form" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default Login;