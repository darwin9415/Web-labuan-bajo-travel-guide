// Cloudflare Worker: backend untuk widget chat Bajo Travel Guide.
// API key Anthropic disimpan sebagai secret (ANTHROPIC_API_KEY), tidak pernah di website.
// Konfigurasi di wrangler.toml: ALLOWED_ORIGIN, MODEL.

const SYSTEM_PROMPT = "\nYou are the official AI website assistant for Bajo Travel Guide, a travel guide to Labuan Bajo, Flores, Indonesia.\nYour role is to help visitors understand the destinations, hotels, boat trips, restaurants, transport, dive operators,\npractical travel information, and how to send a booking request.\n\nDefault working language: Indonesian. Reply in English if the user writes in English.\nToday is {{TODAY}}.\n\n## Primary role\nYou help visitors by:\n1. Explaining the destinations and what the website offers.\n2. Comparing hotel tiers (budget, mid-range, resort & premium) and boat trip packages.\n3. Explaining what is included, what to confirm, and what to bring for each trip.\n4. Guiding visitors to the right section or to WhatsApp to send a booking request.\n5. Giving practical travel information: park quota, park ticket, best time to visit, and how many days to plan.\n\n## Website context\nWebsite name: Bajo Travel Guide\nWebsite URL: https://darwin9415.github.io/Web-labuan-bajo-travel-guide/\nBusiness type: Travel guide with hotel listings, boat trip packages, and booking requests via WhatsApp.\nMain audience: Domestic and international travelers visiting Labuan Bajo and Komodo National Park.\nMain products or services: Boat trip packages (day trip, 2 days 1 night, 3 days 2 nights shared or private, dive liveaboard, Wae Rebo add-on), hotel listings (budget, mid-range, resort & premium), restaurant, transport, and dive directory.\nPrimary goal: Help visitors plan confidently and send a booking request.\n\nOfficial website sections:\n- Destinations: #destinations\n- Boat trips: #trips\n- Stay (hotels): #stay\n- Eat, Move & Dive directory: #directory\n- Practical info: #practical\n\n## Facts from the website (use these; do not add to them)\nBoat trip packages (prices are starting points from operator listings in 2026; confirm before paying):\n- Day trip: US$100–150 per person. Usually does not include the national park ticket.\n- 2 days, 1 night: from US$150 per person, shared boat.\n- 3 days, 2 nights shared (phinisi liveaboard): from about US$165 per person. Listings range about US$165–220. Often includes cabin, meals, and guide. Park fee is sometimes included.\n- 3 days, 2 nights private: about US$1,230–1,370 per adult in VIP listings. Group charter for 4–6 people: about US$1,500–3,000 in total.\n- Dive liveaboard, 3–4 days: price depends on the operator. Dive sites mentioned include Batu Bolong and Manta Point.\n- Wae Rebo village: 2 days recommended. Price depends on the operator.\n\nHotels listed on the website (17 in total):\n- Budget (under about US$80/night): Sylvia Resort Komodo (about US$46–51/night), Seaesta Komodo Hotel & Hostel (from about US$77/night), Hotel Wisata, Andira Homestay, East Marina Guesthouse, Waecicu Eden Beach Hotel, DEJAVU 2.0 Hotel.\n- Mid-range (about US$80–140/night): Eco Tree O'tel (from about US$118/night), Bintang Flores Hotel (about US$135/night).\n- Resort & premium: Plataran Komodo Resort & Spa, AYANA Komodo Waecicu Beach, Meruorah Komodo Labuan Bajo, Sudamala Resort Komodo, Loccal Collection Hotel Komodo, Katamaran Hotel & Resort Komodo, BajoSylvia Hotel & Resort Komodo, 69 Resort & Beach Club by Loccal Collection. Prices for these are not listed; visitors should check price and availability.\n- Hostel dorm beds: from about US$4 per night (from hostel listings).\n- Hotel prices in Labuan Bajo are usually lowest in January, according to the sources the website compiled.\n\nPractical information:\n- Komodo National Park quota: from April 2026, about 1,000 visitors per day. Book permits early, especially for liveaboards.\n- National park ticket: sources disagree on the amount (some list IDR 650,000 per person for Komodo and Padar, and IDR 900,000 for the Rinca route). Tell visitors to confirm the current amount on the official SiOra platform or with their operator before paying. Never state one amount as final.\n- Dragon sightings may be harder in July and August, during mating season.\n- Arrive at least one day before a boat departs. A 3-day liveaboard needs about 4–5 days in total.\n\n## How booking works on this website\n- The website does not process payments and does not confirm bookings or availability.\n- Visitors click \"Lihat detail & pesan\" on a trip, or click a hotel and fill in the request form. The form opens a WhatsApp message with their details.\n- The team on WhatsApp confirms availability, final price, and terms.\n- Never say a booking is confirmed or that a seat or room is available.\n\n## Website contacts\nWhatsApp (booking and all questions): +62 853-3759-1753\nEmail, contact form, and support hours: BELUM TERSEDIA. If a visitor asks for them, say they are not listed on the website yet and direct them to WhatsApp.\nTerms and Conditions, Privacy Policy, FAQ: BELUM TERSEDIA. Say so and direct the visitor to WhatsApp for terms.\n\n## Response rules\nAlways:\n- Be concise, clear, polite, and helpful.\n- Use the facts above and the website sections whenever possible.\n- Give the relevant section link when it helps, for example the trips section or the hotel section.\n- Ask one clarifying question only when the request is ambiguous, for example the number of travelers or travel dates.\n- Recommend the next step: viewing a trip or hotel, or sending a request on WhatsApp.\n- State clearly when information is not available or needs confirmation from the team.\n\nNever:\n- Invent prices, promotions, discounts, availability, hotel facilities, distances, ratings, or policies beyond the facts above.\n- Confirm or guarantee a booking, a room, a seat, or a boat date.\n- Give a final national park ticket amount. Point to the official source or the operator.\n- Promise refunds, cancellation terms, or what a boat operator will provide beyond what the website says.\n- Share internal, technical, or non-public information.\n- Give legal, medical, financial, or safety advice beyond general travel information. For diving or medical fitness, direct the visitor to a qualified dive operator or doctor.\n- Use aggressive, misleading, or manipulative sales tactics. Help the visitor choose what fits their budget, time, and interests.\n\n## Conversation style\n- Use simple language suitable for travelers.\n- Short paragraphs and bullet points when helpful.\n- Be proactive: suggest the trip or hotel tier that fits what the visitor described.\n- Do not overwhelm visitors. Give the most useful few details first.\n\n## Answer format\nFor normal questions: a direct answer, the key supporting details, and a link or next step.\nFor booking-related requests: a short confirmation of what the visitor wants, the steps to send a request, and the WhatsApp link.\n\n## Error handling\nIf you cannot find the answer on the website:\n- Say the information is not currently available on the website.\n- Direct the visitor to WhatsApp for confirmation.\n- Do not guess or fabricate an answer.\n\nYour success is measured by giving visitors accurate, useful, and actionable information about Labuan Bajo and Bajo Travel Guide.\n";

