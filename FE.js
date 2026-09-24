const STORAGE_KEY = 'surplus-to-shelter-enterprise-v1';

// Seed Shelters
const defaultShelters = [
  {
    id: 's1',
    name: "Jaipur Food Rescue Bank",
    location: { lat: 26.8200, lng: 75.8000 },
    area: "Malviya Nagar",
    city: "Jaipur",
    capacityLbs: 500,
    usedLbs: 145,
    intakeOpen: true,
    contact: "+91 141 278 9012",
    operatingHours: "07:00 - 22:00",
    dockInfo: "Gate 2 Receiving Bay",
    needs: ["Prepared", "Bakery", "Produce"],
    dietaryAccepted: ["Vegetarian", "Vegan", "Halal"]
  },
  {
    id: 's2',
    name: "Downtown Mission",
    location: { lat: 40.7128, lng: -74.0060 },
    area: "Indiranagar",
    city: "Bangalore / NY Demo",
    capacityLbs: 600,
    usedLbs: 210,
    intakeOpen: true,
    contact: "+91 80 2520 1144",
    operatingHours: "24/7 Intake",
    dockInfo: "Main Kitchen Ramp",
    needs: ["Prepared", "Produce"],
    dietaryAccepted: ["All Dietary Types"]
  },
  {
    id: 's3',
    name: "Westside Relief Center",
    location: { lat: 12.9352, lng: 77.6245 },
    area: "Koramangala",
    city: "Bangalore",
    capacityLbs: 450,
    usedLbs: 120,
    intakeOpen: true,
    contact: "+91 80 2553 4488",
    operatingHours: "08:00 - 21:00",
    dockInfo: "Rear Storage Cold Room",
    needs: ["Produce", "Bakery", "Dairy"],
    dietaryAccepted: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: 's4',
    name: "Uptown Community Shelter",
    location: { lat: 12.9609, lng: 77.6387 },
    area: "Domlur",
    city: "Bangalore",
    capacityLbs: 350,
    usedLbs: 85,
    intakeOpen: true,
    contact: "+91 80 2535 9900",
    operatingHours: "09:00 - 20:00",
    dockInfo: "Dock A Food Storage",
    needs: ["Bakery", "Dairy", "Pantry"],
    dietaryAccepted: ["All Dietary Types"]
  }
];

// Seed Drivers
const defaultDrivers = [
  {
    id: 'D1',
    name: 'Rahul Sharma',
    phone: '+91 98290 11223',
    vehicleType: '🚐 Refrigerated Van',
    capacityKg: 300,
    rating: 4.9,
    tripsCompleted: 142,
    location: { lat: 26.8310, lng: 75.8050 },
    status: 'Busy'
  },
  {
    id: 'D2',
    name: 'Alice Johnson',
    phone: '+91 98450 33445',
    vehicleType: '⚡ Electric Cargo Van',
    capacityKg: 200,
    rating: 5.0,
    tripsCompleted: 218,
    location: { lat: 40.7150, lng: -74.0100 },
    status: 'Available'
  },
  {
    id: 'D3',
    name: 'Karan Patel',
    phone: '+91 99001 55667',
    vehicleType: '🚗 Insulated Sedan',
    capacityKg: 100,
    rating: 4.8,
    tripsCompleted: 89,
    location: { lat: 12.9360, lng: 77.6250 },
    status: 'Available'
  },
  {
    id: 'D4',
    name: 'Priya Nair',
    phone: '+91 98860 77889',
    vehicleType: '🚚 Heavy Cargo Van',
    capacityKg: 600,
    rating: 4.9,
    tripsCompleted: 165,
    location: { lat: 12.9610, lng: 77.6390 },
    status: 'Busy'
  }
];

