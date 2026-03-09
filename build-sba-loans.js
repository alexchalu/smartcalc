const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'sba-loans');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const states = [
  { name: 'Alabama', abbr: 'AL', slug: 'alabama', avgLoan: 371000, avgRate: 10.5, topIndustry: 'Manufacturing', sbaOffices: 2, bizCount: '395K' },
  { name: 'Alaska', abbr: 'AK', slug: 'alaska', avgLoan: 298000, avgRate: 11.0, topIndustry: 'Oil & Gas', sbaOffices: 1, bizCount: '72K' },
  { name: 'Arizona', abbr: 'AZ', slug: 'arizona', avgLoan: 412000, avgRate: 10.25, topIndustry: 'Real Estate', sbaOffices: 2, bizCount: '560K' },
  { name: 'Arkansas', abbr: 'AR', slug: 'arkansas', avgLoan: 325000, avgRate: 10.5, topIndustry: 'Agriculture', sbaOffices: 1, bizCount: '258K' },
  { name: 'California', abbr: 'CA', slug: 'california', avgLoan: 585000, avgRate: 10.0, topIndustry: 'Technology', sbaOffices: 8, bizCount: '4.1M' },
  { name: 'Colorado', abbr: 'CO', slug: 'colorado', avgLoan: 465000, avgRate: 10.25, topIndustry: 'Technology', sbaOffices: 2, bizCount: '640K' },
  { name: 'Connecticut', abbr: 'CT', slug: 'connecticut', avgLoan: 420000, avgRate: 10.25, topIndustry: 'Finance', sbaOffices: 1, bizCount: '350K' },
  { name: 'Delaware', abbr: 'DE', slug: 'delaware', avgLoan: 380000, avgRate: 10.5, topIndustry: 'Finance', sbaOffices: 1, bizCount: '85K' },
  { name: 'Florida', abbr: 'FL', slug: 'florida', avgLoan: 445000, avgRate: 10.25, topIndustry: 'Tourism', sbaOffices: 5, bizCount: '2.8M' },
  { name: 'Georgia', abbr: 'GA', slug: 'georgia', avgLoan: 415000, avgRate: 10.5, topIndustry: 'Logistics', sbaOffices: 3, bizCount: '1.1M' },
  { name: 'Hawaii', abbr: 'HI', slug: 'hawaii', avgLoan: 395000, avgRate: 10.75, topIndustry: 'Tourism', sbaOffices: 1, bizCount: '130K' },
  { name: 'Idaho', abbr: 'ID', slug: 'idaho', avgLoan: 340000, avgRate: 10.5, topIndustry: 'Agriculture', sbaOffices: 1, bizCount: '185K' },
  { name: 'Illinois', abbr: 'IL', slug: 'illinois', avgLoan: 450000, avgRate: 10.25, topIndustry: 'Manufacturing', sbaOffices: 4, bizCount: '1.2M' },
  { name: 'Indiana', abbr: 'IN', slug: 'indiana', avgLoan: 365000, avgRate: 10.5, topIndustry: 'Manufacturing', sbaOffices: 2, bizCount: '530K' },
  { name: 'Iowa', abbr: 'IA', slug: 'iowa', avgLoan: 330000, avgRate: 10.5, topIndustry: 'Agriculture', sbaOffices: 2, bizCount: '268K' },
  { name: 'Kansas', abbr: 'KS', slug: 'kansas', avgLoan: 340000, avgRate: 10.5, topIndustry: 'Agriculture', sbaOffices: 2, bizCount: '252K' },
  { name: 'Kentucky', abbr: 'KY', slug: 'kentucky', avgLoan: 345000, avgRate: 10.5, topIndustry: 'Manufacturing', sbaOffices: 2, bizCount: '350K' },
  { name: 'Louisiana', abbr: 'LA', slug: 'louisiana', avgLoan: 360000, avgRate: 10.75, topIndustry: 'Energy', sbaOffices: 2, bizCount: '410K' },
  { name: 'Maine', abbr: 'ME', slug: 'maine', avgLoan: 320000, avgRate: 10.5, topIndustry: 'Tourism', sbaOffices: 1, bizCount: '145K' },
  { name: 'Maryland', abbr: 'MD', slug: 'maryland', avgLoan: 430000, avgRate: 10.25, topIndustry: 'Government', sbaOffices: 2, bizCount: '580K' },
  { name: 'Massachusetts', abbr: 'MA', slug: 'massachusetts', avgLoan: 490000, avgRate: 10.0, topIndustry: 'Biotech', sbaOffices: 2, bizCount: '680K' },
  { name: 'Michigan', abbr: 'MI', slug: 'michigan', avgLoan: 385000, avgRate: 10.5, topIndustry: 'Automotive', sbaOffices: 3, bizCount: '890K' },
  { name: 'Minnesota', abbr: 'MN', slug: 'minnesota', avgLoan: 410000, avgRate: 10.25, topIndustry: 'Healthcare', sbaOffices: 2, bizCount: '530K' },
  { name: 'Mississippi', abbr: 'MS', slug: 'mississippi', avgLoan: 295000, avgRate: 11.0, topIndustry: 'Agriculture', sbaOffices: 2, bizCount: '248K' },
  { name: 'Missouri', abbr: 'MO', slug: 'missouri', avgLoan: 375000, avgRate: 10.5, topIndustry: 'Agriculture', sbaOffices: 2, bizCount: '530K' },
  { name: 'Montana', abbr: 'MT', slug: 'montana', avgLoan: 310000, avgRate: 10.75, topIndustry: 'Agriculture', sbaOffices: 1, bizCount: '120K' },
  { name: 'Nebraska', abbr: 'NE', slug: 'nebraska', avgLoan: 335000, avgRate: 10.5, topIndustry: 'Agriculture', sbaOffices: 1, bizCount: '185K' },
  { name: 'Nevada', abbr: 'NV', slug: 'nevada', avgLoan: 405000, avgRate: 10.5, topIndustry: 'Hospitality', sbaOffices: 1, bizCount: '290K' },
  { name: 'New Hampshire', abbr: 'NH', slug: 'new-hampshire', avgLoan: 370000, avgRate: 10.25, topIndustry: 'Manufacturing', sbaOffices: 1, bizCount: '140K' },
  { name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', avgLoan: 475000, avgRate: 10.25, topIndustry: 'Pharmaceuticals', sbaOffices: 2, bizCount: '870K' },
  { name: 'New Mexico', abbr: 'NM', slug: 'new-mexico', avgLoan: 310000, avgRate: 10.75, topIndustry: 'Energy', sbaOffices: 1, bizCount: '170K' },
  { name: 'New York', abbr: 'NY', slug: 'new-york', avgLoan: 525000, avgRate: 10.0, topIndustry: 'Finance', sbaOffices: 5, bizCount: '2.2M' },
  { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', avgLoan: 400000, avgRate: 10.25, topIndustry: 'Technology', sbaOffices: 3, bizCount: '920K' },
  { name: 'North Dakota', abbr: 'ND', slug: 'north-dakota', avgLoan: 290000, avgRate: 10.75, topIndustry: 'Energy', sbaOffices: 1, bizCount: '78K' },
  { name: 'Ohio', abbr: 'OH', slug: 'ohio', avgLoan: 380000, avgRate: 10.5, topIndustry: 'Manufacturing', sbaOffices: 3, bizCount: '960K' },
  { name: 'Oklahoma', abbr: 'OK', slug: 'oklahoma', avgLoan: 335000, avgRate: 10.5, topIndustry: 'Energy', sbaOffices: 2, bizCount: '350K' },
  { name: 'Oregon', abbr: 'OR', slug: 'oregon', avgLoan: 410000, avgRate: 10.25, topIndustry: 'Technology', sbaOffices: 1, bizCount: '400K' },
  { name: 'Pennsylvania', abbr: 'PA', slug: 'pennsylvania', avgLoan: 420000, avgRate: 10.25, topIndustry: 'Healthcare', sbaOffices: 3, bizCount: '1.1M' },
  { name: 'Rhode Island', abbr: 'RI', slug: 'rhode-island', avgLoan: 355000, avgRate: 10.5, topIndustry: 'Healthcare', sbaOffices: 1, bizCount: '100K' },
  { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', avgLoan: 370000, avgRate: 10.5, topIndustry: 'Manufacturing', sbaOffices: 2, bizCount: '430K' },
  { name: 'South Dakota', abbr: 'SD', slug: 'south-dakota', avgLoan: 285000, avgRate: 10.75, topIndustry: 'Agriculture', sbaOffices: 1, bizCount: '92K' },
  { name: 'Tennessee', abbr: 'TN', slug: 'tennessee', avgLoan: 395000, avgRate: 10.5, topIndustry: 'Healthcare', sbaOffices: 2, bizCount: '600K' },
  { name: 'Texas', abbr: 'TX', slug: 'texas', avgLoan: 480000, avgRate: 10.0, topIndustry: 'Energy', sbaOffices: 6, bizCount: '2.9M' },
  { name: 'Utah', abbr: 'UT', slug: 'utah', avgLoan: 425000, avgRate: 10.25, topIndustry: 'Technology', sbaOffices: 1, bizCount: '320K' },
  { name: 'Vermont', abbr: 'VT', slug: 'vermont', avgLoan: 295000, avgRate: 10.5, topIndustry: 'Tourism', sbaOffices: 1, bizCount: '78K' },
  { name: 'Virginia', abbr: 'VA', slug: 'virginia', avgLoan: 445000, avgRate: 10.25, topIndustry: 'Government', sbaOffices: 3, bizCount: '740K' },
  { name: 'Washington', abbr: 'WA', slug: 'washington', avgLoan: 475000, avgRate: 10.0, topIndustry: 'Technology', sbaOffices: 2, bizCount: '640K' },
  { name: 'West Virginia', abbr: 'WV', slug: 'west-virginia', avgLoan: 275000, avgRate: 11.0, topIndustry: 'Energy', sbaOffices: 1, bizCount: '130K' },
  { name: 'Wisconsin', abbr: 'WI', slug: 'wisconsin', avgLoan: 370000, avgRate: 10.5, topIndustry: 'Manufacturing', sbaOffices: 2, bizCount: '480K' },
  { name: 'Wyoming', abbr: 'WY', slug: 'wyoming', avgLoan: 280000, avgRate: 10.75, topIndustry: 'Energy', sbaOffices: 1, bizCount: '68K' },
];

const loanTypes = [
  { name: 'SBA 7(a)', maxAmount: 5000000, maxTerm: 25, guaranty: 85, desc: 'Most common SBA loan. Working capital, equipment, real estate.' },
  { name: 'SBA 504', maxAmount: 5500000, maxTerm: 25, guaranty: 40, desc: 'Fixed assets: real estate, equipment. Fixed rate from CDC.' },
  { name: 'SBA Microloan', maxAmount: 50000, maxTerm: 6, guaranty: 0, desc: 'Small loans up to $50K through intermediaries. Startups & small.' },
  { name: 'SBA Express', maxAmount: 500000, maxTerm: 10, guaranty: 50, desc: 'Fast turnaround (36 hrs). Revolving lines of credit available.' },
  { name: 'SBA Disaster', maxAmount: 2000000, maxTerm: 30, guaranty: 0, desc: 'Low-interest loans for declared disaster recovery.' },
];

function fmt(n) { return n.toLocaleString('en-US'); }
function fmtUSD(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

function buildStatePage(state) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.name} SBA Business Loan Calculator 2026 — Rates & Payment Estimator | SmartCalc</title>
    <meta name="description" content="Calculate SBA business loan payments in ${state.name}. Compare 7(a), 504, Microloan, and Express programs. Average loan: ${fmtUSD(state.avgLoan)}. ${state.bizCount} small businesses.">
    <meta name="keywords" content="${state.name} SBA loan, ${state.name} business loan calculator, ${state.name} small business loan, SBA 7a loan ${state.name}, SBA 504 loan ${state.name}, ${state.name} business financing">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/sba-loans/${state.slug}.html">
    <meta property="og:title" content="${state.name} SBA Business Loan Calculator 2026 — SmartCalc">
    <meta property="og:description" content="Calculate SBA loan payments in ${state.name}. Compare 7(a), 504, Microloan programs. ${state.bizCount} small businesses.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${state.name} SBA Business Loan Calculator 2026","description":"Calculate SBA business loan payments in ${state.name}. Compare 7(a), 504, Microloan, Express programs.","url":"https://alexchalu.github.io/smartcalc/sba-loans/${state.slug}.html","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
    </script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#3b82f6;--accent2:#2563eb;--glow:rgba(59,130,246,0.12);--radius:12px}
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
        .result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-bottom:1.5rem}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
        .stat .val{font-size:1.3rem;font-weight:800;color:var(--accent)}
        .stat .lbl{font-size:.75rem;color:var(--muted);margin-top:.25rem}
        .breakdown{background:var(--surface2);border:1px solid var(--border);border-radius:8px;overflow:hidden}
        .breakdown table{width:100%;border-collapse:collapse}
        .breakdown th,.breakdown td{padding:.75rem 1rem;text-align:left;font-size:.9rem}
        .breakdown th{background:var(--surface);font-weight:600;font-size:.8rem;text-transform:uppercase;color:var(--muted)}
        .breakdown td{border-top:1px solid var(--border)}
        .programs{margin-top:2.5rem}
        .programs h2{font-size:1.2rem;margin-bottom:1rem}
        .prog-card{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1.25rem;margin-bottom:1rem}
        .prog-card h3{font-size:1rem;color:var(--accent);margin-bottom:.5rem}
        .prog-card .meta{display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:.5rem}
        .prog-card .meta span{font-size:.85rem;color:var(--muted)}
        .prog-card .meta strong{color:var(--text)}
        .prog-card p{color:var(--muted);font-size:.85rem}
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
        .amort{margin-top:1.5rem}
        .amort summary{cursor:pointer;font-weight:600;color:var(--accent);padding:.75rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px}
        .amort-table{max-height:400px;overflow-y:auto;margin-top:.5rem}
        .ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        @media(max-width:600px){.row,.row3,.prog-card .meta{grid-template-columns:1fr;flex-direction:column;gap:.5rem}}
    </style>
</head>
<body>
    <header><div class="hi">
        <a href="../" class="logo">💼 SmartCalc</a>
        <p class="tag">${state.name} SBA Loan Calculator</p>
        <button class="tb" id="themeBtn" aria-label="Toggle theme">🌙</button>
    </div></header>

    <main>
        <h1>💼 ${state.name} SBA Business Loan Calculator</h1>
        <p class="sub">Calculate monthly payments for SBA 7(a), 504, Microloan, and Express programs in ${state.name}. Average business loan: ${fmtUSD(state.avgLoan)}. Serving ${state.bizCount} small businesses.</p>

        <div class="calc">
            <div class="row">
                <div class="field">
                    <label class="label">Loan Amount ($)</label>
                    <input type="number" id="loanAmount" value="${state.avgLoan}" min="1000" step="1000">
                </div>
                <div class="field">
                    <label class="label">SBA Program</label>
                    <select id="loanProgram">
                        <option value="7a">SBA 7(a) — Up to $5M</option>
                        <option value="504">SBA 504 — Fixed Assets</option>
                        <option value="micro">SBA Microloan — Up to $50K</option>
                        <option value="express">SBA Express — Up to $500K</option>
                    </select>
                </div>
            </div>
            <div class="row3">
                <div class="field">
                    <label class="label">Interest Rate (%)</label>
                    <input type="number" id="rate" value="${state.avgRate}" min="0" max="30" step="0.125">
                </div>
                <div class="field">
                    <label class="label">Loan Term (years)</label>
                    <select id="term">
                        <option value="5">5 years</option>
                        <option value="7">7 years</option>
                        <option value="10" selected>10 years</option>
                        <option value="15">15 years</option>
                        <option value="20">20 years</option>
                        <option value="25">25 years</option>
                    </select>
                </div>
                <div class="field">
                    <label class="label">SBA Guaranty Fee (%)</label>
                    <input type="number" id="guarantyFee" value="2.77" min="0" max="5" step="0.01">
                </div>
            </div>
            <div class="row">
                <div class="field">
                    <label class="label">Down Payment (%)</label>
                    <input type="number" id="downPayment" value="10" min="0" max="50" step="1">
                </div>
                <div class="field">
                    <label class="label">Business Type</label>
                    <select id="bizType">
                        <option value="existing">Existing Business</option>
                        <option value="startup">Startup</option>
                        <option value="franchise">Franchise</option>
                        <option value="acquisition">Business Acquisition</option>
                    </select>
                </div>
            </div>
            <button class="btn" onclick="calculate()">Calculate Loan Payment</button>
        </div>

        <div class="results" id="results">
            <div class="result-grid" id="resultGrid"></div>
            <div class="breakdown" id="breakdown"></div>
            <details class="amort">
                <summary>📊 View Full Amortization Schedule</summary>
                <div class="amort-table" id="amortTable"></div>
            </details>
        </div>

        <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

        <div class="programs">
            <h2>📋 SBA Loan Programs Available in ${state.name}</h2>
            ${loanTypes.map(lt => `
            <div class="prog-card">
                <h3>${lt.name} Loan</h3>
                <div class="meta">
                    <span>Max: <strong>${fmtUSD(lt.maxAmount)}</strong></span>
                    <span>Term: <strong>Up to ${lt.maxTerm} years</strong></span>
                    <span>Guaranty: <strong>${lt.guaranty}%</strong></span>
                </div>
                <p>${lt.desc}</p>
            </div>`).join('')}
        </div>

        <div class="info">
            <h2>📊 ${state.name} Small Business Overview</h2>
            <ul>
                <li><strong>Small Businesses:</strong> ${state.bizCount} registered in ${state.name}</li>
                <li><strong>Top Industry:</strong> ${state.topIndustry}</li>
                <li><strong>SBA District Offices:</strong> ${state.sbaOffices}</li>
                <li><strong>Average SBA Loan:</strong> ${fmtUSD(state.avgLoan)}</li>
                <li><strong>Average Rate:</strong> ${state.avgRate}% (Prime + 2.25-2.75%)</li>
            </ul>
            <h2 style="margin-top:1.5rem">💡 Tips for Getting an SBA Loan in ${state.name}</h2>
            <ul>
                <li><strong>Credit Score:</strong> Aim for 680+ for best rates. Some programs accept 620+.</li>
                <li><strong>Business Plan:</strong> Required for all SBA loans. Include financial projections, market analysis.</li>
                <li><strong>Collateral:</strong> SBA 7(a) loans over $350K require collateral. Real estate is preferred.</li>
                <li><strong>Time in Business:</strong> 2+ years preferred. Startups may qualify for Microloans.</li>
                <li><strong>Revenue:</strong> Show consistent revenue growth. Lenders want 1.25x debt service coverage ratio.</li>
                <li><strong>Local Resources:</strong> Visit your ${state.name} SBDC (Small Business Development Center) for free counseling.</li>
            </ul>
        </div>

        <div class="faq">
            <h2>❓ ${state.name} SBA Loan FAQ</h2>
            <h3>What is the current SBA loan rate in ${state.name}?</h3>
            <p>SBA 7(a) variable rates are typically Prime + 2.25% to 2.75%. As of 2026, this ranges from ${(state.avgRate - 0.5).toFixed(2)}% to ${(state.avgRate + 0.5).toFixed(2)}%. SBA 504 loans offer fixed rates, currently around 5.5% to 7%.</p>
            <h3>How long does it take to get an SBA loan in ${state.name}?</h3>
            <p>SBA 7(a): 30-90 days. SBA Express: 36 hours for approval (funding in 2-4 weeks). SBA 504: 60-120 days. Microloans: 2-4 weeks through local intermediaries.</p>
            <h3>What can I use an SBA loan for in ${state.name}?</h3>
            <p>Working capital, equipment, real estate, inventory, debt refinancing, business acquisition, franchise fees, and leasehold improvements. The ${state.topIndustry} industry is ${state.name}'s strongest sector for SBA lending.</p>
            <h3>Do I need a down payment for an SBA loan?</h3>
            <p>SBA 7(a): Typically 10-20% down. SBA 504: 10% down (borrower) + 40% CDC + 50% bank. Microloans: Often no down payment required.</p>
            <h3>What are the SBA guaranty fees?</h3>
            <p>Loans ≤$150K: 2%. Loans $150K-$700K: 3%. Loans $700K-$1M: 3.5%. Loans >$1M: 3.75%. These fees are typically rolled into the loan.</p>
        </div>

        <div class="states">
            <h2>📍 SBA Loan Calculators by State</h2>
            <div class="state-grid">
                ${states.map(s => `<a href="${s.slug}.html">${s.name} <span class="rate">${fmtUSD(s.avgLoan)}</span></a>`).join('\n                ')}
            </div>
        </div>
    </main>

    <footer>
        <p>💼 <a href="../">SmartCalc</a> — Free Financial Calculators</p>
        <p style="margin-top:.5rem">Also try: <a href="../mortgage/">Mortgage Calculators</a> · <a href="../paycheck/">Paycheck Calculators</a> · <a href="../solar/">Solar ROI Calculators</a> · <a href="../student-loans/">Student Loan Calculators</a></p>
        <p style="margin-top:.5rem;font-size:.75rem">SBA loan information is for educational purposes. Actual rates and terms vary by lender. Contact your local SBA office for current programs.</p>
    </footer>

    <script>
    document.getElementById('themeBtn').addEventListener('click',()=>{const t=document.body.dataset.theme==='light'?'':'light';document.body.dataset.theme=t;document.getElementById('themeBtn').textContent=t==='light'?'🌙':'☀️'});
    
    const programLimits = { '7a': { max: 5000000, maxTerm: 25 }, '504': { max: 5500000, maxTerm: 25 }, 'micro': { max: 50000, maxTerm: 6 }, 'express': { max: 500000, maxTerm: 10 } };
    
    document.getElementById('loanProgram').addEventListener('change', function() {
        const p = programLimits[this.value];
        const amt = document.getElementById('loanAmount');
        if (parseFloat(amt.value) > p.max) amt.value = p.max;
        const term = document.getElementById('term');
        for (let opt of term.options) { opt.disabled = parseInt(opt.value) > p.maxTerm; }
        if (parseInt(term.value) > p.maxTerm) term.value = p.maxTerm;
    });

    function calculate() {
        const amount = parseFloat(document.getElementById('loanAmount').value);
        const rate = parseFloat(document.getElementById('rate').value) / 100;
        const years = parseInt(document.getElementById('term').value);
        const downPct = parseFloat(document.getElementById('downPayment').value) / 100;
        const guarantyFee = parseFloat(document.getElementById('guarantyFee').value) / 100;
        
        const downPayment = amount * downPct;
        const loanPrincipal = amount - downPayment;
        const guarantyAmount = loanPrincipal * guarantyFee;
        const totalLoan = loanPrincipal + guarantyAmount;
        const monthlyRate = rate / 12;
        const months = years * 12;
        
        const payment = totalLoan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPaid = payment * months;
        const totalInterest = totalPaid - totalLoan;
        
        document.getElementById('resultGrid').innerHTML = \`
            <div class="stat"><div class="val">$\${payment.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div><div class="lbl">Monthly Payment</div></div>
            <div class="stat"><div class="val">$\${totalLoan.toLocaleString('en-US',{maximumFractionDigits:0})}</div><div class="lbl">Total Loan Amount</div></div>
            <div class="stat"><div class="val">$\${totalInterest.toLocaleString('en-US',{maximumFractionDigits:0})}</div><div class="lbl">Total Interest</div></div>
            <div class="stat"><div class="val">$\${totalPaid.toLocaleString('en-US',{maximumFractionDigits:0})}</div><div class="lbl">Total Cost</div></div>
            <div class="stat"><div class="val">$\${downPayment.toLocaleString('en-US',{maximumFractionDigits:0})}</div><div class="lbl">Down Payment</div></div>
            <div class="stat"><div class="val">$\${guarantyAmount.toLocaleString('en-US',{maximumFractionDigits:0})}</div><div class="lbl">SBA Guaranty Fee</div></div>
        \`;
        
        document.getElementById('breakdown').innerHTML = \`<table>
            <tr><th colspan="2">Loan Breakdown</th></tr>
            <tr><td>Loan Amount</td><td>$\${amount.toLocaleString('en-US')}</td></tr>
            <tr><td>Down Payment (\${(downPct*100).toFixed(0)}%)</td><td>-$\${downPayment.toLocaleString('en-US')}</td></tr>
            <tr><td>Net Loan</td><td>$\${loanPrincipal.toLocaleString('en-US')}</td></tr>
            <tr><td>SBA Guaranty Fee (\${(guarantyFee*100).toFixed(2)}%)</td><td>+$\${guarantyAmount.toLocaleString('en-US',{maximumFractionDigits:0})}</td></tr>
            <tr><td>Total Financed</td><td><strong>$\${totalLoan.toLocaleString('en-US',{maximumFractionDigits:0})}</strong></td></tr>
            <tr><td>Interest Rate</td><td>\${(rate*100).toFixed(2)}%</td></tr>
            <tr><td>Term</td><td>\${years} years (\${months} months)</td></tr>
            <tr><td>Total Interest</td><td>$\${totalInterest.toLocaleString('en-US',{maximumFractionDigits:0})}</td></tr>
            <tr class="total"><td>Total Cost of Loan</td><td>$\${totalPaid.toLocaleString('en-US',{maximumFractionDigits:0})}</td></tr>
        </table>\`;
        
        // Amortization
        let balance = totalLoan;
        let rows = '<table><tr><th>Year</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>';
        for (let y = 1; y <= years; y++) {
            let yearPrincipal = 0, yearInterest = 0;
            for (let m = 0; m < 12; m++) {
                const intPmt = balance * monthlyRate;
                const prinPmt = payment - intPmt;
                yearPrincipal += prinPmt;
                yearInterest += intPmt;
                balance -= prinPmt;
            }
            if (balance < 0) balance = 0;
            rows += \`<tr><td>\${y}</td><td>$\${(payment*12).toLocaleString('en-US',{maximumFractionDigits:0})}</td><td>$\${yearPrincipal.toLocaleString('en-US',{maximumFractionDigits:0})}</td><td>$\${yearInterest.toLocaleString('en-US',{maximumFractionDigits:0})}</td><td>$\${balance.toLocaleString('en-US',{maximumFractionDigits:0})}</td></tr>\`;
        }
        rows += '</table>';
        document.getElementById('amortTable').innerHTML = rows;
        
        document.getElementById('results').classList.add('show');
    }
    
    calculate();
    </script>
</body>
</html>`;
}

function buildIndexPage() {
  const sorted = [...states].sort((a, b) => b.avgLoan - a.avgLoan);
  const highest = sorted.slice(0, 5);
  const lowest = sorted.slice(-5).reverse();
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SBA Business Loan Calculator by State 2026 — Compare Rates & Programs | SmartCalc</title>
    <meta name="description" content="Compare SBA business loan rates across all 50 states. Calculate 7(a), 504, Microloan, and Express payments. Find the best SBA programs in your state.">
    <meta name="keywords" content="SBA loan calculator, SBA loan by state, small business loan calculator, SBA 7a loan, SBA 504 loan, business loan rates by state, SBA loan comparison">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/sba-loans/">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#3b82f6;--accent2:#2563eb;--radius:12px}
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
        .sub{color:var(--muted);margin-bottom:2rem}
        .highlights{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2.5rem}
        .hl-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem}
        .hl-card h3{font-size:1rem;margin-bottom:1rem;color:var(--accent)}
        .hl-item{display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--border)}
        .hl-item:last-child{border-bottom:none}
        .hl-item a{color:var(--text);text-decoration:none}
        .hl-item a:hover{color:var(--accent)}
        .hl-item .val{color:var(--accent);font-weight:700}
        .search{margin-bottom:1.5rem}
        .search input{width:100%;padding:.8rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:1rem;outline:none}
        .search input:focus{border-color:var(--accent)}
        .state-table{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
        .state-table table{width:100%;border-collapse:collapse}
        .state-table th,.state-table td{padding:.75rem 1rem;text-align:left;font-size:.9rem}
        .state-table th{background:var(--surface2);font-weight:600;font-size:.8rem;text-transform:uppercase;color:var(--muted);cursor:pointer;user-select:none}
        .state-table th:hover{color:var(--accent)}
        .state-table td{border-top:1px solid var(--border)}
        .state-table a{color:var(--accent);text-decoration:none;font-weight:600}
        .state-table a:hover{text-decoration:underline}
        .state-table tr:hover td{background:var(--surface2)}
        .programs{margin-top:2.5rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem}
        .prog{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem}
        .prog h3{color:var(--accent);margin-bottom:.75rem}
        .prog p{color:var(--muted);font-size:.85rem;margin-bottom:.5rem}
        .prog .amount{font-size:1.1rem;font-weight:700;color:var(--text)}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        .ad{max-width:1000px;margin:1.5rem auto;padding:0 1.5rem}
        @media(max-width:600px){.highlights{grid-template-columns:1fr}.programs{grid-template-columns:1fr}}
    </style>
</head>
<body>
    <header><div class="hi">
        <a href="../" class="logo">💼 SmartCalc</a>
        <p class="tag">SBA Loan Calculator by State</p>
        <button class="tb" id="themeBtn" aria-label="Toggle theme">🌙</button>
    </div></header>

    <main>
        <h1>💼 SBA Business Loan Calculator by State</h1>
        <p class="sub">Compare SBA loan programs across all 50 states. Calculate monthly payments for 7(a), 504, Microloan, and Express programs.</p>

        <div class="highlights">
            <div class="hl-card">
                <h3>📈 Highest Average SBA Loans</h3>
                ${highest.map(s => `<div class="hl-item"><a href="${s.slug}.html">${s.name}</a><span class="val">${fmtUSD(s.avgLoan)}</span></div>`).join('\n                ')}
            </div>
            <div class="hl-card">
                <h3>💰 Most Affordable Markets</h3>
                ${lowest.map(s => `<div class="hl-item"><a href="${s.slug}.html">${s.name}</a><span class="val">${fmtUSD(s.avgLoan)}</span></div>`).join('\n                ')}
            </div>
        </div>

        <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

        <div class="programs">
            ${loanTypes.map(lt => `
            <div class="prog">
                <h3>${lt.name}</h3>
                <p class="amount">Up to ${fmtUSD(lt.maxAmount)}</p>
                <p>Max term: ${lt.maxTerm} years | Guaranty: ${lt.guaranty}%</p>
                <p>${lt.desc}</p>
            </div>`).join('')}
        </div>

        <div class="search" style="margin-top:2rem">
            <input type="text" id="searchInput" placeholder="🔍 Search states...">
        </div>

        <div class="state-table">
            <table>
                <thead><tr>
                    <th onclick="sortTable(0)">State ↕</th>
                    <th onclick="sortTable(1)">Avg Loan ↕</th>
                    <th onclick="sortTable(2)">Rate ↕</th>
                    <th onclick="sortTable(3)">Top Industry</th>
                    <th onclick="sortTable(4)">Small Businesses</th>
                </tr></thead>
                <tbody id="stateBody">
                    ${states.map(s => `<tr>
                        <td><a href="${s.slug}.html">${s.name}</a></td>
                        <td>${fmtUSD(s.avgLoan)}</td>
                        <td>${s.avgRate}%</td>
                        <td>${s.topIndustry}</td>
                        <td>${s.bizCount}</td>
                    </tr>`).join('\n                    ')}
                </tbody>
            </table>
        </div>
    </main>

    <footer>
        <p>💼 <a href="../">SmartCalc</a> — Free Financial Calculators</p>
        <p style="margin-top:.5rem">Also try: <a href="../mortgage/">Mortgage Calculators</a> · <a href="../paycheck/">Paycheck Calculators</a> · <a href="../solar/">Solar ROI Calculators</a> · <a href="../student-loans/">Student Loan Calculators</a></p>
    </footer>

    <script>
    document.getElementById('themeBtn').addEventListener('click',()=>{const t=document.body.dataset.theme==='light'?'':'light';document.body.dataset.theme=t;document.getElementById('themeBtn').textContent=t==='light'?'🌙':'☀️'});
    document.getElementById('searchInput').addEventListener('input',function(){const q=this.value.toLowerCase();document.querySelectorAll('#stateBody tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':'none'})});
    let sortDir={};
    function sortTable(col){const tb=document.getElementById('stateBody');const rows=[...tb.querySelectorAll('tr')];sortDir[col]=!sortDir[col];rows.sort((a,b)=>{let av=a.cells[col].textContent,bv=b.cells[col].textContent;const an=parseFloat(av.replace(/[$,%K,M]/g,'')),bn=parseFloat(bv.replace(/[$,%K,M]/g,''));if(!isNaN(an)&&!isNaN(bn))return sortDir[col]?an-bn:bn-an;return sortDir[col]?av.localeCompare(bv):bv.localeCompare(av)});rows.forEach(r=>tb.appendChild(r))}
    </script>
</body>
</html>`;
}

// Generate all state pages
states.forEach(state => {
  const html = buildStatePage(state);
  fs.writeFileSync(path.join(dir, `${state.slug}.html`), html);
  console.log(`✅ ${state.name}`);
});

// Generate index page
fs.writeFileSync(path.join(dir, 'index.html'), buildIndexPage());
console.log('✅ Index page');
console.log(`\nTotal: ${states.length + 1} pages generated in sba-loans/`);