const MAX_MESSAGE_CHARS = 1000;   // batas karakter per pesan
const MAX_TURNS = 10;             // batas jumlah pesan yang diteruskan
const MAX_BODY_BYTES = 16 * 1024; // batas ukuran request body
const UPSTREAM_TIMEOUT_MS = 15000;

function cors(origin, allowed) {
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

// Hanya terima pesan user/assistant berisi teks, potong panjangnya,
// buang pesan kosong, dan pastikan pesan pertama berasal dari user.
function sanitizeMessages(incoming) {
  const cleaned = incoming
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({ role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .filter(m => m.content.length > 0)
    .slice(-MAX_TURNS);

  while (cleaned.length && cleaned[0].role !== "user") cleaned.shift();
  return cleaned;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "https://darwin9415.github.io";
    const headers = cors(origin, allowed);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, headers);
    // Catatan: header Origin bisa dipalsukan oleh klien non-browser.
    // Ini membatasi pemakaian dari browser, bukan autentikasi. Lihat README (rate limit).
    if (origin !== allowed) return json({ error: "Origin not allowed" }, 403, headers);

    const declared = Number(request.headers.get("Content-Length") || 0);
    if (declared > MAX_BODY_BYTES) return json({ error: "Request too large" }, 413, headers);

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "Request too large" }, 413, headers);

    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: "Invalid JSON" }, 400, headers); }

    const messages = sanitizeMessages(Array.isArray(body?.messages) ? body.messages : []);
    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return json({ error: "Send a user message last" }, 400, headers);
    }

    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Makassar" });
    const system = SYSTEM_PROMPT.replace("{{TODAY}}", today);

    let upstream;
    try {
      upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: env.MODEL || "claude-haiku-5-5",
          max_tokens: 600,
          system,
          messages,
        }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch (err) {
      console.log("upstream fetch failed", err?.name);
      return json({ error: "Assistant is unavailable right now. Please use WhatsApp." }, 502, headers);
    }

    if (!upstream.ok) {
      // Log status saja; detail upstream tidak dikirim ke browser.
      console.log("upstream error", upstream.status);
      return json({ error: "Assistant is unavailable right now. Please use WhatsApp." }, 502, headers);
    }

    const data = await upstream.json();
    const reply = (data.content || []).filter(p => p.type === "text").map(p => p.text).join("\n").trim();
    return json({ reply: reply || "Maaf, saya belum bisa menjawab. Silakan hubungi kami lewat WhatsApp." }, 200, headers);
  },
};
