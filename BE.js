const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ---------------------------------------------------------
// In-memory data + lightweight JSON persistence
// ---------------------------------------------------------

const seedData = {
  shelters: [
    {
      id: "s1",
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
      needs: ["Prepared", "Meals", "Bakery", "Produce"],
      dietaryAccepted: ["Vegetarian", "Vegan", "Halal"]
    },
    {
      id: "s2",
      name: "Downtown Mission",
      location: { lat: 26.9124, lng: 75.7873 },
      area: "C-Scheme",
      city: "Jaipur",
      capacityLbs: 600,
      usedLbs: 210,
      intakeOpen: true,
      contact: "+91 80 2520 1144",
      operatingHours: "24/7 Intake",
      dockInfo: "Main Kitchen Ramp",
      needs: ["Prepared", "Meals", "Produce"],
      dietaryAccepted: ["All Dietary Types"]
    },
    {
      id: "s3",
      name: "Westside Relief Center",
      location: { lat: 26.8940, lng: 75.7440 },
      area: "Sodala",
      city: "Jaipur",
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
      id: "s4",
      name: "Uptown Community Shelter",
      location: { lat: 26.9510, lng: 75.8060 },
      area: "Vaishali Nagar",
      city: "Jaipur",
      capacityLbs: 350,
      usedLbs: 85,
      intakeOpen: true,
      contact: "+91 80 2535 9900",
      operatingHours: "09:00 - 20:00",
      dockInfo: "Dock A Food Storage",
      needs: ["Bakery", "Dairy", "Pantry"],
      dietaryAccepted: ["All Dietary Types"]
    }
  ],

  drivers: [
    {
      id: "D1",
      name: "Rahul Sharma",
      phone: "+91 98290 11223",
      vehicleType: "Refrigerated Van",
      capacityKg: 300,
      rating: 4.9,
      tripsCompleted: 142,
      location: { lat: 26.8310, lng: 75.8050 },
      status: "Available",
      currentJobId: null
    },
    {
      id: "D2",
      name: "Aman Verma",
      phone: "+91 98450 33445",
      vehicleType: "Electric Cargo Van",
      capacityKg: 200,
      rating: 5.0,
      tripsCompleted: 218,
      location: { lat: 26.9000, lng: 75.7900 },
      status: "Available",
      currentJobId: null
    },
    {
      id: "D3",
      name: "Karan Patel",
      phone: "+91 99001 55667",
      vehicleType: "Insulated Sedan",
      capacityKg: 100,
      rating: 4.8,
      tripsCompleted: 89,
      location: { lat: 26.9360, lng: 75.8250 },
      status: "Available",
      currentJobId: null
    },
    {
      id: "D4",
      name: "Priya Nair",
      phone: "+91 98860 77889",
      vehicleType: "Heavy Cargo Van",
      capacityKg: 600,
      rating: 4.9,
      tripsCompleted: 165,
      location: { lat: 26.9610, lng: 75.8390 },
      status: "Available",
      currentJobId: null
    }
  ],

  donations: [
    {
      id: "DON-1001",
      itemType: "Fresh Vegetable Pulao & Tadka Dal",
      category: "Prepared",
      quantityLbs: 35,
      storageTemp: "Hot/Insulated",
      dietaryTags: ["Vegetarian", "Gluten-Free"],
      expiryHours: 3,
      expiryDate: new Date(Date.now() + 3 * 3600000).toISOString(),
      donor: "Green Leaf Kitchen",
      donorLocation: { lat: 26.8530, lng: 75.8150 },
      area: "Malviya Nagar",
      status: "Matched",
      matchedShelter: "Jaipur Food Rescue Bank",
      assignedDriver: "Rahul Sharma",
      trackingStep: "Driver En Route",
      createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
      distanceMiles: 1.8,
      estTransitMinutes: 12
    },
    {
      id: "DON-1002",
      itemType: "Artisan Sourdough Loaves & Croissants",
      category: "Bakery",
      quantityLbs: 22,
      storageTemp: "Ambient",
      dietaryTags: ["Vegetarian"],
      expiryHours: 8,
      expiryDate: new Date(Date.now() + 8 * 3600000).toISOString(),
      donor: "The Daily Bakehouse",
      donorLocation: { lat: 26.9510, lng: 75.8060 },
      area: "Vaishali Nagar",
      status: "Matched",
      matchedShelter: "Uptown Community Shelter",
      assignedDriver: "Priya Nair",
      trackingStep: "In Transit",
      createdAt: new Date(Date.now() - 90 * 60000).toISOString(),
      distanceMiles: 0.9,
      estTransitMinutes: 8
    },
    {
      id: "DON-1003",
      itemType: "Hydroponic Spinach & Cherry Tomatoes",
      category: "Produce",
      quantityLbs: 45,
      storageTemp: "Refrigerated",
      dietaryTags: ["Vegan", "Gluten-Free"],
      expiryHours: 14,
      expiryDate: new Date(Date.now() + 14 * 3600000).toISOString(),
      donor: "Organic Harvest Market",
      donorLocation: { lat: 26.8940, lng: 75.7440 },
      area: "Sodala",
      status: "Posted",
      matchedShelter: null,
      assignedDriver: null,
      trackingStep: "Awaiting Match",
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
      distanceMiles: null,
      estTransitMinutes: null
    }
  ]
};

