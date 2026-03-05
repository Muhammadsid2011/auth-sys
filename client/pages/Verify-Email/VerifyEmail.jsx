import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSelector, useDispatch } from "react-redux";
import { setVerified } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "@/api/auth";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isVerified = useSelector((state) => state.user.user?.isVerified);
  const email = useSelector((state) => state.user.user?.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if already verified or no email
  useEffect(() => {
    if (isVerified || !email) {
      console.log(isVerified, email)
      navigate("/");
    }
  }, [isVerified, email, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await verifyOTP(email, otp);

      dispatch(setVerified(true));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80dvh] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify your login</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-6">

          <div className="space-y-2 w-full flex flex-col items-center">
            <label
              htmlFor="otp-verification"
              className="text-sm font-medium text-center"
            >
              Verification code
            </label>

            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setError("");
              }}
              id="otp-verification"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="h-10 w-9 sm:h-12 sm:w-12" />
                <InputOTPSlot index={1} className="h-10 w-9 sm:h-12 sm:w-12" />
                <InputOTPSlot index={2} className="h-10 w-9 sm:h-12 sm:w-12" />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={3} className="h-10 w-9 sm:h-12 sm:w-12" />
                <InputOTPSlot index={4} className="h-10 w-9 sm:h-12 sm:w-12" />
                <InputOTPSlot index={5} className="h-10 w-9 sm:h-12 sm:w-12" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-sm text-center">
            <a
              href="#"
              className="text-primary hover:underline underline-offset-4"
            >
              I no longer have access to this email address.
            </a>
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">

          {error && (
            <div className="w-full bg-red-500/90 p-3 rounded-md border border-red-600">
              <p className="text-white text-sm font-medium text-center">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11"
            onClick={handleClick}
            disabled={otp.length !== 6 || loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Having trouble?{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              Contact support
            </a>
          </div>

        </CardFooter>
      </Card>
    </div>
  );
}