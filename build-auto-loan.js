const fs = require('fs');
const path = require('path');

const states = [
  { code: 'AL', name: 'Alabama', avgPrice: 29500, avgRate: 6.8, salesTax: 2.0, regFee: 23, avgIncome: 52000, topBrand: 'Ford F-150' },
  { code: 'AK', name: 'Alaska', avgPrice: 35200, avgRate: 6.5, salesTax: 0, regFee: 100, avgIncome: 59000, topBrand: 'Toyota Tacoma' },
  { code: 'AZ', name: 'Arizona', avgPrice: 33100, avgRate: 6.9, salesTax: 5.6, regFee: 32, avgIncome: 56000, topBrand: 'Toyota RAV4' },
  { code: 'AR', name: 'Arkansas', avgPrice: 28900, avgRate: 7.1, salesTax: 6.5, regFee: 17, avgIncome: 48000, topBrand: 'Ford F-150' },
  { code: 'CA', name: 'California', avgPrice: 38500, avgRate: 6.4, salesTax: 7.25, regFee: 65, avgIncome: 71000, topBrand: 'Tesla Model Y' },
  { code: 'CO', name: 'Colorado', avgPrice: 35800, avgRate: 6.3, salesTax: 2.9, regFee: 50, avgIncome: 65000, topBrand: 'Toyota 4Runner' },
  { code: 'CT', name: 'Connecticut', avgPrice: 34200, avgRate: 6.2, salesTax: 6.35, regFee: 120, avgIncome: 72000, topBrand: 'Honda CR-V' },
  { code: 'DE', name: 'Delaware', avgPrice: 31500, avgRate: 6.5, salesTax: 0, regFee: 40, avgIncome: 58000, topBrand: 'Toyota Camry' },
  { code: 'FL', name: 'Florida', avgPrice: 34800, avgRate: 6.7, salesTax: 6.0, regFee: 225, avgIncome: 55000, topBrand: 'Toyota RAV4' },
  { code: 'GA', name: 'Georgia', avgPrice: 32400, avgRate: 6.8, salesTax: 6.6, regFee: 20, avgIncome: 54000, topBrand: 'Honda Civic' },
  { code: 'HI', name: 'Hawaii', avgPrice: 36500, avgRate: 6.6, salesTax: 4.0, regFee: 45, avgIncome: 62000, topBrand: 'Toyota Tacoma' },
  { code: 'ID', name: 'Idaho', avgPrice: 31200, avgRate: 6.9, salesTax: 6.0, regFee: 69, avgIncome: 52000, topBrand: 'Ford F-150' },
  { code: 'IL', name: 'Illinois', avgPrice: 33100, avgRate: 6.5, salesTax: 6.25, regFee: 151, avgIncome: 60000, topBrand: 'Honda CR-V' },
  { code: 'IN', name: 'Indiana', avgPrice: 30200, avgRate: 6.8, salesTax: 7.0, regFee: 21, avgIncome: 52000, topBrand: 'Ford F-150' },
  { code: 'IA', name: 'Iowa', avgPrice: 29800, avgRate: 6.7, salesTax: 5.0, regFee: 35, avgIncome: 54000, topBrand: 'Chevrolet Silverado' },
  { code: 'KS', name: 'Kansas', avgPrice: 30500, avgRate: 6.9, salesTax: 6.5, regFee: 42, avgIncome: 53000, topBrand: 'Ford F-150' },
  { code: 'KY', name: 'Kentucky', avgPrice: 29500, avgRate: 7.0, salesTax: 6.0, regFee: 21, avgIncome: 49000, topBrand: 'Toyota Camry' },
  { code: 'LA', name: 'Louisiana', avgPrice: 30800, avgRate: 7.2, salesTax: 4.45, regFee: 20, avgIncome: 48000, topBrand: 'Ford F-150' },
  { code: 'ME', name: 'Maine', avgPrice: 31500, avgRate: 6.6, salesTax: 5.5, regFee: 35, avgIncome: 53000, topBrand: 'Subaru Outback' },
  { code: 'MD', name: 'Maryland', avgPrice: 34500, avgRate: 6.4, salesTax: 6.0, regFee: 135, avgIncome: 68000, topBrand: 'Honda CR-V' },
  { code: 'MA', name: 'Massachusetts', avgPrice: 35200, avgRate: 6.2, salesTax: 6.25, regFee: 60, avgIncome: 72000, topBrand: 'Toyota RAV4' },
  { code: 'MI', name: 'Michigan', avgPrice: 31800, avgRate: 6.7, salesTax: 6.0, regFee: 125, avgIncome: 54000, topBrand: 'Chevrolet Equinox' },
  { code: 'MN', name: 'Minnesota', avgPrice: 33200, avgRate: 6.4, salesTax: 6.875, regFee: 35, avgIncome: 62000, topBrand: 'Toyota RAV4' },
  { code: 'MS', name: 'Mississippi', avgPrice: 27500, avgRate: 7.3, salesTax: 5.0, regFee: 14, avgIncome: 44000, topBrand: 'Nissan Altima' },
  { code: 'MO', name: 'Missouri', avgPrice: 30200, avgRate: 6.8, salesTax: 4.225, regFee: 25, avgIncome: 52000, topBrand: 'Ford F-150' },
  { code: 'MT', name: 'Montana', avgPrice: 32500, avgRate: 6.7, salesTax: 0, regFee: 217, avgIncome: 52000, topBrand: 'Ford F-150' },
  { code: 'NE', name: 'Nebraska', avgPrice: 30800, avgRate: 6.6, salesTax: 5.5, regFee: 30, avgIncome: 55000, topBrand: 'Chevrolet Silverado' },
  { code: 'NV', name: 'Nevada', avgPrice: 33500, avgRate: 6.9, salesTax: 8.25, regFee: 33, avgIncome: 54000, topBrand: 'Toyota Camry' },
  { code: 'NH', name: 'New Hampshire', avgPrice: 32800, avgRate: 6.3, salesTax: 0, regFee: 40, avgIncome: 66000, topBrand: 'Subaru Outback' },
  { code: 'NJ', name: 'New Jersey', avgPrice: 35500, avgRate: 6.3, salesTax: 6.625, regFee: 54, avgIncome: 70000, topBrand: 'Honda CR-V' },
  { code: 'NM', name: 'New Mexico', avgPrice: 29800, avgRate: 7.0, salesTax: 4.0, regFee: 27, avgIncome: 48000, topBrand: 'Ford F-150' },
  { code: 'NY', name: 'New York', avgPrice: 35800, avgRate: 6.4, salesTax: 4.0, regFee: 50, avgIncome: 65000, topBrand: 'Toyota RAV4' },
  { code: 'NC', name: 'North Carolina', avgPrice: 31500, avgRate: 6.7, salesTax: 3.0, regFee: 38, avgIncome: 53000, topBrand: 'Honda Civic' },
  { code: 'ND', name: 'North Dakota', avgPrice: 31200, avgRate: 6.5, salesTax: 5.0, regFee: 49, avgIncome: 57000, topBrand: 'Chevrolet Silverado' },
  { code: 'OH', name: 'Ohio', avgPrice: 30500, avgRate: 6.6, salesTax: 5.75, regFee: 31, avgIncome: 53000, topBrand: 'Honda CR-V' },
  { code: 'OK', name: 'Oklahoma', avgPrice: 29500, avgRate: 7.1, salesTax: 4.5, regFee: 91, avgIncome: 50000, topBrand: 'Ford F-150' },
  { code: 'OR', name: 'Oregon', avgPrice: 33200, avgRate: 6.5, salesTax: 0, regFee: 122, avgIncome: 58000, topBrand: 'Subaru Outback' },
  { code: 'PA', name: 'Pennsylvania', avgPrice: 32500, avgRate: 6.5, salesTax: 6.0, regFee: 39, avgIncome: 57000, topBrand: 'Honda CR-V' },
  { code: 'RI', name: 'Rhode Island', avgPrice: 32800, avgRate: 6.4, salesTax: 7.0, regFee: 30, avgIncome: 58000, topBrand: 'Toyota RAV4' },
  { code: 'SC', name: 'South Carolina', avgPrice: 30200, avgRate: 6.9, salesTax: 5.0, regFee: 40, avgIncome: 50000, topBrand: 'Toyota Camry' },
  { code: 'SD', name: 'South Dakota', avgPrice: 30500, avgRate: 6.7, salesTax: 4.5, regFee: 36, avgIncome: 54000, topBrand: 'Ford F-150' },
  { code: 'TN', name: 'Tennessee', avgPrice: 31200, avgRate: 6.9, salesTax: 7.0, regFee: 26, avgIncome: 52000, topBrand: 'Nissan Rogue' },
  { code: 'TX', name: 'Texas', avgPrice: 34500, avgRate: 6.8, salesTax: 6.25, regFee: 51, avgIncome: 58000, topBrand: 'Ford F-150' },
  { code: 'UT', name: 'Utah', avgPrice: 32800, avgRate: 6.5, salesTax: 6.1, regFee: 44, avgIncome: 60000, topBrand: 'Toyota RAV4' },
  { code: 'VT', name: 'Vermont', avgPrice: 31500, avgRate: 6.4, salesTax: 6.0, regFee: 76, avgIncome: 55000, topBrand: 'Subaru Outback' },
  { code: 'VA', name: 'Virginia', avgPrice: 33200, avgRate: 6.5, salesTax: 4.15, regFee: 45, avgIncome: 63000, topBrand: 'Honda CR-V' },
  { code: 'WA', name: 'Washington', avgPrice: 35500, avgRate: 6.4, salesTax: 6.5, regFee: 65, avgIncome: 66000, topBrand: 'Toyota RAV4' },
  { code: 'WV', name: 'West Virginia', avgPrice: 28500, avgRate: 7.2, salesTax: 6.0, regFee: 51, avgIncome: 46000, topBrand: 'Chevrolet Silverado' },
  { code: 'WI', name: 'Wisconsin', avgPrice: 31500, avgRate: 6.6, salesTax: 5.0, regFee: 85, avgIncome: 56000, topBrand: 'Toyota RAV4' },
  { code: 'WY', name: 'Wyoming', avgPrice: 33500, avgRate: 6.8, salesTax: 4.0, regFee: 30, avgIncome: 55000, topBrand: 'Ford F-150' },
];

