const fs = require('fs');

const calcs = [
  {
    slug: 'credit-card-payoff-calculator',
    title: 'Credit Card Payoff Calculator',
    desc: 'Calculate how long it will take to pay off your credit card debt and how much interest you\'ll pay. Compare minimum payments vs fixed payments.',
    keywords: 'credit card payoff calculator, credit card debt calculator, pay off credit card, credit card interest calculator, debt payoff calculator',
    emoji: '💳',
    fields: [
      { id: 'balance', label: 'Current Balance ($)', value: 5000 },
      { id: 'apr', label: 'Annual Interest Rate (APR %)', value: 22.99, step: '0.01' },
      { id: 'minPct', label: 'Minimum Payment (%)', value: 2, step: '0.1' },
      { id: 'fixedPay', label: 'Fixed Monthly Payment ($)', value: 200 },
    ],
    calcFn: `function calc(){
      const b=N('balance'),apr=N('apr')/100,minPct=N('minPct')/100,fixed=N('fixedPay');
      const mr=apr/12;
      // Min payment scenario
      let bal1=b,months1=0,totalPaid1=0;
      while(bal1>0&&months1<600){
        const interest=bal1*mr;
        const minPay=Math.max(bal1*minPct,25);
        const pay=Math.min(minPay,bal1+interest);
        bal1=bal1+interest-pay;
        totalPaid1+=pay;months1++;
        if(bal1<0.01)bal1=0;
      }
      // Fixed payment scenario
      let bal2=b,months2=0,totalPaid2=0;
      while(bal2>0&&months2<600){
        const interest=bal2*mr;
        const pay=Math.min(fixed,bal2+interest);
        bal2=bal2+interest-pay;
        totalPaid2+=pay;months2++;
        if(bal2<0.01)bal2=0;
      }
      const y1=Math.floor(months1/12),m1=months1%12;
      const y2=Math.floor(months2/12),m2=months2%12;
      S('minTime',y1+'y '+m1+'m');
      S('minInterest',F(totalPaid1-b));
      S('fixedTime',y2+'y '+m2+'m');
      S('fixedInterest',F(totalPaid2-b));
      S('savings',F((totalPaid1-b)-(totalPaid2-b)));
    }`,
    results: [
      { id: 'minTime', label: 'Min Payment Payoff' },
      { id: 'minInterest', label: 'Min Payment Interest' },
      { id: 'fixedTime', label: 'Fixed Payment Payoff' },
      { id: 'fixedInterest', label: 'Fixed Payment Interest' },
      { id: 'savings', label: 'Interest Saved' },
    ],
    faq: [
      { q: 'How is minimum payment calculated?', a: 'Most credit card companies set the minimum payment as a percentage of your balance (typically 1-3%) or a flat minimum (usually $25), whichever is greater. Making only minimum payments can result in decades of debt and thousands in interest.' },
      { q: 'What is a good strategy to pay off credit card debt?', a: 'Pay more than the minimum whenever possible. Consider the avalanche method (pay highest APR first) or snowball method (pay smallest balance first). Balance transfer cards with 0% intro APR can also help, but watch for transfer fees.' },
      { q: 'How does credit card interest work?', a: 'Credit cards use daily compounding. Your APR is divided by 365 to get a daily rate, which is applied to your balance each day. This means interest compounds on interest, making debt grow faster than simple interest loans.' },
    ]
  },
  {
    slug: 'debt-consolidation-calculator',
    title: 'Debt Consolidation Calculator',
    desc: 'Compare your current debts against a single consolidation loan. See how much you could save on interest and lower your monthly payments.',
    keywords: 'debt consolidation calculator, consolidate debt, debt consolidation loan, combine debts, debt relief calculator',
    emoji: '🔗',
    fields: [
      { id: 'debt1bal', label: 'Debt 1 — Balance ($)', value: 5000 },
      { id: 'debt1apr', label: 'Debt 1 — APR (%)', value: 24.99, step: '0.01' },
      { id: 'debt1pay', label: 'Debt 1 — Monthly Payment ($)', value: 150 },
      { id: 'debt2bal', label: 'Debt 2 — Balance ($)', value: 8000 },
      { id: 'debt2apr', label: 'Debt 2 — APR (%)', value: 19.99, step: '0.01' },
      { id: 'debt2pay', label: 'Debt 2 — Monthly Payment ($)', value: 200 },
      { id: 'consApr', label: 'Consolidation Loan APR (%)', value: 9.99, step: '0.01' },
      { id: 'consTerm', label: 'Consolidation Loan Term (months)', value: 48 },
    ],
    calcFn: `function calc(){
      const d1b=N('debt1bal'),d1r=N('debt1apr')/100/12,d1p=N('debt1pay');
      const d2b=N('debt2bal'),d2r=N('debt2apr')/100/12,d2p=N('debt2pay');
      const cr=N('consApr')/100/12,ct=N('consTerm');
      // Current debts total interest
      function totalInt(bal,mr,pmt){let t=0,b=bal;for(let i=0;i<600&&b>0;i++){const int=b*mr;const p=Math.min(pmt,b+int);t+=int;b=b+int-p;}return t;}
      const curInt=totalInt(d1b,d1r,d1p)+totalInt(d2b,d2r,d2p);
      const curPay=d1p+d2p;
      // Consolidation
      const total=d1b+d2b;
      const consPay=total*cr*Math.pow(1+cr,ct)/(Math.pow(1+cr,ct)-1);
      const consTotal=consPay*ct;
      const consInt=consTotal-total;
      S('totalDebt',F(total));
      S('curMonthly',F(curPay));
      S('consMonthly',F(consPay));
      S('curInterest',F(curInt));
      S('consInterest',F(consInt));
      S('saved',F(curInt-consInt));
    }`,
    results: [
      { id: 'totalDebt', label: 'Total Debt' },
      { id: 'curMonthly', label: 'Current Monthly' },
      { id: 'consMonthly', label: 'Consolidated Monthly' },
      { id: 'curInterest', label: 'Current Total Interest' },
      { id: 'consInterest', label: 'Consolidated Interest' },
      { id: 'saved', label: 'Total Savings' },
    ],
    faq: [
      { q: 'What is debt consolidation?', a: 'Debt consolidation combines multiple debts into a single loan with one monthly payment, typically at a lower interest rate. This can simplify payments and reduce total interest paid over time.' },
      { q: 'Is debt consolidation a good idea?', a: 'It can be beneficial if you qualify for a lower interest rate than your current debts. However, extending the repayment term may mean paying more total interest even with a lower rate. Also avoid running up new debt on cleared credit cards.' },
      { q: 'What credit score do I need for a consolidation loan?', a: 'Most lenders prefer a credit score of 670+ for the best rates. Some lenders offer consolidation loans for scores as low as 580, but at higher rates. Check multiple lenders to compare offers without affecting your score (soft pull).' },
    ]
  },
  {
    slug: 'student-loan-calculator',
    title: 'Student Loan Repayment Calculator',
    desc: 'Calculate your student loan monthly payments, total interest, and payoff timeline. Compare standard, extended, and accelerated repayment plans.',
    keywords: 'student loan calculator, student loan repayment, student loan payoff, student loan interest calculator, college loan calculator, education loan calculator',
    emoji: '🎓',
    fields: [
      { id: 'loanAmt', label: 'Total Loan Amount ($)', value: 35000 },
      { id: 'rate', label: 'Interest Rate (%)', value: 5.50, step: '0.01' },
      { id: 'term', label: 'Standard Repayment (years)', value: 10 },
      { id: 'extraPay', label: 'Extra Monthly Payment ($)', value: 0 },
    ],
    calcFn: `function calc(){
      const p=N('loanAmt'),r=N('rate')/100/12,t=N('term')*12,extra=N('extraPay');
      // Standard payment
      const stdPay=p*r*Math.pow(1+r,t)/(Math.pow(1+r,t)-1);
      const stdTotal=stdPay*t;
      // With extra payment
      let bal=p,months=0,accTotal=0;
      const accPay=stdPay+extra;
      while(bal>0&&months<t*2){
        const int=bal*r;
        const pay=Math.min(accPay,bal+int);
        bal=bal+int-pay;accTotal+=pay;months++;
        if(bal<0.01)bal=0;
      }
      const y=Math.floor(months/12),m=months%12;
      S('monthly',F(stdPay));
      S('totalPaid',F(stdTotal));
      S('totalInterest',F(stdTotal-p));
      S('accPayoff',y+'y '+m+'m');
      S('accTotal',F(accTotal));
      S('accSaved',F(stdTotal-accTotal));
    }`,
    results: [
      { id: 'monthly', label: 'Standard Monthly' },
      { id: 'totalPaid', label: 'Standard Total Paid' },
      { id: 'totalInterest', label: 'Standard Interest' },
      { id: 'accPayoff', label: 'Accelerated Payoff' },
      { id: 'accTotal', label: 'Accelerated Total' },
      { id: 'accSaved', label: 'Interest Saved' },
    ],
    faq: [
      { q: 'What are current student loan interest rates in 2026?', a: 'Federal student loan rates for 2025-2026 are approximately 5.50% for undergraduate Direct Loans, 7.05% for graduate Direct Loans, and 8.05% for Direct PLUS Loans. Private loan rates vary by lender and creditworthiness, typically ranging from 4% to 15%.' },
      { q: 'Should I pay extra on my student loans?', a: 'If your interest rate is above 5-6%, making extra payments is usually beneficial. However, first ensure you have an emergency fund and are getting any employer 401(k) match. If you have federal loans, consider whether you might qualify for forgiveness programs before aggressively paying down.' },
      { q: 'What is student loan refinancing?', a: 'Refinancing replaces your existing loans with a new private loan, potentially at a lower rate. This can save money but means losing federal protections like income-driven repayment, forbearance, and forgiveness programs. Only refinance if you\'re sure you won\'t need those benefits.' },
    ]
  },
  {
    slug: 'home-equity-calculator',
    title: 'Home Equity Loan Calculator (HELOC)',
    desc: 'Calculate your home equity, potential HELOC borrowing power, and monthly payments. Compare home equity loan vs HELOC options.',
    keywords: 'home equity calculator, HELOC calculator, home equity loan calculator, home equity line of credit, how much equity do I have, second mortgage calculator',
    emoji: '🏠',
    fields: [
      { id: 'homeVal', label: 'Current Home Value ($)', value: 450000 },
      { id: 'mortgage', label: 'Remaining Mortgage ($)', value: 280000 },
      { id: 'ltv', label: 'Max LTV Allowed (%)', value: 85 },
      { id: 'helocRate', label: 'HELOC Interest Rate (%)', value: 8.50, step: '0.01' },
      { id: 'helocTerm', label: 'Repayment Term (years)', value: 15 },
      { id: 'drawAmt', label: 'Amount to Borrow ($)', value: 50000 },
    ],
    calcFn: `function calc(){
      const hv=N('homeVal'),mort=N('mortgage'),maxLtv=N('ltv')/100;
      const rate=N('helocRate')/100/12,term=N('helocTerm')*12,draw=N('drawAmt');
      const equity=hv-mort;
      const maxBorrow=hv*maxLtv-mort;
      const pmt=draw*rate*Math.pow(1+rate,term)/(Math.pow(1+rate,term)-1);
      const totalPaid=pmt*term;
      const intOnly=draw*rate;
      S('equity',F(equity));
      S('equityPct',(equity/hv*100).toFixed(1)+'%');
      S('maxBorrow',F(Math.max(0,maxBorrow)));
      S('monthly',F(pmt));
      S('intOnlyPmt',F(intOnly));
      S('totalInterest',F(totalPaid-draw));
    }`,
    results: [
      { id: 'equity', label: 'Your Home Equity' },
      { id: 'equityPct', label: 'Equity Percentage' },
      { id: 'maxBorrow', label: 'Max Borrowable' },
      { id: 'monthly', label: 'Monthly Payment' },
      { id: 'intOnlyPmt', label: 'Interest-Only Payment' },
      { id: 'totalInterest', label: 'Total Interest' },
    ],
    faq: [
      { q: 'What is the difference between a HELOC and a home equity loan?', a: 'A home equity loan gives you a lump sum with a fixed rate and fixed payments. A HELOC is a revolving line of credit with a variable rate — you draw what you need during the draw period (typically 10 years), then repay during the repayment period (10-20 years). HELOCs offer more flexibility but less payment predictability.' },
      { q: 'How much home equity can I borrow?', a: 'Most lenders allow you to borrow up to 80-85% of your home\'s value minus your existing mortgage balance. Some lenders go up to 90% LTV for borrowers with excellent credit. Your credit score, income, and debt-to-income ratio also affect approval.' },
      { q: 'Is HELOC interest tax deductible?', a: 'HELOC interest is tax deductible only if the funds are used to buy, build, or substantially improve the home that secures the loan (per the Tax Cuts and Jobs Act). Interest on HELOC funds used for other purposes (debt consolidation, vacation) is not deductible.' },
    ]
  },
  {
    slug: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    desc: 'Calculate your total net worth by entering your assets and liabilities. Track your financial health and set wealth-building goals.',
    keywords: 'net worth calculator, calculate net worth, total assets minus liabilities, financial health calculator, wealth calculator, personal balance sheet',
    emoji: '📊',
    fields: [
      { id: 'cash', label: 'Cash & Savings ($)', value: 25000 },
      { id: 'investments', label: 'Investments & Retirement ($)', value: 150000 },
      { id: 'realEstate', label: 'Real Estate Value ($)', value: 450000 },
      { id: 'vehicles', label: 'Vehicles & Other Assets ($)', value: 35000 },
      { id: 'mortgage', label: 'Mortgage Balance ($)', value: 280000 },
      { id: 'studentLoans', label: 'Student Loans ($)', value: 20000 },
      { id: 'carLoans', label: 'Car Loans ($)', value: 15000 },
      { id: 'creditCards', label: 'Credit Card Debt ($)', value: 5000 },
      { id: 'otherDebt', label: 'Other Debt ($)', value: 0 },
    ],
    calcFn: `function calc(){
      const assets=N('cash')+N('investments')+N('realEstate')+N('vehicles');
      const liabilities=N('mortgage')+N('studentLoans')+N('carLoans')+N('creditCards')+N('otherDebt');
      const nw=assets-liabilities;
      const ratio=liabilities>0?(assets/liabilities):Infinity;
      S('totalAssets',F(assets));
      S('totalLiabilities',F(liabilities));
      S('netWorth',F(nw));
      S('ratio',ratio===Infinity?'∞':ratio.toFixed(2)+'x');
      S('status',nw>0?'Positive ✅':'Negative ⚠️');
    }`,
    results: [
      { id: 'totalAssets', label: 'Total Assets' },
      { id: 'totalLiabilities', label: 'Total Liabilities' },
      { id: 'netWorth', label: 'Net Worth' },
      { id: 'ratio', label: 'Asset/Liability Ratio' },
      { id: 'status', label: 'Financial Status' },
    ],
    faq: [
      { q: 'What is a good net worth by age?', a: 'A common rule of thumb: by age 30, aim to have 1x your annual salary saved; by 40, 3x; by 50, 6x; by 60, 8x; by retirement, 10-12x. The median net worth for Americans aged 35-44 is about $135,000, while the average is much higher due to wealth concentration at the top.' },
      { q: 'Should I include my primary home in net worth?', a: 'Yes, but understand it\'s an illiquid asset. Many financial advisors calculate both "total net worth" (including home) and "investable net worth" (excluding home equity). Your home\'s value should be a realistic market estimate, not what you hope to sell for.' },
      { q: 'How can I increase my net worth?', a: 'Three levers: (1) Increase income through career growth, side businesses, or investments. (2) Decrease spending and redirect to savings/investments. (3) Pay down high-interest debt aggressively. The biggest impact usually comes from increasing income while keeping lifestyle inflation in check.' },
    ]
  },
];

