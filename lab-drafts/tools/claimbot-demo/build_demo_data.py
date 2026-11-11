"""ClaimBot Lab demo: fictional seed data, sample settlement letters, and the
invoice + receipt the walkthrough drops in. Jordan Reyes and every provider,
reference number and amount here are invented.

usage: python3 build_claims_demo.py <demo dir>
"""
import sys, os, json
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

OUT = sys.argv[1]
os.makedirs(f"{OUT}/_blob", exist_ok=True)
os.makedirs(f"{OUT}/files", exist_ok=True)

MEMBER = "Jordan Reyes"
MEMBER_ID = "DEMO-4417-0021"
NAVY, BLUE, GREY, LINE = HexColor("#110081"), HexColor("#0033ff"), HexColor("#5f5f6b"), HexColor("#d9d9e3")

PT, ORTHO, IMG, ACU, LAB = ("Tidewater Physical Therapy", "Cedar Row Orthopedics", "Lumen Imaging Center",
                            "Willow Street Acupuncture", "Quarry Lane Labs")

# (settled, treatmentStart, claim#, invoice, title, billed, paid, outcome, summary, usage, duplicate, lines)
# lines: (date, description, billed, deductible, paid)
L = [
 ("2026-04-29", "2026-04-14", "2401187", "BFM-20614", "Brightline Family Medicine · annual physical", 340, 340, "paid",
  "Apr 14, 2026 · Paid in full", [dict(benefit="physical", date="2026-04-14", paidUsd=340)], False,
  [("2026-04-14", "Routine physical exam, adult", 340, 0, 340)]),
 ("2026-05-13", "2026-04-28", "2401962", "CEC-7731", "Clearwater Eye Care · eye test", 145, 145, "paid",
  "Apr 28, 2026 · Paid in full", [dict(benefit="eye", date="2026-04-28", paidUsd=145)], False,
  [("2026-04-28", "Routine eye examination", 145, 0, 145)]),
 ("2026-05-27", "2026-05-12", "2402540", "JD-11802", "Juniper Dental · check-up and cleaning", 260, 260, "paid",
  "May 12, 2026 · Paid in full", [dict(benefit="dental", date="2026-05-12", paidUsd=260)], False,
  [("2026-05-12", "Periodic oral exam and cleaning", 260, 0, 260)]),
 ("2026-06-17", "2026-06-03", "2403318", "CRO-5520", f"{ORTHO} · knee consultation", 385, 0, "deductible",
  "Jun 3, 2026 · Applied to deductible", [dict(benefit="consultations", date="2026-06-03", deductible="outpatient", deductibleUsd=385, paidUsd=0)], False,
  [("2026-06-03", "Specialist consultation, orthopedics", 385, 385, 0)]),
 ("2026-06-19", "2026-06-03", "2403318", "QLL-90417", "Knee X-ray", 210, 95, "partial",
  "Jun 3, 2026 · Partly paid; deductible met with this one", [dict(benefit="pathology", date="2026-06-03", deductible="outpatient", deductibleUsd=115, paidUsd=95)], False,
  [("2026-06-03", "X-ray, right knee, 3 views", 210, 115, 95)]),
 ("2026-06-26", "2026-06-12", "2403905", "LIC-3306", f"{IMG} · MRI scan, right knee", 1850, 0, "deductible",
  "Jun 12, 2026 · Applied to deductible", [dict(benefit="imaging", date="2026-06-12", deductible="core", deductibleUsd=1850, paidUsd=0)], False,
  [("2026-06-12", "MRI, right knee (pre-authorised)", 1850, 1850, 0)]),
 ("2026-07-10", "2026-06-16", "2404471", "TPT-2207", "Physiotherapy × 3", 435, 435, "paid",
  "Jun 16 – 30, 2026 · Paid in full", [dict(benefit="rehab", dates=["2026-06-16", "2026-06-23", "2026-06-30"], paidUsd=435, sessions=3)], False,
  [(d, "Physiotherapy session", 145, 0, 145) for d in ("2026-06-16", "2026-06-23", "2026-06-30")]),
 ("2026-07-31", "2026-07-07", "2405128", "TPT-2231", "Physiotherapy × 3", 435, 435, "paid",
  "Jul 7 – 21, 2026 · Paid in full", [dict(benefit="rehab", dates=["2026-07-07", "2026-07-14", "2026-07-21"], paidUsd=435, sessions=3)], False,
  [(d, "Physiotherapy session", 145, 0, 145) for d in ("2026-07-07", "2026-07-14", "2026-07-21")]),
 ("2026-08-07", "2026-07-24", "2405660", "CRO-5694", f"{ORTHO} · follow-up visit", 240, 240, "paid",
  "Jul 24, 2026 · Paid in full", [dict(benefit="consultations", date="2026-07-24", paidUsd=240)], False,
  [("2026-07-24", "Specialist follow-up, orthopedics", 240, 0, 240)]),
 ("2026-08-28", "2026-07-28", "2406213", "WSA-0418", "Acupuncture × 4 sessions", 480, 480, "paid",
  "Jul 28 – Aug 18, 2026 · Paid in full", [dict(benefit="acupuncture", dates=["2026-07-28", "2026-08-04", "2026-08-11", "2026-08-18"], paidUsd=480, sessions=4)], False,
  [(d, "Acupuncture session", 120, 0, 120) for d in ("2026-07-28", "2026-08-04", "2026-08-11", "2026-08-18")]),
 ("2026-08-29", "2026-08-04", "2406302", "TPT-2268", "Physiotherapy × 2", 290, 290, "paid",
  "Aug 4 and Aug 18, 2026 · Paid in full", [dict(benefit="rehab", dates=["2026-08-04", "2026-08-18"], paidUsd=290, sessions=2)], False,
  [(d, "Physiotherapy session", 145, 0, 145) for d in ("2026-08-04", "2026-08-18")]),
 ("2026-09-02", "2026-08-06", "2406488", "CRO-5731", "Knee brace, off the shelf", 95, 0, "declined",
  "Aug 6, 2026 · Not approved, not covered", None, False,
  [("2026-08-06", "Knee brace, prefabricated (not covered)", 95, 0, 0)]),
 ("2026-09-24", "2026-08-25", "2407350", "WSA-0463", "Acupuncture × 4 sessions", 480, 480, "paid",
  "Aug 25 – Sep 15, 2026 · Paid in full", [dict(benefit="acupuncture", dates=["2026-08-25", "2026-09-01", "2026-09-08", "2026-09-15"], paidUsd=480, sessions=4)], False,
  [(d, "Acupuncture session", 120, 0, 120) for d in ("2026-08-25", "2026-09-01", "2026-09-08", "2026-09-15")]),
 ("2026-09-25", "2026-09-10", "2407419", "QLL-90876", f"{LAB} · blood panel", 180, 180, "paid",
  "Sep 10, 2026 · Paid in full", [dict(benefit="pathology", date="2026-09-10", paidUsd=180)], False,
  [("2026-09-10", "Comprehensive metabolic panel and blood count", 180, 0, 180)]),
 ("2026-10-07", "2026-09-22", "2408034", "TPT-2302", "Physiotherapy", 145, 145, "paid",
  "Sep 22, 2026 · Paid in full", [dict(benefit="rehab", date="2026-09-22", paidUsd=145, sessions=1)], False,
  [("2026-09-22", "Physiotherapy session", 145, 0, 145)]),
 ("2026-10-16", "2026-09-22", "2408151", "TPT-2302", "Physiotherapy (duplicate)", 0, 0, "declined",
  "Sep 22, 2026 · Not approved, duplicate", None, True,
  [("2026-09-22", "Physiotherapy session (already paid on claim 2408034)", 145, 0, 0)]),
 ("2026-10-21", "2026-09-29", "2408277", "WSA-0497", "Acupuncture × 3 sessions", 360, 360, "paid",
  "Sep 29 – Oct 13, 2026 · Paid in full", [dict(benefit="acupuncture", dates=["2026-09-29", "2026-10-06", "2026-10-13"], paidUsd=360, sessions=3)], False,
  [(d, "Acupuncture session", 120, 0, 120) for d in ("2026-09-29", "2026-10-06", "2026-10-13")]),
]