const dir = path.join(__dirname, 'auto-loan');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function makeSlug(name) { return name.toLowerCase().replace(/\s+/g, '-'); }

function makeStatePage(s) {
  const slug = makeSlug(s.name);
  const noTax = s.salesTax === 0;
  const taxNote = noTax ? `${s.name} has <strong>no vehicle sales tax</strong>, saving buyers thousands.` : `${s.name} charges <strong>${s.salesTax}% sales tax</strong> on vehicle purchases.`;
  const totalTaxOnAvg = noTax ? 0 : Math.round(s.avgPrice * s.salesTax / 100);
  const monthlyPayment60 = Math.round((s.avgPrice * (s.avgRate/100/12) * Math.pow(1+s.avgRate/100/12, 60)) / (Math.pow(1+s.avgRate/100/12, 60) - 1));
  const monthlyPayment72 = Math.round((s.avgPrice * (s.avgRate/100/12) * Math.pow(1+s.avgRate/100/12, 72)) / (Math.pow(1+s.avgRate/100/12, 72) - 1));
  const totalPaid60 = monthlyPayment60 * 60;
  const totalInterest60 = totalPaid60 - s.avgPrice;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${s.name} Auto Loan Calculator 2026 — Car Payment & Interest Rates | SmartCalc</title>
<meta name="description" content="Free ${s.name} auto loan calculator. Calculate monthly car payments, compare loan terms, see ${s.name}-specific sales tax (${s.salesTax}%), registration fees, and find the best rates.">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/auto-loan/${slug}.html">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"${s.name} Auto Loan Calculator","description":"Calculate auto loan payments for ${s.name} with state-specific tax rates and fees","url":"https://alexchalu.github.io/smartcalc/auto-loan/${slug}.html","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<style>
:root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#3b82f6;--accent2:#2563eb;--green:#10b981;--red:#ef4444;--radius:12px}
[data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
.hi{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
.logo{font-size:1.3rem;font-weight:800;color:var(--accent);text-decoration:none}
.nav{color:var(--muted);font-size:.85rem;flex:1}.nav a{color:var(--accent);text-decoration:none}
.tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;cursor:pointer;font-size:1rem}
main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
h1{font-size:1.6rem;margin-bottom:.5rem}h2{font-size:1.2rem;margin:2rem 0 1rem;color:var(--accent)}
.sub{color:var(--muted);margin-bottom:1.5rem}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;text-align:center}
.stat .num{font-size:1.5rem;font-weight:800;color:var(--accent)}
.stat .lbl{color:var(--muted);font-size:.8rem;margin-top:.25rem}
.calc-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:2rem;margin-bottom:2rem}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
label{display:block;font-size:.85rem;font-weight:600;margin-bottom:.35rem}
input,select{width:100%;padding:.7rem;border:1px solid var(--border);border-radius:8px;background:var(--surface2);color:var(--text);font-size:1rem}
input:focus,select:focus{outline:none;border-color:var(--accent)}
.btn{background:var(--accent);color:#fff;border:none;padding:.85rem 2rem;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;width:100%;margin-top:1rem}
.btn:hover{background:var(--accent2)}
.results{display:none;margin-top:1.5rem}
.result-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.result-card{background:var(--surface2);border-radius:var(--radius);padding:1.25rem;text-align:center}
.result-card .val{font-size:1.8rem;font-weight:800;color:var(--green)}
.result-card .val.warn{color:var(--red)}
.result-card .desc{color:var(--muted);font-size:.8rem;margin-top:.25rem}
.amort{width:100%;border-collapse:collapse;margin-top:1rem;font-size:.85rem}
.amort th{background:var(--surface2);padding:.6rem;text-align:left;font-weight:600;border-bottom:1px solid var(--border)}
.amort td{padding:.5rem .6rem;border-bottom:1px solid var(--border)}
.amort tr:hover td{background:var(--surface2)}
.tips{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-bottom:2rem}
.tips li{margin-bottom:.5rem;color:var(--muted);font-size:.9rem}
.tips li strong{color:var(--text)}
.ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
.faq{margin-top:2rem}.faq details{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:.75rem;padding:1rem 1.25rem}
.faq summary{font-weight:600;cursor:pointer;font-size:.95rem}.faq summary:hover{color:var(--accent)}
.faq p{color:var(--muted);margin-top:.5rem;font-size:.9rem}
footer{text-align:center;padding:2rem;color:var(--muted);font-size:.8rem;border-top:1px solid var(--border);margin-top:3rem}
footer a{color:var(--accent);text-decoration:none}
@media(max-width:600px){.form-grid,.result-grid,.stats{grid-template-columns:1fr}}
</style>
</head>
<body>
<header><div class="hi">
<a href="../" class="logo">💰 SmartCalc</a>
<div class="nav"><a href="../">Home</a> → <a href="./">Auto Loans</a> → ${s.name}</div>
<button class="tb" id="themeBtn">🌙</button>
</div></header>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<main>
<h1>🚗 ${s.name} Auto Loan Calculator 2026</h1>
<p class="sub">Calculate your car payment with ${s.name}-specific sales tax, registration fees, and current interest rates.</p>

<div class="stats">
<div class="stat"><div class="num">$${s.avgPrice.toLocaleString()}</div><div class="lbl">Avg. Vehicle Price</div></div>
<div class="stat"><div class="num">${s.avgRate}%</div><div class="lbl">Avg. Interest Rate</div></div>
<div class="stat"><div class="num">${s.salesTax}%</div><div class="lbl">Sales Tax Rate</div></div>
<div class="stat"><div class="num">$${s.regFee}</div><div class="lbl">Registration Fee</div></div>
</div>

<div class="calc-box">
<h2>Calculate Your Payment</h2>
<div class="form-grid">
<div><label>Vehicle Price ($)</label><input type="number" id="price" value="${s.avgPrice}"></div>
<div><label>Down Payment ($)</label><input type="number" id="down" value="5000"></div>
<div><label>Trade-In Value ($)</label><input type="number" id="trade" value="0"></div>
<div><label>Interest Rate (APR %)</label><input type="number" id="rate" value="${s.avgRate}" step="0.1"></div>
<div><label>Loan Term</label><select id="term"><option value="36">36 months (3 years)</option><option value="48">48 months (4 years)</option><option value="60" selected>60 months (5 years)</option><option value="72">72 months (6 years)</option><option value="84">84 months (7 years)</option></select></div>
<div><label>Credit Score</label><select id="credit"><option value="excellent">Excellent (750+)</option><option value="good" selected>Good (700-749)</option><option value="fair">Fair (650-699)</option><option value="poor">Poor (below 650)</option></select></div>
</div>
<div style="margin-top:1rem;padding:.75rem;background:var(--surface2);border-radius:8px;font-size:.85rem">
<strong>${s.code} Costs:</strong> Sales tax: <strong>${noTax ? 'None!' : '$' + totalTaxOnAvg.toLocaleString()}</strong> on avg. vehicle · Registration: <strong>$${s.regFee}</strong> · Popular: <strong>${s.topBrand}</strong>
</div>
<button class="btn" onclick="calc()">Calculate Payment</button>
<div class="results" id="results">
<div class="result-grid">
<div class="result-card"><div class="val" id="rMonthly">-</div><div class="desc">Monthly Payment</div></div>
<div class="result-card"><div class="val" id="rTotal">-</div><div class="desc">Total Paid</div></div>
<div class="result-card"><div class="val warn" id="rInterest">-</div><div class="desc">Total Interest</div></div>
<div class="result-card"><div class="val" id="rLoan">-</div><div class="desc">Loan Amount</div></div>
</div>
<h3 style="margin-top:1.5rem">Amortization Schedule</h3>
<div style="overflow-x:auto"><table class="amort"><thead><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody id="amortBody"></tbody></table></div>
</div>
</div>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<h2>${s.name} Auto Loan Quick Facts</h2>
<div class="tips">
<ul>
<li>${taxNote}</li>
<li><strong>Registration fee:</strong> $${s.regFee} (varies by vehicle age/weight in some cases)</li>
<li><strong>Average vehicle price:</strong> $${s.avgPrice.toLocaleString()} in ${s.name}</li>
<li><strong>Average interest rate:</strong> ${s.avgRate}% APR for 60-month loans (good credit)</li>
<li><strong>Most popular vehicle:</strong> ${s.topBrand}</li>
<li><strong>Median household income:</strong> $${s.avgIncome.toLocaleString()}</li>
<li><strong>Monthly payment (60-mo avg):</strong> ~$${monthlyPayment60}/month</li>
<li><strong>Monthly payment (72-mo avg):</strong> ~$${monthlyPayment72}/month</li>
<li><strong>Total interest (60-mo avg):</strong> ~$${totalInterest60.toLocaleString()}</li>
</ul>
</div>

<h2>Tips to Get the Best Auto Loan Rate in ${s.name}</h2>
<div class="tips">
<ol>
<li><strong>Check your credit score first.</strong> Scores above 720 qualify for the best rates (often 3-5% APR).</li>
<li><strong>Get pre-approved.</strong> Apply at your bank, credit union, or online lender before visiting the dealership.</li>
<li><strong>Compare at least 3 lenders.</strong> ${s.name} credit unions often offer rates 1-2% lower than big banks.</li>
<li><strong>Keep the loan term short.</strong> 48 or 60 months saves thousands vs. 72 or 84 months.</li>
<li><strong>Put 20% down.</strong> Avoids being "upside down" on the loan and reduces total interest.</li>
<li><strong>Watch for dealer markups.</strong> Dealers can add 1-3% to your rate. Always compare with pre-approval.</li>
${noTax ? `<li><strong>No sales tax advantage!</strong> ${s.name} doesn't charge vehicle sales tax — that's a significant savings.</li>` : `<li><strong>Budget for ${s.salesTax}% sales tax.</strong> On a $${s.avgPrice.toLocaleString()} car, that's $${totalTaxOnAvg.toLocaleString()} extra.</li>`}
</ol>
</div>

<div class="faq">
<h2>Frequently Asked Questions</h2>
<details><summary>What is the average auto loan rate in ${s.name}?</summary><p>The average auto loan rate in ${s.name} for a 60-month new car loan is approximately ${s.avgRate}% APR for borrowers with good credit (700+). Rates vary by credit score — excellent credit may qualify for 4-5%, while subprime borrowers may see 10-15%+.</p></details>
<details><summary>How much is sales tax on a car in ${s.name}?</summary><p>${noTax ? `${s.name} does not charge sales tax on vehicle purchases, making it one of the most affordable states to buy a car.` : `${s.name} charges ${s.salesTax}% sales tax on vehicle purchases. On a $${s.avgPrice.toLocaleString()} vehicle, the sales tax would be $${totalTaxOnAvg.toLocaleString()}. Some local jurisdictions may add additional tax.`}</p></details>
<details><summary>How much should I put down on a car in ${s.name}?</summary><p>Financial experts recommend putting 20% down on a new car and 10% on a used car. On the average ${s.name} vehicle price of $${s.avgPrice.toLocaleString()}, that's $${Math.round(s.avgPrice * 0.2).toLocaleString()} down. This helps you avoid negative equity and reduces your monthly payment significantly.</p></details>
<details><summary>Should I finance through a dealer or bank in ${s.name}?</summary><p>Compare both options. ${s.name} credit unions often offer the lowest rates (sometimes 1-2% below dealer financing). Get pre-approved from your bank or credit union first, then see if the dealer can beat it. Some dealers offer 0% APR promotional rates on select models.</p></details>
<details><summary>Is it better to buy new or used in ${s.name}?</summary><p>Used cars typically offer better value. A 2-3 year old car saves 30-40% off MSRP while retaining modern features. However, new cars in ${s.name} may qualify for manufacturer incentives, lower interest rates, and full warranty coverage. Consider total cost of ownership including ${noTax ? 'registration fees' : `${s.salesTax}% sales tax`} and insurance.</p></details>
</div>

<div style="margin-top:2rem;padding:1.25rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)">
<h3 style="font-size:1rem;margin-bottom:.5rem">🗺️ Other State Auto Loan Calculators</h3>
<p style="color:var(--muted);font-size:.85rem">Compare rates across states: <a href="./" style="color:var(--accent)">View All 50 States →</a></p>
</div>
</main>

<footer>
<p>💰 <a href="../">SmartCalc</a> — Free Financial Calculators</p>
<p style="margin-top:.5rem">Calculator provides estimates only. Actual rates depend on credit, lender, and market conditions.</p>
</footer>

<script>
const tb=document.getElementById('themeBtn');
tb.onclick=()=>{const d=document.documentElement;const t=d.getAttribute('data-theme')==='light'?'':'light';d.setAttribute('data-theme',t);tb.textContent=t?'🌞':'🌙';localStorage.setItem('theme',t)};
if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');tb.textContent='🌞'}

function calc(){
  const p=+document.getElementById('price').value;
  const d=+document.getElementById('down').value;
  const tr=+document.getElementById('trade').value;
  const r=+document.getElementById('rate').value/100/12;
  const n=+document.getElementById('term').value;
  const tax=p*${s.salesTax}/100;
  const loan=p-d-tr+tax+${s.regFee};
  const monthly=r>0?loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):loan/n;
  const total=monthly*n;
  const interest=total-loan;
  document.getElementById('rMonthly').textContent='$'+Math.round(monthly).toLocaleString();
  document.getElementById('rTotal').textContent='$'+Math.round(total).toLocaleString();
  document.getElementById('rInterest').textContent='$'+Math.round(interest).toLocaleString();
  document.getElementById('rLoan').textContent='$'+Math.round(loan).toLocaleString();
  document.getElementById('results').style.display='block';
  // Amortization by year
  let bal=loan;const tbody=document.getElementById('amortBody');tbody.innerHTML='';
  const years=Math.ceil(n/12);
  for(let y=1;y<=years;y++){
    let yp=0,yi=0;const months=Math.min(12,n-(y-1)*12);
    for(let m=0;m<months;m++){const mi=bal*r;const mp=monthly-mi;yp+=mp;yi+=mi;bal-=mp}
    if(bal<0)bal=0;
    tbody.innerHTML+='<tr><td>'+y+'</td><td>$'+Math.round(yp).toLocaleString()+'</td><td>$'+Math.round(yi).toLocaleString()+'</td><td>$'+Math.round(bal).toLocaleString()+'</td></tr>';
  }
}
calc();
</script>
</body></html>`;
}

function makeIndex() {
  const rows = states.map(s => {
    const slug = makeSlug(s.name);
    const mp60 = Math.round((s.avgPrice * (s.avgRate/100/12) * Math.pow(1+s.avgRate/100/12, 60)) / (Math.pow(1+s.avgRate/100/12, 60) - 1));
    return `<tr><td><a href="${slug}.html" style="color:var(--accent);text-decoration:none;font-weight:600">${s.name}</a></td><td>$${s.avgPrice.toLocaleString()}</td><td>${s.avgRate}%</td><td>${s.salesTax}%</td><td>$${s.regFee}</td><td>$${mp60}/mo</td><td>${s.topBrand}</td></tr>`;
  }).join('\n');

  const noTaxStates = states.filter(s => s.salesTax === 0);
  const cheapestStates = [...states].sort((a,b) => a.avgPrice - b.avgPrice).slice(0, 5);
  const lowestRateStates = [...states].sort((a,b) => a.avgRate - b.avgRate).slice(0, 5);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Auto Loan Calculator by State 2026 — Car Payment Rates & Sales Tax | SmartCalc</title>
<meta name="description" content="Compare auto loan rates, sales tax, and car payments across all 50 states. Free state-specific auto loan calculators with registration fees and payment estimates.">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/auto-loan/">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<style>
:root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#3b82f6;--accent2:#2563eb;--green:#10b981;--radius:12px}
[data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
.hi{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:1rem}
.logo{font-size:1.3rem;font-weight:800;color:var(--accent);text-decoration:none}
.nav{color:var(--muted);font-size:.85rem;flex:1}.nav a{color:var(--accent);text-decoration:none}
.tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;cursor:pointer;font-size:1rem}
main{max-width:1100px;margin:0 auto;padding:2rem 1.5rem}
h1{font-size:1.6rem;margin-bottom:.5rem}h2{font-size:1.2rem;margin:2rem 0 1rem;color:var(--accent)}
.sub{color:var(--muted);margin-bottom:1.5rem}
.highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-bottom:2.5rem}
.highlight{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem}
.highlight h3{font-size:1rem;margin-bottom:.75rem;color:var(--accent)}
.highlight ol,.highlight ul{padding-left:1.25rem;color:var(--muted);font-size:.9rem}
.highlight li{margin-bottom:.35rem}.highlight li strong{color:var(--text)}
.search{width:100%;padding:.75rem 1rem;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);font-size:1rem;margin-bottom:1.5rem}
.search:focus{outline:none;border-color:var(--accent)}
table{width:100%;border-collapse:collapse;font-size:.85rem}
th{background:var(--surface2);padding:.7rem .6rem;text-align:left;font-weight:600;border-bottom:2px solid var(--border);cursor:pointer;user-select:none}
th:hover{color:var(--accent)}
td{padding:.6rem;border-bottom:1px solid var(--border)}
tr:hover td{background:var(--surface2)}
.ad{max-width:1100px;margin:1.5rem auto;padding:0 1.5rem}
footer{text-align:center;padding:2rem;color:var(--muted);font-size:.8rem;border-top:1px solid var(--border);margin-top:3rem}
footer a{color:var(--accent);text-decoration:none}
@media(max-width:600px){.highlights{grid-template-columns:1fr}table{font-size:.75rem}}
</style>
</head>
<body>
<header><div class="hi">
<a href="../" class="logo">💰 SmartCalc</a>
<div class="nav"><a href="../">Home</a> → Auto Loan Calculators</div>
<button class="tb" id="themeBtn">🌙</button>
</div></header>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<main>
<h1>🚗 Auto Loan Calculator by State — 2026</h1>
<p class="sub">Compare car loan rates, sales tax, registration fees, and monthly payments across all 50 states.</p>

<div class="highlights">
<div class="highlight"><h3>🚫 No Sales Tax States</h3><ul>${noTaxStates.map(s => `<li><strong><a href="${makeSlug(s.name)}.html" style="color:var(--accent)">${s.name}</a></strong> — $0 sales tax on vehicles</li>`).join('')}</ul></div>
<div class="highlight"><h3>💰 Cheapest Avg. Vehicle Price</h3><ol>${cheapestStates.map(s => `<li><strong><a href="${makeSlug(s.name)}.html" style="color:var(--accent)">${s.name}</a></strong> — $${s.avgPrice.toLocaleString()}</li>`).join('')}</ol></div>
<div class="highlight"><h3>📉 Lowest Interest Rates</h3><ol>${lowestRateStates.map(s => `<li><strong><a href="${makeSlug(s.name)}.html" style="color:var(--accent)">${s.name}</a></strong> — ${s.avgRate}% APR</li>`).join('')}</ol></div>
</div>

<input type="text" class="search" id="search" placeholder="🔍 Search states...">

<div style="overflow-x:auto">
<table id="stateTable">
<thead><tr><th onclick="sortTable(0)">State ↕</th><th onclick="sortTable(1)">Avg. Price ↕</th><th onclick="sortTable(2)">Avg. Rate ↕</th><th onclick="sortTable(3)">Sales Tax ↕</th><th onclick="sortTable(4)">Reg. Fee ↕</th><th onclick="sortTable(5)">Est. Payment ↕</th><th>Top Vehicle</th></tr></thead>
<tbody id="tbody">
${rows}
</tbody>
</table>
</div>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<h2>Understanding Auto Loan Costs by State</h2>
<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-bottom:2rem">
<p style="color:var(--muted);font-size:.9rem;margin-bottom:1rem">The true cost of buying a car varies significantly by state. Beyond the sticker price, you need to account for:</p>
<ul style="color:var(--muted);font-size:.9rem;padding-left:1.25rem">
<li><strong style="color:var(--text)">Sales tax:</strong> Ranges from 0% (Alaska, Delaware, Montana, New Hampshire, Oregon) to 8.25% (Nevada). This alone can add thousands to your total cost.</li>
<li><strong style="color:var(--text)">Registration fees:</strong> Range from $14 (Mississippi) to $225 (Florida). Some states base fees on vehicle weight or value.</li>
<li><strong style="color:var(--text)">Interest rates:</strong> Average rates vary by state due to local market conditions, credit union availability, and dealer competition.</li>
<li><strong style="color:var(--text)">Insurance costs:</strong> Mandatory in all states (except NH), and premiums vary widely by location.</li>
</ul>
</div>
</main>

<footer>
<p>💰 <a href="../">SmartCalc</a> — Free Financial Calculators</p>
<p style="margin-top:.5rem">Estimates only. Rates and fees subject to change.</p>
</footer>

<script>
const tb=document.getElementById('themeBtn');
tb.onclick=()=>{const d=document.documentElement;const t=d.getAttribute('data-theme')==='light'?'':'light';d.setAttribute('data-theme',t);tb.textContent=t?'🌞':'🌙';localStorage.setItem('theme',t)};
if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');tb.textContent='🌞'}

document.getElementById('search').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  document.querySelectorAll('#tbody tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':'none'});
});

function sortTable(col){
  const tbody=document.getElementById('tbody');
  const rows=[...tbody.querySelectorAll('tr')];
  const dir=tbody.dataset.sortDir==col?-1:1;
  tbody.dataset.sortDir=dir===1?col:'';
  rows.sort((a,b)=>{
    let av=a.cells[col].textContent.replace(/[\\$,%\\/mo]/g,'');
    let bv=b.cells[col].textContent.replace(/[\\$,%\\/mo]/g,'');
    const an=parseFloat(av),bn=parseFloat(bv);
    if(!isNaN(an)&&!isNaN(bn))return(an-bn)*dir;
    return av.localeCompare(bv)*dir;
  });
  rows.forEach(r=>tbody.appendChild(r));
}
</script>
</body></html>`;
}

// Generate all state pages
states.forEach(s => {
  const slug = makeSlug(s.name);
  fs.writeFileSync(path.join(dir, `${slug}.html`), makeStatePage(s));
});

// Generate index page
fs.writeFileSync(path.join(dir, 'index.html'), makeIndex());

console.log(`Generated ${states.length + 1} auto loan calculator pages in auto-loan/`);