function genPage(c) {
  const fieldsHTML = c.fields.map((f, i) => {
    const inp = `<input type="number" id="${f.id}" value="${f.value}"${f.step ? ` step="${f.step}"` : ''}>`;
    const field = `<div class="field"><label class="label">${f.label}</label>${inp}</div>`;
    return field;
  });
  // pair fields into rows
  let fieldRows = '';
  for (let i = 0; i < fieldsHTML.length; i += 2) {
    if (i + 1 < fieldsHTML.length) {
      fieldRows += `<div class="row">${fieldsHTML[i]}${fieldsHTML[i+1]}</div>\n`;
    } else {
      fieldRows += fieldsHTML[i] + '\n';
    }
  }

  const resultsHTML = c.results.map(r =>
    `<div class="stat"><div class="val" id="${r.id}">—</div><div class="lbl">${r.label}</div></div>`
  ).join('\n            ');

  const faqHTML = c.faq.map(f =>
    `<h3>${f.q}</h3>\n        <p>${f.a}</p>`
  ).join('\n        ');

  const otherCalcs = calcs.filter(x => x.slug !== c.slug).map(x =>
    `<a href="${x.slug}.html" class="mcard"><h4>${x.emoji} ${x.title}</h4><p>Free online calculator</p></a>`
  ).join('\n            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${c.title} — Free Online | SmartCalc</title>
    <meta name="description" content="${c.desc}">
    <meta name="keywords" content="${c.keywords}">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/${c.slug}.html">
    <meta property="og:title" content="${c.title} — SmartCalc">
    <meta property="og:description" content="${c.desc}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${c.emoji}</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${c.title}","description":"${c.desc}","url":"https://alexchalu.github.io/smartcalc/${c.slug}.html","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
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
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>${c.title}</h1>
        <p class="sub">${c.desc}</p>
        <div class="calc">
        ${fieldRows}
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">
            ${resultsHTML}
        </div></div>
        <div class="ad" style="margin-top:2rem;padding:0"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
        <div class="faq">
        <h2>Frequently Asked Questions</h2>
        ${faqHTML}
        </div>
        <div class="more"><h2>More Calculators</h2><div class="mgrid">
            ${otherCalcs}
            <a href="index.html" class="mcard"><h4>💰 All Calculators</h4><p>Browse all SmartCalc tools</p></a>
        </div></div>
    </main>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <footer><p>© 2026 <a href="index.html">SmartCalc</a> — Free financial calculators. For informational purposes only.</p></footer>
    <script>
    function N(id){return parseFloat(document.getElementById(id).value)||0}
    function F(n){return'$'+n.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0})}
    function S(id,v){document.getElementById(id).textContent=v}
    ${c.calcFn}
    calc();
    const tb=document.getElementById('tb');
    tb.onclick=()=>{const t=document.documentElement.getAttribute('data-theme')==='light'?'':'light';document.documentElement.setAttribute('data-theme',t);tb.textContent=t?'🌙':'☀️';localStorage.setItem('theme',t)};
    if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');tb.textContent='🌙';}
    </script>
</body>
</html>`;
}

calcs.forEach(c => {
  const html = genPage(c);
  fs.writeFileSync(`/data/workspace/smartcalc/${c.slug}.html`, html);
  console.log(`✅ Generated ${c.slug}.html`);
});
console.log(`\nGenerated ${calcs.length} calculator pages.`);
