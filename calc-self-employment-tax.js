
document.getElementById('calculator-inputs').innerHTML = `
  <div class="input-group">
    <label>Net Self-Employment Income ($)</label>
    <input type="number" id="income" value="75000" min="0" step="1000">
  </div>
`;

document.getElementById('info-content').innerHTML = `
  <h3>About Self-Employment Tax</h3>
  <p>Self-employed individuals pay both the employer and employee portions of Social Security and Medicare taxes.</p>
  <ul>
    <li><strong>Social Security:</strong> 12.4% on income up to $168,600 (2026)</li>
    <li><strong>Medicare:</strong> 2.9% on all income</li>
    <li><strong>Additional Medicare:</strong> 0.9% on income over $200,000 (single) or $250,000 (married)</li>
    <li><strong>Total:</strong> 15.3% on most income</li>
  </ul>
  <p><strong>Deduction:</strong> You can deduct half of your self-employment tax on your income tax return.</p>
`;

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
  document.getElementById('breakdown').innerHTML = `
    <div class="breakdown-item"><span>Social Security Tax (12.4%)</span><span>$${Math.round(ssTax).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Medicare Tax (2.9%)</span><span>$${Math.round(medicareTax).toLocaleString()}</span></div>
    ${additionalMedicare > 0 ? '<div class="breakdown-item"><span>Additional Medicare (0.9%)</span><span>$' + Math.round(additionalMedicare).toLocaleString() + '</span></div>' : ''}
    <div class="breakdown-item"><span>Total Self-Employment Tax</span><span>$${Math.round(totalTax).toLocaleString()}</span></div>
    <div class="breakdown-item" style="background: #e8f5e9; margin-top: 1rem; padding: 0.75rem;"><span>Deductible Amount (50%)</span><span>$${Math.round(deductible).toLocaleString()}</span></div>
  `;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}