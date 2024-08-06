"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ChangeEvent, startTransition, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

const SettingsProfilePage = () => {
  const { data: session, status, update } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  });
  const [formSuccessMessage, setSuccessMessage] = useState("");
  const [formErrorMessage, setErrorsMessage] = useState("");

  useEffect(() => {
    console.log(status);
    console.log(session);
    if (session) {
      const name = session.user?.name || "";
      const email = session.user?.email || "";
      setFormData((prevData) => {
        return {
          ...prevData,
          name: name,
          email: email,
        };
      });
    }
  }, [session]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("submit");
    try {
      startTransition(async () => {
        console.log("Form Submitted", formData);
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const result = await response.json();
          console.log("User updated", result);
          update();
        } else {
          console.error("Failed to update user");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSuccessMessage("");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const result = profileFormSchema.safeParse({ ...formData, [name]: value });
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
    } else {
    }
  };

  return (
    <div className="p-6">
      <div className="settings-header"></div>
      <form>
        <div className="grid w-full items-center gap-4">
          <FormItem>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormItem>
        </div>
        <div className="py-4">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsProfilePage;