// Seed Donations
const defaultDonations = [
  {
    id: 'DON-1001',
    itemType: 'Fresh Vegetable Pulao & Tadka Dal',
    category: 'Prepared',
    quantityLbs: 35,
    storageTemp: 'Hot/Insulated',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    expiryHours: 3,
    expiryDate: new Date(Date.now() + 3 * 3600000).toISOString(),
    donor: 'Green Leaf Kitchen',
    donorLocation: { lat: 26.8530, lng: 75.8150 },
    area: 'Malviya Nagar',
    status: 'matched',
    matchedShelter: 'Jaipur Food Rescue Bank',
    assignedDriver: 'Rahul Sharma',
    trackingStep: 'Driver En Route',
    createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
    distanceMiles: 1.8,
    estTransitMinutes: 12,
    contact: '+91 98291 44556'
  },
  {
    id: 'DON-1002',
    itemType: 'Artisan Sourdough Loaves & Croissants',
    category: 'Bakery',
    quantityLbs: 22,
    storageTemp: 'Ambient',
    dietaryTags: ['Vegetarian'],
    expiryHours: 8,
    expiryDate: new Date(Date.now() + 8 * 3600000).toISOString(),
    donor: 'The Daily Bakehouse',
    donorLocation: { lat: 12.9609, lng: 77.6387 },
    area: 'Domlur',
    status: 'matched',
    matchedShelter: 'Uptown Community Shelter',
    assignedDriver: 'Priya Nair',
    trackingStep: 'In Transit',
    createdAt: new Date(Date.now() - 90 * 60000).toISOString(),
    distanceMiles: 0.9,
    estTransitMinutes: 8,
    contact: '+91 98452 77889'
  },
  {
    id: 'DON-1003',
    itemType: 'Hydroponic Spinach & Cherry Tomatoes',
    category: 'Produce',
    quantityLbs: 45,
    storageTemp: 'Refrigerated',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    expiryHours: 14,
    expiryDate: new Date(Date.now() + 14 * 3600000).toISOString(),
    donor: 'Organic Harvest Market',
    donorLocation: { lat: 12.9352, lng: 77.6245 },
    area: 'Koramangala',
    status: 'available',
    matchedShelter: null,
    assignedDriver: null,
    trackingStep: 'Awaiting Match',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    distanceMiles: null,
    estTransitMinutes: null,
    contact: '+91 99003 11223'
  }
];

let state;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  state = (saved && Array.isArray(saved.donations) && saved.donations.length) ? saved : {
    donations: structuredClone(defaultDonations),
    shelters: structuredClone(defaultShelters),
    drivers: structuredClone(defaultDrivers),
    unit: 'kg'
  };
} catch {
  state = {
    donations: structuredClone(defaultDonations),
    shelters: structuredClone(defaultShelters),
    drivers: structuredClone(defaultDrivers),
    unit: 'kg'
  };
}

let activeCategoryFilter = 'all';
const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Weight unit formatting
function formatWeight(lbs) {
  if (state.unit === 'kg') {
    return `${(lbs * 0.453592).toFixed(1)} kg`;
  }
  return `${Number(lbs).toFixed(1)} lbs`;
}

function prettyDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Time not set';
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function timeLeft(value) {
  const mins = Math.round((new Date(value).getTime() - Date.now()) / 60000);
  if (mins < 0) return { label: 'Past safe window', urgent: true };
  if (mins < 60) return { label: `⏱️ ${mins} min left`, urgent: true };
  const hrs = (mins / 60).toFixed(1);
  if (mins < 180) return { label: `⏱️ ${hrs} hrs left`, urgent: true };
  return { label: `Ready by ${prettyDate(value)}`, urgent: false };
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Haversine Distance helper
function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const toRad = (a) => a * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// =========================================================
// THEME & UNIT CONTROLS
// =========================================================
const themeToggleBtn = $('#themeToggle');
function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

if (themeToggleBtn) {
  updateThemeIcon();
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('surplus-theme', next);
    updateThemeIcon();
    showToast(next === 'dark' ? 'Dark mode activated' : 'Light mode activated');
  });
}

const unitToggleBtn = $('#unitToggle');
if (unitToggleBtn) {
  $('#unitLabel').textContent = state.unit || 'kg';
  unitToggleBtn.addEventListener('click', () => {
    state.unit = state.unit === 'kg' ? 'lbs' : 'kg';
    $('#unitLabel').textContent = state.unit;
    save();
    render();
    showToast(`Display unit set to ${state.unit.toUpperCase()}`);
  });
}