def fmt_day(d):
    import datetime
    return datetime.date.fromisoformat(d).strftime("%b %-d, %Y")

def money(n):
    return f"{n:,.2f} USD"

def letter_pdf(path, settled, claim, inv, title, outcome, summary, lines):
    c = canvas.Canvas(path, pagesize=letter)
    W, H = letter
    c.setTitle(f"Sample settlement letter {claim}")
    c.setFillColor(HexColor("#fff4cc")); c.rect(0, H - 30, W, 30, fill=1, stroke=0)
    c.setFillColor(HexColor("#7a4b00")); c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(W / 2, H - 19, "SAMPLE DATA FOR A PRODUCT DEMO  ·  FICTIONAL MEMBER  ·  NOT AN INSURER DOCUMENT")
    c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 22); c.drawString(54, H - 82, "Claim settlement statement")
    c.setFont("Helvetica", 10); c.setFillColor(GREY)
    c.drawString(54, H - 102, "International health plan · Gold (sample)")
    y = H - 140
    for k, v in [("Member", MEMBER), ("Member ID", MEMBER_ID), ("Claim number", claim), ("Invoice", inv),
                 ("Settled", fmt_day(settled)), ("Treatment", title)]:
        c.setFillColor(GREY); c.setFont("Helvetica", 9.5); c.drawString(54, y, k)
        c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 10.5); c.drawString(160, y, v); y -= 18
    y -= 18
    c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 13); c.drawString(54, y, "How we settled this claim"); y -= 22
    cols = [54, 140, 360, 425, 495, 558]
    c.setFont("Helvetica-Bold", 8.5); c.setFillColor(GREY)
    for x, h in zip(cols, ["Date", "Description", "Billed", "Deductible", "Paid", "You pay"]):
        (c.drawString if x < 300 else c.drawRightString)(x if x < 300 else x + 0, y, h)
    y -= 8; c.setStrokeColor(LINE); c.line(54, y, W - 54, y); y -= 16
    tb = td = tp = 0
    c.setFont("Helvetica", 9); c.setFillColor(NAVY)
    for d, desc, b, ded, p in lines:
        you = b - p
        c.drawString(54, y, fmt_day(d)); c.drawString(140, y, desc[:44])
        for x, v in zip(cols[2:], [b, ded, p, you]): c.drawRightString(x, y, f"{v:,.2f}")
        tb += b; td += ded; tp += p; y -= 18
    c.line(54, y + 8, W - 54, y + 8); y -= 6
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(140, y, "Total (USD)")
    for x, v in zip(cols[2:], [tb, td, tp, tb - tp]): c.drawRightString(x, y, f"{v:,.2f}")
    y -= 36
    c.setFont("Helvetica-Bold", 11); c.drawString(54, y, "Outcome"); y -= 16
    c.setFont("Helvetica", 10); c.drawString(54, y, summary.split(" · ", 1)[-1]); y -= 16
    notes = {
        "paid": "We have paid this claim in full to the account on file (sample, ending 0000).",
        "partial": "Part of this claim was applied to your outpatient deductible, which is now met. We paid the rest.",
        "deductible": "This amount was applied to your deductible. Nothing is payable yet.",
        "declined": "This item is not covered under your plan, so no payment is due." if "duplicate" not in summary
                    else "This treatment was already settled on an earlier claim, so no further payment is due.",
    }
    c.setFillColor(GREY); c.drawString(54, y, notes[outcome])
    c.setFont("Helvetica", 8); c.drawString(54, 48, "Generated for the ClaimBot demo on msdo.us. Every name, number and amount on this page is invented.")
    c.save()

