const fs = require('fs');
const path = require('path');

const states = [
  { abbr: 'AL', name: 'Alabama', rate: 0.41, avgHome: 172800, appealRate: 2.5, successRate: 40, deadline: 'within 30 days of notice' },
  { abbr: 'AK', name: 'Alaska', rate: 1.19, avgHome: 293700, appealRate: 3.0, successRate: 45, deadline: 'within 30 days of assessment' },
  { abbr: 'AZ', name: 'Arizona', rate: 0.62, avgHome: 349400, appealRate: 2.8, successRate: 42, deadline: 'within 60 days' },
  { abbr: 'AR', name: 'Arkansas', rate: 0.62, avgHome: 148900, appealRate: 2.0, successRate: 38, deadline: 'first Monday in June' },
  { abbr: 'CA', name: 'California', rate: 0.74, avgHome: 786200, appealRate: 4.0, successRate: 55, deadline: 'September 15 or November 30' },
  { abbr: 'CO', name: 'Colorado', rate: 0.51, avgHome: 521900, appealRate: 5.0, successRate: 50, deadline: 'June 1' },
  { abbr: 'CT', name: 'Connecticut', rate: 2.15, avgHome: 352100, appealRate: 3.5, successRate: 48, deadline: 'February 20' },
  { abbr: 'DE', name: 'Delaware', rate: 0.57, avgHome: 305200, appealRate: 2.2, successRate: 40, deadline: 'varies by county' },
  { abbr: 'FL', name: 'Florida', rate: 0.86, avgHome: 392300, appealRate: 3.8, successRate: 52, deadline: '25 days after TRIM notice' },
  { abbr: 'GA', name: 'Georgia', rate: 0.92, avgHome: 291700, appealRate: 3.2, successRate: 45, deadline: '45 days of assessment notice' },
  { abbr: 'HI', name: 'Hawaii', rate: 0.28, avgHome: 835600, appealRate: 1.8, successRate: 35, deadline: 'April 9' },
  { abbr: 'ID', name: 'Idaho', rate: 0.63, avgHome: 383000, appealRate: 3.5, successRate: 44, deadline: 'fourth Monday in June' },
  { abbr: 'IL', name: 'Illinois', rate: 2.27, avgHome: 239100, appealRate: 6.0, successRate: 58, deadline: '30 days of publication' },
  { abbr: 'IN', name: 'Indiana', rate: 0.85, avgHome: 194900, appealRate: 3.0, successRate: 42, deadline: 'June 15 or 45 days of notice' },
  { abbr: 'IA', name: 'Iowa', rate: 1.57, avgHome: 178700, appealRate: 2.5, successRate: 40, deadline: 'April 25 to May 5' },
  { abbr: 'KS', name: 'Kansas', rate: 1.41, avgHome: 195000, appealRate: 2.8, successRate: 43, deadline: '30 days of valuation notice' },
  { abbr: 'KY', name: 'Kentucky', rate: 0.86, avgHome: 177100, appealRate: 2.0, successRate: 38, deadline: 'January 1 through tax bill date' },
  { abbr: 'LA', name: 'Louisiana', rate: 0.55, avgHome: 198800, appealRate: 2.2, successRate: 40, deadline: '15 days after public notice' },
  { abbr: 'ME', name: 'Maine', rate: 1.36, avgHome: 311400, appealRate: 2.5, successRate: 42, deadline: '185 days after commitment' },
  { abbr: 'MD', name: 'Maryland', rate: 1.09, avgHome: 380100, appealRate: 3.5, successRate: 48, deadline: '45 days of notice' },
  { abbr: 'MA', name: 'Massachusetts', rate: 1.23, avgHome: 596400, appealRate: 4.0, successRate: 50, deadline: 'February 1 (most towns)' },
  { abbr: 'MI', name: 'Michigan', rate: 1.54, avgHome: 218100, appealRate: 4.5, successRate: 52, deadline: 'March Board of Review meeting' },
  { abbr: 'MN', name: 'Minnesota', rate: 1.12, avgHome: 310800, appealRate: 3.0, successRate: 45, deadline: 'April 30' },
  { abbr: 'MS', name: 'Mississippi', rate: 0.81, avgHome: 140200, appealRate: 1.8, successRate: 36, deadline: 'first Monday in April' },
  { abbr: 'MO', name: 'Missouri', rate: 0.97, avgHome: 207900, appealRate: 2.5, successRate: 40, deadline: 'second Monday in July' },
  { abbr: 'MT', name: 'Montana', rate: 0.74, avgHome: 366400, appealRate: 2.8, successRate: 42, deadline: 'first Monday in June' },
  { abbr: 'NE', name: 'Nebraska', rate: 1.73, avgHome: 209700, appealRate: 3.2, successRate: 45, deadline: 'June 30' },
  { abbr: 'NV', name: 'Nevada', rate: 0.60, avgHome: 397200, appealRate: 2.5, successRate: 40, deadline: 'January 15' },
  { abbr: 'NH', name: 'New Hampshire', rate: 2.18, avgHome: 383100, appealRate: 3.8, successRate: 48, deadline: 'March 1 (or September 1)' },
  { abbr: 'NJ', name: 'New Jersey', rate: 2.49, avgHome: 401400, appealRate: 5.5, successRate: 55, deadline: 'April 1 (most counties)' },
  { abbr: 'NM', name: 'New Mexico', rate: 0.80, avgHome: 259800, appealRate: 2.0, successRate: 38, deadline: 'within 30 days of notice' },
  { abbr: 'NY', name: 'New York', rate: 1.72, avgHome: 384100, appealRate: 5.0, successRate: 54, deadline: 'Grievance Day (third Tuesday in May)' },
  { abbr: 'NC', name: 'North Carolina', rate: 0.84, avgHome: 289500, appealRate: 2.5, successRate: 42, deadline: 'within 30 days of notice' },
  { abbr: 'ND', name: 'North Dakota', rate: 0.98, avgHome: 232500, appealRate: 2.0, successRate: 38, deadline: 'April meeting' },
  { abbr: 'OH', name: 'Ohio', rate: 1.56, avgHome: 197200, appealRate: 4.0, successRate: 50, deadline: 'March 31' },
  { abbr: 'OK', name: 'Oklahoma', rate: 0.90, avgHome: 172500, appealRate: 2.2, successRate: 40, deadline: 'varies by county' },
  { abbr: 'OR', name: 'Oregon', rate: 0.97, avgHome: 438100, appealRate: 3.5, successRate: 48, deadline: 'January 15 to December 31' },
  { abbr: 'PA', name: 'Pennsylvania', rate: 1.58, avgHome: 254100, appealRate: 4.0, successRate: 50, deadline: 'varies by county (often August 1)' },
  { abbr: 'RI', name: 'Rhode Island', rate: 1.63, avgHome: 394300, appealRate: 3.0, successRate: 44, deadline: '90 days after tax bill' },
  { abbr: 'SC', name: 'South Carolina', rate: 0.57, avgHome: 243900, appealRate: 2.0, successRate: 38, deadline: 'within 90 days of notice' },
  { abbr: 'SD', name: 'South Dakota', rate: 1.28, avgHome: 250300, appealRate: 2.5, successRate: 42, deadline: 'third Monday in March' },
  { abbr: 'TN', name: 'Tennessee', rate: 0.71, avgHome: 267900, appealRate: 2.2, successRate: 40, deadline: 'June 1 to June 30' },
  { abbr: 'TX', name: 'Texas', rate: 1.80, avgHome: 300200, appealRate: 6.5, successRate: 60, deadline: 'May 15 (or 30 days after notice)' },
  { abbr: 'UT', name: 'Utah', rate: 0.63, avgHome: 460300, appealRate: 3.0, successRate: 44, deadline: 'September 15' },
  { abbr: 'VT', name: 'Vermont', rate: 1.90, avgHome: 292700, appealRate: 2.5, successRate: 42, deadline: 'varies by town' },
  { abbr: 'VA', name: 'Virginia', rate: 0.82, avgHome: 370100, appealRate: 2.8, successRate: 44, deadline: 'varies by locality' },
  { abbr: 'WA', name: 'Washington', rate: 1.03, avgHome: 563900, appealRate: 3.5, successRate: 48, deadline: 'July 1 (or 60 days of notice)' },
  { abbr: 'WV', name: 'West Virginia', rate: 0.58, avgHome: 128600, appealRate: 1.8, successRate: 36, deadline: 'February 1 to February 20' },
  { abbr: 'WI', name: 'Wisconsin', rate: 1.76, avgHome: 247000, appealRate: 3.5, successRate: 46, deadline: 'Board of Review meeting (usually May)' },
  { abbr: 'WY', name: 'Wyoming', rate: 0.61, avgHome: 306600, appealRate: 2.0, successRate: 38, deadline: 'first Monday in June' },
  { abbr: 'DC', name: 'District of Columbia', rate: 0.56, avgHome: 701700, appealRate: 4.0, successRate: 50, deadline: 'April 1' }
];

