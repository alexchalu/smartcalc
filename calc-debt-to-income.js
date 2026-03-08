
document.getElementById('calculator-inputs').innerHTML = `
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
`;

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
  document.getElementById('breakdown').innerHTML = `
    <div class="breakdown-item"><span>Current Balance</span><span>$${balance.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Payoff Time</span><span>${years} years, ${remainingMonths} months</span></div>
    <div class="breakdown-item"><span>Total Interest Paid</span><span>$${Math.round(totalInterest).toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Total Amount Paid</span><span>$${Math.round(totalPaid).toLocaleString()}</span></div>
  `;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}