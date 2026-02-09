/* =========================
  Aplikasi BelajarBareng V6
  [FIXED] Fungsionalitas Star Rating & Supabase Feedback
========================= */

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';
let supabase = null;
try {
  // Pastikan window.supabase tersedia sebelum memanggil createClient
  if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof window.supabase !== 'undefined') {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase client could not be initialized.", e);
}

// Status AI Mentor (Poin 3)
// const IS_AI_MAINTENANCE = true; // [DIHAPUS] Logika ini tidak lagi digunakan.
// AI Mentor sekarang akan langsung memanggil API Gemini.

// --- DATA TOPIK DAN SOAL ---
const SUBJECTS_DATA = {
  "Biologi": [
    { id: "b1", title: "Sistem Pencernaan", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760703550/Belajar_IPA_Sistem_Pencernaan_Manusia_SiapNaikLevel_fnur0d.mp4", description: "Video: organ & proses pencernaan (≤3 menit).", questions: [
      { id: "b1q1", q: "Proses memecah makanan secara kimiawi pertama kali terjadi di?", opts:["Lambung","Mulut","Usus Halus"], a:1 },
      { id: "b1q2", q: "Organ yang menyerap sebagian besar nutrisi adalah?", opts:["Usus Besar","Usus Halus","Lambung"], a:1 },
      { id: "b1q3", q: "Enzim yang memulai pencernaan karbohidrat di mulut adalah?", opts:["Lipase","Pepsin","Amilase"], a:2 },
      { id: "b1q4", q: "Bagian tubuh yang menghasilkan asam klorida (HCl)?", opts:["Pankreas","Lambung","Hati"], a:1 },
      { id: "b1q5", q: "Setelah dicerna, makanan bergerak dari lambung ke?", opts:["Kerongkongan","Usus Halus","Usus Besar"], a:1 },
      { id: "b1q6", q: "Vitamin K dan air diserap di organ?", opts:["Usus Halus","Lambung","Usus Besar"], a:2 },
      { id: "b1q7", q: "Pencernaan protein dimulai di?", opts:["Mulut","Lambung","Usus Halus"], a:1 },
      { id: "b1q8", q: "Yang bukan termasuk organ pencernaan tambahan?", opts:["Hati","Pankreas","Usus Halus"], a:2 },
      { id: "b1q9", q: "Apa fungsi utama empedu?", opts:["Memecah protein","Mengemulsi lemak","Menetralkan asam lambung"], a:1 },
      { id: "b1q10", q: "Gerakan meremas dan mendorong makanan di kerongkongan disebut?", opts:["Gerak Kimiawi","Gerak Peristaltik","Gerak Refleks"], a:1 }
    ] },
    { id: "b2", title: "Sirkulasi Darah", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760709823/barbar/Apa_yang_terjadi_di_dalam_tubuh_saat_darah_mengalir__-_Belajar_IPA_cj8b2r.mp4", description: "Sirkulasi darah ringkas (≤3 menit).", questions: [
      { id: "b2q1", q: "Bagian darah yang berperan dalam pembekuan darah?", opts:["Eritrosit","Leukosit","Trombosit"], a:2 },
      { id: "b2q2", q: "Pembuluh yang membawa darah kaya oksigen dari paru-paru ke jantung?", opts:["Vena Kava","Arteri Pulmonalis","Vena Pulmonalis"], a:2 },
      { id: "b2q3", q: "Sel darah yang berfungsi melawan infeksi?", opts:["Eritrosit","Leukosit","Plasma Darah"], a:1 },
      { id: "b2q4", q: "Sirkulasi darah dari jantung ke seluruh tubuh dan kembali ke jantung disebut?", opts:["Sirkulasi Paru-paru","Sirkulasi Sistemik","Sirkulasi Koroner"], a:1 },
      { id: "b2q5", q: "Ruang jantung yang pertama kali menerima darah kaya oksigen dari paru-paru?", opts:["Serambi Kanan","Bilik Kanan","Serambi Kiri"], a:2 },
      { id: "b2q6", q: "Pembuluh darah terkecil tempat pertukaran gas terjadi?", opts:["Arteri","Vena","Kapiler"], a:2 },
      { id: "b2q7", q: "Warna merah darah disebabkan oleh zat?", opts:["Leukosit","Hemoglobin","Fibrinogen"], a:1 },
      { id: "b2q8", q: "Tekanan darah sistolik terjadi saat jantung..", opts:["Mengembang","Berkontraksi","Istirahat"], a:1 },
      { id: "b2q9", q: "Pembuluh darah yang memiliki katup sepanjang jalannya?", opts:["Arteri","Kapiler","Vena"], a:2 },
      { id: "b2q10", q: "Organ yang berfungsi menyaring darah dan membuang limbah nitrogen?", opts:["Jantung","Paru-paru","Ginjal"], a:2 }
    ] }
  ],
  "Matematika": [
    { id: "m1", title: "Konsep Pecahan", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760751491/barbar/Pecahan_-_Animasi_Matematika_SD_n2roxi.mp4", description: "Apa itu pembilang dan penyebut?", questions: [
      { id: "m1q1", q: "Berapakah hasil dari 1/2 + 1/4?", opts:["2/6","3/4","1/3"], a:1 },
      { id: "m1q2", q: "Angka di bagian bawah pecahan disebut?", opts:["Pembilang","Penyebut","Koefisien"], a:1 },
      { id: "m1q3", q: "Bentuk desimal dari 3/5 adalah?", opts:["0.3","0.6","0.5"], a:1 },
      { id: "m1q4", q: "Pecahan senilai dengan 2/3?", opts:["4/5","6/9","3/4"], a:1 },
      { id: "m1q5", q: "Berapakah hasil dari 5/6 - 1/3?", opts:["4/3","1/2","1/3"], a:2 },
      { id: "m1q6", q: "Angka 0.75 dalam bentuk pecahan biasa adalah?", opts:["1/4","3/4","7/10"], a:1 },
      { id: "m1q7", q: "Hasil perkalian 2/5 x 10/4?", opts:["1","2","1/2"], a:0 },
      { id: "m1q8", q: "Pecahan yang paling besar nilainya: 1/2, 2/5, 3/10?", opts:["1/2","2/5","3/10"], a:0 },
      { id: "m1q9", q: "Berapakah hasil pembagian 4/5 : 2/10?", opts:["8/50","4","2"], a:1 },
      { id: "m1q10", q: "Bentuk persen dari 1/4 adalah?", opts:["14%","25%","40%"], a:1 }
    ] },
    { id: "m2", title: "Teorema Pythagoras", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1761116900/Teorema_Pythagoras_dan_Pembuktian_dengan_Animasi_arpdtu.mp4", description: "Mencari sisi miring segitiga siku-siku.", questions: [
      { id: "m2q1", q: "Rumus Teorema Pythagoras untuk sisi miring (c) adalah?", opts:["a² + b² = c²","a² - b² = c²","a + b = c"], a:0 },
      { id: "m2q2", q: "Jika a=3 dan b=4, maka panjang sisi miring c adalah?", opts:["5","7","25"], a:0 },
      { id: "m2q3", q: "Syarat utama penggunaan Teorema Pythagoras adalah?", opts:["Segitiga sama sisi","Segitiga siku-siku","Segitiga sembarang"], a:1 },
      { id: "m2q4", q: "Jika c=13 dan a=5, maka panjang sisi b adalah?", opts:["8","12","144"], a:1 },
      { id: "m2q5", q: "Tripel Pythagoras yang benar?", opts:["(2, 3, 4)","(5, 12, 13)","(6, 8, 9)"], a:1 },
      { id: "m2q6", q: "Sisi yang berhadapan dengan sudut siku-siku disebut?", opts:["Sisi alas","Sisi tegak","Hipotenusa"], a:2 },
      { id: "m2q7", q: "Jika luas persegi yang dibangun di sisi c adalah 100, dan sisi a adalah 6. Berapa luas persegi di sisi b?", opts:["64","136","16"], a:0 },
      { id: "m2q8", q: "Berapa nilai $x$ jika sisi tegak adalah $x$ dan $x+1$, dan sisi miring adalah 5? ($x$ positif)", opts:["3","4","5"], a:0 },
      { id: "m2q9", q: "Penerapan Pythagoras dalam kehidupan sehari-hari?", opts:["Menghitung volume","Mengukur kemiringan tangga","Menghitung keliling lingkaran"], a:1 },
      { id: "m2q10", q: "Jika $a^2 + b^2 < c^2$, jenis segitiga apa itu?", opts:["Siku-siku","Tumpul","Lancip"], a:1 }
    ] }
  ],
  "Ekonomi": [
    { id: "e1", title: "Permintaan & Penawaran", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760750374/introduction-to-supply-and-demand_PwrjcZaP_x6tsu1.mp4", description: "Mengenal kurva D dan S (≤3 menit).", questions: [
      { id: "e1q1", q: "Jika harga barang naik, maka jumlah barang yang diminta cenderung...", opts:["Naik","Tetap","Turun"], a:2 },
      { id: "e1q2", q: "Titik pertemuan kurva permintaan dan penawaran disebut?", opts:["Harga Maksimum","Keseimbangan Pasar","Titik Impas"], a:1 },
      { id: "e1q3", q: "Hukum Penawaran menyatakan jika harga naik, maka jumlah barang yang ditawarkan...", opts:["Menurun","Tetap","Meningkat"], a:2 },
      { id: "e1q4", q: "Faktor utama yang menyebabkan pergerakan sepanjang kurva permintaan?", opts:["Pendapatan Konsumen","Perubahan Harga Barang Itu Sendiri","Selera Konsumen"], a:1 },
      { id: "e1q5", q: "Jika pendapatan konsumen meningkat, kurva permintaan akan bergeser ke...", opts:["Kiri","Kanan","Tetap di tempat"], a:1 },
      { id: "e1q6", q: "Contoh barang komplementer?", opts:["Kopi dan Teh","Gula dan Kopi","Laptop dan PC"], a:1 },
      { id: "e1q7", q: "Kondisi dimana jumlah barang yang diminta lebih besar dari yang ditawarkan?", opts:["Surplus","Keseimbangan","Kekurangan (Shortage)"], a:2 },
      { id: "e1q8", q: "Kenaikan biaya produksi akan menggeser kurva penawaran ke...", opts:["Kanan","Kiri","Tetap di tempat"], a:1 },
      { id: "e1q9", q: "Elastisitas yang nilainya lebih dari 1 disebut elastis...", opts:["Inelastis","Sempurna","Elastis"], a:2 },
      { id: "e1q10", q: "Permintaan pasar adalah penjumlahan dari...", opts:["Permintaan Individu","Penawaran Pasar","Pendapatan Nasional"], a:0 }
    ] }
  ]
};

