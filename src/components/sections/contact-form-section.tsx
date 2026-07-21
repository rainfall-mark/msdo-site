import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { submitForm } from "@/lib/ploy-forms/submit-form";
import { Reveal } from "@/components/ui/reveal";

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * @ployComponent
 * @ployComponentId contact-form-section
 * @ployComponentType section
 * @ployComponentPattern contact-form
 * @ployComponentDescription Editorial MSDO project inquiry form with first name, last name, required email, optional project description, built-in Ploy submission capture, and accessible status feedback.
 * @ployComponentTags contact form lead-capture editorial
 * @ployComponentStatus stable
 */
export default function ContactFormSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await submitForm("start-a-project", {
        firstName: String(data.get("firstName") ?? ""),
        lastName: String(data.get("lastName") ?? ""),
        email: String(data.get("email") ?? ""),
        projectDescription: String(data.get("projectDescription") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "mt-3 w-full border-0 border-b border-ploy-border-primary bg-transparent px-0 pb-4 text-lg text-ploy-text-primary outline-none transition-colors placeholder:text-ploy-text-secondary/60 focus:border-ploy-text-primary";

  return (
    <section className="contact-form bg-ploy-background-primary px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10 lg:pb-40">
      <Reveal className="contact-form__inner mx-auto grid max-w-[92rem] gap-12 border-t border-ploy-border-primary pt-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="text-sm text-ploy-text-secondary">Project inquiry / 01</p>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ploy-text-secondary">Share the essentials. A short description is helpful, but not required.</p>
        </div>

        {status === "success" ? (
          <div className="flex min-h-[28rem] flex-col justify-center rounded-xl bg-ploy-background-secondary p-8 sm:p-12" role="status">
            <p className="text-sm text-ploy-text-secondary">Message received</p>
            <h2 className="mt-4 max-w-[12ch] font-heading text-4xl font-semibold leading-[1] tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">Thanks. I’ll be in touch.</h2>
            <button type="button" onClick={() => setStatus("idle")} className="mt-8 w-fit text-sm font-medium text-ploy-text-primary underline underline-offset-6">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form__form rounded-xl bg-ploy-background-secondary p-6 sm:p-10 lg:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="text-sm text-ploy-text-secondary">First name
                <input name="firstName" type="text" autoComplete="given-name" required placeholder="First name" className={inputClass} />
              </label>
              <label className="text-sm text-ploy-text-secondary">Last name
                <input name="lastName" type="text" autoComplete="family-name" required placeholder="Last name" className={inputClass} />
              </label>
            </div>
            <label className="mt-10 block text-sm text-ploy-text-secondary">Email
              <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" className={inputClass} />
            </label>
            <label className="mt-10 block text-sm text-ploy-text-secondary">Project description <span className="opacity-70">(optional)</span>
              <textarea name="projectDescription" rows={5} placeholder="What are you hoping to make?" className={`${inputClass} resize-y leading-relaxed`} />
            </label>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ploy-button-primary-background px-6 text-sm font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60">
                {status === "submitting" ? "Sending…" : "Send inquiry"}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {status === "error" && <p className="text-sm text-ploy-text-secondary" role="alert">Something went wrong. Please try again.</p>}
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
