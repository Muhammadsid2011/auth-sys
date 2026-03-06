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

import { verifyOTP, resendOTP } from "@/api/auth";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const user = useSelector((state) => state.user.user);
  const email = user?.email;
  const isVerified = user?.isVerified;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect protection
  useEffect(() => {
    if (!user) return;

    if (isVerified) {
      navigate("/");
    }

    if (!email) {
      navigate("/");
    }
  }, [user, isVerified, email, navigate]);

  const handleSubmit = async (e) => {
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
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto verify when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit(new Event("submit"));
    }
  }, [otp]);

  const handleResend = async () => {
    try {
      setResending(true);
      setError("");

      await resendOTP(email);
    } catch (err) {
      console.error(err)
      setError(
        err?.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-[80dvh] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify your login</CardTitle>

          <CardDescription>
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-primary">{email}</span>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col items-center gap-6">
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
                  if (!/^\d*$/.test(value)) return;
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
              <button
                type="button"
                className="text-primary hover:underline underline-offset-4"
              >
                I no longer have access to this email address.
              </button>
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
              disabled={otp.length !== 6 || loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Didn’t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                {resending ? "Resending..." : "Resend"}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}