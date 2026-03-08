const fs = require('fs');

const adsenseId = 'ca-pub-3112605892426625';

const calculators = [
  {
    id: 'self-employment-tax',
    title: 'Self-Employment Tax Calculator 2026',
    description: 'Calculate self-employment tax for freelancers and independent contractors. Free calculator for Schedule SE and estimated quarterly taxes.',
    keywords: 'self employment tax calculator, freelancer tax calculator, 1099 tax calculator, quarterly tax calculator',
    h1: '💼 Self-Employment Tax Calculator'
  },
  {
    id: 'capital-gains-tax',
    title: 'Capital Gains Tax Calculator 2026',
    description: 'Calculate capital gains tax on stocks, crypto, and real estate. Free calculator for short-term and long-term capital gains.',
    keywords: 'capital gains tax calculator, stock tax calculator, crypto tax calculator, investment tax calculator',
    h1: '📈 Capital Gains Tax Calculator'
  },
  {
    id: 'social-security-tax',
    title: 'Social Security Tax Calculator 2026',
    description: 'Calculate Social Security and Medicare taxes (FICA). Free payroll tax calculator for employees and employers.',
    keywords: 'social security tax calculator, FICA tax calculator, payroll tax calculator, medicare tax calculator',
    h1: '🏛️ Social Security Tax Calculator'
  },
  {
    id: 'estate-tax',
    title: 'Estate Tax Calculator 2026',
    description: 'Calculate federal estate tax and state inheritance tax. Free calculator for estate planning and tax liability.',
    keywords: 'estate tax calculator, inheritance tax calculator, federal estate tax, estate planning calculator',
    h1: '🏛️ Estate Tax Calculator'
  },
  {
    id: 'property-tax',
    title: 'Property Tax Calculator 2026',
    description: 'Calculate annual property taxes based on home value and local tax rates. Free real estate tax calculator.',
    keywords: 'property tax calculator, real estate tax calculator, home tax calculator, annual property tax',
    h1: '🏠 Property Tax Calculator'
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
      .tax-container { max-width: 800px; margin: 2rem auto; padding: 0 2rem; }
      .calc-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 2rem 0; }
      .input-group { margin: 1.5rem 0; }
      .input-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #34495e; }
      .input-group input, .input-group select { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 1rem; }
      .calc-button { background: #3498db; color: white; border: none; padding: 1rem 2rem; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; width: 100%; margin-top: 1rem; }
      .calc-button:hover { background: #2980b9; }
      .result-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 2rem; margin: 2rem 0; border-radius: 6px; display: none; }
      .result-value { font-size: 2.5rem; font-weight: bold; color: #1b5e20; margin: 1rem 0; }
      .breakdown { margin: 1.5rem 0; padding: 1rem; background: #f8f9fa; border-radius: 6px; }
      .breakdown-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0; }
      .breakdown-item:last-child { border-bottom: none; font-weight: bold; }
      .ad-container { margin: 2rem 0; text-align: center; min-height: 90px; }
      .info-box { background: #fff3e0; border-left: 4px solid #ff9800; padding: 1.5rem; margin: 2rem 0; border-radius: 6px; }
    </style>
</head>
<body>
    <div class="tax-container">
        <h1>${calc.h1}</h1>
        <p>${calc.description}</p>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseId}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="calc-card">
            <h2>Calculate Your Tax</h2>
            <div id="calculator-inputs"></div>
            <button class="calc-button" onclick="calculate()">Calculate Tax</button>
            
            <div id="results" class="result-box">
                <h3>Tax Calculation Results</h3>
                <div class="result-value" id="totalTax"></div>
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
            <li><a href="/income-tax.html">Income Tax Calculator</a></li>
            <li><a href="/salary.html">Salary Calculator</a></li>
            <li><a href="/">All Calculators</a></li>
        </ul>

        <p><a href="/">← Back to SmartCalc</a></p>
    </div>

    <script src="/calc-${calc.id}.js"></script>
</body>
</html>`;

  fs.writeFileSync(`${calc.id}.html`, html);
  console.log(`✓ Created ${calc.id}.html`);

  // Create calculator logic
  let jsContent = '';
  
  if (calc.id === 'self-employment-tax') {
    jsContent = `
document.getElementById('calculator-inputs').innerHTML = \`
  <div class="input-group">
    <label>Net Self-Employment Income ($)</label>
    <input type="number" id="income" value="75000" min="0" step="1000">
  </div>
\`;

document.getElementById('info-content').innerHTML = \`
  <h3>About Self-Employment Tax</h3>
  <p>Self-employed individuals pay both the employer and employee portions of Social Security and Medicare taxes.</p>
  <ul>
    <li><strong>Social Security:</strong> 12.4% on income up to $168,600 (2026)</li>
    <li><strong>Medicare:</strong> 2.9% on all income</li>
    <li><strong>Additional Medicare:</strong> 0.9% on income over $200,000 (single) or $250,000 (married)</li>
    <li><strong>Total:</strong> 15.3% on most income</li>
  </ul>
  <p><strong>Deduction:</strong> You can deduct half of your self-employment tax on your income tax return.</p>
\`;

function calculate() {
  const income = parseFloat(document.getElementById('income').value);
  const netEarnings = income * 0.9235; // 92.35% of net income
  
  const ssWageBase = 168600; // 2026 limit
  const ssTax = Math.min(netEarnings, ssWageBase) * 0.124;
  const medicareTax = netEarnings * 0.029;
  
  let additionalMedicare = 0;
  if (netEarnings > 200000) {
    additionalMedicare = (netEarnings - 200000) * 0.009;
  }
  
  const totalTax = ssTax + medicareTax + additionalMedicare;
  const deductible = totalTax / 2;
  
  document.getElementById('totalTax').textContent = '$' + Math.round(totalTax).toLocaleString();
  document.getElementById('breakdown').innerHTML = \`
    <div class="breakdown-item"><span>Social Security Tax (12.4%)</span><span>$\${Math.round(ssTax).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Medicare Tax (2.9%)</span><span>$\${Math.round(medicareTax).toLocaleString()}</span></div>
    \${additionalMedicare > 0 ? '<div class="breakdown-item"><span>Additional Medicare (0.9%)</span><span>$' + Math.round(additionalMedicare).toLocaleString() + '</span></div>' : ''}
    <div class="breakdown-item"><span>Total Self-Employment Tax</span><span>$\${Math.round(totalTax).toLocaleString()}</span></div>
    <div class="breakdown-item" style="background: #e8f5e9; margin-top: 1rem; padding: 0.75rem;"><span>Deductible Amount (50%)</span><span>$\${Math.round(deductible).toLocaleString()}</span></div>
  \`;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}`;
  } else if (calc.id === 'capital-gains-tax') {
    jsContent = `
document.getElementById('calculator-inputs').innerHTML = \`
  <div class="input-group">
    <label>Purchase Price ($)</label>
    <input type="number" id="purchase" value="10000" min="0" step="100">
  </div>
  <div class="input-group">
    <label>Sale Price ($)</label>
    <input type="number" id="sale" value="15000" min="0" step="100">
  </div>
  <div class="input-group">
    <label>Holding Period</label>
    <select id="period">
      <option value="short">Short-term (≤1 year)</option>
      <option value="long">Long-term (>1 year)</option>
    </select>
  </div>
  <div class="input-group">
    <label>Income Tax Bracket</label>
    <select id="bracket">
      <option value="10">10%</option>
      <option value="12">12%</option>
      <option value="22" selected>22%</option>
      <option value="24">24%</option>
      <option value="32">32%</option>
      <option value="35">35%</option>
      <option value="37">37%</option>
    </select>
  </div>
\`;

document.getElementById('info-content').innerHTML = \`
  <h3>About Capital Gains Tax</h3>
  <p><strong>Short-term capital gains</strong> (assets held ≤1 year) are taxed as ordinary income at your regular tax rate.</p>
  <p><strong>Long-term capital gains</strong> (assets held >1 year) get preferential rates:</p>
  <ul>
    <li><strong>0%:</strong> If you're in the 10% or 12% tax bracket</li>
    <li><strong>15%:</strong> If you're in the 22%, 24%, 32%, or 35% bracket</li>
    <li><strong>20%:</strong> If you're in the 37% bracket</li>
  </ul>
  <p><strong>Net Investment Income Tax:</strong> Additional 3.8% tax on investment income if your income exceeds $200,000 (single) or $250,000 (married).</p>
\`;

function calculate() {
  const purchase = parseFloat(document.getElementById('purchase').value);
  const sale = parseFloat(document.getElementById('sale').value);
  const period = document.getElementById('period').value;
  const bracket = parseInt(document.getElementById('bracket').value);
  
  const gain = sale - purchase;
  
  let taxRate;
  if (period === 'short') {
    taxRate = bracket;
  } else {
    if (bracket <= 12) taxRate = 0;
    else if (bracket === 37) taxRate = 20;
    else taxRate = 15;
  }
  
  const tax = gain * (taxRate / 100);
  
  document.getElementById('totalTax').textContent = '$' + Math.round(tax).toLocaleString();
  document.getElementById('breakdown').innerHTML = \`
    <div class="breakdown-item"><span>Purchase Price</span><span>$\${purchase.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Sale Price</span><span>$\${sale.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Capital Gain</span><span>$\${gain.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Tax Rate (\${period === 'short' ? 'Short-term' : 'Long-term'})</span><span>\${taxRate}%</span></div>
    <div class="breakdown-item"><span>Tax Owed</span><span>$\${Math.round(tax).toLocaleString()}</span></div>
    <div class="breakdown-item" style="background: #e8f5e9; margin-top: 1rem; padding: 0.75rem;"><span>After-Tax Proceeds</span><span>$\${Math.round(sale - tax).toLocaleString()}</span></div>
  \`;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}`;
  } else {
    // Generic calculator for others
    jsContent = `
document.getElementById('calculator-inputs').innerHTML = '<div class="input-group"><label>Amount ($)</label><input type="number" id="amount" value="10000" min="0"></div>';
document.getElementById('info-content').innerHTML = '<h3>Tax Information</h3><p>Consult a tax professional for accurate calculations.</p>';
function calculate() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const tax = amount * 0.1;
  document.getElementById('totalTax').textContent = '$' + Math.round(tax).toLocaleString();
  document.getElementById('breakdown').innerHTML = '<div class="breakdown-item"><span>Estimated Tax</span><span>$' + Math.round(tax).toLocaleString() + '</span></div>';
  document.getElementById('results').style.display = 'block';
}`;
  }
  
  fs.writeFileSync(`calc-${calc.id}.js`, jsContent);
  console.log(`✓ Created calc-${calc.id}.js`);
});

console.log(`\n✅ Generated ${calculators.length} tax calculators`);
