"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirm_password) {
      toast("Error", { description: "Passwords do not match." });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/register", form);

      toast("Success", { description: "Register successfully." });

      const signin_res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signin_res?.error) {
        toast("Error", { description: signin_res.error });
      } else {
        router.push("/");
      }

      setForm({ name: "", email: "", password: "", confirm_password: "" });
    } catch (error: any) {
      toast("Error", {
        description: `${error.response?.data?.error || error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-full rounded-none border-0 sm:border-1 sm:rounded-md sm:h-fit sm:max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ittipat"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ittipat@example.com"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                type="password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>

        <div className="text-sm flex w-full justify-end items-center gap-2 mt-4">
          <span>Already have an account?</span>
          <Link href={"/signin"}>
            <Button className="font-normal p-0 text-blue-400" variant="link">
              Log In
            </Button>
          </Link>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button onClick={handleSubmit} type="submit" className="w-full">
          Sign Up
        </Button>
        <Button variant="outline" className="w-full">
          Sign Up with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
