const fs = require('fs');

const adsenseId = 'ca-pub-3112605892426625';

const calculators = [
  {
    id: 'debt-consolidation',
    title: 'Debt Consolidation Calculator 2026 - Compare Loan Options',
    description: 'Calculate savings from debt consolidation. Free calculator compares consolidation loans, balance transfers, and debt management plans.',
    keywords: 'debt consolidation calculator, debt payoff calculator, consolidation loan calculator, debt management calculator',
    h1: '💳 Debt Consolidation Calculator'
  },
  {
    id: 'credit-card-minimum',
    title: 'Credit Card Minimum Payment Calculator - True Cost & Payoff Time',
    description: 'Calculate how long it takes to pay off credit card debt with minimum payments. Free calculator shows total interest and payoff timeline.',
    keywords: 'credit card calculator, minimum payment calculator, credit card payoff calculator, credit card debt calculator',
    h1: '💳 Credit Card Minimum Payment Calculator'
  },
  {
    id: 'apr-calculator',
    title: 'APR Calculator 2026 - Annual Percentage Rate & True Cost',
    description: 'Calculate APR on loans and credit cards. Free calculator shows true cost including fees and compounding.',
    keywords: 'apr calculator, annual percentage rate calculator, effective apr calculator, loan apr calculator',
    h1: '📊 APR Calculator'
  },
  {
    id: 'debt-to-income',
    title: 'Debt-to-Income Ratio Calculator - DTI for Mortgage Approval',
    description: 'Calculate your debt-to-income ratio for mortgage and loan approval. Free DTI calculator shows if you qualify.',
    keywords: 'debt to income calculator, dti calculator, debt to income ratio, mortgage dti calculator',
    h1: '📊 Debt-to-Income Ratio Calculator'
  },
  {
    id: 'balance-transfer',
    title: 'Balance Transfer Calculator 2026 - Compare 0% APR Offers',
    description: 'Calculate savings from balance transfer credit cards. Free calculator compares 0% APR offers and transfer fees.',
    keywords: 'balance transfer calculator, 0 apr calculator, credit card transfer calculator, balance transfer savings',
    h1: '💳 Balance Transfer Calculator'
  }
];

calculators.forEach(calc => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${calc.title}</title>
    <meta name="description" content="${calc.description}">
    <meta name="keywords" content="${calc.keywords}">
    <link rel="stylesheet" href="/style.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}" crossorigin="anonymous"></script>
    <style>
      .debt-container { max-width: 900px; margin: 2rem auto; padding: 0 2rem; }
      .calc-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 2rem 0; }
      .input-group { margin: 1.5rem 0; }
      .input-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #34495e; }
      .input-group input { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 1rem; }
      .calc-button { background: #e74c3c; color: white; border: none; padding: 1rem 2rem; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; width: 100%; margin-top: 1rem; }
      .calc-button:hover { background: #c0392b; }
      .result-box { background: #e8f5e9; border-left: 4px solid #27ae60; padding: 2rem; margin: 2rem 0; border-radius: 6px; display: none; }
      .result-value { font-size: 2.5rem; font-weight: bold; color: #27ae60; margin: 1rem 0; }
      .savings { background: #fff3e0; padding: 1rem; border-radius: 6px; margin: 1rem 0; }
      .savings .value { font-size: 1.8rem; font-weight: bold; color: #f57c00; }
      .breakdown { margin: 1.5rem 0; }
      .breakdown-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e0e0e0; }
      .ad-container { margin: 2rem 0; text-align: center; min-height: 90px; }
      .info-box { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 1.5rem; margin: 2rem 0; border-radius: 6px; }
    </style>
</head>
<body>
    <div class="debt-container">
        <h1>${calc.h1}</h1>
        <p>${calc.description}</p>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseId}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="calc-card">
            <h2>Calculate Your Debt</h2>
            <div id="calculator-inputs"></div>
            <button class="calc-button" onclick="calculate()">Calculate</button>
            
            <div id="results" class="result-box">
                <h3>Results</h3>
                <div class="result-value" id="mainResult"></div>
                <div id="savingsBox" class="savings" style="display:none;">
                    <div>Total Savings:</div>
                    <div class="value" id="totalSavings"></div>
                </div>
                <div class="breakdown" id="breakdown"></div>
            </div>
        </div>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseId}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="info-box" id="info-content"></div>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseId}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <h2>Related Calculators</h2>
        <ul>
            <li><a href="/debt-payoff.html">Debt Payoff Calculator</a></li>
            <li><a href="/credit-card-payoff.html">Credit Card Payoff Calculator</a></li>
            <li><a href="/loan.html">Loan Calculator</a></li>
            <li><a href="/">All Calculators</a></li>
        </ul>

        <p><a href="/">← Back to SmartCalc</a></p>
    </div>

    <script src="/calc-${calc.id}.js"></script>
</body>
</html>`;

  fs.writeFileSync(`${calc.id}.html`, html);
  console.log(`✓ Created ${calc.id}.html`);

  // Simplified calculator logic
  const jsContent = `
document.getElementById('calculator-inputs').innerHTML = \`
  <div class="input-group">
    <label>Current Debt Balance ($)</label>
    <input type="number" id="balance" value="10000" min="0" step="100">
  </div>
  <div class="input-group">
    <label>Interest Rate (%)</label>
    <input type="number" id="rate" value="18" min="0" max="30" step="0.1">
  </div>
  <div class="input-group">
    <label>Monthly Payment ($)</label>
    <input type="number" id="payment" value="300" min="0" step="10">
  </div>
\`;

document.getElementById('info-content').innerHTML = '<h3>Debt Management Tips</h3><p>Pay more than the minimum, focus on high-interest debt first, and consider consolidation to save on interest.</p>';

function calculate() {
  const balance = parseFloat(document.getElementById('balance').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
  const payment = parseFloat(document.getElementById('payment').value);
  
  let months = 0;
  let totalPaid = 0;
  let remainingBalance = balance;
  
  while (remainingBalance > 0 && months < 600) {
    const interest = remainingBalance * rate;
    const principal = payment - interest;
    if (principal <= 0) break;
    remainingBalance -= principal;
    totalPaid += payment;
    months++;
  }
  
  const totalInterest = totalPaid - balance;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  document.getElementById('mainResult').textContent = months + ' months to pay off';
  document.getElementById('breakdown').innerHTML = \`
    <div class="breakdown-item"><span>Current Balance</span><span>$\${balance.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Payoff Time</span><span>\${years} years, \${remainingMonths} months</span></div>
    <div class="breakdown-item"><span>Total Interest Paid</span><span>$\${Math.round(totalInterest).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Total Amount Paid</span><span>$\${Math.round(totalPaid).toLocaleString()}</span></div>
  \`;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}`;
  
  fs.writeFileSync(`calc-${calc.id}.js`, jsContent);
  console.log(`✓ Created calc-${calc.id}.js`);
});

console.log(`\n✅ Generated ${calculators.length} debt/credit calculators`);
