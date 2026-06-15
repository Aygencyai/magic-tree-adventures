"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import PainterlyBand from "@/components/tail/PainterlyBand";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const newsletterSchema = z.object({
  email: z.string().min(1, "Please enter your email").email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Validate with Zod manually for extra safety
    const result = newsletterSchema.safeParse(data);
    if (!result.success) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.data.email }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <PainterlyBand
      image="/scenes/web/beat9-flying-home-16x9.webp"
      tone="dark"
      particles
      className="text-parchment"
    >
      <SectionHeading
        title="Join the Adventure"
        subtitle="Be the first to know when Book Two arrives"
        dark
      />
      <Reveal>
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="text-gold"
                  >
                    <path
                      d="M6 14L12 20L22 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-accent text-xl text-gold-light">
                  You are part of the adventure now
                </p>
                <p className="text-parchment/50 text-sm mt-2">
                  Check your inbox for a welcome message from Angelica.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs text-parchment/30 hover:text-parchment/50 transition-colors"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Your email address"
                      {...register("email", {
                        required: "Please enter your email",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                      className={`w-full bg-parchment/10 border rounded-full px-5 py-3 text-parchment placeholder:text-parchment/40 text-sm focus:outline-none transition-colors ${
                        errors.email
                          ? "border-chakra-root/60 focus:border-chakra-root"
                          : "border-parchment/20 focus:border-gold/50"
                      }`}
                      disabled={status === "loading"}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-4 h-4 border-2 border-parchment/30 border-t-parchment rounded-full"
                      />
                    ) : (
                      "Join"
                    )}
                  </Button>
                </div>

                {/* Error messages */}
                <AnimatePresence>
                  {(errors.email || status === "error") && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      className="text-chakra-root/80 text-xs mt-2 pl-5"
                      role="alert"
                    >
                      {errors.email?.message || errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="text-center text-xs text-parchment/30 mt-4">
                  Free activities, chakra guides, and Book Two updates. No spam,
                  ever.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </PainterlyBand>
  );
}
