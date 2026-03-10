#!/usr/bin/env node
// Build batch of 5 high-CPC insurance calculators
const fs = require('fs');

const calcs = [
  {
    file: 'travel-insurance-calculator.html',
    title: 'Travel Insurance Calculator',
    emoji: '✈️',
    desc: 'Estimate travel insurance costs based on trip details, destination, traveler age, and coverage level.',
    keywords: 'travel insurance calculator, trip insurance cost, travel insurance estimate, vacation insurance, travel protection cost',
    cpc: '$20-35/click',
    fields: `
        <div class="row">
            <div class="field"><label class="label">Trip Cost ($)</label><input type="number" id="tripCost" value="5000"></div>
            <div class="field"><label class="label">Trip Duration (days)</label><input type="number" id="duration" value="10"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Number of Travelers</label><input type="number" id="travelers" value="2"></div>
            <div class="field"><label class="label">Traveler Age (oldest)</label><input type="number" id="age" value="40"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Destination</label><select id="dest"><option value="1">Domestic</option><option value="1.3" selected>International (developed)</option><option value="1.8">International (developing)</option><option value="2.2">Adventure/Remote</option></select></div>
            <div class="field"><label class="label">Coverage Level</label><select id="coverage"><option value="0.6">Basic (trip cancellation only)</option><option value="1" selected>Standard (cancel + medical)</option><option value="1.5">Comprehensive (all coverage)</option><option value="2">Premium (cancel for any reason)</option></select></div>
        </div>
        <div class="field"><label class="label">Pre-existing Conditions</label><select id="preex"><option value="1" selected>None</option><option value="1.35">Yes (with waiver)</option><option value="1.6">Yes (no waiver)</option></select></div>`,
    results: `
        <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Premium</div></div>
        <div class="stat"><div class="val" id="perPerson">—</div><div class="lbl">Per Person</div></div>
        <div class="stat"><div class="val" id="perDay">—</div><div class="lbl">Per Day</div></div>
        <div class="stat"><div class="val" id="pctTrip">—</div><div class="lbl">% of Trip Cost</div></div>`,
    calcFn: `function calc(){
            const tripCost=+document.getElementById('tripCost').value;
            const duration=+document.getElementById('duration').value;
            const travelers=+document.getElementById('travelers').value;
            const age=+document.getElementById('age').value;
            const dest=+document.getElementById('dest').value;
            const coverage=+document.getElementById('coverage').value;
            const preex=+document.getElementById('preex').value;
            // Base rate: 4-8% of trip cost
            let baseRate=0.055;
            if(age>60)baseRate+=0.02;if(age>70)baseRate+=0.03;
            if(duration>14)baseRate+=0.01;if(duration>30)baseRate+=0.02;
            let premium=tripCost*baseRate*dest*coverage*preex*travelers;
            premium=Math.max(premium,25*travelers);
            document.getElementById('total').textContent=fmt(premium);
            document.getElementById('perPerson').textContent=fmt(premium/travelers);
            document.getElementById('perDay').textContent=fmt(premium/duration);
            document.getElementById('pctTrip').textContent=(premium/tripCost*100).toFixed(1)+'%';
        }`,
    faq: `<h3>How much does travel insurance cost?</h3><p>Typically 4-10% of your total trip cost. A $5,000 trip might cost $200-500 to insure depending on age, destination, and coverage level. Cancel-for-any-reason (CFAR) policies cost 40-60% more.</p>
            <h3>What does travel insurance cover?</h3><p>Standard policies cover trip cancellation/interruption, emergency medical expenses, medical evacuation, baggage loss/delay, and travel delays. Comprehensive plans add rental car damage, adventure sports, and higher limits.</p>
            <h3>Is travel insurance worth it?</h3><p>Yes, especially for expensive trips, international travel, or if you have pre-existing conditions. Medical evacuation alone can cost $50,000-$100,000+ without coverage. A $300 policy can save you from catastrophic costs.</p>
            <h3>When should I buy travel insurance?</h3><p>Buy within 14-21 days of your initial trip deposit to qualify for pre-existing condition waivers and cancel-for-any-reason upgrades. Earlier is always better.</p>`,
    moreLinks: `<a class="mcard" href="home-insurance-calculator.html"><h4>🏠 Home Insurance</h4><p>Estimate coverage costs</p></a>
            <a class="mcard" href="car-insurance-calculator.html"><h4>🚗 Car Insurance</h4><p>Auto premium estimate</p></a>
            <a class="mcard" href="life-insurance-calculator.html"><h4>🛡️ Life Insurance</h4><p>Coverage you need</p></a>
            <a class="mcard" href="flood-insurance-calculator.html"><h4>🌊 Flood Insurance</h4><p>Flood coverage costs</p></a>`
  },
  {
    file: 'flood-insurance-calculator.html',
    title: 'Flood Insurance Calculator',
    emoji: '🌊',
    desc: 'Estimate flood insurance premiums based on property type, flood zone, building characteristics, and coverage amounts.',
    keywords: 'flood insurance calculator, flood insurance cost, NFIP premium, flood zone insurance, flood coverage estimate',
    cpc: '$25-40/click',
    fields: `
        <div class="row">
            <div class="field"><label class="label">Property Value ($)</label><input type="number" id="propValue" value="350000"></div>
            <div class="field"><label class="label">Contents Value ($)</label><input type="number" id="contents" value="100000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Flood Zone</label><select id="zone"><option value="0.3">Zone X (minimal risk)</option><option value="0.7">Zone B/C (moderate risk)</option><option value="1" selected>Zone AE (high risk)</option><option value="1.4">Zone VE (coastal high risk)</option><option value="1.8">Zone A (special flood hazard)</option></select></div>
            <div class="field"><label class="label">Property Type</label><select id="propType"><option value="1" selected>Single Family Home</option><option value="0.85">Condo (unit only)</option><option value="1.2">Multi-Family (2-4 units)</option><option value="0.7">Mobile/Manufactured Home</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Building Stories</label><select id="stories"><option value="0.9">1 Story</option><option value="1" selected>2 Stories</option><option value="1.1">3+ Stories</option></select></div>
            <div class="field"><label class="label">Basement/Enclosure</label><select id="basement"><option value="1" selected>No Basement</option><option value="1.25">Finished Basement</option><option value="1.15">Unfinished Basement</option><option value="1.4">Enclosure Below BFE</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Elevation Certificate</label><select id="elev"><option value="0.75">Yes (above BFE)</option><option value="1" selected>No certificate</option><option value="1.3">Below Base Flood Elevation</option></select></div>
            <div class="field"><label class="label">Deductible</label><select id="deductible"><option value="1.2">$1,000</option><option value="1" selected>$2,000</option><option value="0.85">$5,000</option><option value="0.7">$10,000</option></select></div>
        </div>`,
    results: `
        <div class="stat"><div class="val" id="annual">—</div><div class="lbl">Annual Premium</div></div>
        <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Cost</div></div>
        <div class="stat"><div class="val" id="building">—</div><div class="lbl">Building Coverage</div></div>
        <div class="stat"><div class="val" id="contentsCov">—</div><div class="lbl">Contents Coverage</div></div>`,
    calcFn: `function calc(){
            const propValue=Math.min(+document.getElementById('propValue').value,250000);
            const contents=Math.min(+document.getElementById('contents').value,100000);
            const zone=+document.getElementById('zone').value;
            const propType=+document.getElementById('propType').value;
            const stories=+document.getElementById('stories').value;
            const basement=+document.getElementById('basement').value;
            const elev=+document.getElementById('elev').value;
            const deductible=+document.getElementById('deductible').value;
            // NFIP Risk Rating 2.0 approximation
            let buildRate=propValue*0.004*zone*propType*stories*basement*elev*deductible;
            let contRate=contents*0.006*zone*basement*elev*deductible;
            let total=buildRate+contRate;
            total=Math.max(total,350); // NFIP minimum
            document.getElementById('annual').textContent=fmt(total);
            document.getElementById('monthly').textContent=fmt(total/12);
            document.getElementById('building').textContent=fmt(propValue);
            document.getElementById('contentsCov').textContent=fmt(contents);
        }`,
    faq: `<h3>How much does flood insurance cost?</h3><p>Under NFIP Risk Rating 2.0, average premiums are $700-$1,500/year but vary widely. High-risk zones (AE, VE) can cost $2,000-$10,000+. Low-risk zones may pay as little as $350/year (Preferred Risk Policy).</p>
            <h3>Do I need flood insurance?</h3><p>If you have a federally-backed mortgage in a high-risk flood zone (zones A or V), flood insurance is required. Even in moderate/low-risk zones, 25% of flood claims come from outside high-risk areas. Standard homeowners insurance does NOT cover floods.</p>
            <h3>What is NFIP vs private flood insurance?</h3><p>NFIP (National Flood Insurance Program) is government-backed with max limits of $250K building / $100K contents. Private flood insurance can offer higher limits, broader coverage, and sometimes lower rates. Compare both options.</p>
            <h3>How can I lower my flood insurance premium?</h3><p>Get an Elevation Certificate (if above BFE), increase your deductible, add flood vents, elevate utilities, fill in basements, or apply for a Letter of Map Amendment (LOMA) if your property was incorrectly mapped into a flood zone.</p>`,
    moreLinks: `<a class="mcard" href="home-insurance-calculator.html"><h4>🏠 Home Insurance</h4><p>Homeowners coverage costs</p></a>
            <a class="mcard" href="earthquake-insurance-calculator.html"><h4>🌍 Earthquake Insurance</h4><p>Seismic coverage estimate</p></a>
            <a class="mcard" href="travel-insurance-calculator.html"><h4>✈️ Travel Insurance</h4><p>Trip protection costs</p></a>
            <a class="mcard" href="car-insurance-calculator.html"><h4>🚗 Car Insurance</h4><p>Auto premium estimate</p></a>`
  },
  {
    file: 'earthquake-insurance-calculator.html',
    title: 'Earthquake Insurance Calculator',
    emoji: '🌍',
    desc: 'Estimate earthquake insurance costs based on property value, location, building type, and soil conditions.',
    keywords: 'earthquake insurance calculator, earthquake insurance cost, seismic insurance, earthquake coverage estimate, CEA insurance',
    cpc: '$25-40/click',
    fields: `
        <div class="row">
            <div class="field"><label class="label">Property Value ($)</label><input type="number" id="propValue" value="400000"></div>
            <div class="field"><label class="label">Contents Value ($)</label><input type="number" id="contents" value="100000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Seismic Risk Zone</label><select id="zone"><option value="0.4">Low Risk (Zone 1)</option><option value="0.7">Moderate (Zone 2)</option><option value="1" selected>High Risk (Zone 3)</option><option value="1.5">Very High Risk (Zone 4)</option></select></div>
            <div class="field"><label class="label">Building Type</label><select id="buildType"><option value="0.8">Wood Frame</option><option value="1" selected>Masonry/Brick</option><option value="1.3">Unreinforced Masonry</option><option value="0.7">Steel Frame</option><option value="0.65">Seismically Retrofitted</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Year Built</label><select id="year"><option value="1.4">Before 1960</option><option value="1.2">1960-1979</option><option value="1" selected>1980-1999</option><option value="0.85">2000-2015</option><option value="0.7">2016+ (modern codes)</option></select></div>
            <div class="field"><label class="label">Soil Type</label><select id="soil"><option value="0.8">Rock/Hard Soil</option><option value="1" selected>Average Soil</option><option value="1.3">Soft Soil</option><option value="1.6">Liquefaction-prone</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Deductible (%)</label><select id="deductible"><option value="1.4">5%</option><option value="1.2">10%</option><option value="1" selected>15%</option><option value="0.8">20%</option><option value="0.6">25%</option></select></div>
            <div class="field"><label class="label">Stories</label><select id="stories"><option value="0.9">1 Story</option><option value="1" selected>2 Stories</option><option value="1.15">3+ Stories</option></select></div>
        </div>`,
    results: `
        <div class="stat"><div class="val" id="annual">—</div><div class="lbl">Annual Premium</div></div>
        <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Cost</div></div>
        <div class="stat"><div class="val" id="deductAmt">—</div><div class="lbl">Your Deductible</div></div>
        <div class="stat"><div class="val" id="maxPayout">—</div><div class="lbl">Max Payout</div></div>`,
    calcFn: `function calc(){
            const propValue=+document.getElementById('propValue').value;
            const contents=+document.getElementById('contents').value;
            const zone=+document.getElementById('zone').value;
            const buildType=+document.getElementById('buildType').value;
            const year=+document.getElementById('year').value;
            const soil=+document.getElementById('soil').value;
            const deductible=+document.getElementById('deductible').value;
            const stories=+document.getElementById('stories').value;
            // EQ insurance: typically 0.5-3% of dwelling coverage
            const totalInsured=propValue+contents;
            let rate=0.012*zone*buildType*year*soil*deductible*stories;
            let premium=totalInsured*rate;
            premium=Math.max(premium,200);
            const deductPct=[0.05,0.1,0.15,0.2,0.25][[1.4,1.2,1,0.8,0.6].indexOf(deductible)];
            const deductAmt=propValue*deductPct;
            document.getElementById('annual').textContent=fmt(premium);
            document.getElementById('monthly').textContent=fmt(premium/12);
            document.getElementById('deductAmt').textContent=fmt(deductAmt);
            document.getElementById('maxPayout').textContent=fmt(totalInsured-deductAmt);
        }`,
    faq: `<h3>How much does earthquake insurance cost?</h3><p>Typically 0.5-3% of your home's value annually. In California, the average CEA policy costs about $800-$3,000/year for a $500K home. Costs are heavily influenced by fault proximity, soil type, and building construction.</p>
            <h3>Is earthquake insurance worth it?</h3><p>In high-risk zones (California, Pacific Northwest, New Madrid zone), many experts recommend it despite high deductibles (10-25%). A major earthquake can completely destroy a home. Without coverage, you'd still owe your mortgage on a destroyed house.</p>
            <h3>What does earthquake insurance cover?</h3><p>Dwelling damage, personal property, and additional living expenses if your home is uninhabitable. Note: deductibles are percentage-based (10-25% of coverage), not flat dollar amounts like standard insurance.</p>
            <h3>Does homeowners insurance cover earthquakes?</h3><p>No. Standard homeowners policies explicitly exclude earthquake damage. You need a separate earthquake policy either through a state program (like California's CEA) or a private insurer.</p>`,
    moreLinks: `<a class="mcard" href="flood-insurance-calculator.html"><h4>🌊 Flood Insurance</h4><p>Flood coverage costs</p></a>
            <a class="mcard" href="home-insurance-calculator.html"><h4>🏠 Home Insurance</h4><p>Homeowners coverage</p></a>
            <a class="mcard" href="travel-insurance-calculator.html"><h4>✈️ Travel Insurance</h4><p>Trip protection costs</p></a>
            <a class="mcard" href="life-insurance-calculator.html"><h4>🛡️ Life Insurance</h4><p>Coverage you need</p></a>`
  },
  {
    file: 'business-insurance-calculator.html',
    title: 'Business Insurance Calculator',
    emoji: '🏢',
    desc: 'Estimate commercial insurance costs including general liability, professional liability, workers comp, and property coverage.',
    keywords: 'business insurance calculator, commercial insurance cost, general liability cost, business insurance estimate, small business insurance',
    cpc: '$30-50/click',
    fields: `
        <div class="row">
            <div class="field"><label class="label">Annual Revenue ($)</label><input type="number" id="revenue" value="500000"></div>
            <div class="field"><label class="label">Number of Employees</label><input type="number" id="employees" value="10"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Industry</label><select id="industry"><option value="0.7">Professional Services</option><option value="1" selected>Retail/Hospitality</option><option value="1.3">Construction/Trades</option><option value="1.5">Manufacturing</option><option value="0.5">Tech/Software</option><option value="1.8">Healthcare</option></select></div>
            <div class="field"><label class="label">Business Property Value ($)</label><input type="number" id="propValue" value="200000"></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Coverage Type</label><select id="coverage"><option value="0.4">General Liability Only</option><option value="0.7">GL + Property (BOP)</option><option value="1" selected>BOP + Workers Comp</option><option value="1.4">Comprehensive (all lines)</option></select></div>
            <div class="field"><label class="label">Claims History</label><select id="claims"><option value="0.85" selected>No claims (3+ years)</option><option value="1">1 minor claim</option><option value="1.3">2+ claims</option><option value="1.6">Major claim history</option></select></div>
        </div>
        <div class="field"><label class="label">Payroll ($, annual, for Workers Comp)</label><input type="number" id="payroll" value="400000"></div>`,
    results: `
        <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Annual Cost</div></div>
        <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Cost</div></div>
        <div class="stat"><div class="val" id="glCost">—</div><div class="lbl">General Liability</div></div>
        <div class="stat"><div class="val" id="wcCost">—</div><div class="lbl">Workers Comp</div></div>`,
    calcFn: `function calc(){
            const revenue=+document.getElementById('revenue').value;
            const employees=+document.getElementById('employees').value;
            const industry=+document.getElementById('industry').value;
            const propValue=+document.getElementById('propValue').value;
            const coverage=+document.getElementById('coverage').value;
            const claims=+document.getElementById('claims').value;
            const payroll=+document.getElementById('payroll').value;
            // GL: typically $400-2000/yr small biz
            let gl=(revenue*0.002+employees*50)*industry*claims;
            gl=Math.max(gl,400);
            // Property: ~0.5-1% of value
            let prop=propValue*0.007*industry;
            // Workers comp: $1-5 per $100 payroll
            let wcRate=0.015*industry;
            let wc=payroll*wcRate*claims;
            let total;
            if(coverage<=0.4)total=gl;
            else if(coverage<=0.7)total=gl+prop;
            else if(coverage<=1)total=gl+prop+wc;
            else total=(gl+prop+wc)*1.3; // comprehensive adds E&O, cyber, etc
            document.getElementById('total').textContent=fmt(total);
            document.getElementById('monthly').textContent=fmt(total/12);
            document.getElementById('glCost').textContent=fmt(gl);
            document.getElementById('wcCost').textContent=coverage>0.7?fmt(wc):'N/A';
        }`,
    faq: `<h3>How much does business insurance cost?</h3><p>Small businesses typically pay $500-$3,000/year for a Business Owner's Policy (BOP). Adding workers comp adds $1,000-$10,000+ depending on industry and payroll. Total costs range from $1,000-$20,000/year for most small businesses.</p>
            <h3>What insurance does a small business need?</h3><p>At minimum: General Liability and Property (often bundled as a BOP). If you have employees: Workers Compensation (required by law in most states). Professional services should add Professional Liability (E&O). Consider Cyber Liability if you handle customer data.</p>
            <h3>What is a BOP (Business Owner's Policy)?</h3><p>A BOP bundles General Liability + Commercial Property insurance at a discounted rate. It's the most common and cost-effective policy for small businesses. It does NOT include Workers Comp, Professional Liability, or Commercial Auto.</p>
            <h3>How can I reduce business insurance costs?</h3><p>Bundle policies (BOP discount), implement safety programs, maintain a clean claims history, increase deductibles, shop multiple carriers annually, and work with an independent agent who can compare 5-10 carriers.</p>`,
    moreLinks: `<a class="mcard" href="car-insurance-calculator.html"><h4>🚗 Car Insurance</h4><p>Auto premium estimate</p></a>
            <a class="mcard" href="life-insurance-calculator.html"><h4>🛡️ Life Insurance</h4><p>Coverage you need</p></a>
            <a class="mcard" href="long-term-care-insurance-calculator.html"><h4>🏥 Long-Term Care</h4><p>LTC coverage costs</p></a>
            <a class="mcard" href="home-insurance-calculator.html"><h4>🏠 Home Insurance</h4><p>Property coverage</p></a>`
  },
  {
    file: 'long-term-care-insurance-calculator.html',
    title: 'Long-Term Care Insurance Calculator',
    emoji: '🏥',
    desc: 'Estimate long-term care insurance premiums based on age, health, benefit period, daily benefit amount, and inflation protection.',
    keywords: 'long-term care insurance calculator, LTC insurance cost, long-term care premium, nursing home insurance, LTC insurance estimate',
    cpc: '$40-70/click',
    fields: `
        <div class="row">
            <div class="field"><label class="label">Your Current Age</label><input type="number" id="age" value="55"></div>
            <div class="field"><label class="label">Gender</label><select id="gender"><option value="1" selected>Male</option><option value="1.4">Female</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Health Status</label><select id="health"><option value="0.75">Excellent</option><option value="1" selected>Good</option><option value="1.35">Fair</option><option value="1.8">Below Average</option></select></div>
            <div class="field"><label class="label">Daily Benefit Amount</label><select id="daily"><option value="150">$150/day</option><option value="200" selected>$200/day</option><option value="250">$250/day</option><option value="300">$300/day</option><option value="400">$400/day</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Benefit Period</label><select id="period"><option value="2">2 Years</option><option value="3" selected>3 Years</option><option value="5">5 Years</option><option value="99">Lifetime</option></select></div>
            <div class="field"><label class="label">Elimination Period (waiting days)</label><select id="elim"><option value="1.15">30 days</option><option value="1" selected>90 days</option><option value="0.85">180 days</option></select></div>
        </div>
        <div class="row">
            <div class="field"><label class="label">Inflation Protection</label><select id="inflation"><option value="1" selected>None</option><option value="1.4">3% Simple</option><option value="1.7">3% Compound</option><option value="2.1">5% Compound</option></select></div>
            <div class="field"><label class="label">Marital Status</label><select id="marital"><option value="1" selected>Single</option><option value="0.7">Married (couples discount)</option></select></div>
        </div>`,
    results: `
        <div class="stat"><div class="val" id="annual">—</div><div class="lbl">Annual Premium</div></div>
        <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Cost</div></div>
        <div class="stat"><div class="val" id="maxBenefit">—</div><div class="lbl">Max Lifetime Benefit</div></div>
        <div class="stat"><div class="val" id="dailyBen">—</div><div class="lbl">Daily Benefit</div></div>`,
    calcFn: `function calc(){
            const age=+document.getElementById('age').value;
            const gender=+document.getElementById('gender').value;
            const health=+document.getElementById('health').value;
            const daily=+document.getElementById('daily').value;
            const period=+document.getElementById('period').value;
            const elim=+document.getElementById('elim').value;
            const inflation=+document.getElementById('inflation').value;
            const marital=+document.getElementById('marital').value;
            // LTC base: depends heavily on age at purchase
            let baseRate;
            if(age<45)baseRate=800;
            else if(age<50)baseRate=1200;
            else if(age<55)baseRate=1800;
            else if(age<60)baseRate=2800;
            else if(age<65)baseRate=4200;
            else if(age<70)baseRate=6500;
            else baseRate=9500;
            let premium=baseRate*(daily/200)*(period===99?2.5:period/3)*gender*health*elim*inflation*marital;
            const maxBenefit=period===99?daily*365*10:daily*365*period;
            document.getElementById('annual').textContent=fmt(premium);
            document.getElementById('monthly').textContent=fmt(premium/12);
            document.getElementById('maxBenefit').textContent=fmt(maxBenefit);
            document.getElementById('dailyBen').textContent=fmt(daily);
        }`,
    faq: `<h3>How much does long-term care insurance cost?</h3><p>For a 55-year-old couple, expect $2,000-$6,000/year combined for a standard policy ($200/day, 3-year benefit, 90-day elimination). Costs rise dramatically with age — buying at 60 vs 55 can increase premiums 30-50%. Women pay 40-60% more due to longer life expectancy and higher claim rates.</p>
            <h3>When should I buy LTC insurance?</h3><p>The sweet spot is ages 50-60. Before 50, premiums are low but you pay for many more years. After 60, premiums increase sharply and health issues may disqualify you. At 65+, you may not be insurable at all.</p>
            <h3>What does long-term care insurance cover?</h3><p>Nursing home care ($8,000-$12,000/month), assisted living facilities ($4,000-$7,000/month), home health aides ($25-$35/hour), adult day care, and respite care. Benefits begin after the elimination period (typically 90 days of needing care).</p>
            <h3>What are alternatives to LTC insurance?</h3><p>Hybrid life/LTC policies (life insurance with LTC rider), self-funding, Medicaid (requires spending down assets), health savings accounts, reverse mortgages, or family caregiving. Each has trade-offs — hybrid policies are growing in popularity.</p>`,
    moreLinks: `<a class="mcard" href="life-insurance-calculator.html"><h4>🛡️ Life Insurance</h4><p>Coverage you need</p></a>
            <a class="mcard" href="retirement-calculator.html"><h4>📊 Retirement</h4><p>Plan your retirement</p></a>
            <a class="mcard" href="business-insurance-calculator.html"><h4>🏢 Business Insurance</h4><p>Commercial coverage</p></a>
            <a class="mcard" href="home-insurance-calculator.html"><h4>🏠 Home Insurance</h4><p>Property coverage</p></a>`
  }
];

