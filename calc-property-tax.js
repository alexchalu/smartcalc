
document.getElementById('calculator-inputs').innerHTML = '<div class="input-group"><label>Amount ($)</label><input type="number" id="amount" value="10000" min="0"></div>';
document.getElementById('info-content').innerHTML = '<h3>Tax Information</h3><p>Consult a tax professional for accurate calculations.</p>';
function calculate() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const tax = amount * 0.1;
  document.getElementById('totalTax').textContent = '$' + Math.round(tax).toLocaleString();
  document.getElementById('breakdown').innerHTML = '<div class="breakdown-item"><span>Estimated Tax</span><span>$' + Math.round(tax).toLocaleString() + '</span></div>';
  document.getElementById('results').style.display = 'block';
}