
document.getElementById('calculator-inputs').innerHTML = '<div class="input-group"><label>Amount ($)</label><input type="number" id="amount" value="500000" min="0" step="10000"></div>';
document.getElementById('info-content').innerHTML = '<h3>Retirement Planning</h3><p>Consult a financial advisor for personalized retirement planning.</p>';
function calculate() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const monthlyIncome = (amount * 0.04) / 12;
  document.getElementById('totalSavings').textContent = '$' + Math.round(amount).toLocaleString();
  document.getElementById('monthlyIncome').textContent = 'Monthly income (4% rule): $' + Math.round(monthlyIncome).toLocaleString();
  document.getElementById('breakdown').innerHTML = '<div class="breakdown-item"><span>Safe withdrawal rate (4%/year)</span><span>$' + Math.round(amount * 0.04).toLocaleString() + '</span></div>';
  document.getElementById('results').style.display = 'block';
}