let db = loadDatabase();

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const saved = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
      return {
        shelters: Array.isArray(saved.shelters) ? saved.shelters : seedData.shelters,
        drivers: Array.isArray(saved.drivers) ? saved.drivers : seedData.drivers,
        donations: Array.isArray(saved.donations) ? saved.donations : seedData.donations
      };
    }
  } catch (error) {
    console.warn("Could not read data.json. Starting with demo data.");
  }

  return JSON.parse(JSON.stringify(seedData));
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (error) {
    console.warn("Could not save data.json:", error.message);
  }
}

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toRad = (n) => n * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function validCoordinates(location) {
  return location &&
    Number.isFinite(Number(location.lat)) &&
    Number.isFinite(Number(location.lng)) &&
    Number(location.lat) >= -90 &&
    Number(location.lat) <= 90 &&
    Number(location.lng) >= -180 &&
    Number(location.lng) <= 180;
}

function inferCategory(itemType) {
  const text = String(itemType || "").toLowerCase();

  if (/(bread|bun|croissant|cake|pastry|bakery|cookie)/.test(text)) return "Bakery";
  if (/(spinach|vegetable|tomato|fruit|produce|salad|potato)/.test(text)) return "Produce";
  if (/(milk|cheese|curd|yogurt|dairy)/.test(text)) return "Dairy";
  if (/(rice|dal|pulao|curry|meal|burger|pizza|prepared)/.test(text)) return "Prepared";

  return "Pantry";
}

function findShelterForDonation(donation) {
  const candidates = db.shelters
    .filter((s) => s.intakeOpen)
    .map((s) => {
      const remaining = s.capacityLbs - s.usedLbs;
      const distance = haversineDistance(
        donation.donorLocation.lat,
        donation.donorLocation.lng,
        s.location.lat,
        s.location.lng
      );

      const categoryFit = s.needs.includes(donation.category) ? 25 : 0;
      const dietaryFit =
        donation.dietaryTags.length === 0 ||
        donation.dietaryTags.some((tag) =>
          s.dietaryAccepted.includes("All Dietary Types") ||
          s.dietaryAccepted.includes(tag)
        ) ? 10 : 0;

      const capacityFit = remaining >= donation.quantityLbs ? 20 : -50;

      // Higher score = better match.
      const score =
        categoryFit +
        dietaryFit +
        capacityFit -
        distance * 2 -
        Math.max(0, 6 - donation.expiryHours) * 3;

      return { shelter: s, distance, remaining, score };
    })
    .sort((a, b) => b.score - a.score);

  return candidates[0] || null;
}

