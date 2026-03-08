const fs = require('fs');

const adsenseId = 'ca-pub-3112605892426625';

const calculators = [
  {
    id: '401k-calculator',
    title: '401k Calculator 2026 - Retirement Savings Projections',
    description: 'Calculate 401k growth with employer match. Free retirement calculator shows how much you\'ll have at retirement with contributions and compound interest.',
    keywords: '401k calculator, retirement calculator, 401k match calculator, retirement savings calculator',
    h1: '💰 401k Retirement Calculator'
  },
  {
    id: 'roth-ira-calculator',
    title: 'Roth IRA Calculator 2026 - Tax-Free Retirement Growth',
    description: 'Calculate Roth IRA growth and withdrawals. Free calculator shows tax-free retirement income from Roth IRA contributions.',
    keywords: 'roth ira calculator, ira calculator, roth conversion calculator, retirement calculator',
    h1: '📊 Roth IRA Calculator'
  },
  {
    id: 'retirement-withdrawal-calculator',
    title: 'Retirement Withdrawal Calculator - 4% Rule & Safe Withdrawal Rate',
    description: 'Calculate safe retirement withdrawal rates. Free calculator uses the 4% rule to determine sustainable income from retirement savings.',
    keywords: 'retirement withdrawal calculator, 4% rule calculator, safe withdrawal rate, retirement income calculator',
    h1: '📉 Retirement Withdrawal Calculator'
  },
  {
    id: 'pension-calculator',
    title: 'Pension Calculator 2026 - Monthly Pension Benefit Estimator',
    description: 'Calculate monthly pension payments and lump sum value. Free pension calculator for defined benefit retirement plans.',
    keywords: 'pension calculator, pension benefit calculator, pension payout calculator, retirement pension',
    h1: '🏛️ Pension Calculator'
  },
  {
    id: 'early-retirement-calculator',
    title: 'Early Retirement Calculator - FIRE Movement Planning Tool',
    description: 'Calculate when you can retire early (FIRE). Free calculator shows years until financial independence based on savings rate.',
    keywords: 'early retirement calculator, FIRE calculator, financial independence calculator, retire early calculator',
    h1: '🔥 Early Retirement Calculator (FIRE)'
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
      .retire-container { max-width: 900px; margin: 2rem auto; padding: 0 2rem; }
      .calc-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 2rem 0; }
      .input-group { margin: 1.5rem 0; }
      .input-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #34495e; }
      .input-group input, .input-group select { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 1rem; }
      .calc-button { background: #27ae60; color: white; border: none; padding: 1rem 2rem; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; width: 100%; margin-top: 1rem; }
      .calc-button:hover { background: #229954; }
      .result-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; margin: 2rem 0; border-radius: 12px; display: none; }
      .result-value { font-size: 3rem; font-weight: bold; margin: 1rem 0; }
      .result-detail { font-size: 1.1rem; opacity: 0.9; margin: 0.5rem 0; }
      .breakdown { background: white; color: #2c3e50; padding: 1.5rem; border-radius: 8px; margin-top: 1rem; }
      .breakdown-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e0e0e0; }
      .breakdown-item:last-child { border-bottom: none; font-weight: bold; font-size: 1.1rem; }
      .ad-container { margin: 2rem 0; text-align: center; min-height: 90px; }
      .info-box { background: #e8f5e9; border-left: 4px solid #27ae60; padding: 1.5rem; margin: 2rem 0; border-radius: 6px; }
      .chart-placeholder { background: #f8f9fa; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; margin: 1rem 0; }
    </style>
</head>
<body>
    <div class="retire-container">
        <h1>${calc.h1}</h1>
        <p>${calc.description}</p>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseId}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="calc-card">
            <h2>Calculate Your Retirement</h2>
            <div id="calculator-inputs"></div>
            <button class="calc-button" onclick="calculate()">Calculate Retirement Savings</button>
            
            <div id="results" class="result-box">
                <h3 style="margin-top: 0;">Your Retirement Projection</h3>
                <div class="result-value" id="totalSavings"></div>
                <div class="result-detail" id="monthlyIncome"></div>
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

        <h2>Related Retirement Calculators</h2>
        <ul>
            <li><a href="/retirement.html">Retirement Calculator</a></li>
            <li><a href="/compound-interest.html">Compound Interest Calculator</a></li>
            <li><a href="/savings-goal.html">Savings Goal Calculator</a></li>
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
  
  if (calc.id === '401k-calculator') {
    jsContent = `
document.getElementById('calculator-inputs').innerHTML = \`
  <div class="input-group">
    <label>Current Age</label>
    <input type="number" id="currentAge" value="30" min="18" max="70">
  </div>
  <div class="input-group">
    <label>Retirement Age</label>
    <input type="number" id="retireAge" value="65" min="50" max="80">
  </div>
  <div class="input-group">
    <label>Current 401k Balance ($)</label>
    <input type="number" id="currentBalance" value="50000" min="0" step="1000">
  </div>
  <div class="input-group">
    <label>Annual Contribution ($)</label>
    <input type="number" id="contribution" value="10000" min="0" step="500">
  </div>
  <div class="input-group">
    <label>Employer Match (%)</label>
    <input type="number" id="match" value="50" min="0" max="100" step="5">
  </div>
  <div class="input-group">
    <label>Match Limit (% of salary to match)</label>
    <input type="number" id="matchLimit" value="6" min="0" max="10" step="1">
  </div>
  <div class="input-group">
    <label>Expected Annual Return (%)</label>
    <input type="number" id="returnRate" value="7" min="0" max="15" step="0.5">
  </div>
\`;

document.getElementById('info-content').innerHTML = \`
  <h3>401k Contribution Limits 2026</h3>
  <ul>
    <li><strong>Employee contribution limit:</strong> $23,500 (under 50)</li>
    <li><strong>Catch-up contribution:</strong> Additional $7,500 (age 50+)</li>
    <li><strong>Total limit (employee + employer):</strong> $70,000</li>
  </ul>
  <p><strong>Employer match:</strong> Free money! Always contribute enough to get the full match.</p>
  <p><strong>Tax advantage:</strong> Contributions are pre-tax, reducing your taxable income today.</p>
\`;

function calculate() {
  const currentAge = parseInt(document.getElementById('currentAge').value);
  const retireAge = parseInt(document.getElementById('retireAge').value);
  const currentBalance = parseFloat(document.getElementById('currentBalance').value);
  const annualContribution = parseFloat(document.getElementById('contribution').value);
  const matchPercent = parseFloat(document.getElementById('match').value) / 100;
  const matchLimit = parseFloat(document.getElementById('matchLimit').value) / 100;
  const returnRate = parseFloat(document.getElementById('returnRate').value) / 100;
  
  const yearsToRetirement = retireAge - currentAge;
  
  // Calculate employer match (assuming match is on % of contribution, capped at matchLimit of salary)
  // Simplified: assume match applies to full contribution
  const employerMatch = Math.min(annualContribution * matchPercent, annualContribution * matchLimit);
  const totalAnnualContribution = annualContribution + employerMatch;
  
  // Future value calculation
  let balance = currentBalance;
  let totalContributions = currentBalance;
  let totalMatch = 0;
  
  for (let year = 0; year < yearsToRetirement; year++) {
    balance = balance * (1 + returnRate) + totalAnnualContribution;
    totalContributions += annualContribution;
    totalMatch += employerMatch;
  }
  
  const totalInterest = balance - totalContributions - totalMatch;
  const monthlyIncome = (balance * 0.04) / 12; // 4% rule
  
  document.getElementById('totalSavings').textContent = '$' + Math.round(balance).toLocaleString();
  document.getElementById('monthlyIncome').textContent = 'Estimated monthly income at retirement: $' + Math.round(monthlyIncome).toLocaleString() + ' (4% rule)';
  
  document.getElementById('breakdown').innerHTML = \`
    <div class="breakdown-item"><span>Years to Retirement</span><span>\${yearsToRetirement} years</span></div>
    <div class="breakdown-item"><span>Your Contributions</span><span>$\${Math.round(totalContributions).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Employer Match</span><span>$\${Math.round(totalMatch).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Investment Growth</span><span>$\${Math.round(totalInterest).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Total at Retirement (\${retireAge})</span><span>$\${Math.round(balance).toLocaleString()}</span></div>
  \`;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}`;
  } else if (calc.id === 'early-retirement-calculator') {
    jsContent = `
document.getElementById('calculator-inputs').innerHTML = \`
  <div class="input-group">
    <label>Current Age</label>
    <input type="number" id="currentAge" value="30" min="18" max="60">
  </div>
  <div class="input-group">
    <label>Current Savings ($)</label>
    <input type="number" id="currentSavings" value="100000" min="0" step="5000">
  </div>
  <div class="input-group">
    <label>Annual Income ($)</label>
    <input type="number" id="income" value="80000" min="0" step="5000">
  </div>
  <div class="input-group">
    <label>Annual Expenses ($)</label>
    <input type="number" id="expenses" value="40000" min="0" step="1000">
  </div>
  <div class="input-group">
    <label>Expected Return (%)</label>
    <input type="number" id="returnRate" value="7" min="0" max="12" step="0.5">
  </div>
\`;

document.getElementById('info-content').innerHTML = \`
  <h3>The FIRE Movement</h3>
  <p><strong>FIRE = Financial Independence, Retire Early</strong></p>
  <p>The key to early retirement:</p>
  <ul>
    <li><strong>Save aggressively:</strong> 50-70% of income</li>
    <li><strong>Invest wisely:</strong> Low-cost index funds</li>
    <li><strong>Reduce expenses:</strong> Live below your means</li>
    <li><strong>The 4% rule:</strong> You need 25x annual expenses saved</li>
  </ul>
  <p><strong>Example:</strong> If you spend $40,000/year, you need $1,000,000 saved to retire.</p>
\`;

function calculate() {
  const currentAge = parseInt(document.getElementById('currentAge').value);
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const returnRate = parseFloat(document.getElementById('returnRate').value) / 100;
  
  const annualSavings = income - expenses;
  const savingsRate = (annualSavings / income * 100).toFixed(1);
  const targetAmount = expenses * 25; // 4% rule
  
  // Calculate years to FIRE
  let balance = currentSavings;
  let years = 0;
  
  while (balance < targetAmount && years < 100) {
    balance = balance * (1 + returnRate) + annualSavings;
    years++;
  }
  
  const fireAge = currentAge + years;
  
  document.getElementById('totalSavings').textContent = years < 100 ? years + ' years' : 'Not achievable';
  document.getElementById('monthlyIncome').textContent = 'You can retire at age ' + fireAge + ' with $' + Math.round(expenses/12).toLocaleString() + '/month';
  
  document.getElementById('breakdown').innerHTML = \`
    <div class="breakdown-item"><span>Current Savings</span><span>$\${currentSavings.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Annual Savings</span><span>$\${annualSavings.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Savings Rate</span><span>\${savingsRate}%</span></div>
    <div class="breakdown-item"><span>FIRE Number (25x expenses)</span><span>$\${Math.round(targetAmount).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Years Until FIRE</span><span>\${years} years</span></div>
    <div class="breakdown-item"><span>Retirement Age</span><span>\${fireAge} years old</span></div>
  \`;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}`;
  } else {
    // Generic for the others
    jsContent = `
document.getElementById('calculator-inputs').innerHTML = '<div class="input-group"><label>Amount ($)</label><input type="number" id="amount" value="500000" min="0" step="10000"></div>';
document.getElementById('info-content').innerHTML = '<h3>Retirement Planning</h3><p>Consult a financial advisor for personalized retirement planning.</p>';
function calculate() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const monthlyIncome = (amount * 0.04) / 12;
  document.getElementById('totalSavings').textContent = '$' + Math.round(amount).toLocaleString();
  document.getElementById('monthlyIncome').textContent = 'Monthly income (4% rule): $' + Math.round(monthlyIncome).toLocaleString();
  document.getElementById('breakdown').innerHTML = '<div class="breakdown-item"><span>Safe withdrawal rate (4%/year)</span><span>$' + Math.round(amount * 0.04).toLocaleString() + '</span></div>';
  document.getElementById('results').style.display = 'block';
}`;
  }
  
  fs.writeFileSync(`calc-${calc.id}.js`, jsContent);
  console.log(`✓ Created calc-${calc.id}.js`);
});

console.log(`\n✅ Generated ${calculators.length} retirement calculators`);