const template = (c) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${c.title} — Free Online | SmartCalc</title>
    <meta name="description" content="${c.desc}">
    <meta name="keywords" content="${c.keywords}">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/${c.file}">
    <meta property="og:title" content="${c.title} — SmartCalc">
    <meta property="og:description" content="${c.desc}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${c.title}","description":"${c.desc}","url":"https://alexchalu.github.io/smartcalc/${c.file}","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
    </script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#10b981;--accent2:#059669;--glow:rgba(16,185,129,0.12);--radius:12px}
        [data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
        header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
        .hi{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
        .logo{font-size:1.4rem;font-weight:800;color:var(--accent);text-decoration:none}
        .tag{color:var(--muted);font-size:.85rem;flex:1}
        .tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;font-size:1rem;cursor:pointer}
        main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
        h1{font-size:1.75rem;margin-bottom:.5rem}
        .sub{color:var(--muted);margin-bottom:2rem}
        .calc{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:2rem}
        .field{margin-bottom:1.25rem}
        .label{display:block;font-weight:600;margin-bottom:.5rem;font-size:.9rem}
        input[type="number"],select{width:100%;padding:.8rem 1rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:.95rem;outline:none}
        input:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow)}
        .row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        .btn{display:inline-flex;padding:.75rem 1.5rem;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--accent2)}
        .results{margin-top:2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
        .stat .val{font-size:1.5rem;font-weight:800;color:var(--accent)}
        .stat .lbl{font-size:.8rem;color:var(--muted)}
        .ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
        .faq{margin-top:3rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .faq h2{font-size:1.2rem;margin-bottom:1rem}
        .faq h3{font-size:1rem;margin:1rem 0 .5rem;color:var(--accent)}
        .faq p{color:var(--muted);font-size:.9rem;line-height:1.7}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        .more{margin-top:3rem}
        .more h2{font-size:1.2rem;margin-bottom:1rem}
        .mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}
        .mcard{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:1rem;text-decoration:none;color:var(--text);transition:.2s}
        .mcard:hover{border-color:var(--accent)}
        .mcard h4{font-size:.9rem}
        .mcard p{font-size:.75rem;color:var(--muted)}
        @media(max-width:600px){.row{grid-template-columns:1fr}.tag{display:none}.results{grid-template-columns:1fr 1fr}}
    </style>
</head>
<body>
    <header><div class="hi"><a href="index.html" class="logo">💰 SmartCalc</a><p class="tag">Free financial calculators</p><button class="tb" id="tb">🌙</button></div></header>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>${c.emoji} ${c.title}</h1>
        <p class="sub">${c.desc}</p>
        <div class="calc">${c.fields}
        <button class="btn" onclick="calc()">Calculate</button>
        <div class="results" id="out">${c.results}</div></div>
        <div class="ad" style="padding:0"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
        <div class="faq"><h2>${c.title} FAQ</h2>${c.faq}</div>
        <div class="more"><h2>More Calculators</h2><div class="mgrid">${c.moreLinks}</div></div>
        <div class="embed-box" style="margin-top:2rem;padding:1.5rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)">
            <h2 style="font-size:1.1rem;margin-bottom:.75rem">📋 Embed This Calculator</h2>
            <p style="color:var(--muted);font-size:.85rem;margin-bottom:.75rem">Add this calculator to your website for free:</p>
            <div style="position:relative">
                <textarea id="embed-code" readonly style="width:100%;height:80px;padding:.75rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:monospace;font-size:.8rem;resize:none">&lt;iframe src="https://alexchalu.github.io/smartcalc/${c.file}" width="100%" height="600" frameborder="0" style="border:1px solid #e5e7eb;border-radius:12px"&gt;&lt;/iframe&gt;
&lt;p style="font-size:12px;text-align:center"&gt;Calculator by &lt;a href="https://alexchalu.github.io/smartcalc/"&gt;SmartCalc&lt;/a&gt;&lt;/p&gt;</textarea>
                <button onclick="navigator.clipboard.writeText(document.getElementById('embed-code').value);this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',2000)" style="position:absolute;top:8px;right:8px;padding:.35rem .75rem;background:var(--accent);color:#fff;border:none;border-radius:6px;font-size:.8rem;cursor:pointer;font-weight:600">Copy</button>
            </div>
        </div>
    </main>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <footer><p>SmartCalc — All calculations happen in your browser. Not financial advice.</p><p><a href="index.html">Home</a> · <a href="https://alexchalu.github.io/toolpulse/">Free Online Tools</a></p></footer>
    <script>
        const b=document.getElementById('tb');const s=localStorage.getItem('sc-theme');
        if(s==='light'){document.documentElement.setAttribute('data-theme','light');b.textContent='☀️'}
        b.addEventListener('click',()=>{const l=document.documentElement.getAttribute('data-theme')==='light';document.documentElement.setAttribute('data-theme',l?'dark':'light');b.textContent=l?'🌙':'☀️';localStorage.setItem('sc-theme',l?'dark':'light')});
        const fmt=n=>'$'+n.toLocaleString('en-US',{maximumFractionDigits:0});
        ${c.calcFn}
        calc();
    </script>
</body>
</html>`;

let built = [];
for (const c of calcs) {
  fs.writeFileSync(`/data/workspace/smartcalc/${c.file}`, template(c));
  built.push(`${c.emoji} ${c.file} (${c.cpc})`);
  console.log(`✅ Built ${c.file}`);
}

console.log(`\nBuilt ${built.length} calculators:\n${built.join('\n')}`);