// CSV Export
const exportBtn = $('#exportCsvBtn');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const headers = ['Donation_ID', 'Item_Description', 'Category', 'Quantity_Lbs', 'Storage_Type', 'Donor', 'Area', 'Status', 'Matched_Shelter', 'Courier', 'Created_At'];
    const rows = state.donations.map(d => [
      d.id,
      `"${d.itemType.replace(/"/g, '""')}"`,
      d.category,
      d.quantityLbs,
      d.storageTemp || 'Ambient',
      `"${d.donor.replace(/"/g, '""')}"`,
      `"${d.area.replace(/"/g, '""')}"`,
      d.status,
      `"${(d.matchedShelter || '').replace(/"/g, '""')}"`,
      `"${(d.assignedDriver || '').replace(/"/g, '""')}"`,
      d.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `food-rescue-manifest-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded food rescue CSV manifest");
  });
}

// =========================================================
// RENDERING DASHBOARD
// =========================================================
function render() {
  const total = state.donations.length;
  const activeUnassigned = state.donations.filter(d => d.status === 'available').length;
  const inTransit = state.donations.filter(d => d.status === 'matched').length;
  const delivered = state.donations.filter(d => d.status === 'picked-up' || d.status === 'Delivered').length;

  if ($('#donationTabCount')) $('#donationTabCount').textContent = inTransit + activeUnassigned;
  if ($('#shelterTabCount')) $('#shelterTabCount').textContent = state.shelters.length;
  if ($('#driverTabCount')) $('#driverTabCount').textContent = state.drivers.length;

  // Total weight
  const totalLbs = state.donations.reduce((sum, d) => sum + (Number(d.quantityLbs) || 0), 0) + 320;
  const mealsCount = Math.floor(totalLbs / 1.2);
  const co2Count = Math.floor(totalLbs * 2.5);
  const waterCount = Math.floor(totalLbs * 950 / 1000); // in 'k' L

  if ($('#heroMealsCount')) $('#heroMealsCount').textContent = mealsCount;
  if ($('#heroDriversCount')) $('#heroDriversCount').textContent = state.drivers.filter(d => d.status === 'Busy').length || 2;
  if ($('#heroWeightCount')) $('#heroWeightCount').textContent = formatWeight(totalLbs);
  if ($('#heroCO2Count')) $('#heroCO2Count').textContent = `${co2Count} kg`;

  // ESG Tab
  if ($('#esgMeals')) $('#esgMeals').textContent = mealsCount;
  if ($('#esgWeight')) $('#esgWeight').textContent = formatWeight(totalLbs);
  if ($('#esgCO2')) $('#esgCO2').textContent = `${co2Count} kg`;
  if ($('#esgWater')) $('#esgWater').textContent = `${waterCount}k L`;

  renderDonations();
  renderShelters();
  renderDrivers();
  renderESGBreakdown(totalLbs);
}

function renderDonations() {
  const host = $('#donationList');
  if (!host) return;

  const searchQuery = ($('#searchInput') ? $('#searchInput').value.trim().toLowerCase() : '');
  const statusFilter = $('#statusFilter') ? $('#statusFilter').value : 'all';
  const storageFilter = $('#storageFilter') ? $('#storageFilter').value : 'all';
  const sortOrder = $('#sortOrder') ? $('#sortOrder').value : 'urgency';

  let list = [...state.donations].filter(d => {
    const matchesSearch = !searchQuery ||
      d.itemType.toLowerCase().includes(searchQuery) ||
      d.donor.toLowerCase().includes(searchQuery) ||
      d.area.toLowerCase().includes(searchQuery);

    const matchesStatus = (statusFilter === 'all') || (d.status === statusFilter);
    const matchesCat = (activeCategoryFilter === 'all') || (d.category === activeCategoryFilter);
    const matchesStorage = (storageFilter === 'all') || (d.storageTemp === storageFilter);

    return matchesSearch && matchesStatus && matchesCat && matchesStorage;
  });

  // Sorting
  if (sortOrder === 'urgency') {
    list.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
  } else if (sortOrder === 'quantity') {
    list.sort((a, b) => b.quantityLbs - a.quantityLbs);
  } else if (sortOrder === 'distance') {
    list.sort((a, b) => (a.distanceMiles || 99) - (b.distanceMiles || 99));
  }

  if (!list.length) {
    host.innerHTML = `
      <div class="empty">
        <strong style="display:block; margin-bottom: 4px;">No matching donations found</strong>
        <p style="color:var(--text-muted); font-size:0.85rem;">Try adjusting your search criteria or post a new surplus record.</p>
      </div>`;
    return;
  }

  host.innerHTML = list.map(d => {
    const time = timeLeft(d.expiryDate);
    const isDelivered = d.status === 'picked-up' || d.status === 'Delivered';
    const isMatched = d.status === 'matched';
    const isAvailable = d.status === 'available' || d.status === 'Posted';

    // Tracking Stepper HTML
    const step1Class = 'done';
    const step2Class = (!isAvailable) ? 'done' : 'active';
    const step3Class = isDelivered ? 'done' : (isMatched ? 'active' : '');
    const step4Class = isDelivered ? 'done' : '';

    return `
      <article class="donation-card">
        <div class="card-header-row">
          <div class="card-top">
            <span class="food-icon">${iconFor(d.category)}</span>
            <div>
              <h3>${esc(d.itemType)}</h3>
              <div class="donor-line">Posted by <b>${esc(d.donor)}</b> · ${esc(d.area)}</div>
            </div>
          </div>
          <div>
            <span class="status ${esc(d.status)}">${isDelivered ? 'Delivered' : (isMatched ? 'In Transit' : 'Available')}</span>
          </div>
        </div>

        <div class="card-details">
          <span class="detail-line"><b>⚖️ ${formatWeight(d.quantityLbs)}</b></span>
          <span class="detail-line" style="${time.urgent ? 'color:var(--primary); font-weight:700;' : ''}">
            ${esc(time.label)}
          </span>
          <span class="temp-tag">${d.storageTemp === 'Hot/Insulated' ? '🔥 Hot/Insulated' : (d.storageTemp === 'Refrigerated' ? '❄️ Cold Chain' : '📦 Ambient')}</span>
          ${(d.dietaryTags || []).map(t => `<span class="diet-tag">${esc(t)}</span>`).join('')}
        </div>

        <!-- Real-Time Courier Tracking Stepper -->
        <div class="tracking-stepper">
          <span class="step-node ${step1Class}">● Logged</span>
          <span class="step-connector ${step2Class}"></span>
          <span class="step-node ${step2Class}">● Shelter Matched</span>
          <span class="step-connector ${step3Class}"></span>
          <span class="step-node ${step3Class}">● In Transit</span>
          <span class="step-connector ${step4Class}"></span>
          <span class="step-node ${step4Class}">● Intake Complete</span>
        </div>

        <div class="card-footer-row">
          <div class="route-preview">
            ${d.matchedShelter ? `
              <span>➔ Delivering to: <strong>${esc(d.matchedShelter)}</strong> (${d.distanceMiles || '1.2'} mi)</span>
              ${d.assignedDriver ? `<span style="color:var(--text-muted);">· Courier: <b>${esc(d.assignedDriver)}</b></span>` : ''}
            ` : `<span style="color:var(--text-muted);">Awaiting shelter matching...</span>`}
          </div>

          <div class="card-actions">
            <button class="small-button" onclick="openManifest('${esc(d.id)}')">View Manifest</button>
            ${isAvailable ? `
              <button class="small-button primary" onclick="manualMatch('${esc(d.id)}')">Assign Shelter</button>
            ` : (isMatched ? `
              <button class="small-button primary" onclick="confirmDelivery('${esc(d.id)}')">Confirm Intake</button>
            ` : '')}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function iconFor(category) {
  return ({
    Prepared: '🍲',
    Produce: '🥬',
    Bakery: '🍞',
    Dairy: '🥛',
    Pantry: '🥫'
  })[category] || '🍲';
}

function renderShelters() {
  const host = $('#recipientList');
  if (!host) return;

  host.innerHTML = state.shelters.map(s => {
    const pct = Math.min(100, Math.round((s.usedLbs / s.capacityLbs) * 100));
    const meterClass = pct > 85 ? 'danger' : (pct > 65 ? 'warning' : '');

    return `
      <article class="recipient-card">
        <div>
          <div class="shelter-head">
            <div>
              <h3>${esc(s.name)}</h3>
              <p>⌖ ${esc(s.area)} (${esc(s.city)})</p>
            </div>
            <span class="status ${s.intakeOpen ? 'picked-up' : 'available'}">
              ${s.intakeOpen ? 'Intake Open' : 'Intake Paused'}
            </span>
          </div>

          <div class="shelter-meta-row">
            <div>⏰ Hours: <b>${esc(s.operatingHours)}</b></div>
            <div>📞 ${esc(s.contact)}</div>
            <div>🚚 ${esc(s.dockInfo)}</div>
            <div>🛡️ Verified Partner</div>
          </div>

          <div class="capacity">
            <span>Intake Utilization</span>
            <span><b>${formatWeight(s.usedLbs)}</b> of ${formatWeight(s.capacityLbs)} (${pct}%)</span>
          </div>

          <div class="capacity-track">
            <span class="${meterClass}" style="width: ${pct}%"></span>
          </div>
        </div>

        <div>
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; margin-bottom:4px;">Accepted Categories:</div>
          <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px;">
            ${s.needs.map(n => `<span class="tag">${iconFor(n)} ${esc(n)}</span>`).join('')}
          </div>
          <div style="display:flex; justify-content:flex-end;">
            <button class="small-button" onclick="toggleShelterIntake('${esc(s.id)}')">
              ${s.intakeOpen ? 'Pause Intake' : 'Resume Intake'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderDrivers() {
  const host = $('#driverList');
  if (!host) return;

  host.innerHTML = state.drivers.map(d => {
    return `
      <article class="driver-card">
        <div>
          <div class="driver-header">
            <div>
              <h3>${esc(d.name)}</h3>
              <div style="font-size:0.8rem; color:var(--text-muted);">${esc(d.vehicleType)}</div>
            </div>
            <span class="status ${d.status === 'Available' ? 'picked-up' : 'matched'}">${esc(d.status)}</span>
          </div>

          <div class="driver-details">
            <div>⭐ Rating: <b>${d.rating}</b> / 5.0 (${d.tripsCompleted} safe rescues)</div>
            <div>📦 Max Cargo Capacity: <b>${d.capacityKg} kg</b></div>
            <div>📞 Direct Phone: <b>${esc(d.phone)}</b></div>
          </div>
        </div>

        <div style="border-top:1px solid var(--border); padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.75rem; color:var(--text-muted);">GPS: ${d.location.lat.toFixed(3)}, ${d.location.lng.toFixed(3)}</span>
          <button class="small-button" onclick="showToast('Calling courier ${esc(d.name)} at ${esc(d.phone)}')">Call Driver</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderESGBreakdown(totalLbs) {
  const host = $('#categoryBreakdownBars');
  if (!host) return;

  const cats = ['Prepared', 'Produce', 'Bakery', 'Dairy', 'Pantry'];
  const breakdown = {};
  cats.forEach(c => breakdown[c] = 0);

  state.donations.forEach(d => {
    breakdown[d.category] = (breakdown[d.category] || 0) + (d.quantityLbs || 0);
  });

  host.innerHTML = cats.map(c => {
    const qty = breakdown[c] || 15;
    const pct = Math.max(8, Math.round((qty / totalLbs) * 100));
    return `
      <div style="margin-bottom: 12px;">
        <div class="breakdown-row">
          <span>${iconFor(c)} <b>${c}</b></span>
          <span style="color:var(--text-muted);">${formatWeight(qty)} (${pct}%)</span>
        </div>
        <div class="capacity-track" style="margin-bottom:0; height:6px;">
          <span style="width:${pct}%; background:var(--primary);"></span>
        </div>
      </div>
    `;
  }).join('');
}

// =========================================================
// MATCHING & LOGISTICS LOGIC
// =========================================================
function smartMatch(donation) {
  // Find available shelter
  let best = state.shelters.find(s => s.intakeOpen && (s.capacityLbs - s.usedLbs) >= donation.quantityLbs);
  if (!best) {
    best = state.shelters.find(s => s.intakeOpen) || state.shelters[0];
  }

  // Find nearest driver
  let driver = state.drivers.find(d => d.status === 'Available') || state.drivers[0];
  driver.status = 'Busy';

  const distance = haversine(
    donation.donorLocation.lat, donation.donorLocation.lng,
    best.location.lat, best.location.lng
  );

  donation.status = 'matched';
  donation.matchedShelter = best.name;
  donation.assignedDriver = driver.name;
  donation.trackingStep = 'Driver En Route';
  donation.distanceMiles = Number(distance.toFixed(1));
  donation.estTransitMinutes = Math.max(6, Math.round(distance * 6));

  best.usedLbs += Number(donation.quantityLbs);
  save();
  render();
  showToast(`Routed to ${best.name} · Courier ${driver.name} Assigned (~${donation.estTransitMinutes} min ETA)`);
}

window.manualMatch = function(id) {
  const d = state.donations.find(item => item.id === id);
  if (d) smartMatch(d);
};

window.confirmDelivery = function(id) {
  const d = state.donations.find(item => item.id === id);
  if (d) {
    d.status = 'picked-up';
    d.trackingStep = 'Delivered';
    const driver = state.drivers.find(drv => drv.name === d.assignedDriver);
    if (driver) driver.status = 'Available';
    save();
    render();
    showToast(`✓ Intake confirmed by ${d.matchedShelter}`);
  }
};

window.toggleShelterIntake = function(id) {
  const s = state.shelters.find(item => item.id === id);
  if (s) {
    s.intakeOpen = !s.intakeOpen;
    save();
    render();
    showToast(`${s.name}: Intake ${s.intakeOpen ? 'Opened' : 'Paused'}`);
  }
};

// =========================================================
// MANIFEST INSPECTOR MODAL
// =========================================================
const manifestDialog = $('#manifestDialog');
window.openManifest = function(id) {
  const d = state.donations.find(item => item.id === id);
  if (!d) return;

  const shelter = state.shelters.find(s => s.name === d.matchedShelter) || state.shelters[0];
  const driver = state.drivers.find(drv => drv.name === d.assignedDriver) || state.drivers[0];

  $('#manifestItemTitle').textContent = `${d.itemType}`;
  $('#manifestBody').innerHTML = `
    <div style="background:var(--surface-muted); padding:14px; border-radius:var(--radius-sm); margin-bottom:16px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.84rem;">
        <div>Tracking ID: <b>${d.id}</b></div>
        <div>Weight: <b>${formatWeight(d.quantityLbs)}</b></div>
        <div>Storage: <b>${d.storageTemp || 'Ambient'}</b></div>
        <div>Safety Expiry: <b>${prettyDate(d.expiryDate)}</b></div>
      </div>
    </div>

    <div class="manifest-step">
      <div class="step-icon">1</div>
      <div>
        <strong style="font-size:0.92rem;">Pickup Point (Donor)</strong>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
          ${esc(d.donor)} · ${esc(d.area)}<br>
          Contact: ${esc(d.contact || '+91 98290 00000')}
        </p>
      </div>
    </div>

    <div class="manifest-step">
      <div class="step-icon">2</div>
      <div>
        <strong style="font-size:0.92rem;">Transit Chain of Custody</strong>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
          Courier: <b>${esc(d.assignedDriver || driver.name)}</b> (${esc(driver.vehicleType)})<br>
          Estimated Transit Time: ~${d.estTransitMinutes || 12} mins (${d.distanceMiles || 1.8} miles)
        </p>
      </div>
    </div>

    <div class="manifest-step">
      <div class="step-icon">3</div>
      <div>
        <strong style="font-size:0.92rem;">Delivery Dock (Shelter)</strong>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
          ${esc(d.matchedShelter || shelter.name)} (${esc(shelter.dockInfo)})<br>
          Receiving Bay Phone: ${esc(shelter.contact)} · Hours: ${esc(shelter.operatingHours)}
        </p>
      </div>
    </div>
  `;

  if (manifestDialog) manifestDialog.showModal();
};

if ($('#closeManifest')) $('#closeManifest').addEventListener('click', () => manifestDialog.close());
if ($('#closeManifestBtn')) $('#closeManifestBtn').addEventListener('click', () => manifestDialog.close());
if ($('#printManifestBtn')) $('#printManifestBtn').addEventListener('click', () => window.print());

// =========================================================
// EVENT HANDLERS & SEARCH/FILTER
// =========================================================
document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab, .tab-panel').forEach(el => el.classList.remove('active'));
    button.classList.add('active');
    const target = document.getElementById(button.dataset.tab);
    if (target) target.classList.add('active');
  });
});

if ($('#searchInput')) $('#searchInput').addEventListener('input', renderDonations);
if ($('#statusFilter')) $('#statusFilter').addEventListener('change', renderDonations);
if ($('#storageFilter')) $('#storageFilter').addEventListener('change', renderDonations);
if ($('#sortOrder')) $('#sortOrder').addEventListener('change', renderDonations);

document.querySelectorAll('.cat-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategoryFilter = chip.dataset.cat;
    renderDonations();
  });
});