// --- STATE APLIKASI ---
const appState = {
  subjects: SUBJECTS_DATA,
  currentSubject: null,
  currentTopicIndex: null,
  sessionSeconds: 300,
  timerHandle: null,
  remainingSeconds: 300,
  quizQueue: [],
  points: 0,
  completed: {},
  userName: '',
  currentRating: 0, // NEW: State untuk menyimpan rating saat ini
};

function loadState(){
  try {
    const raw = localStorage.getItem('bb_state_v3');
    if(raw){
      const s = JSON.parse(raw);
      if(s.points) appState.points = s.points;
      if(s.completed) appState.completed = s.completed;
    }
    // Pastikan nama pengguna memiliki nilai default, bahkan jika kosong
    appState.userName = localStorage.getItem('bb_username_v3') || 'Pemain Anonim'; 
  } catch(e) { console.warn("Gagal memuat state:", e); }
}

function saveState(){
  const toSave = { points: appState.points, completed: appState.completed };
  localStorage.setItem('bb_state_v3', JSON.stringify(toSave));
}

// --- KUMPULAN ELEMEN UI ---
const ui = {
    pageContainer: document.getElementById('pageContainer'),
    notification: document.getElementById('notification'),
    splashScreen: document.getElementById('splashScreen'),
    subjectsWrap: document.getElementById('subjectGrid'),
    topicsWrap: document.getElementById('topicGrid'),
    topicTitle: document.getElementById('topicTitle'),
    topicVideo: document.getElementById('topicVideo'),
    sessTimer: document.getElementById('sessTimer'),
    startSessionBtn: document.getElementById('startSession'),
    progBar: document.getElementById('progBar'),
    quizArea: document.getElementById('quizArea'),
    questionWrap: document.getElementById('questionWrap'),
    remainingQ: document.getElementById('remainingQ'),
    endSessionBtn: document.getElementById('endSession'),
    doneTopicsEl: document.getElementById('doneTopics'),
    totalPointsEl: document.getElementById('totalPoints'),
    mentorLog: document.getElementById('mentorLog'),
    mentorInput: document.getElementById('mentorInput'),
    sendMentorBtn: document.getElementById('sendMentor'),
    completionOverlay: document.getElementById('completionOverlay'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    sidebar: document.getElementById('sidebar'),
    navLinks: document.querySelectorAll('.nav-link'),
    pages: document.querySelectorAll('.page'),
    userNameInput: document.getElementById('userNameInput'),
    startAppBtn: document.getElementById('startAppBtn'),
    welcomeUser: document.getElementById('welcomeUser'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    starRatingContainer: document.getElementById('starRating'),
    feedbackText: document.getElementById('feedbackText'),
    submitFeedbackBtn: document.getElementById('submitFeedback'),
    feedbackThanks: document.getElementById('feedbackThanks'),
    fiturTambahanBtn: document.getElementById('fiturTambahanBtn'),
    backToSubjectsBtn: document.getElementById('backToSubjectsBtn'),
    topicSelectionTitle: document.getElementById('topicSelectionTitle'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
};

// --- MANAJEMEN HALAMAN & NAVIGASI ---
function showPage(pageId) {
    ui.pages.forEach(p => p.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');

    ui.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    ui.sidebar.classList.remove('open');
}

// Fungsi baru untuk menutup sidebar
function closeSidebar() {
    ui.sidebar.classList.remove('open');
}

// Fungsi notifikasi diperbaiki (2000ms = 2 detik)
function showNotification(message) {
    ui.notification.textContent = message;
    ui.notification.classList.add('show');
    
    // Hapus notifikasi setelah 2 detik (2000ms)
    setTimeout(() => {
        ui.notification.classList.remove('show');
    }, 2000); 
}

// --- INISIALISASI APLIKASI ---
function init(){
    // Tampilkan splash screen selama 1.5 detik
    setTimeout(() => {
        ui.splashScreen.classList.add('hidden');
        loadState();
        
        if (appState.userName && appState.userName !== 'Pemain Anonim') {
            ui.userNameDisplay.textContent = appState.userName;
            ui.welcomeUser.style.display = 'block';
            showPage('homePage');
        } else {
            showPage('landingPage');
        }
        renderLeaderboard(); // Panggil di sini agar papan peringkat terisi segera
    }, 1500);

    setupEventListeners();
    setupStarRating(); // NEW: Inisialisasi logika bintang
}

// --- RENDER KONTEN DINAMIS ---
function renderSubjectSelection() {
    ui.subjectsWrap.innerHTML = '';
    Object.keys(appState.subjects).forEach(subjectName => {
        const card = document.createElement('a');
        card.href = "#";
        card.className = 'selection-card';
        card.innerHTML = `<h4>${subjectName}</h4><p>${appState.subjects[subjectName].length} topik tersedia</p>`;
        card.onclick = (e) => {
            e.preventDefault();
            appState.currentSubject = subjectName;
            renderTopicSelection(subjectName);
            showPage('topicSelectionPage');
        };
        ui.subjectsWrap.appendChild(card);
    });
}

function renderTopicSelection(subjectName) {
    ui.topicSelectionTitle.textContent = `Pilih Topik - ${subjectName}`;
    ui.topicsWrap.innerHTML = '';
    const topics = appState.subjects[subjectName];
    topics.forEach((topic, index) => {
        const card = document.createElement('a');
        card.href = "#";
        card.className = 'selection-card';
        const status = appState.completed[topic.id] ? ' (✅ Selesai)' : '';
        card.innerHTML = `<h4>${topic.title} ${status}</h4><p>${topic.description}</p>`;
        card.onclick = (e) => {
            e.preventDefault();
            appState.currentTopicIndex = index;
            loadTopic(index);
            showPage('appPage');
        };
        ui.topicsWrap.appendChild(card);
    });
}

function loadTopic(index){
  const t = currentTopic();
  ui.topicTitle.textContent = t.title;
  const videoSource = ui.topicVideo.querySelector('source');
  if (videoSource) {
    videoSource.src = t.video;
    ui.topicVideo.load();
  }
  appState.quizQueue = shuffleArray(t.questions.map(q=> ({...q, attempts:0}) ));
  renderQuiz();
  updateProgBar();
  updateStats();
}

// --- LOGIKA SESI BELAJAR & KUIS ---
function formatTime(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function startSession(){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  
  appState.remainingSeconds = appState.sessionSeconds;
  ui.sessTimer.textContent = formatTime(appState.remainingSeconds);
  appState.timerHandle = setInterval(()=>{
    appState.remainingSeconds--;
    ui.sessTimer.textContent = formatTime(appState.remainingSeconds);
    if(appState.remainingSeconds <= 0){
      clearInterval(appState.timerHandle);
      endSession(true);
    }
  }, 1000);
  ui.topicVideo.play().catch(()=>{});
  ui.quizArea.style.display = 'block';
  ui.startSessionBtn.textContent = 'Sesi Berjalan';
  ui.startSessionBtn.disabled = true;
}

function renderQuiz(){
  ui.questionWrap.innerHTML = '';
  if(!appState.quizQueue || appState.quizQueue.length === 0){
    ui.questionWrap.innerHTML = '<p class="small">Tidak ada soal tersisa.</p>';
    ui.remainingQ.textContent = 0;
    ui.endSessionBtn.style.display = 'block';
    return;
  }
  const q = appState.quizQueue[0];
  ui.questionWrap.innerHTML = `<p class="question-text">${q.q}</p>`;
  const optsWrap = document.createElement('div');
  optsWrap.className = 'options flex flex-col gap-3 mt-4';
  q.opts.forEach((o, i)=>{
    const op = document.createElement('button');
    op.className = 'option animated-btn btn'; 
    op.innerHTML = `<span>${o}</span>`;
    op.onclick = ()=> handleAnswer(q, i, op);
    optsWrap.appendChild(op);
  });
  ui.questionWrap.appendChild(optsWrap);
  ui.remainingQ.textContent = appState.quizQueue.length;
  ui.endSessionBtn.style.display = 'none';
}

function handleAnswer(question, selectedIndex, elNode){
  const correct = (selectedIndex === question.a);
  elNode.parentElement.querySelectorAll('.option').forEach(node=> node.disabled = true);

  const correctAnswerNode = elNode.parentElement.querySelectorAll('.option')[question.a];
  correctAnswerNode.classList.add('correct');
  
  const isAlreadyCompleted = appState.completed[currentTopic().id];

  if(correct){
    if (!isAlreadyCompleted) appState.points += 10;
    appState.quizQueue.shift();
  } else {
    elNode.classList.add('wrong');
    appState.quizQueue.push(appState.quizQueue.shift()); // Kembalikan ke akhir antrian
  }
  
  setTimeout(()=>{
    if(appState.quizQueue.length > 0){
      renderQuiz();
    } else {
      ui.questionWrap.innerHTML = '<p class="small" style="text-align:center;">🎉<br/><b>Selamat!</b><br/>Semua soal selesai.</p>';
      // endSession akan dipanggil oleh tombol Akhiri Sesi atau timer.
      ui.endSessionBtn.style.display = 'block';
    }
    updateStats();
  }, 1200);
}

function endSession(timedOut=false){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  
  const t = currentTopic();
  const isAlreadyCompleted = appState.completed[t.id];
  
  if (!isAlreadyCompleted) {
      appState.points += 20; // Bonus
      markCompleted(true);
      showNotification(`Topik selesai! Bonus 20 poin untuk topik "${t.title}".`);
      if(window.confetti) confetti();
  } else {
      showNotification(`Anda menyelesaikan topik "${t.title}" lagi! Kerja bagus!`);
  }
  
  ui.sessTimer.textContent = formatTime(appState.sessionSeconds);
  ui.startSessionBtn.textContent = 'Mulai Sesi';
  ui.startSessionBtn.disabled = false;
  
  // Sembunyikan kuis setelah 3 detik
  setTimeout(() => {
    ui.quizArea.style.display = 'none';
  }, 3000);
  
  updateStats();
}

function markCompleted(success){
  if(success) appState.completed[currentTopic().id] = true;
  updateStats();
  renderTopicSelection(appState.currentSubject); // Refresh list topik
}

function shuffleArray(arr){
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr;
}
function currentTopic(){ return appState.subjects[appState.currentSubject][appState.currentTopicIndex]; }

function updateProgBar(){
  const topic = currentTopic();
  if (!topic) return;
  const done = appState.completed[topic.id] ? 100 : 0;
  ui.progBar.style.width = done + '%';
}

function updateStats(){
  saveState();
  ui.doneTopicsEl.textContent = Object.values(appState.completed).filter(v=>v).length;
  ui.totalPointsEl.textContent = appState.points;
  updateProgBar();
  updateUserScore(); // Memanggil update score ke DB
}

// --- PAPAN PERINGKAT & AI MENTOR ---
async function renderLeaderboard() {
    const boardEl = document.getElementById('leaderboard');
    if (!supabase) { 
        boardEl.innerHTML = '<p class="small">⚠️ Database tidak terhubung. Papan peringkat tidak tersedia.</p>';
        return; 
    }
    boardEl.innerHTML = '<p class="small">Memuat data...</p>';

    try {
        const { data, error } = await supabase
            .from('leaderboard').select('name, score').order('score', { ascending: false }).limit(25);

        if (error) { 
            // Jika error, tampilkan pesan spesifik
            boardEl.innerHTML = `<p class="small">Gagal memuat: Periksa RLS/Schema Tabel di Supabase. (${error.message})</p>`; 
            console.error('Supabase Leaderboard Error (Check RLS/Schema):', error);
            return; 
        }
        
        boardEl.innerHTML = '';
        if (data && data.length > 0) {
            const emojis = ['🥇', '🥈', '🥉'];
            data.forEach((entry, idx) => {
                const div = document.createElement('div');
                // Tambahkan pengecekan jika entry.name null/undefined
                const entryName = entry.name || 'Nama Kosong'; 
                div.className = `leaderboard-entry small ${entryName === appState.userName ? 'current-user' : ''}`;
                const rank = emojis[idx] || `${idx + 1}.`;
                div.innerHTML = `${rank} <span><strong>${entryName}</strong></span> <span>${entry.score} poin</span>`;
                boardEl.appendChild(div);
            });
        } else {
            boardEl.innerHTML = '<p class="small">Belum ada data di papan peringkat. Mulai kuis untuk masuk!</p>';
        }
    } catch (e) {
         boardEl.innerHTML = '<p class="small">Gagal memuat data karena error koneksi/eksekusi.</p>';
         console.error("Leaderboard Fetch Error:", e);
    }
}

async function updateUserScore() {
    // Hanya update jika nama pengguna valid dan supabase terhubung
    if (appState.userName === 'Pemain Anonim' || !supabase) return; 
    try {
        // Gunakan upsert dengan kolom name dan score
        const { error } = await supabase.from('leaderboard').upsert({ name: appState.userName, score: appState.points }, { onConflict: 'name' });
        if (error) throw error;
        renderLeaderboard();
    } catch(e) {
        console.warn("Gagal update score ke Supabase:", e.message);
    }
}

// --- FUNGSI BARU UNTUK INTEGRASI GEMINI API ---

/**
 * Helper fetch dengan exponential backoff untuk menangani rate limiting (429)
 * atau kesalahan server (5xx).
 */
async function fetchWithBackoff(url, options, maxRetries = 3) {
    let delay = 1000; // 1 detik
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);

            if (response.ok) {
                return response.json(); // Sukses
            } else if (response.status === 429 || response.status >= 500) {
                // Throttling atau server error, coba lagi
                console.warn(`Attempt ${i + 1} failed with status ${response.status}. Retrying in ${delay}ms...`);
            } else {
                // Kesalahan klien (cth: 400 Bad Request), jangan coba lagi
                const errorBody = await response.text();
                throw new Error(`Client error: ${response.status} ${response.statusText}. Body: ${errorBody}`);
            }
        } catch (error) {
            // Kesalahan jaringan atau error yang dilempar dari blok else
            console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`, error.message);
            if (i + 1 >= maxRetries) {
                 // Jika ini adalah percobaan terakhir, lempar error
                 throw new Error(`Failed to fetch after ${maxRetries} attempts. Last error: ${error.message}`);
            }
        }
        // Tunggu sebelum mencoba lagi
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Double delay
    }
    // Jika loop selesai tanpa return, berarti semua percobaan gagal
    throw new Error(`Failed to fetch after ${maxRetries} attempts.`);
}

/**
 * Memanggil Gemini API dengan prompt pengguna.
 */
async function callGeminiAPI(userQuery) {
    // Sistem prompt untuk memandu AI
    const systemPrompt = "Anda adalah 'Mentor AI' untuk platform belajar BARBAR. Berikan jawaban yang singkat (maksimal 2-3 kalimat), jelas, dan mendidik. Selalu bersikap ramah dan suportif. Gunakan Bahasa Indonesia.";
    
    const apiKey = ""; // API Key akan diisi oleh environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        // Konfigurasi keamanan untuk jawaban yang lebih aman
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    try {
        // Gunakan fetchWithBackoff
        const result = await fetchWithBackoff(apiUrl, options);
        
        const candidate = result.candidates?.[0];
        
        // Cek jika jawaban diblokir karena safety
        if (candidate?.finishReason === 'SAFETY') {
            return "Maaf, saya tidak bisa menjawab pertanyaan tersebut. Topik ini di luar batas keamanan saya.";
        }

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            console.error("Struktur respons API tidak valid:", result);
            return "Maaf, saya menerima respons yang tidak terduga dari server. Coba lagi nanti.";
        }
    } catch (error) {
        console.error("Error memanggil Gemini API:", error);
        // Memberikan pesan error yang lebih ramah ke pengguna
        return `Maaf, terjadi kesalahan saat menyambungkan ke Mentor AI. (${error.message})`;
    }
}


function postMentorMessage(text, who='ai'){ 
    const div = document.createElement('div');
    div.className = 'msg ' + (who==='ai' ? 'ai' : 'user');
    div.textContent = text;
    ui.mentorLog.appendChild(div);
    ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
    return div; // NEW: Kembalikan elemen div agar bisa dimanipulasi
}

// Logika pengiriman pesan mentor (Poin 3)
// Diubah menjadi async untuk menangani API call
async function sendMentorMessage() {
    const v = ui.mentorInput.value.trim();
    if(!v) return;
    postMentorMessage(v, 'user');
    ui.mentorInput.value = '';
    
    // --- Logika Baru dengan Gemini API ---
    
    // 1. Tampilkan pesan loading yang bisa di-update
    // Kita ambil elemen div yang baru dibuat oleh postMentorMessage
    const loadingMsgEl = postMentorMessage('Mentor AI sedang mengetik...', 'ai');
    
    try {
        // 2. Panggil API dan tunggu respons
        const aiResponse = await callGeminiAPI(v);
        
        // 3. Update teks pesan loading tadi dengan respons AI
        loadingMsgEl.textContent = aiResponse;
        
    } catch (error) {
        // 4. Jika gagal, update pesan loading dengan pesan error
        loadingMsgEl.textContent = `Maaf, terjadi kesalahan: ${error.message}`;
        console.error("Gagal total mendapatkan respons AI:", error);
    }
    
    // Scroll lagi untuk memastikan pesan terakhir (jawaban AI) terlihat
    ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
}

// --- LOGIKA FEEDBACK (NEW) ---

function setupStarRating() {
  // 1. Tambahkan event listener untuk setiap bintang
  ui.starRatingContainer.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value, 10);
      appState.currentRating = rating;
      updateStarVisuals(rating);
    });
    // Efek hover
    star.addEventListener('mouseover', () => {
      updateStarVisuals(parseInt(star.dataset.value, 10), true);
    });
    star.addEventListener('mouseout', () => {
      updateStarVisuals(appState.currentRating);
    });
  });
  
  ui.submitFeedbackBtn.addEventListener('click', submitFeedback);
}

function updateStarVisuals(rating, hover = false) {
  ui.starRatingContainer.querySelectorAll('.star').forEach(star => {
    const starValue = parseInt(star.dataset.value, 10);
    
    // Aturan visual: tampilkan bintang penuh (★) jika nilainya <= rating
    if (starValue <= rating) {
      star.textContent = '★'; // Bintang penuh
      star.classList.add('selected');
    } else {
      star.textContent = '☆'; // Bintang kosong
      star.classList.remove('selected');
    }
  });
}

async function submitFeedback() {
    if (!supabase) {
        showNotification('Gagal: Koneksi database tidak tersedia.');
        return;
    }

    const rating = appState.currentRating;
    const feedback = ui.feedbackText.value.trim();

    if (appState.userName === 'Pemain Anonim') {
        showNotification("Mohon masukkan nama Anda di Halaman Depan sebelum memberi penilaian.");
        return;
    }

    if (rating === 0) {
        showNotification('Anda harus memberikan minimal 1 bintang.');
        return;
    }

    ui.submitFeedbackBtn.disabled = true;
    ui.submitFeedbackBtn.innerHTML = '<span>Mengirim...</span>';

    try {
        // Gunakan tabel 'feedback' yang akan kita buat di Supabase
        const { error } = await supabase
            .from('feedback') 
            .insert([
                {
                    user_name: appState.userName,
                    rating: rating,
                    feedback_text: feedback,
                }
            ]);

        if (error) throw error;

        ui.feedbackThanks.style.display = 'block';
        showNotification('Terima kasih! Penilaian Anda berhasil dikirim.');

        // Reset UI setelah sukses
        appState.currentRating = 0;
        ui.feedbackText.value = '';
        updateStarVisuals(0);
        
        setTimeout(() => {
            ui.feedbackThanks.style.display = 'none';
            ui.submitFeedbackBtn.disabled = false;
            ui.submitFeedbackBtn.innerHTML = '<span>Kirim Feedback</span>';
        }, 3000);

    } catch (e) {
        console.error('Gagal mengirim feedback:', e);
        showNotification('Gagal mengirim feedback: ' + (e.message || 'Periksa RLS/Tabel Feedback di Supabase.'));
        ui.submitFeedbackBtn.disabled = false;
        ui.submitFeedbackBtn.innerHTML = '<span>Kirim Feedback</span>';
    }
}


// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Toggle Sidebar
    ui.hamburgerBtn.addEventListener('click', () => ui.sidebar.classList.toggle('open'));
    ui.sidebarOverlay.addEventListener('click', closeSidebar); // Tutup sidebar saat overlay diklik
    
    ui.navLinks.forEach(link => {
        if (link.id === 'fiturTambahanBtn') return; 
        link.addEventListener('click', (e) => {
            if (link.target === "_blank") return;
            e.preventDefault();
            const pageId = link.dataset.page;

            if (appState.userName === 'Pemain Anonim' && pageId !== 'landingPage' && pageId !== 'homePage') {
                showPage('landingPage');
                showNotification("Masukkan nama Anda untuk melanjutkan!");
                return;
            }
            
            if (pageId === 'subjectSelectionPage') {
                renderSubjectSelection();
            }
            showPage(pageId);
        });
    });

    ui.startAppBtn.addEventListener('click', () => {
      const name = ui.userNameInput.value.trim();
      if (name.length < 3) {
        showNotification("Nama harus diisi minimal 3 karakter.");
        return;
      }
      appState.userName = name;
      localStorage.setItem('bb_username_v3', name);
      ui.userNameDisplay.textContent = name;
      ui.welcomeUser.style.display = 'block';
      showPage('homePage');
      updateStats(); // Memulai update score (INSERT nama pertama kali)
      renderLeaderboard(); // Segarkan leaderboard setelah nama dimasukkan
    });

    ui.fiturTambahanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification("Fitur ini masih dalam tahap pengembangan.");
        ui.sidebar.classList.remove('open');
    });

    ui.backToSubjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderSubjectSelection();
        showPage('subjectSelectionPage');
    });

    ui.startSessionBtn.addEventListener('click', startSession);
    ui.endSessionBtn.addEventListener('click', () => endSession(false));
    
    ui.mentorInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') ui.sendMentorBtn.click(); });
    ui.sendMentorBtn.addEventListener('click', sendMentorMessage);
}

// --- Mulai Aplikasi ---
init();
