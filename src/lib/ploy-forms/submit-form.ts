// Where contact-form submissions are sent.
//
// The site was moved off Ploy. Ploy's form backend (/_ploy/form-submit) only
// exists on Ploy's servers, so on GitHub Pages we post to a third-party form
// service instead.
//
// >>> ACTION REQUIRED <<<
// Create a free form at https://formspree.io (or https://web3forms.com) and
// paste its endpoint URL below. Until you do, the contact form will not deliver.
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export async function submitForm(
  formName: string,
  data: Record<string, string>,
): Promise<{ ok: boolean }> {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `MSDO website — ${formName}`,
      formName,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      ...data,
    }),
    keepalive: true,
  });
  if (!response.ok)
    throw new Error(`Form submission failed (${response.status})`);
  return { ok: true };
}