// Modal open/close
function openModal() {
  const input = document.querySelector('[name="expiry"]');
  if (input) {
    input.min = new Date().toISOString().slice(0, 16);
    input.value = new Date(Date.now() + 4 * 3600000).toISOString().slice(0, 16);
  }
  if ($('#donationDialog')) $('#donationDialog').showModal();
}

function closeModal() {
  if ($('#donationDialog')) $('#donationDialog').close();
}

if ($('#openForm')) $('#openForm').addEventListener('click', openModal);
if ($('#openFormHero')) $('#openFormHero').addEventListener('click', openModal);
if ($('#headerAddBtn')) $('#headerAddBtn').addEventListener('click', openModal);
if ($('#closeForm')) $('#closeForm').addEventListener('click', closeModal);

// Geolocation button
const geoBtn = $('#geoLocBtn');
if (geoBtn) {
  geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      showToast('Acquiring GPS coordinates...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          $('#formArea').value = `GPS: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)} (Current Location)`;
          showToast('GPS coordinates mapped!');
        },
        () => {
          $('#formArea').value = 'Malviya Nagar, Jaipur';
          showToast('Using local municipal zone.');
        }
      );
    }
  });
}

// Form submission
if ($('#donationForm')) {
  $('#donationForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const item = form.get('item').trim();
    const category = form.get('category');
    const storageTemp = form.get('storageTemp');
    const quantity = Number(form.get('quantity'));
    const unit = form.get('unit');
    const area = form.get('area').trim();
    const donor = form.get('donor').trim();
    const contact = form.get('contact').trim();
    const expiry = new Date(form.get('expiry')).toISOString();
    const diet = form.getAll('diet');

    // Convert quantity to lbs for standard calculation
    const qtyLbs = (unit === 'kg') ? (quantity * 2.20462) : quantity;

    const donation = {
      id: `DON-${Date.now().toString().slice(-4)}`,
      itemType: item,
      category,
      storageTemp,
      quantityLbs: Math.round(qtyLbs),
      dietaryTags: diet,
      expiryHours: 4,
      expiryDate: expiry,
      donor,
      contact,
      donorLocation: { lat: 26.8530, lng: 75.8150 },
      area,
      status: 'available',
      matchedShelter: null,
      assignedDriver: null,
      trackingStep: 'Awaiting Match',
      createdAt: new Date().toISOString()
    };

    state.donations.unshift(donation);
    save();
    render();
    closeModal();
    event.currentTarget.reset();

    // Trigger instant matching
    smartMatch(donation);
  });
}

// Certificate generation
const printCertBtn = $('#printCertBtn');
if (printCertBtn) {
  printCertBtn.addEventListener('click', () => {
    window.print();
  });
}

// Reset Demo Data
if ($('#resetDemo')) {
  $('#resetDemo').addEventListener('click', () => {
    state = {
      donations: structuredClone(defaultDonations),
      shelters: structuredClone(defaultShelters),
      drivers: structuredClone(defaultDrivers),
      unit: 'kg'
    };
    save();
    render();
    showToast('Enterprise sample dataset restored.');
  });
}

// Initial render
render();