function findNearestDriver(location, quantityLbs) {
  const quantityKg = Number(quantityLbs) * 0.453592;

  const available = db.drivers
    .filter((d) => d.status === "Available" && d.capacityKg >= quantityKg)
    .map((d) => ({
      driver: d,
      distance: haversineDistance(
        location.lat,
        location.lng,
        d.location.lat,
        d.location.lng
      )
    }))
    .sort((a, b) => a.distance - b.distance);

  return available[0] || null;
}

function estimateTransitMinutes(distanceMiles) {
  return Math.max(6, Math.round(distanceMiles * 5));
}

function publicState() {
  return {
    shelters: db.shelters,
    drivers: db.drivers,
    donations: db.donations,
    serverTime: new Date().toISOString()
  };
}

// ---------------------------------------------------------
// Health / state
// ---------------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    name: "Surplus to Shelter API",
    version: "3.0.0",
    status: "online",
    endpoints: {
      health: "/api/health",
      state: "/api/state",
      donations: "/api/donations",
      shelters: "/api/shelters",
      drivers: "/api/drivers",
      impact: "/api/impact",
      geocode: "/api/geocode?q=Malviya%20Nagar",
      route: "/api/route",
      export: "/api/export"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "surplus-to-shelter-backend",
    time: new Date().toISOString()
  });
});

app.get("/api/state", (req, res) => {
  res.json(publicState());
});

// ---------------------------------------------------------
// Donations
// ---------------------------------------------------------