letters = []
for i, (settled, start, claim, inv, title, billed, paid, outcome, summary, usage, dup, lines) in enumerate(L):
    aid = f"demo-letter-{i + 1:02d}"
    letter_pdf(f"{OUT}/_blob/{aid}", settled, claim, inv, title, outcome, summary, lines)
    lt = dict(id=f"s{settled.replace('-', '')}-{i + 1:02d}", assetId=aid, billedUsd=billed,
              claimLabel=f"{claim} · inv {inv}", customerPays=money(billed - paid), date=settled, outcome=outcome,
              paid=money(paid), paidUsd=paid, summary=summary, title=title, treatmentStart=start,
              name=f"Claim settlement {settled.replace('-', '')}.pdf")
    if usage: lt["usage"] = usage
    if dup: lt["duplicate"] = True
    letters.append(lt)

def claim(id, created, status, provider, treatment, dos, amount, ref, extra=None):
    c = dict(id=id, createdAt=created, updatedAt=created, status=status, source="page", cignaRef=ref, docs={},
             confidence={}, warnings=[], timing={}, fields=dict(provider=provider, treatment=treatment, dateOfService=dos,
             amount=amount, amountPaid=amount, invoiceCurrency="USD", reimbursementCurrency="USD", patient=MEMBER,
             country="United States", admission="Outpatient"),
             log=[dict(t=created, m="Documents dropped on the claims page")])
    if extra: c.update(extra)
    return c

claims = [
    claim("cdemo1", "2026-10-14T17:12:00Z", "processed", "Willow Street Acupuncture", "Acupuncture × 3 sessions",
          "2026-09-29", 360, "CS6838215", dict(processedAt="2026-10-21T15:00:00Z")),
    claim("cdemo2", "2026-10-15T18:40:00Z", "info_requested", ORTHO, "Specialist follow-up, orthopedics",
          "2026-10-13", 240, "CS6841172",
          dict(infoRequestSummary="Cigna asked for the referring doctor's letter for this follow-up visit.")),
    claim("cdemo3", "2026-10-22T16:05:00Z", "submitted", "Juniper Dental", "Tooth-coloured filling, one surface",
          "2026-10-20", 180, "CS6852908",
          dict(portalCheck=dict(status="In processing", amount="USD 180.00", checkedAt="2026-11-09T16:30:00Z"))),
]

