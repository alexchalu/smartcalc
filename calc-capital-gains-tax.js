
document.getElementById('calculator-inputs').innerHTML = `
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
`;

document.getElementById('info-content').innerHTML = `
  <h3>About Capital Gains Tax</h3>
  <p><strong>Short-term capital gains</strong> (assets held ≤1 year) are taxed as ordinary income at your regular tax rate.</p>
  <p><strong>Long-term capital gains</strong> (assets held >1 year) get preferential rates:</p>
  <ul>
    <li><strong>0%:</strong> If you're in the 10% or 12% tax bracket</li>
    <li><strong>15%:</strong> If you're in the 22%, 24%, 32%, or 35% bracket</li>
    <li><strong>20%:</strong> If you're in the 37% bracket</li>
  </ul>
  <p><strong>Net Investment Income Tax:</strong> Additional 3.8% tax on investment income if your income exceeds $200,000 (single) or $250,000 (married).</p>
`;

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
  document.getElementById('breakdown').innerHTML = `
    <div class="breakdown-item"><span>Purchase Price</span><span>$${purchase.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Sale Price</span><span>$${sale.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Capital Gain</span><span>$${gain.toLocaleString()}</span></div>
    <div class="breakdown-item"><span>Tax Rate (${period === 'short' ? 'Short-term' : 'Long-term'})</span><span>${taxRate}%</span></div>
    <div class="breakdown-item"><span>Tax Owed</span><span>$${Math.round(tax).toLocaleString()}</span></div>
    <div class="breakdown-item" style="background: #e8f5e9; margin-top: 1rem; padding: 0.75rem;"><span>After-Tax Proceeds</span><span>$${Math.round(sale - tax).toLocaleString()}</span></div>
  `;
  
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}