app.get("/api/donations", (req, res) => {
  const { status, search } = req.query;

  let results = [...db.donations];

  if (status && status !== "all") {
    results = results.filter(
      (d) => String(d.status).toLowerCase() === String(status).toLowerCase()
    );
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter((d) =>
      [d.itemType, d.donor, d.area, d.category, d.matchedShelter, d.assignedDriver]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }

  res.json(results);
});

app.get("/api/donations/:id", (req, res) => {
  const donation = db.donations.find((d) => d.id === req.params.id);

  if (!donation) {
    return res.status(404).json({ error: "Donation not found." });
  }

  res.json(donation);
});

app.post("/api/donations", (req, res) => {
  const body = req.body || {};

  const itemType = String(body.itemType || "").trim();
  const quantityLbs = Number(body.quantityLbs);
  const expiryHours = Number(body.expiryHours ?? 4);
  const donorLocation = body.donorLocation;

  if (!itemType || !Number.isFinite(quantityLbs) || quantityLbs <= 0 || !validCoordinates(donorLocation)) {
    return res.status(400).json({
      error: "itemType, positive quantityLbs and valid donorLocation {lat,lng} are required."
    });
  }

  if (!Number.isFinite(expiryHours) || expiryHours < 1) {
    return res.status(400).json({
      error: "Expiry window must be at least 1 hour."
    });
  }

  const category = body.category || inferCategory(itemType);

  const donation = {
    id: `DON-${Date.now()}`,
    itemType,
    category,
    quantityLbs,
    storageTemp: body.storageTemp || "Ambient",
    dietaryTags: Array.isArray(body.dietaryTags) ? body.dietaryTags : [],
    expiryHours,
    expiryDate: new Date(Date.now() + expiryHours * 3600000).toISOString(),
    donor: body.donor || "Anonymous Donor",
    donorLocation: {
      lat: Number(donorLocation.lat),
      lng: Number(donorLocation.lng)
    },
    area: body.area || "Jaipur",
    status: "Posted",
    matchedShelter: null,
    assignedDriver: null,
    trackingStep: "Awaiting Match",
    createdAt: new Date().toISOString(),
    distanceMiles: null,
    estTransitMinutes: null
  };

  const match = findShelterForDonation(donation);

  if (match && match.remaining >= quantityLbs) {
    const driverMatch = findNearestDriver(donorLocation, quantityLbs);

    donation.status = "Matched";
    donation.matchedShelter = match.shelter.name;
    donation.distanceMiles = Number(match.distance.toFixed(2));
    donation.estTransitMinutes = estimateTransitMinutes(match.distance);

    match.shelter.usedLbs += quantityLbs;

    if (driverMatch) {
      donation.assignedDriver = driverMatch.driver.name;
      donation.trackingStep = "Driver En Route";
      driverMatch.driver.status = "Busy";
      driverMatch.driver.currentJobId = donation.id;
    } else {
      donation.trackingStep = "Awaiting Driver";
    }
  }

  db.donations.unshift(donation);
  saveDatabase();

  res.status(201).json({
    message:
      donation.status === "Matched"
        ? "Donation matched and routed successfully."
        : "Donation posted; no suitable capacity/driver was available yet.",
    routeDetails:
      donation.matchedShelter
        ? {
            shelter: donation.matchedShelter,
            distanceToShelter: `${donation.distanceMiles} miles`,
            estTransitMinutes: donation.estTransitMinutes,
            driverAssigned: donation.assignedDriver,
            dockInfo: match.shelter.dockInfo
          }
        : null,
    donationRecord: donation
  });
});

app.patch("/api/donations/:id/status", (req, res) => {
  const donation = db.donations.find((d) => d.id === req.params.id);

  if (!donation) {
    return res.status(404).json({ error: "Donation not found." });
  }

  const { status, trackingStep } = req.body || {};

  if (status) donation.status = status;
  if (trackingStep) donation.trackingStep = trackingStep;

  if (["picked-up", "Picked Up", "Delivered", "completed"].includes(status)) {
    const driver = db.drivers.find((d) => d.name === donation.assignedDriver);

    if (driver) {
      driver.status = "Available";
      driver.currentJobId = null;
      driver.tripsCompleted += 1;
    }

    donation.trackingStep = "Delivered";
  }

  saveDatabase();
  res.json({ message: "Status updated.", donation });
});

// ---------------------------------------------------------
// Dispatch / routing
// ---------------------------------------------------------

app.post("/api/donations/:id/dispatch", (req, res) => {
  const donation = db.donations.find((d) => d.id === req.params.id);

  if (!donation) {
    return res.status(404).json({ error: "Donation not found." });
  }

  if (donation.assignedDriver) {
    return res.status(409).json({
      error: "A driver is already assigned to this donation.",
      driver: donation.assignedDriver
    });
  }

  const driverMatch = findNearestDriver(
    donation.donorLocation,
    donation.quantityLbs
  );

  if (!driverMatch) {
    return res.status(409).json({
      error: "No available driver with enough vehicle capacity."
    });
  }

  donation.assignedDriver = driverMatch.driver.name;
  donation.status = "Matched";
  donation.trackingStep = "Driver En Route";

  driverMatch.driver.status = "Busy";
  driverMatch.driver.currentJobId = donation.id;

  saveDatabase();

  res.json({
    message: "Driver assigned.",
    donation,
    driver: driverMatch.driver,
    distanceMiles: Number(driverMatch.distance.toFixed(2)),
    estTransitMinutes: estimateTransitMinutes(driverMatch.distance)
  });
});

app.post("/api/route", (req, res) => {
  const { from, to } = req.body || {};

  if (!validCoordinates(from) || !validCoordinates(to)) {
    return res.status(400).json({
      error: "from and to must contain valid lat/lng coordinates."
    });
  }

  const distanceMiles = haversineDistance(
    Number(from.lat),
    Number(from.lng),
    Number(to.lat),
    Number(to.lng)
  );

  res.json({
    from,
    to,
    distanceMiles: Number(distanceMiles.toFixed(2)),
    distanceKm: Number((distanceMiles * 1.60934).toFixed(2)),
    estimatedMinutes: estimateTransitMinutes(distanceMiles),
    provider: "Haversine demo route"
  });
});

// ---------------------------------------------------------
// OpenStreetMap Nominatim proxy
// Keeps geocoding out of the browser and avoids CORS issues.
// ---------------------------------------------------------

app.get("/api/geocode", async (req, res) => {
  const q = String(req.query.q || "").trim();

  if (!q) {
    return res.status(400).json({ error: "Missing q query parameter." });
  }

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" +
      encodeURIComponent(`${q}, Jaipur, Rajasthan, India`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "SurplusToShelter/3.0 demo-hackathon"
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({ error: "Location not found." });
    }

    res.json({
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
      displayName: data[0].display_name
    });
  } catch (error) {
    res.status(502).json({
      error: "Geocoding service unavailable.",
      details: error.message
    });
  }
});

