
document.getElementById('calculator-inputs').innerHTML = `
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
`;

document.getElementById('info-content').innerHTML = `
  <h3>401k Contribution Limits 2026</h3>
  <ul>
    <li><strong>Employee contribution limit:</strong> $23,500 (under 50)</li>
    <li><strong>Catch-up contribution:</strong> Additional $7,500 (age 50+)</li>
    <li><strong>Total limit (employee + employer):</strong> $70,000</li>
  </ul>
  <p><strong>Employer match:</strong> Free money! Always contribute enough to get the full match.</p>
  <p><strong>Tax advantage:</strong> Contributions are pre-tax, reducing your taxable income today.</p>
`;

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
  
  document.getElementById('breakdown').innerHTML = `
    <div class="breakdown-item"><span>Years to Retirement</span><span>${yearsToRetirement} years</span></div>
    <div class="breakdown-item"><span>Your Contributions</span><span>$${Math.round(totalContributions).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Employer Match</span><span>$${Math.round(totalMatch).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Investment Growth</span><span>$${Math.round(totalInterest).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Total at Retirement (${retireAge})</span><span>$${Math.round(balance).toLocaleString()}</span></div>
  `;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}