seed = dict(settings=dict(autoSubmit=False, defaults=dict(otherInsurance=False, reimbursementCurrency="USD"), policyAnniversary="04-01"),
            sync=dict(lastSyncAt="2026-11-09T16:30:00Z", mailbox="claims inbox"),
            claims=claims, letters=letters)
with open(f"{OUT}/seed.js", "w") as f:
    f.write("// Seed: fictional sample data for the ClaimBot Lab demo. Jordan Reyes and every provider, number and amount are invented.\n")
    f.write("window.CA_SEED = " + json.dumps(seed, ensure_ascii=False, indent=1) + ";\n")

# The invoice and receipt dropped in the walkthrough
def doc_pdf(path, kind):
    c = canvas.Canvas(path, pagesize=letter); W, H = letter
    c.setTitle(f"Tidewater Physical Therapy {kind} (sample)")
    c.setFillColor(HexColor("#fff4cc")); c.rect(0, H - 30, W, 30, fill=1, stroke=0)
    c.setFillColor(HexColor("#7a4b00")); c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(W / 2, H - 19, "SAMPLE DATA FOR A PRODUCT DEMO  ·  FICTIONAL CLINIC AND PATIENT")
    c.setFillColor(HexColor("#0f5257")); c.setFont("Helvetica-Bold", 20); c.drawString(54, H - 80, "Tidewater Physical Therapy")
    c.setFont("Helvetica", 9.5); c.setFillColor(GREY)
    c.drawString(54, H - 97, "220 Harbor Way, Suite 4 · Oakland, CA 94607 (sample address)")
    c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 16)
    c.drawRightString(W - 54, H - 80, "INVOICE" if kind == "invoice" else "RECEIPT")
    y = H - 140
    rows = [("Patient", MEMBER), ("Invoice #", "TPT-2341"), ("Date of service", "Oct 27, 2026"),
            ("Therapist", "Dana Whitfield, DPT · NPI 1234567893")]
    if kind == "receipt": rows += [("Payment date", "Oct 27, 2026"), ("Paid by", "Card ending 0000 (sample)")]
    for k, v in rows:
        c.setFillColor(GREY); c.setFont("Helvetica", 9.5); c.drawString(54, y, k)
        c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 10.5); c.drawString(170, y, v); y -= 18
    y -= 20
    c.setFont("Helvetica-Bold", 9); c.setFillColor(GREY)
    c.drawString(54, y, "CPT"); c.drawString(110, y, "Description"); c.drawString(390, y, "ICD-10"); c.drawRightString(W - 54, y, "Amount")
    y -= 8; c.setStrokeColor(LINE); c.line(54, y, W - 54, y); y -= 16
    c.setFont("Helvetica", 9.5); c.setFillColor(NAVY)
    for cpt, desc, amt in [("97110", "Therapeutic exercise, 30 min", 95), ("97140", "Manual therapy, 15 min", 50)]:
        c.drawString(54, y, cpt); c.drawString(110, y, desc); c.drawString(390, y, "S83.411D"); c.drawRightString(W - 54, y, f"${amt:.2f}"); y -= 18
    c.line(54, y + 8, W - 54, y + 8); y -= 8
    c.setFont("Helvetica-Bold", 10.5); c.drawString(110, y, "Total"); c.drawRightString(W - 54, y, "$145.00"); y -= 18
    if kind == "receipt":
        c.drawString(110, y, "Amount paid"); c.drawRightString(W - 54, y, "$145.00"); y -= 18
        c.drawString(110, y, "Balance due"); c.drawRightString(W - 54, y, "$0.00"); y -= 18
    y -= 18; c.setFont("Helvetica", 9.5); c.setFillColor(GREY)
    c.drawString(54, y, "Diagnosis: sprain of medial collateral ligament, right knee, subsequent encounter (S83.411D).")
    c.drawString(54, y - 14, "Plan of care: session 10. Home exercise program reviewed.")
    c.save()

doc_pdf(f"{OUT}/files/TidewaterPT-Invoice-TPT-2341.pdf", "invoice")
doc_pdf(f"{OUT}/files/TidewaterPT-Receipt-2026-10-27.pdf", "receipt")

paid = sum(l["paidUsd"] for l in letters); billed = sum(l["billedUsd"] for l in letters if not l.get("duplicate"))
print("letters", len(letters), "billed", billed, "paid", paid)
