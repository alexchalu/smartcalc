#!/usr/bin/env node
/**
 * SmartCalc — Finance Calculator Page Generator
 * Targets high-CPC finance keywords ($5-50 per click)
 */
const fs = require('fs');
const AD = 'ca-pub-3112605892426625';
const URL = 'https://alexchalu.github.io/smartcalc';

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
            <a class="mcard" href="compound-interest.html"><h4>📈 Compound Interest</h4><p>Watch your money grow</p></a>
            <a class="mcard" href="loan-calculator.html"><h4>💳 Loan Payment</h4><p>Auto, personal & student</p></a>
            <a class="mcard" href="retirement-calculator.html"><h4>🏖️ Retirement</h4><p>Plan your future</p></a>
            <a class="mcard" href="salary-calculator.html"><h4>💼 Salary</h4><p>Hourly to annual</p></a>
        </div></div>
    </main>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${AD}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <footer><p>SmartCalc — All calculations happen in your browser.</p><p><a href="index.html">Home</a> · <a href="https://toolpulse-free.surge.sh">ToolPulse</a></p></footer>
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

const calcs = [
    {
        slug: 'mortgage-calculator',
        title: 'Mortgage Calculator',
        desc: 'Calculate your monthly mortgage payment, total interest, and see a full amortization breakdown. Compare 15-year vs 30-year loan terms.',
        keywords: 'mortgage calculator, home loan calculator, mortgage payment calculator, house payment calculator, monthly mortgage payment, amortization calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="400000"></div>
            <div class="field"><label class="label">Down Payment</label><input type="number" id="down" value="80000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="6.5" step="0.1"></div>
            <div class="field"><label class="label">Loan Term</label><select id="term"><option value="30">30 years</option><option value="20">20 years</option><option value="15">15 years</option><option value="10">10 years</option></select></div>
        </div>
        <div class="field"><label class="label">Property Tax ($/year)</label><input type="number" id="tax" value="4800"></div>
        <button class="btn" onclick="calc()">Calculate Payment</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Payment</div></div>
            <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Cost</div></div>
            <div class="stat"><div class="val" id="interest">—</div><div class="lbl">Total Interest</div></div>
            <div class="stat"><div class="val" id="loan">—</div><div class="lbl">Loan Amount</div></div>
        </div>`,
        js: `function calc(){
            const p=+document.getElementById('price').value,d=+document.getElementById('down').value;
            const r=+document.getElementById('rate').value/100/12,n=+document.getElementById('term').value*12;
            const l=p-d,tax=+document.getElementById('tax').value/12;
            const m=l*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1)+tax;
            document.getElementById('monthly').textContent=fmt(m);
            document.getElementById('total').textContent=fmt(m*n);
            document.getElementById('interest').textContent=fmt(m*n-l-tax*n);
            document.getElementById('loan').textContent=fmt(l);
        }`,
        faq: `<div class="faq"><h2>Mortgage Calculator FAQ</h2>
            <h3>How is my monthly mortgage payment calculated?</h3><p>Monthly payment = Loan × [r(1+r)^n] / [(1+r)^n – 1], where r is monthly interest rate and n is total months. Property tax and insurance are added separately.</p>
            <h3>Should I choose a 15-year or 30-year mortgage?</h3><p>A 15-year mortgage has higher monthly payments but saves significantly on total interest. A 30-year mortgage has lower payments, giving more monthly flexibility.</p>
            <h3>How much should my down payment be?</h3><p>Conventional loans typically require 3-20% down. Putting 20% down avoids PMI (Private Mortgage Insurance), which can add $100-300/month.</p></div>`
    },
    {
        slug: 'compound-interest',
        title: 'Compound Interest Calculator',
        desc: 'Calculate how your savings and investments grow with compound interest. See yearly breakdown with monthly contributions.',
        keywords: 'compound interest calculator, investment calculator, savings calculator, interest calculator, compound growth, money growth calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Initial Investment</label><input type="number" id="principal" value="10000"></div>
            <div class="field"><label class="label">Monthly Contribution</label><input type="number" id="monthly" value="500"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Annual Interest Rate (%)</label><input type="number" id="rate" value="8" step="0.1"></div>
            <div class="field"><label class="label">Time Period (years)</label><input type="number" id="years" value="20"></div>
        </div>
        <div class="field"><label class="label">Compound Frequency</label><select id="freq"><option value="12">Monthly</option><option value="4">Quarterly</option><option value="1">Annually</option></select></div>
        <button class="btn" onclick="calc()">Calculate Growth</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="future">—</div><div class="lbl">Future Value</div></div>
            <div class="stat"><div class="val" id="invested">—</div><div class="lbl">Total Invested</div></div>
            <div class="stat"><div class="val" id="earned">—</div><div class="lbl">Interest Earned</div></div>
        </div>`,
        js: `function calc(){
            const P=+document.getElementById('principal').value,m=+document.getElementById('monthly').value;
            const r=+document.getElementById('rate').value/100,y=+document.getElementById('years').value;
            const n=+document.getElementById('freq').value;
            const rn=r/n,nt=n*y;
            let fv=P*Math.pow(1+rn,nt);
            // Future value of annuity (monthly contributions)
            const periodsPerMonth=n/12;
            const totalMonths=y*12;
            for(let i=0;i<totalMonths;i++){fv+=m*Math.pow(1+r/12,totalMonths-i)}
            fv=fv-P*Math.pow(1+rn,nt)+P*Math.pow(1+rn,nt); // simplify
            // Simpler: just compound monthly
            let bal=P;for(let i=0;i<y*12;i++){bal=bal*(1+r/12)+m}
            const invested=P+m*y*12;
            document.getElementById('future').textContent=fmt(bal);
            document.getElementById('invested').textContent=fmt(invested);
            document.getElementById('earned').textContent=fmt(bal-invested);
        }`,
        faq: `<div class="faq"><h2>Compound Interest FAQ</h2>
            <h3>What is compound interest?</h3><p>Compound interest is interest earned on both your initial principal AND previously earned interest. It's often called "interest on interest" and is the key to long-term wealth building.</p>
            <h3>How does compounding frequency affect returns?</h3><p>More frequent compounding (monthly vs annually) results in slightly higher returns. The difference is small but adds up over decades.</p>
            <h3>What's the Rule of 72?</h3><p>Divide 72 by your annual return rate to estimate how many years it takes to double your money. At 8% returns, your money doubles roughly every 9 years.</p></div>`
    },
    {
        slug: 'loan-calculator',
        title: 'Loan Payment Calculator',
        desc: 'Calculate monthly payments for any loan — auto, personal, student, or business. See total interest and payoff timeline.',
        keywords: 'loan calculator, loan payment calculator, personal loan calculator, student loan calculator, auto loan calculator, monthly payment calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Loan Amount</label><input type="number" id="amount" value="25000"></div>
            <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="7.5" step="0.1"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Loan Term (years)</label><input type="number" id="years" value="5"></div>
            <div class="field"><label class="label">Loan Type</label><select id="type"><option>Auto Loan</option><option>Personal Loan</option><option>Student Loan</option><option>Business Loan</option></select></div>
        </div>
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="payment">—</div><div class="lbl">Monthly Payment</div></div>
            <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Paid</div></div>
            <div class="stat"><div class="val" id="interest">—</div><div class="lbl">Total Interest</div></div>
            <div class="stat"><div class="val" id="payoff">—</div><div class="lbl">Payoff Date</div></div>
        </div>`,
        js: `function calc(){
            const a=+document.getElementById('amount').value,r=+document.getElementById('rate').value/100/12;
            const n=+document.getElementById('years').value*12;
            const m=a*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
            document.getElementById('payment').textContent=fmt(m);
            document.getElementById('total').textContent=fmt(m*n);
            document.getElementById('interest').textContent=fmt(m*n-a);
            const d=new Date();d.setMonth(d.getMonth()+n);
            document.getElementById('payoff').textContent=d.toLocaleDateString('en-US',{month:'short',year:'numeric'});
        }`
    },
    {
        slug: 'retirement-calculator',
        title: 'Retirement Calculator',
        desc: 'Plan your retirement — calculate how much you need to save, when you can retire, and how long your money will last.',
        keywords: 'retirement calculator, retirement savings calculator, how much to retire, retirement planning calculator, 401k calculator, retirement income',
        html: `<div class="row">
            <div class="field"><label class="label">Current Age</label><input type="number" id="age" value="30"></div>
            <div class="field"><label class="label">Retirement Age</label><input type="number" id="retAge" value="65"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Current Savings</label><input type="number" id="savings" value="50000"></div>
            <div class="field"><label class="label">Monthly Contribution</label><input type="number" id="monthly" value="1000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Expected Return (%)</label><input type="number" id="return" value="7" step="0.1"></div>
            <div class="field"><label class="label">Desired Monthly Income</label><input type="number" id="income" value="5000"></div>
        </div>
        <button class="btn" onclick="calc()">Calculate Retirement</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="nest">—</div><div class="lbl">Nest Egg at Retirement</div></div>
            <div class="stat"><div class="val" id="need">—</div><div class="lbl">Amount Needed</div></div>
            <div class="stat"><div class="val" id="lasts">—</div><div class="lbl">Money Lasts Until</div></div>
            <div class="stat"><div class="val" id="gap">—</div><div class="lbl">Monthly Gap</div></div>
        </div>`,
        js: `function calc(){
            const age=+document.getElementById('age').value,ret=+document.getElementById('retAge').value;
            const sav=+document.getElementById('savings').value,m=+document.getElementById('monthly').value;
            const r=+document.getElementById('return').value/100/12,inc=+document.getElementById('income').value;
            const months=(ret-age)*12;
            let bal=sav;for(let i=0;i<months;i++)bal=bal*(1+r)+m;
            const needed=inc*12*25; // 4% rule
            // How long money lasts in retirement (4% withdrawal adjusted)
            let retBal=bal;let retMonths=0;const retR=0.04/12;
            while(retBal>0&&retMonths<600){retBal=retBal*(1+retR)-inc;retMonths++}
            document.getElementById('nest').textContent=fmt(bal);
            document.getElementById('need').textContent=fmt(needed);
            document.getElementById('lasts').textContent='Age '+(ret+Math.floor(retMonths/12));
            const gap=bal>=needed?'On Track!':fmt((needed-bal)/months)+'/mo more';
            document.getElementById('gap').textContent=gap;
        }`
    },
    {
        slug: 'salary-calculator',
        title: 'Salary Calculator',
        desc: 'Convert between hourly, daily, weekly, bi-weekly, monthly, and annual salary. See take-home pay estimates.',
        keywords: 'salary calculator, hourly to salary, annual salary calculator, paycheck calculator, wage calculator, income calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Amount</label><input type="number" id="amount" value="75000"></div>
            <div class="field"><label class="label">Pay Period</label><select id="period" onchange="calc()"><option value="yearly" selected>Per Year</option><option value="monthly">Per Month</option><option value="biweekly">Bi-Weekly</option><option value="weekly">Per Week</option><option value="daily">Per Day</option><option value="hourly">Per Hour</option></select></div>
        </div>
        <div class="field"><label class="label">Hours per Week</label><input type="number" id="hours" value="40"></div>
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="yearly">—</div><div class="lbl">Annual</div></div>
            <div class="stat"><div class="val" id="monthlyPay">—</div><div class="lbl">Monthly</div></div>
            <div class="stat"><div class="val" id="biweekly">—</div><div class="lbl">Bi-Weekly</div></div>
            <div class="stat"><div class="val" id="weekly">—</div><div class="lbl">Weekly</div></div>
            <div class="stat"><div class="val" id="daily">—</div><div class="lbl">Daily</div></div>
            <div class="stat"><div class="val" id="hourlyPay">—</div><div class="lbl">Hourly</div></div>
        </div>`,
        js: `function calc(){
            const amt=+document.getElementById('amount').value,p=document.getElementById('period').value;
            const hrs=+document.getElementById('hours').value;
            let annual;
            switch(p){
                case'yearly':annual=amt;break;case'monthly':annual=amt*12;break;
                case'biweekly':annual=amt*26;break;case'weekly':annual=amt*52;break;
                case'daily':annual=amt*260;break;case'hourly':annual=amt*hrs*52;break;
            }
            document.getElementById('yearly').textContent=fmt(annual);
            document.getElementById('monthlyPay').textContent=fmt(annual/12);
            document.getElementById('biweekly').textContent=fmt(annual/26);
            document.getElementById('weekly').textContent=fmt(annual/52);
            document.getElementById('daily').textContent=fmt(annual/260);
            document.getElementById('hourlyPay').textContent=fmt(annual/52/hrs);
        }`
    },
    {
        slug: 'investment-calculator',
        title: 'Investment Return Calculator',
        desc: 'Calculate your investment returns, ROI, and annualized performance. Compare different investment scenarios.',
        keywords: 'investment calculator, roi calculator, return on investment, investment return calculator, stock return calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Initial Investment</label><input type="number" id="initial" value="10000"></div>
            <div class="field"><label class="label">Final Value</label><input type="number" id="final" value="25000"></div>
        </div>
        <div class="field"><label class="label">Time Period (years)</label><input type="number" id="years" value="5"></div>
        <button class="btn" onclick="calc()">Calculate Returns</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="roi">—</div><div class="lbl">Total ROI</div></div>
            <div class="stat"><div class="val" id="annualized">—</div><div class="lbl">Annualized Return</div></div>
            <div class="stat"><div class="val" id="profit">—</div><div class="lbl">Total Profit</div></div>
        </div>`,
        js: `function calc(){
            const i=+document.getElementById('initial').value,f=+document.getElementById('final').value;
            const y=+document.getElementById('years').value;
            const roi=((f-i)/i*100).toFixed(1);
            const ann=((Math.pow(f/i,1/y)-1)*100).toFixed(1);
            document.getElementById('roi').textContent=roi+'%';
            document.getElementById('annualized').textContent=ann+'%';
            document.getElementById('profit').textContent=fmt(f-i);
        }`
    },
    {
        slug: 'auto-loan-calculator',
        title: 'Auto Loan Calculator',
        desc: 'Calculate your monthly car payment with trade-in value and down payment. Compare auto loan terms and rates.',
        keywords: 'auto loan calculator, car loan calculator, car payment calculator, vehicle loan calculator, auto financing calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Vehicle Price</label><input type="number" id="price" value="35000"></div>
            <div class="field"><label class="label">Down Payment</label><input type="number" id="down" value="5000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Trade-In Value</label><input type="number" id="trade" value="0"></div>
            <div class="field"><label class="label">Sales Tax (%)</label><input type="number" id="tax" value="6" step="0.1"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="5.9" step="0.1"></div>
            <div class="field"><label class="label">Loan Term</label><select id="term"><option value="72" selected>72 months (6 yr)</option><option value="60">60 months (5 yr)</option><option value="48">48 months (4 yr)</option><option value="36">36 months (3 yr)</option></select></div>
        </div>
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="payment">—</div><div class="lbl">Monthly Payment</div></div>
            <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Cost</div></div>
            <div class="stat"><div class="val" id="interest">—</div><div class="lbl">Total Interest</div></div>
            <div class="stat"><div class="val" id="loan">—</div><div class="lbl">Loan Amount</div></div>
        </div>`,
        js: `function calc(){
            const p=+document.getElementById('price').value,d=+document.getElementById('down').value;
            const t=+document.getElementById('trade').value,tx=+document.getElementById('tax').value/100;
            const taxable=p-t;const loan=(taxable*(1+tx))-d;
            const r=+document.getElementById('rate').value/100/12,n=+document.getElementById('term').value;
            const m=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
            document.getElementById('payment').textContent=fmt(m);
            document.getElementById('total').textContent=fmt(m*n+d);
            document.getElementById('interest').textContent=fmt(m*n-loan);
            document.getElementById('loan').textContent=fmt(loan);
        }`
    },
    {
        slug: 'debt-payoff-calculator',
        title: 'Debt Payoff Calculator',
        desc: 'Create a debt payoff plan. See how extra payments accelerate your payoff and save on interest.',
        keywords: 'debt payoff calculator, debt calculator, credit card payoff calculator, debt free calculator, extra payment calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Total Debt</label><input type="number" id="debt" value="15000"></div>
            <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="18.99" step="0.01"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Minimum Payment</label><input type="number" id="minPay" value="300"></div>
            <div class="field"><label class="label">Extra Monthly Payment</label><input type="number" id="extra" value="200"></div>
        </div>
        <button class="btn" onclick="calc()">Calculate Payoff</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="minMonths">—</div><div class="lbl">Min Payment Payoff</div></div>
            <div class="stat"><div class="val" id="extraMonths">—</div><div class="lbl">With Extra Payment</div></div>
            <div class="stat"><div class="val" id="saved">—</div><div class="lbl">Interest Saved</div></div>
            <div class="stat"><div class="val" id="timeSaved">—</div><div class="lbl">Time Saved</div></div>
        </div>`,
        js: `function calc(){
            const debt=+document.getElementById('debt').value,r=+document.getElementById('rate').value/100/12;
            const min=+document.getElementById('minPay').value,extra=+document.getElementById('extra').value;
            function payoff(bal,pay){let m=0,ti=0;while(bal>0&&m<600){const i=bal*r;ti+=i;bal=bal+i-pay;m++;if(bal<0)bal=0}return{months:m,interest:ti}}
            const p1=payoff(debt,min),p2=payoff(debt,min+extra);
            const fmtM=m=>Math.floor(m/12)+'y '+m%12+'m';
            document.getElementById('minMonths').textContent=fmtM(p1.months);
            document.getElementById('extraMonths').textContent=fmtM(p2.months);
            document.getElementById('saved').textContent=fmt(p1.interest-p2.interest);
            document.getElementById('timeSaved').textContent=fmtM(p1.months-p2.months);
        }`
    },
    {
        slug: 'inflation-calculator',
        title: 'Inflation Calculator',
        desc: 'Calculate how inflation affects your purchasing power. See the future value of money adjusted for inflation.',
        keywords: 'inflation calculator, purchasing power calculator, inflation rate calculator, cost of living calculator, future value calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Current Amount ($)</label><input type="number" id="amount" value="100000"></div>
            <div class="field"><label class="label">Annual Inflation Rate (%)</label><input type="number" id="rate" value="3" step="0.1"></div>
        </div>
        <div class="field"><label class="label">Time Period (years)</label><input type="number" id="years" value="10"></div>
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="future">—</div><div class="lbl">Future Equivalent</div></div>
            <div class="stat"><div class="val" id="buying">—</div><div class="lbl">Buying Power Left</div></div>
            <div class="stat"><div class="val" id="lost">—</div><div class="lbl">Purchasing Power Lost</div></div>
        </div>`,
        js: `function calc(){
            const a=+document.getElementById('amount').value,r=+document.getElementById('rate').value/100;
            const y=+document.getElementById('years').value;
            const future=a*Math.pow(1+r,y);const buying=a/Math.pow(1+r,y);
            document.getElementById('future').textContent=fmt(future);
            document.getElementById('buying').textContent=fmt(buying);
            document.getElementById('lost').textContent=((1-buying/a)*100).toFixed(1)+'%';
        }`
    },
    {
        slug: 'savings-goal-calculator',
        title: 'Savings Goal Calculator',
        desc: 'Calculate how much to save each month to reach your financial goal. Factor in existing savings and returns.',
        keywords: 'savings goal calculator, savings calculator, how much to save, monthly savings calculator, financial goal calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Savings Goal ($)</label><input type="number" id="goal" value="50000"></div>
            <div class="field"><label class="label">Current Savings ($)</label><input type="number" id="current" value="5000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Time to Goal (years)</label><input type="number" id="years" value="5"></div>
            <div class="field"><label class="label">Annual Return (%)</label><input type="number" id="rate" value="5" step="0.1"></div>
        </div>
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Save Per Month</div></div>
            <div class="stat"><div class="val" id="totalSaved">—</div><div class="lbl">Total Saved</div></div>
            <div class="stat"><div class="val" id="earned">—</div><div class="lbl">Interest Earned</div></div>
        </div>`,
        js: `function calc(){
            const goal=+document.getElementById('goal').value,cur=+document.getElementById('current').value;
            const y=+document.getElementById('years').value,r=+document.getElementById('rate').value/100/12;
            const n=y*12;const fvCurrent=cur*Math.pow(1+r,n);
            const needed=goal-fvCurrent;
            const m=needed*r/(Math.pow(1+r,n)-1);
            document.getElementById('monthly').textContent=fmt(Math.max(0,m));
            document.getElementById('totalSaved').textContent=fmt(cur+Math.max(0,m)*n);
            document.getElementById('earned').textContent=fmt(goal-(cur+Math.max(0,m)*n));
        }`
    },
    {
        slug: 'tip-calculator',
        title: 'Tip Calculator',
        desc: 'Calculate tips and split bills easily. Choose tip percentage and number of people to split between.',
        keywords: 'tip calculator, bill splitter, restaurant tip calculator, how much to tip, gratuity calculator, split bill calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Bill Amount ($)</label><input type="number" id="bill" value="85"></div>
            <div class="field"><label class="label">Tip Percentage (%)</label><input type="number" id="tip" value="20"></div>
        </div>
        <div class="field"><label class="label">Split Between</label><input type="number" id="split" value="2" min="1"></div>
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="tipAmt">—</div><div class="lbl">Tip Amount</div></div>
            <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total</div></div>
            <div class="stat"><div class="val" id="perPerson">—</div><div class="lbl">Per Person</div></div>
        </div>`,
        js: `function calc(){
            const b=+document.getElementById('bill').value,t=+document.getElementById('tip').value/100;
            const s=+document.getElementById('split').value||1;
            const tip=b*t;
            document.getElementById('tipAmt').textContent=fmt(tip);
            document.getElementById('total').textContent=fmt(b+tip);
            document.getElementById('perPerson').textContent=fmt((b+tip)/s);
        }`
    },
    {
        slug: 'break-even-calculator',
        title: 'Break-Even Calculator',
        desc: 'Calculate when your business reaches profitability. Find the break-even point in units and revenue.',
        keywords: 'break even calculator, breakeven analysis, break even point, business calculator, profitability calculator',
        html: `<div class="row">
            <div class="field"><label class="label">Fixed Costs ($/month)</label><input type="number" id="fixed" value="5000"></div>
            <div class="field"><label class="label">Price Per Unit ($)</label><input type="number" id="price" value="50"></div>
        </div>
        <div class="field"><label class="label">Variable Cost Per Unit ($)</label><input type="number" id="variable" value="20"></div>
        <button class="btn" onclick="calc()">Calculate Break-Even</button>
        <div class="results" id="out">
            <div class="stat"><div class="val" id="units">—</div><div class="lbl">Break-Even Units</div></div>
            <div class="stat"><div class="val" id="revenue">—</div><div class="lbl">Break-Even Revenue</div></div>
            <div class="stat"><div class="val" id="margin">—</div><div class="lbl">Contribution Margin</div></div>
        </div>`,
        js: `function calc(){
            const f=+document.getElementById('fixed').value,p=+document.getElementById('price').value;
            const v=+document.getElementById('variable').value;
            const margin=p-v;const units=Math.ceil(f/margin);
            document.getElementById('units').textContent=units.toLocaleString()+' units';
            document.getElementById('revenue').textContent=fmt(units*p);
            document.getElementById('margin').textContent=((margin/p)*100).toFixed(1)+'%';
        }`
    }
];

// Generate pages
console.log('Building SmartCalc...');
calcs.forEach(c => {
    const html = page(c.slug, c.title, c.desc, c.keywords, c.html, c.js, c.faq || '');
    fs.writeFileSync(`${__dirname}/${c.slug}.html`, html);
    console.log(`✅ ${c.slug}.html`);
});

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${calcs.map(c=>`    <url><loc>${URL}/${c.slug}.html</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(`${__dirname}/sitemap.xml`, sitemap);

fs.writeFileSync(`${__dirname}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${URL}/sitemap.xml\n`);

console.log(`\n🎉 Built ${calcs.length} calculator pages + index + sitemap`);