// ---------------------------------------------------------
// Shelters / drivers
// ---------------------------------------------------------

app.get("/api/shelters", (req, res) => {
  res.json(db.shelters);
});

app.get("/api/shelters/:id", (req, res) => {
  const shelter = db.shelters.find((s) => s.id === req.params.id);

  if (!shelter) {
    return res.status(404).json({ error: "Shelter not found." });
  }

  res.json(shelter);
});

app.get("/api/drivers", (req, res) => {
  res.json(db.drivers);
});

// ---------------------------------------------------------
// Impact / analytics
// ---------------------------------------------------------

app.get("/api/impact", (req, res) => {
  const baselineLbs = 250;

  const totalWeightDivertedLbs =
    db.donations.reduce((sum, d) => sum + Number(d.quantityLbs || 0), 0) +
    baselineLbs;

  const mealsRescued = Math.floor(totalWeightDivertedLbs / 1.2);
  const co2eAvoidedKg = Number((totalWeightDivertedLbs * 2.5).toFixed(1));
  const waterSavedLiters = Math.round(totalWeightDivertedLbs * 950);
  const monetaryValueSavedINR = Math.round(mealsRescued * 85);

  const categoryBreakdown = db.donations.reduce((acc, d) => {
    const category = d.category || "Other";
    acc[category] = (acc[category] || 0) + Number(d.quantityLbs || 0);
    return acc;
  }, {});

  res.json({
    totalDonationsMatched: db.donations.filter((d) =>
      ["Matched", "Delivered", "picked-up"].includes(d.status)
    ).length,
    totalDonationsCount: db.donations.length,
    weightDivertedLbs: Number(totalWeightDivertedLbs.toFixed(1)),
    weightDivertedKg: Number((totalWeightDivertedLbs * 0.453592).toFixed(1)),
    mealsRescued,
    co2eAvoidedKg,
    waterSavedLiters,
    monetaryValueSavedINR,
    activeDriversCount: db.drivers.filter((d) => d.status === "Available").length,
    totalDriversCount: db.drivers.length,
    activeDonationsCount: db.donations.filter((d) =>
      ["Posted", "Matched"].includes(d.status)
    ).length,
    categoryBreakdown
  });
});

// ---------------------------------------------------------
// CSV export
// ---------------------------------------------------------

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

app.get("/api/export", (req, res) => {
  const headers = [
    "ID",
    "Item",
    "Category",
    "Quantity_Lbs",
    "Storage_Temp",
    "Donor",
    "Area",
    "Status",
    "Shelter",
    "Driver",
    "Created_At"
  ];

  const rows = db.donations.map((d) => [
    d.id,
    d.itemType,
    d.category,
    d.quantityLbs,
    d.storageTemp,
    d.donor,
    d.area,
    d.status,
    d.matchedShelter,
    d.assignedDriver,
    d.createdAt
  ]);

  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => row.map(csvCell).join(","))
  ].join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="food-rescue-log.csv"'
  );
  res.send(csv);
});

// ---------------------------------------------------------
// Reset demo
// ---------------------------------------------------------

app.post("/api/reset", (req, res) => {
  db = JSON.parse(JSON.stringify(seedData));

  // Recreate dynamic timestamps after cloning.
  db.donations.forEach((d) => {
    const hours = Number(d.expiryHours || 4);
    d.expiryDate = new Date(Date.now() + hours * 3600000).toISOString();
  });

  saveDatabase();

  res.json({
    message: "Demo data reset successfully.",
    state: publicState()
  });
});

// ---------------------------------------------------------
// Error handling
// ---------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    error: "API endpoint not found.",
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error."
  });
});

app.listen(PORT, () => {
  console.log("");
  console.log("==============================================");
  console.log("  SURPLUS TO SHELTER BACKEND");
  console.log("==============================================");
  console.log(`  Server: http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
  console.log(`  API:    http://localhost:${PORT}/api/state`);
  console.log("==============================================");
  console.log("");
});
