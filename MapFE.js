let map;
let markers = []; 
let donations = [
  {
    id: 1,
    title: "20 Veggie Burgers",
    weight: 5,
    expiry: 2,
    location: "Malviya Nagar",
    lat: 26.8530,
    lng: 75.8150,
    matchedShelter: "Jaipur Food Rescue Bank"
  }
];

function initMap() {
  map = L.map('map').setView([26.83, 75.81], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([26.8200, 75.8000]).addTo(map)
    .bindPopup('<b>Jaipur Food Rescue Bank</b><br>Capacity: 500 lbs');

  fetchImpactStats();
  renderListings();
  updateMapMarkers();
}

function updateMapMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  donations.forEach(item => {
    let marker = L.marker([item.lat, item.lng]).addTo(map)
      .bindPopup(`<b>${item.title}</b><br>${item.weight} kg at ${item.location}${item.matchedShelter ? `<br><small style="color:#15803d">Matched: ${item.matchedShelter}</small>` : ''}`);
    markers.push(marker);
  });
}

async function fetchImpactStats() {
  try {
    const response = await fetch('http://localhost:3000/api/impact');
    if (response.ok) {
      const stats = await response.json();
      document.getElementById('totalMeals').innerText = stats.mealsRescued || 208;
      document.getElementById('totalWeight').innerText = parseFloat(stats.weightDivertedLbs || 250).toFixed(1);
      document.getElementById('totalCO2').innerText = parseFloat(stats.co2eAvoidedKg || 625).toFixed(1);
    }
  } catch {
    const totalW = donations.reduce((sum, d) => sum + (Number(d.weight) || 0), 250);
    document.getElementById('totalMeals').innerText = Math.floor(totalW * 1.2);
    document.getElementById('totalWeight').innerText = totalW.toFixed(1);
    document.getElementById('totalCO2').innerText = (totalW * 2.5).toFixed(1);
  }
}

function renderListings() {
  const container = document.getElementById('listings');
  if (!container) return;
  container.innerHTML = '';

  if (donations.length === 0) {
    container.innerHTML = '<div class="empty-alert">No surplus food available right now.</div>';
    return;
  }

  donations.forEach(item => {
    container.innerHTML += `
      <div class="feed-item">
        <div>
          <h4>${item.title}</h4>
          <div>
            <span class="badge-tag">📍 ${item.location}</span>
            <span class="badge-tag">⚖️ ${item.weight} kg</span>
            <span class="badge-tag">⏱️ ${item.expiry} hrs left</span>
          </div>
          ${item.matchedShelter ? `<div class="badge-route">✓ Routed to: ${item.matchedShelter}</div>` : ''}
        </div>
        <button class="btn-clear" onclick="claimFood(${item.id})">Clear</button>
      </div>
    `;
  });
}

async function fetchCoordinates(address) {
  try {
    const query = encodeURIComponent(address + ', Jaipur, Rajasthan');
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
    const data = await response.json();

    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (error) {
    console.warn("Geocoding failed, using approximate area:", error);
  }

  return { lat: 26.83 + (Math.random() * 0.03), lng: 75.80 + (Math.random() * 0.03) };
}

const foodForm = document.getElementById('foodForm');
if (foodForm) {
  foodForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerText = "Routing via backend...";
    submitBtn.disabled = true;

    const title = document.getElementById('foodTitle').value;
    const weight = parseFloat(document.getElementById('foodWeight').value);
    const expiry = document.getElementById('expiry').value;
    const location = document.getElementById('locationName').value;

    const coords = await fetchCoordinates(location);

    const payload = {
      itemType: title,
      quantityLbs: weight,
      expiryHours: parseInt(expiry),
      donorLocation: { lat: coords.lat, lng: coords.lng }
    };

    let matchedShelter = "Jaipur Food Rescue Bank";

    try {
      const response = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        matchedShelter = result.routeDetails.shelter;
      }
    } catch {
      // Local fallback
    }

    const newItem = {
      id: Date.now(),
      title,
      weight,
      expiry,
      location,
      lat: coords.lat,
      lng: coords.lng,
      matchedShelter
    };

    donations.unshift(newItem);
    renderListings();
    updateMapMarkers();
    fetchImpactStats();

    this.reset();
    map.setView([coords.lat, coords.lng], 13);

    submitBtn.innerText = "Broadcast & match";
    submitBtn.disabled = false;
  });
}

function claimFood(id) {
  donations = donations.filter(item => item.id !== id);
  renderListings();
  updateMapMarkers();
  fetchImpactStats();
}

if (document.getElementById('map')) {
  initMap();
}