#!/usr/bin/env node
/**
 * Add high-CPC insurance & credit calculators to SmartCalc
 * Insurance keywords: $20-80 CPC — among the highest on the internet
 */
const fs = require('fs');
const AD = 'ca-pub-3112605892426625';
const URL = 'https://alexchalu.github.io/smartcalc';

// Read existing build.js to reuse the page() function pattern
const existingBuild = fs.readFileSync(__dirname + '/build.js', 'utf8');
// Extract page function
const pageFnMatch = existingBuild.match(/function page\(.*?\nreturn `[\s\S]*?`;\n\}/);

// We'll just create the HTML files directly using the same template
function page(slug, title, desc, keywords, calcHTML, calcJS, faqHTML = '') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Free Online | SmartCalc</title>
    <meta name="description" content="${desc}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${URL}/${slug}.html">
    <meta property="og:title" content="${title} — SmartCalc">
    <meta property="og:description" content="${desc}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD}" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${title}","description":"${desc}","url":"${URL}/${slug}.html","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
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
        .btn{display:inline-flex;padding:.75rem 1.5rem;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--accent2)}
        .results{margin-top:2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
        .stat .val{font-size:1.5rem;font-weight:800;color:var(--accent)}
        .stat .lbl{font-size:.8rem;color:var(--muted)}
        .ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
        .faq{margin-top:3rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .faq h2{font-size:1.2rem;margin-bottom:1rem}
        .faq h3{font-size:1rem;margin:1rem 0 .5rem;color:var(--accent)}
        .faq p{color:var(--muted);font-size:.9rem;line-height:1.7}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        .more{margin-top:3rem}
        .more h2{font-size:1.2rem;margin-bottom:1rem}
        .mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}
        .mcard{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:1rem;text-decoration:none;color:var(--text);transition:.2s}
        .mcard:hover{border-color:var(--accent)}
        .mcard h4{font-size:.9rem}
        .mcard p{font-size:.75rem;color:var(--muted)}
        @media(max-width:600px){.row{grid-template-columns:1fr}.tag{display:none}.results{grid-template-columns:1fr 1fr}}
    </style>
</head>
<body>
    <header><div class="hi"><a href="index.html" class="logo">💰 SmartCalc</a><p class="tag">Free financial calculators</p><button class="tb" id="tb">🌙</button></div></header>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${AD}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>${title}</h1>
        <p class="sub">${desc}</p>
        <div class="calc">${calcHTML}</div>
        <div class="ad" style="padding:0"><ins class="adsbygoogle" style="display:block" data-ad-client="${AD}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
        ${faqHTML}
        <div class="more"><h2>More Calculators</h2><div class="mgrid">
            <a class="mcard" href="mortgage-calculator.html"><h4>🏠 Mortgage</h4><p>Monthly payments & interest</p></a>
            <a class="mcard" href="life-insurance-calculator.html"><h4>🛡️ Life Insurance</h4><p>Coverage you need</p></a>
            <a class="mcard" href="credit-card-payoff.html"><h4>💳 Credit Card Payoff</h4><p>Debt-free timeline</p></a>
            <a class="mcard" href="home-insurance-calculator.html"><h4>🏠 Home Insurance</h4><p>Estimate coverage costs</p></a>
            <a class="mcard" href="tax-calculator.html"><h4>📋 Income Tax</h4><p>Federal tax estimate</p></a>
        </div></div>
    </main>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${AD}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <footer><p>SmartCalc — All calculations happen in your browser. Not financial advice.</p><p><a href="index.html">Home</a> · <a href="https://alexchalu.github.io/toolpulse/">Free Online Tools</a></p></footer>
    <script>
        const b=document.getElementById('tb');const s=localStorage.getItem('sc-theme');
        if(s==='light'){document.documentElement.setAttribute('data-theme','light');b.textContent='☀️'}
        b.addEventListener('click',()=>{const l=document.documentElement.getAttribute('data-theme')==='light';document.documentElement.setAttribute('data-theme',l?'dark':'light');b.textContent=l?'🌙':'☀️';localStorage.setItem('sc-theme',l?'dark':'light')});
        const fmt=n=>'$'+n.toLocaleString('en-US',{maximumFractionDigits:0});
        ${calcJS}
    </script>
</body>
</html>`;
}

const newCalcs = [
    {
        slug: 'life-insurance-calculator',
        title: 'Life Insurance Calculator',
        desc: 'Calculate how much life insurance coverage you need based on income, debts, and family needs. Free and instant results.',
        keywords: 'life insurance calculator, how much life insurance do I need, life insurance needs calculator, term life insurance calculator, insurance coverage calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Annual Income ($)</label><input type="number" id="income" value="75000"></div>
            <div class="field"><label class="label">Years of Income to Replace</label><input type="number" id="years" value="10"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Outstanding Debts ($)</label><input type="number" id="debts" value="250000"></div>
            <div class="field"><label class="label">Mortgage Balance ($)</label><input type="number" id="mortgage" value="300000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">College Fund (per child)</label><input type="number" id="college" value="100000"></div>
            <div class="field"><label class="label">Number of Children</label><input type="number" id="children" value="2"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Final Expenses ($)</label><input type="number" id="final" value="15000"></div>
            <div class="field"><label class="label">Current Savings ($)</label><input type="number" id="savings" value="50000"></div>
        </div>
        <button class="btn" onclick="calc()">Calculate Coverage Needed</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Coverage Needed</div></div>
            <div class="stat"><div class="val" id="income_r">—</div><div class="lbl">Income Replacement</div></div>
            <div class="stat"><div class="val" id="debt_r">—</div><div class="lbl">Debt Coverage</div></div>
            <div class="stat"><div class="val" id="est">—</div><div class="lbl">Est. Monthly Premium</div></div>
        </div>`,
        js: `function calc(){
            const inc=+document.getElementById('income').value*+document.getElementById('years').value;
            const debts=+document.getElementById('debts').value+document.getElementById('mortgage').value;
            const edu=+document.getElementById('college').value*+document.getElementById('children').value;
            const fin=+document.getElementById('final').value;
            const sav=+document.getElementById('savings').value;
            const total=inc+debts+edu+fin-sav;
            document.getElementById('total').textContent=fmt(Math.max(0,total));
            document.getElementById('income_r').textContent=fmt(inc);
            document.getElementById('debt_r').textContent=fmt(debts);
            // Rough premium estimate: $0.50-1.00 per $1000/month for 20yr term, age 30-40
            const premium=total/1000*0.65;
            document.getElementById('est').textContent=fmt(premium)+'/mo';
        }`,
        faq: `<div class="faq"><h2>Life Insurance FAQ</h2>
            <h3>How much life insurance do I need?</h3><p>A common rule is 10-12x your annual income, plus outstanding debts and future obligations like children's education. Our calculator gives a more detailed estimate based on your specific situation.</p>
            <h3>Term vs Whole Life Insurance?</h3><p>Term life is cheaper and covers a specific period (10-30 years). Whole life costs 5-15x more but builds cash value. Most financial advisors recommend term life for most families.</p>
            <h3>What affects life insurance premiums?</h3><p>Age, health, smoking status, coverage amount, and term length are the biggest factors. A healthy 30-year-old can get $500K coverage for $20-30/month.</p></div>`
    },
    {
        slug: 'home-insurance-calculator',
        title: 'Home Insurance Calculator',
        desc: 'Estimate your homeowners insurance cost based on home value, location, coverage level, and deductible. Free instant estimate.',
        keywords: 'home insurance calculator, homeowners insurance calculator, house insurance cost, property insurance estimate, home insurance quote calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Home Value ($)</label><input type="number" id="value" value="400000"></div>
            <div class="field"><label class="label">Year Built</label><input type="number" id="year" value="2000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Coverage Level</label><select id="coverage"><option value="1">Standard (100% value)</option><option value="1.25">Extended (125% value)</option><option value="0.8">Basic (80% value)</option></select></div>
            <div class="field"><label class="label">Deductible ($)</label><select id="deductible"><option value="500">$500</option><option value="1000" selected>$1,000</option><option value="2500">$2,500</option><option value="5000">$5,000</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Risk Area</label><select id="risk"><option value="1">Low Risk</option><option value="1.3" selected>Average</option><option value="1.7">High Risk (flood/hurricane)</option><option value="2.2">Very High Risk</option></select></div>
            <div class="field"><label class="label">Credit Score</label><select id="credit"><option value="0.85">Excellent (750+)</option><option value="1" selected>Good (700-749)</option><option value="1.15">Fair (650-699)</option><option value="1.35">Poor (<650)</option></select></div>
        </div>
        <button class="btn" onclick="calc()">Estimate Premium</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="annual">—</div><div class="lbl">Annual Premium</div></div>
            <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Cost</div></div>
            <div class="stat"><div class="val" id="coverageAmt">—</div><div class="lbl">Coverage Amount</div></div>
            <div class="stat"><div class="val" id="ratio">—</div><div class="lbl">Premium/Value Ratio</div></div>
        </div>`,
        js: `function calc(){
            const val=+document.getElementById('value').value;
            const cov=+document.getElementById('coverage').value;
            const ded=+document.getElementById('deductible').value;
            const risk=+document.getElementById('risk').value;
            const credit=+document.getElementById('credit').value;
            const age=new Date().getFullYear()-+document.getElementById('year').value;
            const ageFactor=age>40?1.3:age>20?1.15:1;
            const dedFactor=ded>=5000?0.75:ded>=2500?0.85:ded>=1000?1:1.15;
            // National avg ~$1,500/year for $250K home
            const base=val*0.004*cov;
            const premium=base*risk*credit*ageFactor*dedFactor;
            document.getElementById('annual').textContent=fmt(premium);
            document.getElementById('monthly').textContent=fmt(premium/12);
            document.getElementById('coverageAmt').textContent=fmt(val*cov);
            document.getElementById('ratio').textContent=(premium/val*100).toFixed(2)+'%';
        }`,
        faq: `<div class="faq"><h2>Home Insurance FAQ</h2>
            <h3>How much does homeowners insurance cost?</h3><p>The national average is about $1,500-2,000/year for a $250,000 home. Costs vary widely by location, home age, coverage level, and deductible amount.</p>
            <h3>What does homeowners insurance cover?</h3><p>Standard policies cover dwelling damage, personal property, liability, and additional living expenses. Flood and earthquake insurance are usually separate policies.</p>
            <h3>How can I lower my premium?</h3><p>Raise your deductible, improve your credit score, install security systems, bundle with auto insurance, and shop around. Higher deductibles can save 15-30% on premiums.</p></div>`
    },
    {
        slug: 'credit-card-payoff',
        title: 'Credit Card Payoff Calculator',
        desc: 'Calculate how long to pay off credit card debt and how much interest you\'ll pay. See the impact of extra payments.',
        keywords: 'credit card payoff calculator, credit card calculator, credit card interest calculator, credit card debt calculator, how long to pay off credit card',
        html: `<div class="row">
            <div class="field"><label class="label">Credit Card Balance ($)</label><input type="number" id="balance" value="8500"></div>
            <div class="field"><label class="label">APR (%)</label><input type="number" id="apr" value="22.99" step="0.01"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Monthly Payment ($)</label><input type="number" id="payment" value="250"></div>
            <div class="field"><label class="label">Extra Payment ($)</label><input type="number" id="extra" value="0"></div>
        </div>
        <button class="btn" onclick="calc()">Calculate Payoff</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="months">—</div><div class="lbl">Months to Pay Off</div></div>
            <div class="stat"><div class="val" id="totalInt">—</div><div class="lbl">Total Interest</div></div>
            <div class="stat"><div class="val" id="totalPaid">—</div><div class="lbl">Total Paid</div></div>
            <div class="stat"><div class="val" id="payoff">—</div><div class="lbl">Payoff Date</div></div>
        </div>
        <div id="schedule" style="margin-top:2rem;max-height:300px;overflow-y:auto"></div>`,
        js: `function calc(){
            let bal=+document.getElementById('balance').value;
            const apr=+document.getElementById('apr').value/100/12;
            const pay=+document.getElementById('payment').value+document.getElementById('extra').value;
            let months=0,totalInt=0;
            let rows='<table style="width:100%;font-size:0.8rem"><tr><th>Month</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>';
            while(bal>0&&months<600){
                months++;const interest=bal*apr;totalInt+=interest;
                const principal=Math.min(pay-interest,bal);bal=Math.max(0,bal-principal);
                if(months<=24||bal===0)rows+='<tr><td>'+months+'</td><td>'+fmt(pay)+'</td><td>'+fmt(interest)+'</td><td>'+fmt(principal)+'</td><td>'+fmt(bal)+'</td></tr>';
                else if(months===25)rows+='<tr><td colspan="5" style="text-align:center;color:var(--muted)">...</td></tr>';
            }
            rows+='</table>';
            document.getElementById('months').textContent=months;
            document.getElementById('totalInt').textContent=fmt(totalInt);
            document.getElementById('totalPaid').textContent=fmt(totalInt++document.getElementById('balance').value);
            const d=new Date();d.setMonth(d.getMonth()+months);
            document.getElementById('payoff').textContent=d.toLocaleDateString('en-US',{month:'short',year:'numeric'});
            document.getElementById('schedule').innerHTML=rows;
        }`,
        faq: `<div class="faq"><h2>Credit Card Payoff FAQ</h2>
            <h3>How long will it take to pay off my credit card?</h3><p>It depends on your balance, APR, and monthly payment. Making only minimum payments on a $5,000 balance at 22% APR could take over 20 years and cost $8,000+ in interest.</p>
            <h3>How can I pay off credit cards faster?</h3><p>Use the avalanche method (pay highest APR first) or snowball method (pay smallest balance first). Even $50-100 extra per month dramatically reduces payoff time.</p>
            <h3>Should I do a balance transfer?</h3><p>A 0% APR balance transfer can save significant interest, but watch for transfer fees (typically 3-5%) and have a plan to pay off before the promotional period ends.</p></div>`
    },
    {
        slug: 'tax-calculator',
        title: 'Income Tax Calculator 2026',
        desc: 'Estimate your federal income tax, effective tax rate, and take-home pay for 2026. Quick and free.',
        keywords: 'income tax calculator, federal tax calculator, tax calculator 2026, take home pay calculator, tax bracket calculator, tax estimator',
        html: `<div class="row">
            <div class="field"><label class="label">Annual Gross Income ($)</label><input type="number" id="income" value="85000"></div>
            <div class="field"><label class="label">Filing Status</label><select id="status"><option value="single">Single</option><option value="married">Married Filing Jointly</option><option value="head">Head of Household</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Deduction Type</label><select id="dedType" onchange="toggleDed()"><option value="standard">Standard Deduction</option><option value="itemized">Itemized</option></select></div>
            <div class="field" id="itemizedField" style="display:none"><label class="label">Itemized Deductions ($)</label><input type="number" id="itemized" value="0"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">401(k) Contribution ($)</label><input type="number" id="k401" value="0"></div>
            <div class="field"><label class="label">State</label><select id="state"><option value="0">No State Tax (FL, TX, NV...)</option><option value="3">Low (~3%)</option><option value="5" selected>Average (~5%)</option><option value="8">High (~8%)</option><option value="10">Very High (~10% CA, NY)</option></select></div>
        </div>
        <button class="btn" onclick="calc()">Calculate Tax</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="fedTax">—</div><div class="lbl">Federal Tax</div></div>
            <div class="stat"><div class="val" id="stateTax">—</div><div class="lbl">State Tax (est)</div></div>
            <div class="stat"><div class="val" id="fica">—</div><div class="lbl">FICA (SS + Medicare)</div></div>
            <div class="stat"><div class="val" id="takeHome">—</div><div class="lbl">Take-Home Pay</div></div>
            <div class="stat"><div class="val" id="effective">—</div><div class="lbl">Effective Rate</div></div>
            <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Take-Home</div></div>
        </div>`,
        js: `function toggleDed(){document.getElementById('itemizedField').style.display=document.getElementById('dedType').value==='itemized'?'':'none'}
        function calc(){
            const gross=+document.getElementById('income').value;
            const k401=+document.getElementById('k401').value;
            const status=document.getElementById('status').value;
            const stateRate=+document.getElementById('state').value/100;
            // Standard deductions 2026 (estimated)
            const stdDed=status==='married'?30000:status==='head'?22500:15000;
            const ded=document.getElementById('dedType').value==='standard'?stdDed:+document.getElementById('itemized').value;
            const taxable=Math.max(0,gross-k401-ded);
            // 2026 brackets (estimated, similar to 2025)
            let tax=0;
            if(status==='married'){
                const brackets=[[23200,0.10],[71000,0.12],[100000,0.22],[175000,0.24],[200000,0.32],[375000,0.35],[Infinity,0.37]];
                let prev=0;for(const[limit,rate]of brackets){const amt=Math.min(taxable,limit)-prev;if(amt<=0)break;tax+=amt*rate;prev=limit}
            }else{
                const brackets=[[11600,0.10],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]];
                let prev=0;for(const[limit,rate]of brackets){const amt=Math.min(taxable,limit)-prev;if(amt<=0)break;tax+=amt*rate;prev=limit}
            }
            const ss=Math.min(gross,168600)*0.062;
            const medicare=gross*0.0145+(gross>200000?(gross-200000)*0.009:0);
            const fica=ss+medicare;
            const stateTax=taxable*stateRate;
            const totalTax=tax+fica+stateTax;
            const takeHome=gross-totalTax-k401;
            document.getElementById('fedTax').textContent=fmt(tax);
            document.getElementById('stateTax').textContent=fmt(stateTax);
            document.getElementById('fica').textContent=fmt(fica);
            document.getElementById('takeHome').textContent=fmt(takeHome);
            document.getElementById('effective').textContent=(totalTax/gross*100).toFixed(1)+'%';
            document.getElementById('monthly').textContent=fmt(takeHome/12);
        }`,
        faq: `<div class="faq"><h2>Income Tax FAQ</h2>
            <h3>How are federal taxes calculated?</h3><p>The US uses a progressive tax system with brackets from 10% to 37%. Only income within each bracket is taxed at that rate — not your entire income.</p>
            <h3>What is the standard deduction for 2026?</h3><p>Estimated at $15,000 for single filers and $30,000 for married filing jointly. Most taxpayers benefit more from the standard deduction than itemizing.</p>
            <h3>How can I reduce my tax bill?</h3><p>Max out 401(k) contributions ($23,000 limit), contribute to an HSA, use tax-loss harvesting, and consider Roth IRA conversions in low-income years.</p></div>`
    },
    {
        slug: 'car-insurance-calculator',
        title: 'Car Insurance Calculator',
        desc: 'Estimate your auto insurance premium based on vehicle, driving history, coverage level, and location factors.',
        keywords: 'car insurance calculator, auto insurance calculator, car insurance estimate, auto insurance cost, vehicle insurance calculator, car insurance premium',
        html: `<div class="row">
            <div class="field"><label class="label">Vehicle Value ($)</label><input type="number" id="value" value="30000"></div>
            <div class="field"><label class="label">Vehicle Age (years)</label><input type="number" id="age" value="3"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Driver Age</label><input type="number" id="driverAge" value="35"></div>
            <div class="field"><label class="label">Driving Record</label><select id="record"><option value="0.85">Clean (no violations)</option><option value="1" selected>Minor (1 ticket)</option><option value="1.3">At-fault accident</option><option value="1.6">Multiple violations</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Coverage Level</label><select id="coverage"><option value="0.6">Liability Only</option><option value="1" selected>Full Coverage</option><option value="1.3">Premium Coverage</option></select></div>
            <div class="field"><label class="label">Annual Mileage</label><select id="mileage"><option value="0.85">Under 7,500</option><option value="1" selected>7,500 - 15,000</option><option value="1.15">Over 15,000</option></select></div>
        </div>
        <div class="field"><label class="label">Credit Score</label><select id="credit"><option value="0.8">Excellent (750+)</option><option value="1" selected>Good (700-749)</option><option value="1.2">Fair (650-699)</option><option value="1.5">Poor (<650)</option></select></div>
        <button class="btn" onclick="calc()">Estimate Premium</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="annual">—</div><div class="lbl">Annual Premium</div></div>
            <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Cost</div></div>
            <div class="stat"><div class="val" id="sixMonth">—</div><div class="lbl">6-Month Policy</div></div>
            <div class="stat"><div class="val" id="daily">—</div><div class="lbl">Daily Cost</div></div>
        </div>`,
        js: `function calc(){
            const val=+document.getElementById('value').value;
            const vAge=+document.getElementById('age').value;
            const dAge=+document.getElementById('driverAge').value;
            const record=+document.getElementById('record').value;
            const cov=+document.getElementById('coverage').value;
            const mile=+document.getElementById('mileage').value;
            const credit=+document.getElementById('credit').value;
            // Age factor
            let ageFactor=1;if(dAge<25)ageFactor=1.6;else if(dAge<30)ageFactor=1.2;else if(dAge>65)ageFactor=1.15;
            // National avg ~$1,800/yr full coverage
            const base=1800;
            const valueFactor=val>50000?1.4:val>30000?1.15:val>15000?1:0.85;
            const premium=base*cov*record*ageFactor*mile*credit*valueFactor;
            document.getElementById('annual').textContent=fmt(premium);
            document.getElementById('monthly').textContent=fmt(premium/12);
            document.getElementById('sixMonth').textContent=fmt(premium/2);
            document.getElementById('daily').textContent=fmt(premium/365);
        }`,
        faq: `<div class="faq"><h2>Car Insurance FAQ</h2>
            <h3>How much does car insurance cost?</h3><p>The national average is about $1,800/year for full coverage. Your rate depends on age, driving record, vehicle, location, and credit score.</p>
            <h3>How can I lower my car insurance?</h3><p>Shop around every 6-12 months, raise your deductible, bundle with home insurance, ask about discounts (safe driver, low mileage, good student), and maintain good credit.</p>
            <h3>What's the difference between liability and full coverage?</h3><p>Liability only covers damage you cause to others. Full coverage adds collision (your car damage) and comprehensive (theft, weather, etc). If your car is financed, full coverage is typically required.</p></div>`
    },
    {
        slug: 'net-worth-calculator',
        title: 'Net Worth Calculator',
        desc: 'Calculate your total net worth by listing all assets and liabilities. Track your financial progress over time.',
        keywords: 'net worth calculator, net worth tracker, personal net worth, wealth calculator, financial net worth, asset calculator',
        html: `<h3 style="margin-bottom:1rem;color:var(--accent)">💰 Assets (What You Own)</h3>
        <div class="row">
            <div class="field"><label class="label">Cash & Savings</label><input type="number" id="cash" value="15000"></div>
            <div class="field"><label class="label">Investments (stocks, bonds)</label><input type="number" id="invest" value="50000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Retirement Accounts</label><input type="number" id="retire" value="80000"></div>
            <div class="field"><label class="label">Home Value</label><input type="number" id="home" value="400000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Vehicles</label><input type="number" id="vehicles" value="25000"></div>
            <div class="field"><label class="label">Other Assets</label><input type="number" id="otherA" value="10000"></div>
        </div>
        <h3 style="margin:1.5rem 0 1rem;color:var(--red)">💳 Liabilities (What You Owe)</h3>
        <div class="row">
            <div class="field"><label class="label">Mortgage</label><input type="number" id="mortgage" value="300000"></div>
            <div class="field"><label class="label">Auto Loans</label><input type="number" id="autoLoan" value="15000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Student Loans</label><input type="number" id="student" value="25000"></div>
            <div class="field"><label class="label">Credit Card Debt</label><input type="number" id="cc" value="5000"></div>
        </div>
        <div class="field"><label class="label">Other Debts</label><input type="number" id="otherL" value="0"></div>
        <button class="btn" onclick="calc()">Calculate Net Worth</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="netWorth">—</div><div class="lbl">Net Worth</div></div>
            <div class="stat"><div class="val" id="assets">—</div><div class="lbl">Total Assets</div></div>
            <div class="stat"><div class="val" id="liabilities">—</div><div class="lbl">Total Liabilities</div></div>
            <div class="stat"><div class="val" id="ratio">—</div><div class="lbl">Debt-to-Asset Ratio</div></div>
        </div>`,
        js: `function calc(){
            const assets=[+document.getElementById('cash').value,+document.getElementById('invest').value,+document.getElementById('retire').value,+document.getElementById('home').value,+document.getElementById('vehicles').value,+document.getElementById('otherA').value];
            const liab=[+document.getElementById('mortgage').value,+document.getElementById('autoLoan').value,+document.getElementById('student').value,+document.getElementById('cc').value,+document.getElementById('otherL').value];
            const totalA=assets.reduce((a,b)=>a+b,0);
            const totalL=liab.reduce((a,b)=>a+b,0);
            const nw=totalA-totalL;
            document.getElementById('netWorth').textContent=fmt(nw);
            document.getElementById('netWorth').style.color=nw>=0?'var(--accent)':'var(--red)';
            document.getElementById('assets').textContent=fmt(totalA);
            document.getElementById('liabilities').textContent=fmt(totalL);
            document.getElementById('ratio').textContent=(totalL/totalA*100).toFixed(1)+'%';
        }`
    }
];

