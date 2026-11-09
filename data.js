// DATA terpisah dari tampilan. Nanti mudah diganti dengan Supabase/Firebase.
const T = (en, id) => ({ en, id });
const UI = {
 en:{home:"Home",explore:"Explore",hotels:"Hotels",restaurants:"Restaurants",transport:"Transportation",services:"Local Services",about:"About Us",login:"Login",
 heroTitle:"Discover the Beauty of Labuan Bajo",heroSub:"Your complete guide to explore, experience, and enjoy Labuan Bajo.",
 searchPh:"Search a business, e.g. boat, hotel, guide",allCat:"All categories",exploreNow:"Explore Now",search:"Search",
 popular:"Popular Destinations",popularSub:"Places travelers visit most around Labuan Bajo.",findSvc:"Find Local Services",findSvcSub:"Pick a category to filter businesses below.",
 featured:"Featured Local Businesses",featuredSub:"Sample listings. All data is DEMO.",from:"From",viewDetails:"View Details",whatsapp:"WhatsApp",
 noResult:"No business matches your search. Try another keyword or category.",reset:"Reset filter",info:"Travel Information",infoSub:"Short guides to plan your trip.",
 read:"Read",close:"Close",demo:"DEMO",footAbout:"Your guide to explore Labuan Bajo.",contact:"Contact",privacy:"Privacy Policy",terms:"Terms and Conditions",social:"Social Media",register:"Register Your Business",
 soon:"This feature is built in a later stage (DEMO prototype).",noWa:"WhatsApp number is not set (DEMO data).",results:"results"},
 id:{home:"Beranda",explore:"Jelajahi",hotels:"Hotel",restaurants:"Restoran",transport:"Transportasi",services:"Layanan Lokal",about:"Tentang Kami",login:"Masuk",
 heroTitle:"Temukan Keindahan Labuan Bajo",heroSub:"Panduan lengkap untuk menjelajah, merasakan, dan menikmati Labuan Bajo.",
 searchPh:"Cari bisnis, mis. kapal, hotel, pemandu",allCat:"Semua kategori",exploreNow:"Mulai Jelajahi",search:"Cari",
 popular:"Destinasi Populer",popularSub:"Tempat yang paling sering dikunjungi di sekitar Labuan Bajo.",findSvc:"Cari Layanan Lokal",findSvcSub:"Pilih kategori untuk memfilter bisnis di bawah.",
 featured:"Bisnis Lokal Unggulan",featuredSub:"Contoh listing. Semua data adalah DEMO.",from:"Mulai",viewDetails:"Lihat Detail",whatsapp:"WhatsApp",
 noResult:"Tidak ada bisnis yang cocok. Coba kata kunci atau kategori lain.",reset:"Reset filter",info:"Informasi Wisata",infoSub:"Panduan singkat untuk merencanakan perjalanan.",
 read:"Baca",close:"Tutup",demo:"DEMO",footAbout:"Panduan Anda menjelajah Labuan Bajo.",contact:"Kontak",privacy:"Kebijakan Privasi",terms:"Syarat dan Ketentuan",social:"Media Sosial",register:"Daftarkan Bisnis Anda",
 soon:"Fitur ini dibuat di tahap berikutnya (prototipe DEMO).",noWa:"Nomor WhatsApp belum diisi (data DEMO).",results:"hasil"}
};
const CATEGORIES = [
 {id:"hotel",icon:"🏨",name:T("Hotels & Accommodation","Hotel & Penginapan")},
 {id:"resto",icon:"🍽️",name:T("Restaurants & Cafes","Restoran & Kafe")},
 {id:"car",icon:"🚗",name:T("Car Rental","Sewa Mobil")},
 {id:"moto",icon:"🛵",name:T("Motorcycle Rental","Sewa Motor")},
 {id:"airport",icon:"🚐",name:T("Airport Transfer","Antar-Jemput Bandara")},
 {id:"laundry",icon:"🧺",name:T("Laundry Service","Laundry")},
 {id:"tour",icon:"🧭",name:T("Tour Operators","Operator Tur")},
 {id:"boat",icon:"⛵",name:T("Boat Charter","Sewa Kapal")},
 {id:"photo",icon:"📷",name:T("Photography","Fotografi")},
 {id:"guide",icon:"🎒",name:T("Tour Guides","Pemandu Wisata")}
];
const DESTINATIONS = [
 {id:"padar",icon:"⛰️",c:["#0b3d5c","#16a5b0"],name:"Pulau Padar",loc:T("Komodo National Park","Taman Nasional Komodo"),desc:T("Famous three-bay viewpoint reached by a short hillside trek.","Titik pandang tiga teluk yang terkenal, dicapai dengan trekking singkat.")},
 {id:"komodo",icon:"🦎",c:["#17445f","#7fb89a"],name:"Pulau Komodo",loc:T("Komodo National Park","Taman Nasional Komodo"),desc:T("Home of the Komodo dragon. Visit with a licensed ranger.","Rumah komodo. Kunjungi bersama ranger resmi.")},
 {id:"pink",icon:"🏖️",c:["#c2557a","#f1b6c6"],name:"Pink Beach",loc:T("Komodo National Park","Taman Nasional Komodo"),desc:T("Pink-tinted sand and clear water for snorkeling.","Pasir berwarna merah muda dan air jernih untuk snorkeling.")},
 {id:"kelor",icon:"🏝️",c:["#0e7c86","#8fe0d4"],name:"Pulau Kelor",loc:T("Near Labuan Bajo","Dekat Labuan Bajo"),desc:T("Small island with a quick hike and sunrise views.","Pulau kecil dengan pendakian singkat dan pemandangan matahari terbit.")},
 {id:"batu",icon:"🕳️",c:["#4a3f35","#c9a66b"],name:"Goa Batu Cermin",loc:T("Labuan Bajo town","Kota Labuan Bajo"),desc:T("Limestone cave where light reflects off the walls.","Gua batu kapur tempat cahaya memantul di dinding.")},
 {id:"sylvia",icon:"🌅",c:["#d9822b","#f4d59a"],name:"Bukit Sylvia",loc:T("Labuan Bajo town","Kota Labuan Bajo"),desc:T("Easy hilltop spot for sunset over the harbor.","Bukit mudah dijangkau untuk melihat matahari terbenam di atas pelabuhan.")},
 {id:"waerebo",icon:"🛖",c:["#2f5d3a","#a8c686"],name:"Wae Rebo",loc:T("Manggarai highlands","Dataran tinggi Manggarai"),desc:T("Traditional Mbaru Niang village in the mountains.","Desa adat Mbaru Niang di pegunungan.")}
];
const BUSINESSES = [
 {id:1,cat:"boat",icon:"⛵",c:["#0b3d5c","#16a5b0"],name:"Contoh Kapal Phinisi (DEMO)",loc:"Labuan Bajo Harbor",price:1500000,rating:4.8,wa:"",desc:T("Sample phinisi charter listing. Not a real business.","Contoh listing sewa kapal phinisi. Bukan bisnis nyata.")},
 {id:2,cat:"hotel",icon:"🏨",c:["#1c6f8a","#9ad8e0"],name:"Contoh Hotel Tepi Pantai (DEMO)",loc:"Waecicu",price:650000,rating:4.5,wa:"",desc:T("Sample beachfront hotel listing.","Contoh listing hotel tepi pantai.")},
 {id:3,cat:"resto",icon:"🍽️",c:["#d9822b","#f4d59a"],name:"Contoh Kafe Seafood (DEMO)",loc:"Kampung Ujung",price:75000,rating:4.6,wa:"",desc:T("Sample seafood cafe listing.","Contoh listing kafe seafood.")},
 {id:4,cat:"moto",icon:"🛵",c:["#34495e","#8fb5c9"],name:"Contoh Sewa Motor (DEMO)",loc:"Labuan Bajo Town",price:100000,rating:4.3,wa:"",desc:T("Sample scooter rental per day.","Contoh sewa motor per hari.")},
 {id:5,cat:"guide",icon:"🎒",c:["#2f5d3a","#a8c686"],name:"Contoh Pemandu Wae Rebo (DEMO)",loc:"Denge",price:350000,rating:4.9,wa:"",desc:T("Sample local guide listing.","Contoh listing pemandu lokal.")},
 {id:6,cat:"airport",icon:"🚐",c:["#17445f","#7fb89a"],name:"Contoh Antar Bandara (DEMO)",loc:"Komodo Airport",price:120000,rating:4.4,wa:"",desc:T("Sample airport transfer listing.","Contoh layanan antar-jemput bandara.")}
];
const ARTICLES = [
 {id:"time",icon:"☀️",title:T("Best Time to Visit Labuan Bajo","Waktu Terbaik ke Labuan Bajo"),body:T("The dry season, roughly April to December, usually brings calmer seas and clearer skies. Check current conditions before booking boats.","Musim kemarau, kira-kira April sampai Desember, biasanya membawa laut lebih tenang dan langit lebih cerah. Cek kondisi terbaru sebelum memesan kapal.")},
 {id:"get",icon:"✈️",title:T("How to Get to Labuan Bajo","Cara ke Labuan Bajo"),body:T("Most visitors fly into Komodo Airport (LBJ), with connections from Bali and Jakarta. Ferries and overland routes from Flores also exist.","Kebanyakan wisatawan terbang ke Bandara Komodo (LBJ), dengan koneksi dari Bali dan Jakarta. Ada juga kapal dan jalur darat dari Flores.")},
 {id:"budget",icon:"💰",title:T("Travel Budget Guide","Panduan Anggaran Perjalanan"),body:T("Costs vary by season and travel style. Compare quotes from several providers and ask what is included, such as park fees.","Biaya berbeda menurut musim dan gaya perjalanan. Bandingkan penawaran beberapa penyedia dan tanyakan apa yang termasuk, misalnya tiket taman nasional.")},
 {id:"todo",icon:"🤿",title:T("Things to Do in Labuan Bajo","Hal yang Bisa Dilakukan di Labuan Bajo"),body:T("Island hopping, snorkeling, diving, sunset hikes, and village visits are popular choices.","Island hopping, snorkeling, menyelam, mendaki saat senja, dan kunjungan desa adalah pilihan populer.")},
 {id:"culture",icon:"🎭",title:T("Local Culture and Traditions","Budaya dan Tradisi Lokal"),body:T("Manggarai and Bajo communities have rich traditions. Ask before photographing people and dress modestly in villages.","Masyarakat Manggarai dan Bajo punya tradisi yang kaya. Minta izin sebelum memotret orang dan berpakaian sopan di desa.")},
 {id:"safety",icon:"🛟",title:T("Travel Safety Tips","Tips Keselamatan Wisata"),body:T("Use licensed operators, wear life jackets on boats, and follow ranger instructions near wildlife.","Gunakan operator berizin, pakai pelampung di kapal, dan ikuti arahan ranger di dekat satwa liar.")}
];