const dir = path.join(__dirname, 'property-tax-appeal');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function generatePage(state) {
  const annualTax = Math.round(state.avgHome * state.rate / 100);
  const potential5 = Math.round(annualTax * 0.05);
  const potential10 = Math.round(annualTax * 0.10);
  const potential20 = Math.round(annualTax * 0.20);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${state.name} Property Tax Appeal Calculator 2026 | SmartCalc</title>
<meta name="description" content="Free ${state.name} property tax appeal calculator. Estimate your potential savings, check if your assessment is too high, and get step-by-step appeal guidance for ${state.abbr} homeowners.">
<meta name="keywords" content="${state.name} property tax appeal, ${state.abbr} property tax reduction, ${state.name} assessment appeal, lower property taxes ${state.name}">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/property-tax-appeal/${state.abbr.toLowerCase()}.html">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"${state.name} Property Tax Appeal Calculator","description":"Calculate potential property tax savings from a successful appeal in ${state.name}","url":"https://alexchalu.github.io/smartcalc/property-tax-appeal/${state.abbr.toLowerCase()}.html","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0f4f8;color:#1a202c;line-height:1.6}
.header{background:linear-gradient(135deg,#1e3a5f 0%,#2d5a87 100%);color:#fff;padding:20px;text-align:center}
.header h1{font-size:1.8rem;margin-bottom:5px}
.header p{opacity:0.9;font-size:0.95rem}
.nav{background:#fff;padding:10px 20px;border-bottom:1px solid #e2e8f0;font-size:0.85rem}
.nav a{color:#2d5a87;text-decoration:none}
.nav a:hover{text-decoration:underline}
.container{max-width:900px;margin:0 auto;padding:20px}
.ad-slot{background:#f7fafc;border:1px dashed #cbd5e0;padding:15px;text-align:center;color:#a0aec0;margin:20px 0;border-radius:8px;font-size:0.85rem}
.card{background:#fff;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.08);padding:25px;margin-bottom:20px}
.card h2{color:#1e3a5f;margin-bottom:15px;font-size:1.3rem}
.card h3{color:#2d5a87;margin:15px 0 10px;font-size:1.1rem}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}
@media(max-width:600px){.form-grid{grid-template-columns:1fr}}
label{display:block;font-weight:600;margin-bottom:5px;font-size:0.9rem;color:#4a5568}
input,select{width:100%;padding:10px;border:2px solid #e2e8f0;border-radius:8px;font-size:1rem;transition:border-color 0.2s}
input:focus,select:focus{border-color:#2d5a87;outline:none}
.btn{background:linear-gradient(135deg,#2d5a87,#1e3a5f);color:#fff;border:none;padding:12px 30px;border-radius:8px;font-size:1rem;cursor:pointer;width:100%;margin-top:15px;font-weight:600}
.btn:hover{opacity:0.9}
.results{display:none;margin-top:20px}
.result-box{background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border:2px solid #2d5a87;border-radius:12px;padding:20px;margin-bottom:15px}
.result-box h3{color:#1e3a5f;margin-bottom:10px}
.result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin-top:15px}
.result-item{text-align:center;padding:15px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
.result-item .value{font-size:1.8rem;font-weight:700;color:#2d5a87}
.result-item .label{font-size:0.8rem;color:#718096;margin-top:5px}
.savings-table{width:100%;border-collapse:collapse;margin-top:15px}
.savings-table th,.savings-table td{padding:10px;text-align:left;border-bottom:1px solid #e2e8f0}
.savings-table th{background:#f7fafc;font-weight:600;color:#4a5568;font-size:0.85rem}
.savings-table td{font-size:0.95rem}
.highlight{background:#f0fff4;font-weight:600;color:#22543d}
.steps{counter-reset:step}
.steps li{counter-increment:step;list-style:none;padding:15px 15px 15px 60px;position:relative;margin-bottom:10px;background:#f7fafc;border-radius:8px}
.steps li::before{content:counter(step);position:absolute;left:15px;top:15px;background:#2d5a87;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:15px;margin:15px 0}
.stat-card{text-align:center;padding:15px;background:#f7fafc;border-radius:8px;border:1px solid #e2e8f0}
.stat-card .number{font-size:1.5rem;font-weight:700;color:#2d5a87}
.stat-card .desc{font-size:0.8rem;color:#718096;margin-top:5px}
.warning{background:#fffbeb;border:1px solid #f59e0b;border-radius:8px;padding:15px;margin:15px 0}
.warning strong{color:#92400e}
.faq-item{margin-bottom:15px;border-bottom:1px solid #e2e8f0;padding-bottom:15px}
.faq-item:last-child{border-bottom:none}
.faq-item h4{color:#2d5a87;margin-bottom:5px;font-size:0.95rem}
.faq-item p{color:#4a5568;font-size:0.9rem}
.cross-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:15px}
.cross-links a{display:inline-block;padding:8px 15px;background:#edf2f7;border-radius:20px;color:#2d5a87;text-decoration:none;font-size:0.85rem;font-weight:500}
.cross-links a:hover{background:#2d5a87;color:#fff}
footer{text-align:center;padding:30px;color:#718096;font-size:0.85rem}
</style>
</head>
<body>
<div class="header">
<h1>🏠 ${state.name} Property Tax Appeal Calculator</h1>
<p>Estimate your savings from a successful property tax appeal in ${state.abbr}</p>
</div>
<div class="nav">
<a href="../index.html">SmartCalc</a> &gt; <a href="index.html">Property Tax Appeal</a> &gt; ${state.name}
</div>
<div class="container">

<div class="ad-slot"><!-- Ad Slot 1 --></div>

<div class="card">
<h2>📊 ${state.name} Property Tax Overview</h2>
<div class="stats-grid">
<div class="stat-card"><div class="number">${state.rate}%</div><div class="desc">Effective Tax Rate</div></div>
<div class="stat-card"><div class="number">$${annualTax.toLocaleString()}</div><div class="desc">Avg Annual Tax</div></div>
<div class="stat-card"><div class="number">${state.appealRate}%</div><div class="desc">Appeal Rate</div></div>
<div class="stat-card"><div class="number">${state.successRate}%</div><div class="desc">Success Rate</div></div>
</div>
<div class="warning">
<strong>⏰ ${state.name} Appeal Deadline:</strong> ${state.deadline}. Missing the deadline means waiting until the next assessment cycle.
</div>
</div>

<div class="card">
<h2>🧮 Calculate Your Appeal Savings</h2>
<div class="form-grid">
<div>
<label for="homeValue">Current Assessed Value ($)</label>
<input type="number" id="homeValue" value="${state.avgHome}" min="0" step="1000">
</div>
<div>
<label for="marketValue">Estimated Market Value ($)</label>
<input type="number" id="marketValue" value="${Math.round(state.avgHome * 0.9)}" min="0" step="1000">
</div>
<div>
<label for="taxRate">Your Tax Rate (%)</label>
<input type="number" id="taxRate" value="${state.rate}" min="0" step="0.01">
</div>
<div>
<label for="appealCost">Estimated Appeal Cost ($)</label>
<input type="number" id="appealCost" value="250" min="0" step="50">
</div>
<div>
<label for="comps">Comparable Sales (lower value)</label>
<input type="number" id="comps" value="${Math.round(state.avgHome * 0.88)}" min="0" step="1000">
</div>
<div>
<label for="scenario">Appeal Scenario</label>
<select id="scenario">
<option value="conservative">Conservative (5% reduction)</option>
<option value="moderate" selected>Moderate (10% reduction)</option>
<option value="aggressive">Aggressive (20% reduction)</option>
<option value="custom">Custom (use market value)</option>
</select>
</div>
</div>
<button class="btn" onclick="calculate()">Calculate Appeal Savings</button>

<div class="results" id="results">
<div class="result-box">
<h3>💰 Potential Annual Savings</h3>
<div class="result-grid">
<div class="result-item"><div class="value" id="annualSavings">$0</div><div class="label">Annual Tax Savings</div></div>
<div class="result-item"><div class="value" id="monthSavings">$0</div><div class="label">Monthly Savings</div></div>
<div class="result-item"><div class="value" id="fiveYearSavings">$0</div><div class="label">5-Year Total Savings</div></div>
<div class="result-item"><div class="value" id="roi">0%</div><div class="label">ROI on Appeal Cost</div></div>
</div>
</div>

<h3>📈 Savings by Reduction Scenario</h3>
<table class="savings-table">
<thead><tr><th>Reduction</th><th>New Assessment</th><th>Annual Tax</th><th>Annual Savings</th><th>5-Year Savings</th></tr></thead>
<tbody id="scenarioTable"></tbody>
</table>

<div class="result-box" style="margin-top:20px">
<h3>🎯 Appeal Recommendation</h3>
<p id="recommendation"></p>
</div>
</div>
</div>

<div class="ad-slot"><!-- Ad Slot 2 --></div>

<div class="card">
<h2>📋 How to Appeal Property Taxes in ${state.name}</h2>
<ol class="steps">
<li><strong>Review Your Assessment Notice</strong> — Check the assessed value on your ${state.name} property tax notice. Compare it to recent sales of similar homes in your area.</li>
<li><strong>Research Comparable Sales</strong> — Find 3-5 recent sales of similar properties within 0.5 miles. Focus on homes with similar size, age, condition, and features.</li>
<li><strong>Document Property Issues</strong> — Note any problems that reduce your home's value: needed repairs, environmental issues, noise, easements, or functional obsolescence.</li>
<li><strong>File Your Appeal by the Deadline</strong> — In ${state.name}, you must file ${state.deadline}. Contact your ${state.abbr === 'DC' ? 'DC Office of Tax and Revenue' : 'county assessor\'s office'} for exact procedures.</li>
<li><strong>Present Your Case</strong> — Attend the hearing with your evidence: comparable sales data, photos of property issues, independent appraisal if available.</li>
<li><strong>Consider Further Appeal</strong> — If denied, ${state.name} allows further appeal to ${state.abbr === 'TX' ? 'the Appraisal Review Board, then district court' : state.abbr === 'NY' ? 'Small Claims Assessment Review (SCAR)' : state.abbr === 'CA' ? 'the Assessment Appeals Board' : 'a higher board or court'}.</li>
</ol>
</div>

<div class="card">
<h2>💡 ${state.name} Property Tax Appeal Tips</h2>
<div class="stats-grid">
<div class="stat-card"><div class="number">📸</div><div class="desc">Take photos of any property defects or issues</div></div>
<div class="stat-card"><div class="number">🏘️</div><div class="desc">Get 3-5 comparable sales within 6 months</div></div>
<div class="stat-card"><div class="number">📄</div><div class="desc">Consider a professional appraisal ($300-$500)</div></div>
<div class="stat-card"><div class="number">⏰</div><div class="desc">Never miss the filing deadline</div></div>
</div>
${state.abbr === 'TX' ? '<div class="warning"><strong>🏆 Texas Tip:</strong> Texas has one of the highest appeal success rates (60%) because property values are reassessed annually. The Texas Comptroller provides a Property Taxpayer Remedies guide — use it!</div>' : ''}
${state.abbr === 'CA' ? '<div class="warning"><strong>🏆 California Tip:</strong> Under Prop 13, your assessed value can only increase 2% per year. If your home\'s market value drops below the assessed value (Prop 8 decline), you\'re entitled to a temporary reduction.</div>' : ''}
${state.abbr === 'IL' ? '<div class="warning"><strong>🏆 Illinois Tip:</strong> Illinois has one of the highest property tax rates in the nation. Cook County properties are especially over-assessed — appeal rates in Chicago exceed 10%. Always appeal!</div>' : ''}
${state.abbr === 'NJ' ? '<div class="warning"><strong>🏆 New Jersey Tip:</strong> NJ has the highest property taxes in the US. If your assessment exceeds market value by 15%+, you have strong grounds for appeal. Tax appeal attorneys often work on contingency.</div>' : ''}
${state.abbr === 'NY' ? '<div class="warning"><strong>🏆 New York Tip:</strong> Use SCAR (Small Claims Assessment Review) for residential properties — it\'s free to file, informal, and you don\'t need a lawyer. The burden of proof shifts to the assessor!</div>' : ''}
${state.abbr === 'FL' ? '<div class="warning"><strong>🏆 Florida Tip:</strong> Florida\'s Save Our Homes cap limits annual assessment increases to 3% for homesteaded properties. If you recently purchased, your assessment may jump significantly — appeal if it exceeds market value.</div>' : ''}
</div>

<div class="card">
<h2>❓ ${state.name} Property Tax Appeal FAQ</h2>
<div class="faq-item">
<h4>What is the property tax rate in ${state.name}?</h4>
<p>The average effective property tax rate in ${state.name} is ${state.rate}%. On a home valued at $${state.avgHome.toLocaleString()}, that's approximately $${annualTax.toLocaleString()} per year. Rates vary by county and municipality.</p>
</div>
<div class="faq-item">
<h4>When is the deadline to appeal property taxes in ${state.name}?</h4>
<p>In ${state.name}, the appeal deadline is ${state.deadline}. Check with your local assessor's office for exact dates, as they can vary by county.</p>
</div>
<div class="faq-item">
<h4>How often are properties reassessed in ${state.name}?</h4>
<p>${state.abbr === 'TX' ? 'Texas reassesses annually.' : state.abbr === 'CA' ? 'California reassesses at purchase (Prop 13), with max 2% annual increases.' : state.abbr === 'FL' ? 'Florida reassesses annually, with a 3% cap for homesteaded properties (Save Our Homes).' : `${state.name} reassessment cycles vary by jurisdiction — typically every 1-5 years.`}</p>
</div>
<div class="faq-item">
<h4>Do I need a lawyer to appeal in ${state.name}?</h4>
<p>No, you can appeal on your own. However, for high-value properties or complex cases, a property tax attorney or consultant may increase your chances. Many work on contingency (typically 30-50% of first year's savings).</p>
</div>
<div class="faq-item">
<h4>What evidence do I need for a ${state.name} property tax appeal?</h4>
<p>The strongest evidence includes: comparable sales (3-5 recent sales of similar homes), an independent appraisal, photos of property defects, and documentation of any issues affecting value (noise, flooding, environmental contamination).</p>
</div>
<div class="faq-item">
<h4>What are the chances of winning a property tax appeal in ${state.name}?</h4>
<p>In ${state.name}, approximately ${state.successRate}% of property tax appeals result in a reduction. Nationally, success rates range from 30-60% depending on the jurisdiction and evidence quality.</p>
</div>
</div>

<div class="ad-slot"><!-- Ad Slot 3 --></div>

<div class="card">
<h2>🔗 Related Calculators</h2>
<div class="cross-links">
<a href="../mortgage/${state.abbr.toLowerCase()}.html">${state.abbr} Mortgage Calculator</a>
<a href="../estate-tax/${state.abbr.toLowerCase()}.html">${state.abbr} Estate Tax Calculator</a>
<a href="../paycheck/${state.abbr.toLowerCase()}.html">${state.abbr} Paycheck Calculator</a>
<a href="../solar/${state.abbr.toLowerCase()}.html">${state.abbr} Solar ROI Calculator</a>
<a href="../auto-loan/${state.abbr.toLowerCase()}.html">${state.abbr} Auto Loan Calculator</a>
<a href="index.html">All States</a>
</div>
</div>

</div>

<footer>
<p>&copy; 2026 SmartCalc. Free ${state.name} property tax appeal calculator. For informational purposes only — consult a tax professional for specific advice.</p>
</footer>

<script>
function calculate() {
  const hv = parseFloat(document.getElementById('homeValue').value) || 0;
  const mv = parseFloat(document.getElementById('marketValue').value) || 0;
  const tr = parseFloat(document.getElementById('taxRate').value) || 0;
  const ac = parseFloat(document.getElementById('appealCost').value) || 0;
  const scenario = document.getElementById('scenario').value;
  
  let reduction;
  switch(scenario) {
    case 'conservative': reduction = 0.05; break;
    case 'moderate': reduction = 0.10; break;
    case 'aggressive': reduction = 0.20; break;
    case 'custom': reduction = Math.max(0, (hv - mv) / hv); break;
  }
  
  const currentTax = hv * tr / 100;
  const newAssessment = hv * (1 - reduction);
  const newTax = newAssessment * tr / 100;
  const annualSav = currentTax - newTax;
  const monthSav = annualSav / 12;
  const fiveYear = annualSav * 5;
  const roi = ac > 0 ? ((annualSav - ac) / ac * 100) : 0;
  
  document.getElementById('annualSavings').textContent = '$' + Math.round(annualSav).toLocaleString();
  document.getElementById('monthSavings').textContent = '$' + Math.round(monthSav).toLocaleString();
  document.getElementById('fiveYearSavings').textContent = '$' + Math.round(fiveYear).toLocaleString();
  document.getElementById('roi').textContent = Math.round(roi) + '%';
  
  // Scenario table
  const scenarios = [
    { name: '5% Reduction', pct: 0.05 },
    { name: '10% Reduction', pct: 0.10 },
    { name: '15% Reduction', pct: 0.15 },
    { name: '20% Reduction', pct: 0.20 },
    { name: '25% Reduction', pct: 0.25 },
    { name: '30% Reduction', pct: 0.30 }
  ];
  
  let tableHTML = '';
  scenarios.forEach(s => {
    const newA = hv * (1 - s.pct);
    const newT = newA * tr / 100;
    const sav = currentTax - newT;
    const isSelected = Math.abs(s.pct - reduction) < 0.001;
    tableHTML += '<tr' + (isSelected ? ' class="highlight"' : '') + '>';
    tableHTML += '<td>' + s.name + '</td>';
    tableHTML += '<td>$' + Math.round(newA).toLocaleString() + '</td>';
    tableHTML += '<td>$' + Math.round(newT).toLocaleString() + '</td>';
    tableHTML += '<td>$' + Math.round(sav).toLocaleString() + '/yr</td>';
    tableHTML += '<td>$' + Math.round(sav * 5).toLocaleString() + '</td>';
    tableHTML += '</tr>';
  });
  document.getElementById('scenarioTable').innerHTML = tableHTML;
  
  // Recommendation
  let rec = '';
  if (annualSav > ac * 2) {
    rec = '✅ <strong>Strongly recommended.</strong> Your potential annual savings of $' + Math.round(annualSav).toLocaleString() + ' far exceed the appeal cost of $' + ac.toLocaleString() + '. Over 5 years, you could save $' + Math.round(fiveYear).toLocaleString() + '. File your appeal before the ${state.name} deadline (${state.deadline}).';
  } else if (annualSav > ac) {
    rec = '🟡 <strong>Worth considering.</strong> Your potential savings ($' + Math.round(annualSav).toLocaleString() + '/yr) exceed the appeal cost, but the margin is moderate. Consider whether you have strong comparable sales evidence.';
  } else {
    rec = '⚠️ <strong>May not be worth it.</strong> Your potential savings ($' + Math.round(annualSav).toLocaleString() + '/yr) are close to or less than the appeal cost. Unless you have very strong evidence of overassessment, the effort may not be justified.';
  }
  document.getElementById('recommendation').innerHTML = rec;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Auto-calculate on load
window.addEventListener('load', calculate);
</script>
</body>
</html>`;
}

function generateIndex() {
  let rows = states.map(s => {
    const annualTax = Math.round(s.avgHome * s.rate / 100);
    const potential10 = Math.round(annualTax * 0.10);
    return `<tr>
<td><a href="${s.abbr.toLowerCase()}.html">${s.name}</a></td>
<td>${s.rate}%</td>
<td>$${s.avgHome.toLocaleString()}</td>
<td>$${annualTax.toLocaleString()}</td>
<td>$${potential10.toLocaleString()}</td>
<td>${s.successRate}%</td>
<td>${s.deadline}</td>
</tr>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Property Tax Appeal Calculator by State 2026 | SmartCalc</title>
<meta name="description" content="Free property tax appeal calculators for all 50 states + DC. Estimate your savings, check appeal deadlines, and get step-by-step appeal guidance.">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/property-tax-appeal/">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"Property Tax Appeal Calculator by State","description":"Calculate potential property tax savings from appeals in all 50 US states","url":"https://alexchalu.github.io/smartcalc/property-tax-appeal/","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0f4f8;color:#1a202c;line-height:1.6}
.header{background:linear-gradient(135deg,#1e3a5f 0%,#2d5a87 100%);color:#fff;padding:30px 20px;text-align:center}
.header h1{font-size:2rem;margin-bottom:8px}
.header p{opacity:0.9;font-size:1rem;max-width:700px;margin:0 auto}
.nav{background:#fff;padding:10px 20px;border-bottom:1px solid #e2e8f0;font-size:0.85rem}
.nav a{color:#2d5a87;text-decoration:none}
.container{max-width:1100px;margin:0 auto;padding:20px}
.ad-slot{background:#f7fafc;border:1px dashed #cbd5e0;padding:15px;text-align:center;color:#a0aec0;margin:20px 0;border-radius:8px;font-size:0.85rem}
.card{background:#fff;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.08);padding:25px;margin-bottom:20px}
.card h2{color:#1e3a5f;margin-bottom:15px}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:15px;margin:15px 0}
.stat-card{text-align:center;padding:20px;background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border-radius:12px;border:1px solid #bee3f8}
.stat-card .number{font-size:1.8rem;font-weight:700;color:#2d5a87}
.stat-card .desc{font-size:0.85rem;color:#4a5568;margin-top:5px}
.search-box{width:100%;padding:12px 15px;border:2px solid #e2e8f0;border-radius:8px;font-size:1rem;margin-bottom:15px}
.search-box:focus{border-color:#2d5a87;outline:none}
table{width:100%;border-collapse:collapse}
th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #e2e8f0;font-size:0.9rem}
th{background:#f7fafc;font-weight:600;color:#4a5568;cursor:pointer;user-select:none;position:sticky;top:0}
th:hover{background:#edf2f7}
tr:hover{background:#f7fafc}
td a{color:#2d5a87;text-decoration:none;font-weight:600}
td a:hover{text-decoration:underline}
.highlight-row{background:#f0fff4}
.table-wrap{overflow-x:auto;max-height:600px;overflow-y:auto}
.featured{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;margin:15px 0}
.featured a{display:block;padding:20px;background:#f7fafc;border-radius:10px;text-decoration:none;color:#1a202c;border:2px solid #e2e8f0;transition:all 0.2s}
.featured a:hover{border-color:#2d5a87;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.featured a strong{color:#2d5a87;font-size:1.1rem}
.featured a span{display:block;color:#718096;font-size:0.85rem;margin-top:5px}
footer{text-align:center;padding:30px;color:#718096;font-size:0.85rem}
</style>
</head>
<body>
<div class="header">
<h1>🏠 Property Tax Appeal Calculator by State</h1>
<p>Find out how much you could save by appealing your property tax assessment. All 50 states + DC with deadlines, success rates, and step-by-step guidance.</p>
</div>
<div class="nav">
<a href="../index.html">SmartCalc</a> &gt; Property Tax Appeal Calculators
</div>
<div class="container">

<div class="ad-slot"><!-- Ad Slot 1 --></div>

<div class="card">
<h2>🏆 Why Appeal Your Property Taxes?</h2>
<div class="stats-grid">
<div class="stat-card"><div class="number">30-60%</div><div class="desc">Average Success Rate</div></div>
<div class="stat-card"><div class="number">$1,000+</div><div class="desc">Average Annual Savings</div></div>
<div class="stat-card"><div class="number">5-10x</div><div class="desc">ROI on Appeal Costs</div></div>
<div class="stat-card"><div class="number">Free</div><div class="desc">Most Appeals Cost Nothing to File</div></div>
</div>
</div>

<div class="card">
<h2>🔥 Featured States (Highest Savings Potential)</h2>
<div class="featured">
<a href="tx.html"><strong>🤠 Texas</strong><span>1.80% rate • 60% success rate • $5,404/yr avg tax</span></a>
<a href="nj.html"><strong>🏖️ New Jersey</strong><span>2.49% rate • 55% success rate • $9,995/yr avg tax</span></a>
<a href="il.html"><strong>🏙️ Illinois</strong><span>2.27% rate • 58% success rate • $5,428/yr avg tax</span></a>
<a href="ca.html"><strong>☀️ California</strong><span>0.74% rate • 55% success rate • $5,818/yr avg tax</span></a>
<a href="ny.html"><strong>🗽 New York</strong><span>1.72% rate • 54% success rate • $6,607/yr avg tax</span></a>
<a href="fl.html"><strong>🌴 Florida</strong><span>0.86% rate • 52% success rate • $3,374/yr avg tax</span></a>
</div>
</div>

<div class="card">
<h2>📊 All States — Property Tax Appeal Data</h2>
<input type="text" class="search-box" id="search" placeholder="🔍 Search by state name..." oninput="filterTable()">
<div class="table-wrap">
<table id="stateTable">
<thead><tr>
<th onclick="sortTable(0)">State ↕</th>
<th onclick="sortTable(1)">Tax Rate ↕</th>
<th onclick="sortTable(2)">Avg Home ↕</th>
<th onclick="sortTable(3)">Avg Tax ↕</th>
<th onclick="sortTable(4)">10% Appeal Savings ↕</th>
<th onclick="sortTable(5)">Success Rate ↕</th>
<th>Deadline</th>
</tr></thead>
<tbody>
${rows}
</tbody>
</table>
</div>
</div>

<div class="ad-slot"><!-- Ad Slot 2 --></div>

<div class="card">
<h2>🔗 Related Calculator Suites</h2>
<div class="featured">
<a href="../mortgage/"><strong>🏠 Mortgage Calculators</strong><span>All 50 states with rates & amortization</span></a>
<a href="../estate-tax/"><strong>🏛️ Estate Tax Calculators</strong><span>Federal + state estate & inheritance tax</span></a>
<a href="../paycheck/"><strong>💰 Paycheck Calculators</strong><span>Take-home pay by state</span></a>
<a href="../solar/"><strong>☀️ Solar ROI Calculators</strong><span>Solar panel savings by state</span></a>
</div>
</div>

</div>
<footer><p>&copy; 2026 SmartCalc. Free property tax appeal calculators for all 50 US states.</p></footer>

<script>
function filterTable() {
  const q = document.getElementById('search').value.toLowerCase();
  const rows = document.querySelectorAll('#stateTable tbody tr');
  rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
}
function sortTable(n) {
  const table = document.getElementById('stateTable');
  const rows = Array.from(table.tBodies[0].rows);
  const asc = table.getAttribute('data-sort') !== String(n);
  table.setAttribute('data-sort', asc ? String(n) : '-1');
  rows.sort((a, b) => {
    let av = a.cells[n].textContent.replace(/[$,%]/g, '');
    let bv = b.cells[n].textContent.replace(/[$,%]/g, '');
    if (!isNaN(parseFloat(av))) return asc ? parseFloat(av) - parseFloat(bv) : parseFloat(bv) - parseFloat(av);
    return asc ? av.localeCompare(bv) : bv.localeCompare(av);
  });
  rows.forEach(r => table.tBodies[0].appendChild(r));
}
</script>
</body>
</html>`;
}

// Generate all state pages
states.forEach(s => {
  const filename = s.abbr.toLowerCase() + '.html';
  fs.writeFileSync(path.join(dir, filename), generatePage(s));
  console.log(`Generated: property-tax-appeal/${filename}`);
});

// Generate index
fs.writeFileSync(path.join(dir, 'index.html'), generateIndex());
console.log('Generated: property-tax-appeal/index.html');

console.log(`\nTotal: ${states.length + 1} pages generated`);
