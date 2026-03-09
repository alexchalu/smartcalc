#!/usr/bin/env node
// Build 50-state mortgage calculator pages for SmartCalc
const fs = require('fs');
const path = require('path');

const states = [
  { name: 'Alabama', abbr: 'AL', slug: 'alabama', propTax: 0.41, avgHome: 232000, insurance: 2100 },
  { name: 'Alaska', abbr: 'AK', slug: 'alaska', propTax: 1.19, avgHome: 340000, insurance: 1500 },
  { name: 'Arizona', abbr: 'AZ', slug: 'arizona', propTax: 0.62, avgHome: 410000, insurance: 2000 },
  { name: 'Arkansas', abbr: 'AR', slug: 'arkansas', propTax: 0.62, avgHome: 202000, insurance: 2600 },
  { name: 'California', abbr: 'CA', slug: 'california', propTax: 0.74, avgHome: 785000, insurance: 1800 },
  { name: 'Colorado', abbr: 'CO', slug: 'colorado', propTax: 0.51, avgHome: 545000, insurance: 2800 },
  { name: 'Connecticut', abbr: 'CT', slug: 'connecticut', propTax: 2.15, avgHome: 385000, insurance: 2200 },
  { name: 'Delaware', abbr: 'DE', slug: 'delaware', propTax: 0.57, avgHome: 350000, insurance: 1200 },
  { name: 'Florida', abbr: 'FL', slug: 'florida', propTax: 0.89, avgHome: 405000, insurance: 4200 },
  { name: 'Georgia', abbr: 'GA', slug: 'georgia', propTax: 0.92, avgHome: 355000, insurance: 2100 },
  { name: 'Hawaii', abbr: 'HI', slug: 'hawaii', propTax: 0.28, avgHome: 835000, insurance: 1200 },
  { name: 'Idaho', abbr: 'ID', slug: 'idaho', propTax: 0.69, avgHome: 445000, insurance: 1400 },
  { name: 'Illinois', abbr: 'IL', slug: 'illinois', propTax: 2.27, avgHome: 255000, insurance: 1800 },
  { name: 'Indiana', abbr: 'IN', slug: 'indiana', propTax: 0.85, avgHome: 240000, insurance: 1600 },
  { name: 'Iowa', abbr: 'IA', slug: 'iowa', propTax: 1.57, avgHome: 210000, insurance: 1500 },
  { name: 'Kansas', abbr: 'KS', slug: 'kansas', propTax: 1.41, avgHome: 225000, insurance: 2800 },
  { name: 'Kentucky', abbr: 'KY', slug: 'kentucky', propTax: 0.86, avgHome: 198000, insurance: 2200 },
  { name: 'Louisiana', abbr: 'LA', slug: 'louisiana', propTax: 0.55, avgHome: 210000, insurance: 3600 },
  { name: 'Maine', abbr: 'ME', slug: 'maine', propTax: 1.36, avgHome: 365000, insurance: 1300 },
  { name: 'Maryland', abbr: 'MD', slug: 'maryland', propTax: 1.09, avgHome: 420000, insurance: 1800 },
  { name: 'Massachusetts', abbr: 'MA', slug: 'massachusetts', propTax: 1.23, avgHome: 595000, insurance: 2000 },
  { name: 'Michigan', abbr: 'MI', slug: 'michigan', propTax: 1.54, avgHome: 245000, insurance: 1600 },
  { name: 'Minnesota', abbr: 'MN', slug: 'minnesota', propTax: 1.12, avgHome: 340000, insurance: 2000 },
  { name: 'Mississippi', abbr: 'MS', slug: 'mississippi', propTax: 0.81, avgHome: 175000, insurance: 2400 },
  { name: 'Missouri', abbr: 'MO', slug: 'missouri', propTax: 0.97, avgHome: 240000, insurance: 2000 },
  { name: 'Montana', abbr: 'MT', slug: 'montana', propTax: 0.84, avgHome: 450000, insurance: 1800 },
  { name: 'Nebraska', abbr: 'NE', slug: 'nebraska', propTax: 1.73, avgHome: 260000, insurance: 2200 },
  { name: 'Nevada', abbr: 'NV', slug: 'nevada', propTax: 0.60, avgHome: 425000, insurance: 1600 },
  { name: 'New Hampshire', abbr: 'NH', slug: 'new-hampshire', propTax: 2.18, avgHome: 450000, insurance: 1500 },
  { name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', propTax: 2.49, avgHome: 505000, insurance: 1600 },
  { name: 'New Mexico', abbr: 'NM', slug: 'new-mexico', propTax: 0.80, avgHome: 310000, insurance: 1800 },
  { name: 'New York', abbr: 'NY', slug: 'new-york', propTax: 1.72, avgHome: 420000, insurance: 2000 },
  { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', propTax: 0.84, avgHome: 350000, insurance: 2200 },
  { name: 'North Dakota', abbr: 'ND', slug: 'north-dakota', propTax: 0.98, avgHome: 260000, insurance: 2000 },
  { name: 'Ohio', abbr: 'OH', slug: 'ohio', propTax: 1.56, avgHome: 215000, insurance: 1400 },
  { name: 'Oklahoma', abbr: 'OK', slug: 'oklahoma', propTax: 0.90, avgHome: 200000, insurance: 3200 },
  { name: 'Oregon', abbr: 'OR', slug: 'oregon', propTax: 0.97, avgHome: 500000, insurance: 1200 },
  { name: 'Pennsylvania', abbr: 'PA', slug: 'pennsylvania', propTax: 1.58, avgHome: 280000, insurance: 1400 },
  { name: 'Rhode Island', abbr: 'RI', slug: 'rhode-island', propTax: 1.63, avgHome: 420000, insurance: 2200 },
  { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', propTax: 0.57, avgHome: 315000, insurance: 2400 },
  { name: 'South Dakota', abbr: 'SD', slug: 'south-dakota', propTax: 1.22, avgHome: 300000, insurance: 2400 },
  { name: 'Tennessee', abbr: 'TN', slug: 'tennessee', propTax: 0.71, avgHome: 340000, insurance: 2200 },
  { name: 'Texas', abbr: 'TX', slug: 'texas', propTax: 1.80, avgHome: 345000, insurance: 3400 },
  { name: 'Utah', abbr: 'UT', slug: 'utah', propTax: 0.63, avgHome: 510000, insurance: 1200 },
  { name: 'Vermont', abbr: 'VT', slug: 'vermont', propTax: 1.90, avgHome: 380000, insurance: 1200 },
  { name: 'Virginia', abbr: 'VA', slug: 'virginia', propTax: 0.82, avgHome: 400000, insurance: 1600 },
  { name: 'Washington', abbr: 'WA', slug: 'washington', propTax: 0.98, avgHome: 585000, insurance: 1600 },
  { name: 'West Virginia', abbr: 'WV', slug: 'west-virginia', propTax: 0.58, avgHome: 145000, insurance: 1400 },
  { name: 'Wisconsin', abbr: 'WI', slug: 'wisconsin', propTax: 1.76, avgHome: 280000, insurance: 1200 },
  { name: 'Wyoming', abbr: 'WY', slug: 'wyoming', propTax: 0.61, avgHome: 340000, insurance: 1800 }
];

const dir = path.join(__dirname, 'mortgage');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

function fmt(n) { return n.toLocaleString('en-US'); }

function buildPage(s) {
  const monthlyTax = Math.round((s.avgHome * s.propTax / 100) / 12);
  const monthlyIns = Math.round(s.insurance / 12);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${s.name} Mortgage Calculator 2026 — Monthly Payment Estimator | SmartCalc</title>
    <meta name="description" content="Calculate your monthly mortgage payment in ${s.name}. Includes property tax (${s.propTax}%), homeowner's insurance, PMI, and amortization schedule. Average home price: $${fmt(s.avgHome)}.">
    <meta name="keywords" content="${s.name} mortgage calculator, ${s.name} home loan calculator, ${s.name} monthly mortgage payment, ${s.name} property tax rate, ${s.name} home buying calculator, mortgage rates ${s.name}">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/mortgage/${s.slug}.html">
    <meta property="og:title" content="${s.name} Mortgage Calculator 2026 — SmartCalc">
    <meta property="og:description" content="Calculate your monthly mortgage payment in ${s.name}. Property tax: ${s.propTax}%. Average home: $${fmt(s.avgHome)}.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏠</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${s.name} Mortgage Calculator 2026","description":"Calculate your monthly mortgage payment in ${s.name} with property tax, insurance, and PMI.","url":"https://alexchalu.github.io/smartcalc/mortgage/${s.slug}.html","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
    </script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#10b981;--accent2:#059669;--glow:rgba(16,185,129,0.12);--radius:12px}
        [data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
        header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
        .hi{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
        .logo{font-size:1.4rem;font-weight:800;color:var(--accent);text-decoration:none}
        .tag{color:var(--muted);font-size:.85rem;flex:1}
        .tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;font-size:1rem;cursor:pointer}
        main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
        h1{font-size:1.75rem;margin-bottom:.5rem}
        .sub{color:var(--muted);margin-bottom:2rem}
        .calc{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:2rem}
        .field{margin-bottom:1.25rem}
        .label{display:block;font-weight:600;margin-bottom:.5rem;font-size:.9rem}
        input[type="number"],select{width:100%;padding:.8rem 1rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:.95rem;outline:none}
        input:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow)}
        .row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        .row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
        .btn{display:inline-flex;padding:.75rem 1.5rem;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer;width:100%;justify-content:center}
        .btn:hover{background:var(--accent2)}
        .results{margin-top:2rem;display:none}
        .results.show{display:block}
        .result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin-bottom:1.5rem}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
        .stat .val{font-size:1.4rem;font-weight:800;color:var(--accent)}
        .stat .lbl{font-size:.75rem;color:var(--muted);margin-top:.25rem}
        .breakdown{background:var(--surface2);border:1px solid var(--border);border-radius:8px;overflow:hidden}
        .breakdown table{width:100%;border-collapse:collapse}
        .breakdown th,.breakdown td{padding:.75rem 1rem;text-align:left;font-size:.9rem}
        .breakdown th{background:var(--surface);font-weight:600;font-size:.8rem;text-transform:uppercase;color:var(--muted)}
        .breakdown td{border-top:1px solid var(--border)}
        .breakdown .total td{font-weight:700;background:var(--surface);color:var(--accent)}
        .amort{margin-top:1.5rem}
        .amort summary{cursor:pointer;font-weight:600;color:var(--accent);padding:.75rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px}
        .amort-table{max-height:400px;overflow-y:auto;margin-top:.5rem}
        .ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
        .info{margin-top:2.5rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .info h2{font-size:1.2rem;margin-bottom:1rem}
        .info p,.info li{color:var(--muted);font-size:.9rem;line-height:1.7;margin-bottom:.75rem}
        .info ul{padding-left:1.5rem}
        .faq{margin-top:2.5rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .faq h2{font-size:1.2rem;margin-bottom:1rem}
        .faq h3{font-size:1rem;margin:1.25rem 0 .5rem;color:var(--accent)}
        .faq p{color:var(--muted);font-size:.9rem;line-height:1.7}
        .states{margin-top:2.5rem}
        .states h2{font-size:1.2rem;margin-bottom:1rem;text-align:center}
        .state-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.5rem}
        .state-grid a{display:block;padding:.5rem .75rem;background:var(--surface);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.85rem;transition:.2s}
        .state-grid a:hover{border-color:var(--accent);background:var(--surface2)}
        .state-grid a .rate{color:var(--accent);font-weight:600;float:right}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        @media(max-width:600px){.row,.row3{grid-template-columns:1fr}}
    </style>
</head>
<body>
    <header><div class="hi">
        <a href="../" class="logo">🏠 SmartCalc</a>
        <p class="tag">${s.name} Mortgage Calculator</p>
        <button class="tb" id="themeBtn" aria-label="Toggle theme">🌙</button>
    </div></header>

    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

    <main>
        <h1>🏠 ${s.name} Mortgage Calculator 2026</h1>
        <p class="sub">Estimate your monthly mortgage payment in ${s.name}. Includes principal & interest, property tax (${s.propTax}%), homeowner's insurance, and PMI.</p>

        <div class="calc">
            <div class="field">
                <span class="label">Home Price ($)</span>
                <input type="number" id="price" value="${s.avgHome}" step="1000">
            </div>
            <div class="row">
                <div class="field">
                    <span class="label">Down Payment ($)</span>
                    <input type="number" id="down" value="${Math.round(s.avgHome * 0.2)}" step="1000">
                </div>
                <div class="field">
                    <span class="label">Down Payment (%)</span>
                    <input type="number" id="downPct" value="20" step="1" min="0" max="100">
                </div>
            </div>
            <div class="row3">
                <div class="field">
                    <span class="label">Interest Rate (%)</span>
                    <input type="number" id="rate" value="6.75" step="0.125" min="0" max="20">
                </div>
                <div class="field">
                    <span class="label">Loan Term</span>
                    <select id="term">
                        <option value="30" selected>30 years</option>
                        <option value="20">20 years</option>
                        <option value="15">15 years</option>
                        <option value="10">10 years</option>
                    </select>
                </div>
                <div class="field">
                    <span class="label">Loan Type</span>
                    <select id="loanType">
                        <option value="conventional">Conventional</option>
                        <option value="fha">FHA</option>
                        <option value="va">VA</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="field">
                    <span class="label">Property Tax Rate (%)</span>
                    <input type="number" id="taxRate" value="${s.propTax}" step="0.01">
                </div>
                <div class="field">
                    <span class="label">Annual Insurance ($)</span>
                    <input type="number" id="insurance" value="${s.insurance}" step="100">
                </div>
            </div>
            <div class="row">
                <div class="field">
                    <span class="label">HOA / Month ($)</span>
                    <input type="number" id="hoa" value="0" step="25">
                </div>
                <div class="field">
                    <span class="label">Extra Payment / Month ($)</span>
                    <input type="number" id="extra" value="0" step="50">
                </div>
            </div>
            <button class="btn" onclick="calc()">Calculate Mortgage Payment</button>

            <div class="results" id="results">
                <div class="result-grid">
                    <div class="stat"><div class="val" id="rTotal">—</div><div class="lbl">Total Monthly</div></div>
                    <div class="stat"><div class="val" id="rPI">—</div><div class="lbl">Principal & Interest</div></div>
                    <div class="stat"><div class="val" id="rTax">—</div><div class="lbl">Property Tax</div></div>
                    <div class="stat"><div class="val" id="rIns">—</div><div class="lbl">Insurance</div></div>
                    <div class="stat"><div class="val" id="rPMI">—</div><div class="lbl">PMI</div></div>
                    <div class="stat"><div class="val" id="rTotalCost">—</div><div class="lbl">Total Loan Cost</div></div>
                </div>
                <div class="breakdown">
                    <table>
                        <thead><tr><th>Item</th><th>Monthly</th><th>Annual</th><th>Over Loan</th></tr></thead>
                        <tbody id="breakdownBody"></tbody>
                    </table>
                </div>
                <details class="amort">
                    <summary>📊 View Amortization Schedule (Year by Year)</summary>
                    <div class="amort-table">
                        <div class="breakdown">
                            <table>
                                <thead><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                                <tbody id="amortBody"></tbody>
                            </table>
                        </div>
                    </div>
                </details>
            </div>
        </div>

        <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

        <div class="info">
            <h2>Buying a Home in ${s.name} — What You Need to Know</h2>
            <p>${s.name}'s average home price is approximately <strong>$${fmt(s.avgHome)}</strong>, with a property tax rate of <strong>${s.propTax}%</strong> (effective rate). That translates to roughly <strong>$${fmt(monthlyTax)}/month</strong> in property taxes on the average home.</p>
            <p>Homeowner's insurance in ${s.name} averages about <strong>$${fmt(s.insurance)}/year</strong> ($${fmt(monthlyIns)}/month). ${s.insurance > 3000 ? 'This is above the national average, often due to weather-related risks like hurricanes, tornadoes, or flooding.' : s.insurance < 1500 ? 'This is below the national average, making it one of the more affordable states for homeowner\'s insurance.' : 'This is close to the national average for homeowner\'s insurance costs.'}</p>
            <h3>Key ${s.name} Mortgage Facts</h3>
            <ul>
                <li><strong>Property Tax Rate:</strong> ${s.propTax}% effective rate</li>
                <li><strong>Average Home Price:</strong> $${fmt(s.avgHome)}</li>
                <li><strong>Average Insurance:</strong> $${fmt(s.insurance)}/year</li>
                <li><strong>20% Down Payment:</strong> $${fmt(Math.round(s.avgHome * 0.2))}</li>
                <li><strong>PMI:</strong> Required if down payment is less than 20%</li>
            </ul>
            <p><strong>Tip:</strong> If you put less than 20% down on a conventional loan, you'll pay Private Mortgage Insurance (PMI), typically 0.5-1% of the loan amount annually. FHA loans require mortgage insurance for the life of the loan. VA loans have no PMI requirement.</p>
        </div>

        <div class="faq">
            <h2>Frequently Asked Questions</h2>
            <h3>What is a good mortgage rate in ${s.name} in 2026?</h3>
            <p>Mortgage rates vary by lender, credit score, and loan type. As of 2026, average 30-year fixed rates hover around 6.5-7%. Shopping multiple lenders can save you thousands over the life of your loan.</p>
            <h3>How much house can I afford in ${s.name}?</h3>
            <p>A common guideline is the 28/36 rule: your mortgage payment shouldn't exceed 28% of gross monthly income, and total debt payments shouldn't exceed 36%. With ${s.name}'s average home price of $${fmt(s.avgHome)}, you'd typically need a household income of $${fmt(Math.round(s.avgHome * 0.35 / 12 * 12 / 0.28))}+ per year.</p>
            <h3>Should I get a 15-year or 30-year mortgage in ${s.name}?</h3>
            <p>A 15-year mortgage has higher monthly payments but saves significantly on interest. For a $${fmt(s.avgHome)} home with 20% down, you could save over $100,000 in interest with a 15-year vs 30-year loan.</p>
            <h3>What are closing costs in ${s.name}?</h3>
            <p>Closing costs in ${s.name} typically range from 2-5% of the home price. On a $${fmt(s.avgHome)} home, expect to pay approximately $${fmt(Math.round(s.avgHome * 0.03))} in closing costs.</p>
        </div>

        <div class="states">
            <h2>Mortgage Calculators by State</h2>
            <div class="state-grid" id="stateGrid"></div>
        </div>

        <div style="margin-top:2rem;text-align:center">
            <a href="../mortgage-calculator.html" style="color:var(--accent);text-decoration:none;font-weight:600">← Back to Mortgage Calculator</a> &nbsp;|&nbsp;
            <a href="../" style="color:var(--accent);text-decoration:none;font-weight:600">SmartCalc Home →</a>
        </div>
    </main>

    <footer>
        <p>© 2026 <a href="../">SmartCalc</a> — Free financial calculators. For informational purposes only.</p>
        <p style="margin-top:.5rem"><a href="../paycheck/">Paycheck Calculators</a> · <a href="./">Mortgage by State</a></p>
    </footer>

    <script>
    const stateData = ${JSON.stringify(states.map(st => ({ name: st.name, slug: st.slug, propTax: st.propTax })))};
    const grid = document.getElementById('stateGrid');
    stateData.forEach(st => {
        const a = document.createElement('a');
        a.href = st.slug + '.html';
        a.innerHTML = st.name + ' <span class="rate">' + st.propTax + '%</span>';
        if (st.slug === '${s.slug}') { a.style.borderColor = 'var(--accent)'; a.style.fontWeight = '700'; }
        grid.appendChild(a);
    });

    const $ = id => document.getElementById(id);
    const f = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    // Sync down payment fields
    $('down').addEventListener('input', function() {
        const price = +$('price').value;
        if (price > 0) $('downPct').value = ((+this.value / price) * 100).toFixed(1);
    });
    $('downPct').addEventListener('input', function() {
        $('down').value = Math.round(+$('price').value * +this.value / 100);
    });
    $('price').addEventListener('input', function() {
        $('down').value = Math.round(+this.value * +$('downPct').value / 100);
    });

    function calc() {
        const price = +$('price').value;
        const down = +$('down').value;
        const loan = price - down;
        const r = +$('rate').value / 100 / 12;
        const n = +$('term').value * 12;
        const taxRate = +$('taxRate').value / 100;
        const ins = +$('insurance').value;
        const hoa = +$('hoa').value;
        const extra = +$('extra').value;
        const loanType = $('loanType').value;

        // P&I
        const pi = r > 0 ? loan * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1) : loan / n;
        const tax = (price * taxRate) / 12;
        const insM = ins / 12;

        // PMI
        let pmi = 0;
        const ltv = loan / price;
        if (loanType === 'conventional' && ltv > 0.8) {
            pmi = (loan * 0.007) / 12; // ~0.7% annual
        } else if (loanType === 'fha') {
            pmi = (loan * 0.0085) / 12; // FHA MIP ~0.85%
        }

        const total = pi + tax + insM + pmi + hoa;
        const years = +$('term').value;
        const totalCost = pi * n;

        $('rTotal').textContent = f(Math.round(total));
        $('rPI').textContent = f(Math.round(pi));
        $('rTax').textContent = f(Math.round(tax));
        $('rIns').textContent = f(Math.round(insM));
        $('rPMI').textContent = pmi > 0 ? f(Math.round(pmi)) : '$0';
        $('rTotalCost').textContent = f(Math.round(totalCost));

        // Breakdown table
        const items = [
            ['Principal & Interest', pi, pi*12, pi*n],
            ['Property Tax', tax, tax*12, tax*n],
            ['Homeowner\\'s Insurance', insM, ins, ins*years],
            ['PMI', pmi, pmi*12, pmi*n],
            ['HOA', hoa, hoa*12, hoa*n*12/n],
        ];
        let html = '';
        items.forEach(([label, m, a, t]) => {
            html += '<tr><td>'+label+'</td><td>'+f(Math.round(m))+'</td><td>'+f(Math.round(a))+'</td><td>'+f(Math.round(t))+'</td></tr>';
        });
        const totalM = items.reduce((s,i) => s+i[1], 0);
        const totalA = items.reduce((s,i) => s+i[2], 0);
        const totalT = items.reduce((s,i) => s+i[3], 0);
        html += '<tr class="total"><td>Total</td><td>'+f(Math.round(totalM))+'</td><td>'+f(Math.round(totalA))+'</td><td>'+f(Math.round(totalT))+'</td></tr>';
        $('breakdownBody').innerHTML = html;

        // Amortization
        let bal = loan;
        let amortHtml = '';
        for (let y = 1; y <= years; y++) {
            let yPrinc = 0, yInt = 0;
            for (let m = 0; m < 12; m++) {
                const intPmt = bal * r;
                const princPmt = Math.min(pi - intPmt + extra, bal);
                yPrinc += princPmt;
                yInt += intPmt;
                bal = Math.max(0, bal - princPmt);
            }
            amortHtml += '<tr><td>'+y+'</td><td>'+f(Math.round(yPrinc))+'</td><td>'+f(Math.round(yInt))+'</td><td>'+f(Math.round(bal))+'</td></tr>';
            if (bal <= 0) break;
        }
        $('amortBody').innerHTML = amortHtml;

        $('results').classList.add('show');
    }

    // Theme toggle
    $('themeBtn').onclick = () => {
        const t = document.body.getAttribute('data-theme') === 'light' ? '' : 'light';
        document.body.setAttribute('data-theme', t);
        $('themeBtn').textContent = t === 'light' ? '☀️' : '🌙';
    };

    // Auto-calculate on load
    calc();
    </script>
</body>
</html>`;
}

// Build index page
function buildIndex() {
  const stateLinks = states.map(s => 
    `<a href="${s.slug}.html">${s.name} <span class="rate">${s.propTax}%</span> <span class="price">$${fmt(s.avgHome)}</span></a>`
  ).join('\n                ');
  
  const highTax = [...states].sort((a,b) => b.propTax - a.propTax).slice(0, 5);
  const lowTax = [...states].sort((a,b) => a.propTax - b.propTax).slice(0, 5);
  const expensive = [...states].sort((a,b) => b.avgHome - a.avgHome).slice(0, 5);
  const affordable = [...states].sort((a,b) => a.avgHome - b.avgHome).slice(0, 5);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mortgage Calculator by State 2026 — Property Tax Rates & Home Prices | SmartCalc</title>
    <meta name="description" content="Compare mortgage costs across all 50 states. Property tax rates, average home prices, insurance costs, and monthly payment calculators for every state.">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/mortgage/">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏠</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#10b981;--accent2:#059669;--radius:12px}
        [data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
        header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
        .hi{max-width:1000px;margin:0 auto;display:flex;align-items:center;gap:1rem}
        .logo{font-size:1.4rem;font-weight:800;color:var(--accent);text-decoration:none}
        .tag{color:var(--muted);font-size:.85rem;flex:1}
        .tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;font-size:1rem;cursor:pointer}
        main{max-width:1000px;margin:0 auto;padding:2rem 1.5rem}
        h1{font-size:1.75rem;margin-bottom:.5rem}
        .sub{color:var(--muted);margin-bottom:2rem;font-size:1rem}
        .highlights{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2.5rem}
        .highlight{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem}
        .highlight h3{font-size:1rem;margin-bottom:.75rem;color:var(--accent)}
        .highlight ol{padding-left:1.25rem;color:var(--muted);font-size:.9rem}
        .highlight li{margin-bottom:.35rem}
        .highlight li strong{color:var(--text)}
        .ad{max-width:1000px;margin:1.5rem auto;padding:0 1.5rem}
        .state-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.5rem;margin-top:1.5rem}
        .state-grid a{display:flex;justify-content:space-between;align-items:center;padding:.6rem .85rem;background:var(--surface);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.9rem;transition:.2s}
        .state-grid a:hover{border-color:var(--accent);background:var(--surface2)}
        .state-grid .rate{color:var(--accent);font-weight:600;font-size:.85rem}
        .state-grid .price{color:var(--muted);font-size:.8rem}
        .search{margin-bottom:1.5rem}
        .search input{width:100%;padding:.8rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:1rem;outline:none}
        .search input:focus{border-color:var(--accent)}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        @media(max-width:600px){.highlights{grid-template-columns:1fr}.state-grid{grid-template-columns:1fr}}
    </style>
</head>
<body>
    <header><div class="hi">
        <a href="../" class="logo">🏠 SmartCalc</a>
        <p class="tag">Mortgage Calculators by State</p>
        <button class="tb" id="themeBtn" aria-label="Toggle theme">🌙</button>
    </div></header>

    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

    <main>
        <h1>🏠 Mortgage Calculator by State — 2026</h1>
        <p class="sub">Compare mortgage costs across all 50 states. Each calculator includes state-specific property tax rates, average home prices, insurance costs, PMI estimates, and full amortization schedules.</p>

        <div class="highlights">
            <div class="highlight">
                <h3>📈 Highest Property Tax States</h3>
                <ol>${highTax.map(s => `<li><strong>${s.name}</strong> — ${s.propTax}%</li>`).join('')}</ol>
            </div>
            <div class="highlight">
                <h3>📉 Lowest Property Tax States</h3>
                <ol>${lowTax.map(s => `<li><strong>${s.name}</strong> — ${s.propTax}%</li>`).join('')}</ol>
            </div>
            <div class="highlight">
                <h3>💰 Most Expensive Markets</h3>
                <ol>${expensive.map(s => `<li><strong>${s.name}</strong> — $${fmt(s.avgHome)}</li>`).join('')}</ol>
            </div>
            <div class="highlight">
                <h3>🏡 Most Affordable Markets</h3>
                <ol>${affordable.map(s => `<li><strong>${s.name}</strong> — $${fmt(s.avgHome)}</li>`).join('')}</ol>
            </div>
        </div>

        <h2>All 50 States</h2>
        <div class="search"><input type="text" id="searchInput" placeholder="Search states..." oninput="filterStates()"></div>
        <div class="state-grid" id="stateGrid">
                ${stateLinks}
        </div>

        <div style="margin-top:2rem;text-align:center">
            <a href="../mortgage-calculator.html" style="color:var(--accent);text-decoration:none;font-weight:600">← Mortgage Calculator</a> &nbsp;|&nbsp;
            <a href="../paycheck/" style="color:var(--accent);text-decoration:none;font-weight:600">Paycheck Calculators →</a> &nbsp;|&nbsp;
            <a href="../" style="color:var(--accent);text-decoration:none;font-weight:600">SmartCalc Home →</a>
        </div>
    </main>

    <footer>
        <p>© 2026 <a href="../">SmartCalc</a> — Free financial calculators. For informational purposes only.</p>
    </footer>

    <script>
    document.getElementById('themeBtn').onclick = () => {
        const t = document.body.getAttribute('data-theme') === 'light' ? '' : 'light';
        document.body.setAttribute('data-theme', t);
        document.getElementById('themeBtn').textContent = t === 'light' ? '☀️' : '🌙';
    };
    function filterStates() {
        const q = document.getElementById('searchInput').value.toLowerCase();
        document.querySelectorAll('.state-grid a').forEach(a => {
            a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    }
    </script>
</body>
</html>`;
}

// Generate all pages
states.forEach(s => {
  fs.writeFileSync(path.join(dir, s.slug + '.html'), buildPage(s));
});
fs.writeFileSync(path.join(dir, 'index.html'), buildIndex());

console.log(`✅ Built ${states.length} state mortgage pages + index page in mortgage/`);
console.log(`Total: ${states.length + 1} new pages`);
