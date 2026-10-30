import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { submitForm } from "@/lib/ploy-forms/submit-form";

type Status = "idle" | "submitting" | "success" | "error";

export interface InterestDialogProps {
  /** Project the visitor is interested in; sent with the lead and used in the copy. */
  project: string;
  heading?: string;
  buttonLabel?: string;
  /** Short line in the dialog above the fields. */
  intro?: string;
}

/**
 * MSDO Lab lead capture: "Want to try it for yourself?" with an "I'm interested"
 * button that opens a small name + email form in a native modal dialog. Leads go
 * to the site's Formspree form (stored there and emailed), tagged with the project.
 */
export function InterestDialog({
  project,
  heading = "Want to try it for yourself?",
  buttonLabel = "I'm interested",
  intro,
}: InterestDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const open = () => {
    if (status !== "submitting") setStatus("idle");
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "")) { setStatus("success"); return; }
    setStatus("submitting");
    try {
      await submitForm("lab-interest", {
        _subject: `MSDO Lab: interested in ${project}`,
        project,
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "mt-3 w-full border-0 border-b border-ploy-border-primary bg-transparent px-0 pb-3 text-lg text-ploy-text-primary outline-none transition-colors placeholder:text-ploy-text-secondary/60 focus:border-ploy-text-primary";

  return (
    <div className="interest mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
      <p className="font-heading text-xl font-semibold tracking-[-0.025em] text-ploy-text-primary sm:text-2xl">{heading}</p>
      <button type="button" onClick={open} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ploy-button-primary-background px-6 text-base font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03] sm:min-h-14 sm:px-8 sm:text-lg">
        {buttonLabel}
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="interest-title"
        onClick={(e) => { if (e.target === dialog.current) close(); }}
        className="interest__dialog m-auto w-[calc(100%-2.5rem)] max-w-lg rounded-xl bg-ploy-background-secondary p-0 text-ploy-text-primary backdrop:bg-ploy-background-inverse/50"
      >
        <div className="relative p-6 sm:p-10">
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-ploy-text-secondary transition-colors hover:text-ploy-text-primary">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {status === "success" ? (
            <div role="status" className="pr-8">
              <p className="text-sm text-ploy-text-secondary">{project}</p>
              <h2 id="interest-title" className="mt-3 font-heading text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl">Thanks. I'll be in touch.</h2>
              <button type="button" onClick={close} className="mt-8 text-sm font-medium underline underline-offset-6">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-ploy-text-secondary">{project}</p>
              <h2 id="interest-title" className="mt-3 pr-8 font-heading text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl">{heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-ploy-text-secondary">{intro ?? `Leave your name and email and I'll reach out about trying ${project}.`}</p>
              <label className="mt-8 block text-sm text-ploy-text-secondary">Name
                <input name="name" type="text" autoComplete="name" required placeholder="Your name" className={inputClass} />
              </label>
              <label className="mt-8 block text-sm text-ploy-text-secondary">Email
                <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" className={inputClass} />
              </label>
              <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ploy-button-primary-background px-6 text-sm font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60">
                  {status === "submitting" ? "Sending…" : "Send"}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                {status === "error" && <p className="text-sm text-ploy-text-secondary" role="alert">Something went wrong. Please try again.</p>}
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}