// Generate pages
console.log('Adding high-CPC calculators to SmartCalc...');
newCalcs.forEach(c => {
    const html = page(c.slug, c.title, c.desc, c.keywords, c.html, c.js, c.faq || '');
    fs.writeFileSync(`${__dirname}/${c.slug}.html`, html);
    console.log(`✅ ${c.slug}.html`);
});

// Update sitemap to include new pages
const existingSitemap = fs.readFileSync(`${__dirname}/sitemap.xml`, 'utf8');
const newEntries = newCalcs.map(c => `    <url><loc>${URL}/${c.slug}.html</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`).join('\n');
const updatedSitemap = existingSitemap.replace('</urlset>', newEntries + '\n</urlset>');
fs.writeFileSync(`${__dirname}/sitemap.xml`, updatedSitemap);

// Update index.html to include new calculators
const indexHtml = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
const newCards = newCalcs.map(c => {
    const emoji = c.slug.includes('life') ? '🛡️' : c.slug.includes('home-ins') ? '🏡' : c.slug.includes('credit') ? '💳' : c.slug.includes('tax') ? '📋' : c.slug.includes('car') ? '🚗' : '💰';
    return `<a class="mcard" href="${c.slug}.html"><h4>${emoji} ${c.title.replace(' Calculator','')}</h4><p>${c.desc.slice(0,60)}...</p></a>`;
}).join('\n            ');

// Insert before closing mgrid div
if (indexHtml.includes('</div></div></main>')) {
    const updated = indexHtml.replace('</div></div></main>', newCards + '\n            </div></div></main>');
    fs.writeFileSync(`${__dirname}/index.html`, updated);
    console.log('✅ Updated index.html with new calculator cards');
}

console.log(`\n🎉 Added ${newCalcs.length} high-CPC calculators`);
console.log('New total: 18 calculators');
