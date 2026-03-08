
document.getElementById('calculator-inputs').innerHTML = `
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
`;

document.getElementById('info-content').innerHTML = `
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
`;

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
  
  document.getElementById('breakdown').innerHTML = `
    <div class="breakdown-item"><span>Current Savings</span><span>$${currentSavings.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Annual Savings</span><span>$${annualSavings.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Savings Rate</span><span>${savingsRate}%</span></div>
    <div class="breakdown-item"><span>FIRE Number (25x expenses)</span><span>$${Math.round(targetAmount).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Years Until FIRE</span><span>${years} years</span></div>
    <div class="breakdown-item"><span>Retirement Age</span><span>${fireAge} years old</span></div>
  `;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}