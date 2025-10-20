/* =========================
  Aplikasi BelajarBareng
  ========================= */

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://rgntufyuatlkikwuyrxx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Qb5hBsxj26EbriOtqipRBQ_a9HNxjx0';

let supabase = null;
try {
  if (SUPABASE_URL !== 'URL_SUPABASE_ANDA' && SUPABASE_ANON_KEY !== 'KUNCI_ANON_SUPABASE_ANDA' && window.supabase) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase client could not be initialized. Please check your URL and Key.", e);
}

// --- DATA TOPIK DAN SOAL ---
const SUBJECTS_DATA = {
  "Biologi": [
    { id: "b1", title: "Sistem Pencernaan", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760703550/Belajar_IPA_Sistem_Pencernaan_Manusia_SiapNaikLevel_fnur0d.mp4", description: "Video: organ & proses pencernaan (≤3 menit).", questions: [
      { id: "b1q1", q: "Proses memecah makanan secara kimiawi pertama kali terjadi di?", opts:["Lambung","Mulut","Usus Halus"], a:1 },
      { id: "b1q2", q: "Organ yang menyerap sebagian besar nutrisi adalah?", opts:["Usus Besar","Usus Halus","Lambung"], a:1 },
      { id: "b1q3", q: "Enzim yang memulai pencernaan karbohidrat di mulut adalah?", opts:["Lipase","Pepsin","Amilase"], a:2 },
      { id: "b1q4", q: "Cairan empedu, yang membantu mencerna lemak, diproduksi oleh organ apa?", opts:["Pankreas", "Hati", "Kantung Empedu"], a:1 },
      { id: "b1q5", q: "Fungsi utama usus besar adalah?", opts:["Mencerna protein", "Menyerap air", "Menghasilkan enzim"], a:1 },
      { id: "b1q6", q: "Gerakan meremas-remas makanan oleh kerongkongan disebut?", opts:["Difusi", "Osmosis", "Gerak peristaltik"], a:2 },
      { id: "b1q7", q: "Vitamin K banyak diproduksi oleh bakteri baik di dalam?", opts:["Lambung", "Usus halus", "Usus besar"], a:2 },
      { id: "b1q8", q: "Protein mulai dicerna secara kimiawi di organ?", opts:["Mulut", "Lambung", "Usus halus"], a:1 },
      { id: "b1q9", q: "Apa nama katup yang memisahkan lambung dan usus halus?", opts:["Epiglotis", "Sfingter esofagus", "Pilorus"], a:2 },
      { id: "b1q10", q: "Penyakit yang disebabkan oleh peradangan pada usus buntu disebut?", opts:["Maag", "Apendisitis", "Diare"], a:1 }
    ] },
    { id: "b2", title: "Sirkulasi Darah", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760709823/barbar/Apa_yang_terjadi_di_dalam_tubuh_saat_darah_mengalir__-_Belajar_IPA_cj8b2r.mp4", description: "Sirkulasi darah ringkas (≤3 menit).", questions: [
      { id: "b2q1", q: "Bagian darah yang berperan dalam pembekuan darah?", opts:["Eritrosit","Leukosit","Trombosit"], a:2 },
      { id: "b2q2", q: "Pembuluh yang membawa darah kaya oksigen dari paru-paru ke jantung?", opts:["Vena Kava","Arteri Pulmonalis","Vena Pulmonalis"], a:2 },
      { id: "b2q3", q: "Sel darah yang berfungsi mengangkut oksigen adalah?", opts:["Leukosit", "Trombosit", "Eritrosit"], a:2 },
      { id: "b2q4", q: "Bilik jantung yang memompa darah ke seluruh tubuh adalah?", opts:["Bilik Kanan", "Bilik Kiri", "Serambi Kiri"], a:1 },
      { id: "b2q5", q: "Pembuluh darah yang membawa darah kembali ke jantung disebut?", opts:["Arteri", "Vena", "Kapiler"], a:1 },
      { id: "b2q6", q: "Golongan darah yang disebut sebagai donor universal adalah?", opts:["A", "B", "O"], a:2 },
      { id: "b2q7", q: "Penyakit kekurangan sel darah merah disebut?", opts:["Leukemia", "Anemia", "Hipertensi"], a:1 },
      { id: "b2q8", q: "Di manakah sel darah merah diproduksi?", opts:["Hati", "Sumsum tulang", "Limpa"], a:1 },
      { id: "b2q9", q: "Tekanan darah normal untuk orang dewasa adalah sekitar?", opts:["120/80 mmHg", "140/90 mmHg", "100/60 mmHg"], a:0 },
      { id: "b2q10", q: "Apa fungsi utama sel darah putih (leukosit)?", opts:["Mengangkut Oksigen", "Melawan infeksi", "Pembekuan darah"], a:1 }
    ] }
  ],
  "Matematika": [
    { id: "m1", title: "Konsep Pecahan", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760751491/barbar/Pecahan_-_Animasi_Matematika_SD_n2roxi.mp4", description: "Apa itu pembilang dan penyebut?", questions: [
      { id: "m1q1", q: "Berapakah hasil dari 1/2 + 1/4?", opts:["2/6","3/4","1/3"], a:1 },
      { id: "m1q2", q: "Angka di bagian bawah pecahan disebut?", opts:["Pembilang","Penyebut","Koefisien"], a:1 },
      { id: "m1q3", q: "Bentuk sederhana dari pecahan 4/8 adalah?", opts:["1/2", "2/4", "1/4"], a:0 },
      { id: "m1q4", q: "Mana yang lebih besar, 2/3 atau 3/5?", opts:["3/5", "Keduanya sama", "2/3"], a:2 },
      { id: "m1q5", q: "Hasil dari 3/4 x 2/3 adalah?", opts:["5/7", "6/12", "1/3"], a:1 },
      { id: "m1q6", q: "Berapa nilai desimal dari 1/5?", opts:["0.1", "0.2", "0.5"], a:1 },
      { id: "m1q7", q: "Ubah 0.75 menjadi bentuk pecahan paling sederhana.", opts:["75/100", "3/4", "7/5"], a:1 },
      { id: "m1q8", q: "Hasil dari 2/5 : 1/5 adalah?", opts:["2", "1/2", "1"], a:0 },
      { id: "m1q9", q: "Ibu memotong kue menjadi 8 bagian. Jika 3 bagian dimakan, sisa kue adalah?", opts:["3/8", "8/3", "5/8"], a:2 },
      { id: "m1q10", q: "1 1/2 jika diubah menjadi pecahan biasa menjadi?", opts:["11/2", "3/2", "2/3"], a:1 }
    ] },
    { id: "m2", title: "Dasar Aljabar", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760751491/barbar/Mengenal_Unsur-Unsur_Aljabar___Matematika_Kelas_7_simenh.mp4", description: "Variabel dan konstanta (≤3 menit).", questions: [
      { id: "m2q1", q: "Jika 2x + 5 = 11, berapakah nilai x?", opts:["2","3","4"], a:1 },
      { id: "m2q2", q: "Pada bentuk aljabar 3a + 7, yang disebut konstanta adalah?", opts:["3a", "a", "7"], a:2 },
      { id: "m2q3", q: "Sederhanakan bentuk 5x + 2y - 3x + y.", opts:["2x + 3y", "8x + 3y", "2x + y"], a:0 },
      { id: "m2q4", q: "Jika a = 4, maka nilai dari 3a - 2 adalah?", opts:["12", "10", "14"], a:1 },
      { id: "m2q5", q: "Variabel pada bentuk aljabar 4p² - q + 5 adalah?", opts:["p dan q", "p saja", "4 dan 5"], a:0 },
      { id: "m2q6", q: "Hasil dari (x + 2)(x + 3) adalah?", opts:["x² + 6", "x² + 5x + 6", "2x + 5"], a:1 },
      { id: "m2q7", q: "Jika 4y = 20, maka nilai y adalah?", opts:["5", "4", "80"], a:0 },
      { id: "m2q8", q: "Suku yang sejenis dari 7ab + 3ac - 5ab adalah?", opts:["7ab dan 3ac", "3ac dan -5ab", "7ab dan -5ab"], a:2 },
      { id: "m2q9", q: "Berapa hasil dari (2x)³?", opts:["6x", "2x³", "8x³"], a:2 },
      { id: "m2q10", q: "Faktorkan bentuk x² - 9.", opts:["(x-3)(x-3)", "(x-9)(x+1)", "(x-3)(x+3)"], a:2 }
    ] }
  ],
  "Ekonomi": [
    { id: "e1", title: "Permintaan & Penawaran", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760750374/introduction-to-supply-and-demand_PwrjcZaP_x6tsu1.mp4", description: "Mengenal kurva D dan S (≤3 menit).", questions: [
      { id: "e1q1", q: "Jika harga barang naik, maka jumlah barang yang diminta cenderung...", opts:["Naik","Tetap","Turun"], a:2 },
      { id: "e1q2", q: "Titik pertemuan kurva permintaan dan penawaran disebut?", opts:["Harga Maksimum","Keseimbangan Pasar","Titik Impas"], a:1 },
      { id: "e1q3", q: "Hukum penawaran menyatakan, jika harga naik, maka jumlah yang ditawarkan akan...", opts:["Naik", "Turun", "Tetap"], a:0 },
      { id: "e1q4", q: "Barang yang permintaannya meningkat ketika pendapatan konsumen meningkat disebut barang...", opts:["Inferior", "Normal", "Publik"], a:1 },
      { id: "e1q5", q: "Pergeseran kurva permintaan ke kanan berarti...", opts:["Permintaan menurun", "Permintaan meningkat", "Penawaran meningkat"], a:1 },
      { id: "e1q6", q: "Faktor yang TIDAK mempengaruhi permintaan adalah...", opts:["Harga barang itu sendiri", "Selera konsumen", "Biaya produksi"], a:2 },
      { id: "e1q7", q: "Ketika jumlah yang ditawarkan lebih besar dari jumlah yang diminta, terjadi...", opts:["Kelangkaan", "Surplus", "Inflasi"], a:1 },
      { id: "e1q8", q: "Pemerintah menetapkan harga di bawah harga keseimbangan, ini disebut...", opts:["Harga dasar (floor price)", "Harga atap (ceiling price)", "Pajak"], a:1 },
      { id: "e1q9", q: "Barang pengganti untuk teh adalah...", opts:["Gula", "Kopi", "Air mineral"], a:1 },
      { id: "e1q10", q: "Elastisitas permintaan mengukur seberapa responsif...", opts:["Penjual terhadap pajak", "Jumlah yang diminta terhadap perubahan harga", "Biaya produksi terhadap teknologi"], a:1 }
    ] }
  ]
};

// --- STATE APLIKASI ---
const appState = {
  subjects: SUBJECTS_DATA,
  currentSubject: "Biologi",
  currentTopicIndex: 0,
  sessionSeconds: 300,
  timerHandle: null,
  remainingSeconds: 300,
  quizQueue: [],
  points: 0,
  completed: {},
  mistakes: {},
  history: [],
  userName: '',
  openaiApiKey: ''
};

function loadState(){
  try{
    const raw = localStorage.getItem('bb_state_v1');
    if(raw){
      const s = JSON.parse(raw);
      if(s.points) appState.points = s.points;
      if(s.completed) appState.completed = s.completed;
      if(s.mistakes) appState.mistakes = s.mistakes;
      if(s.history) appState.history = s.history;
    }
    appState.userName = localStorage.getItem('bb_username_v1') || '';
  }catch(e){ console.warn("loadState err", e); }
}
function saveState(){
  const toSave = { points: appState.points, completed: appState.completed, mistakes: appState.mistakes, history: appState.history };
  localStorage.setItem('bb_state_v1', JSON.stringify(toSave));
}

// --- KUMPULAN SEMUA ELEMEN UI ---
const ui = {
    subjectsWrap: document.getElementById('subjectsWrap'),
    topicsWrap: document.getElementById('topicsWrap'),
    topicTitle: document.getElementById('topicTitle'),
    topicVideo: document.getElementById('topicVideo'),
    sessTimer: document.getElementById('sessTimer'),
    startSessionBtn: document.getElementById('startSession'),
    skipTopicBtn: document.getElementById('skipTopic'),
    progBar: document.getElementById('progBar'),
    quizArea: document.getElementById('quizArea'),
    questionWrap: document.getElementById('questionWrap'),
    remainingQ: document.getElementById('remainingQ'),
    nextQBtn: document.getElementById('nextQ'),
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
    startFromHomeBtn: document.getElementById('startFromHomeBtn'),
    userNameInput: document.getElementById('userNameInput'),
    startAppBtn: document.getElementById('startAppBtn'),
    welcomeUser: document.getElementById('welcomeUser'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    starRatingContainer: document.getElementById('starRating'),
    feedbackText: document.getElementById('feedbackText'),
    submitFeedbackBtn: document.getElementById('submitFeedback'),
    feedbackThanks: document.getElementById('feedbackThanks')
};


function showPage(pageId) {
    ui.pages.forEach(p => p.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');

    ui.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    ui.sidebar.classList.remove('open');
}

function init(){
    loadState();
    
    if (appState.userName) {
        ui.userNameDisplay.textContent = appState.userName;
        ui.welcomeUser.style.display = 'block';
    }

    renderSubjects();
    loadTopic(0);
    renderLeaderboard();
    initFeedbackSystem();
    setupEventListeners();

    showPage('homePage');
}

function renderSubjects() {
  ui.subjectsWrap.innerHTML = '';
  Object.keys(appState.subjects).forEach(subjectName => {
    const b = document.createElement('button');
    b.className = 'topic-btn' + (subjectName === appState.currentSubject ? ' active' : '');
    b.textContent = subjectName;
    b.onclick = () => {
      appState.currentSubject = subjectName;
      renderSubjects();
      loadTopic(0);
    };
    ui.subjectsWrap.appendChild(b);
  });
}

function renderTopics(){
  ui.topicsWrap.innerHTML = '';
  const currentTopics = appState.subjects[appState.currentSubject];
  currentTopics.forEach((t, idx)=>{
    const b = document.createElement('button');
    b.className = 'topic-btn' + (idx === appState.currentTopicIndex ? ' active':'');
    b.textContent = t.title;
    b.onclick = ()=>{ loadTopic(idx); };
    ui.topicsWrap.appendChild(b);
  });
}

function loadTopic(index){
  appState.currentTopicIndex = index;
  const t = currentTopic();
  document.querySelectorAll('#topicsWrap .topic-btn').forEach((n,i)=> n.classList.toggle('active', i===index));
  ui.topicTitle.textContent = t.title;
  ui.topicVideo.querySelector('source').src = t.video;
  ui.topicVideo.load();
  appState.quizQueue = shuffleArray(t.questions.map(q=> ({...q, attempts:0}) ));
  renderQuiz();
  renderTopics();
  updateProgBar();
}

function formatTime(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function toggleTopicButtons(disabled) {
    document.querySelectorAll('#subjectsWrap .topic-btn, #topicsWrap .topic-btn').forEach(btn => {
        btn.classList.toggle('disabled', disabled);
    });
}

function startSession(){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  
  toggleTopicButtons(true);

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
}

function renderQuiz(){
  ui.questionWrap.innerHTML = '';
  if(!appState.quizQueue || appState.quizQueue.length === 0){
    ui.questionWrap.innerHTML = '<div class="small">Tidak ada soal. Klik lanjut untuk topik berikutnya.</div>';
    ui.nextQBtn.style.display = 'inline-block';
    ui.remainingQ.textContent = 0;
    return;
  }
  const q = appState.quizQueue[0];
  const container = document.createElement('div');
  container.innerHTML = `<div class="question-text">${q.q}</div>`;
  const optsWrap = document.createElement('div');
  optsWrap.className = 'options';
  q.opts.forEach((o, i)=>{
    const op = document.createElement('button');
    op.className = 'option';
    op.textContent = o;
    op.onclick = ()=> handleAnswer(q, i, op);
    optsWrap.appendChild(op);
  });
  container.appendChild(optsWrap);
  ui.questionWrap.appendChild(container);
  ui.remainingQ.textContent = appState.quizQueue.length;
  ui.nextQBtn.style.display = 'none';
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
    appState.history.unshift({ t: new Date().toISOString(), topic: currentTopic().id, q: question.id, result:'correct' });
    appState.quizQueue.shift();
  } else {
    elNode.classList.add('wrong');
    appState.history.unshift({ t: new Date().toISOString(), topic: currentTopic().id, q: question.id, result:'wrong' });
    if(!appState.mistakes[currentTopic().id]) appState.mistakes[currentTopic().id] = {};
    appState.mistakes[currentTopic().id][question.id] = (appState.mistakes[currentTopic().id][question.id]||0) + 1;

    question.attempts = (question.attempts||0) + 1;
    if(question.attempts < 2){
      appState.quizQueue.push(appState.quizQueue.shift());
    } else {
      postMentorMessage(`Sepertinya kamu belum paham soal: "${question.q}". Coba tinjau video lagi.`, 'ai');
      appState.quizQueue.shift();
    }
  }
  
  setTimeout(()=>{
    if(appState.quizQueue.length > 0){
      renderQuiz();
    } else {
      ui.questionWrap.innerHTML = '<div class="small" style="text-align:center; padding: 20px 0;">🎉<br/><b>Selamat!</b><br/>Semua soal selesai untuk topik ini.</div>';
      ui.remainingQ.textContent = 0;
      ui.nextQBtn.style.display = 'inline-block';
      ui.endSessionBtn.style.display = 'inline-block';
    }
    updateStats();
  }, 1200);
}

function triggerCompletionAnimation() {
    if(window.confetti) {
        ui.completionOverlay.style.display = 'block';
        window.confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => { ui.completionOverlay.style.display = 'none'; }, 2000);
    }
}

function endSession(timedOut=false){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  
  toggleTopicButtons(false);
  
  const t = currentTopic();
  const isAlreadyCompleted = appState.completed[t.id];
  const mistakesForTopic = appState.mistakes[t.id] || {};
  const uniqueWrongs = Object.keys(mistakesForTopic).length;
  const totalQs = t.questions.length;
  const successRate = totalQs > 0 ? Math.max(0, totalQs - uniqueWrongs) / totalQs : 1;

  if(successRate >= 0.5) {
    if (!isAlreadyCompleted) {
      appState.points += 20;
      markCompleted(true);
      postMentorMessage(`Bagus! Kamu dapat bonus 20 poin untuk topik "${t.title}".`, 'ai');
      triggerCompletionAnimation();
    } else {
      postMentorMessage(`Kamu menyelesaikan topik "${t.title}" lagi! Kerja bagus!`, 'ai');
    }
  } else {
    if (!isAlreadyCompleted) markCompleted(false);
    postMentorMessage(`Sesi selesai. Perlu latihan lagi untuk topik "${t.title}".`, 'ai');
  }
  
  updateStats();
  ui.quizArea.style.display = 'none';
}

function markCompleted(success){
  const t = currentTopic();
  if(success) appState.completed[t.id] = true;
  else appState.completed[t.id] = appState.completed[t.id] || false;
  updateStats();
}

function nextTopic(){
  toggleTopicButtons(false);
  const currentTopics = appState.subjects[appState.currentSubject];
  const next = (appState.currentTopicIndex + 1) % currentTopics.length;
  loadTopic(next);
}

function shuffleArray(arr){
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr;
}
function currentTopic(){ return appState.subjects[appState.currentSubject][appState.currentTopicIndex]; }

function updateProgBar(){
  const t = currentTopic();
  const done = appState.completed[t.id] ? 100 : 0;
  ui.progBar.style.width = done + '%';
}

function updateStats(){
  saveState();
  ui.doneTopicsEl.textContent = Object.values(appState.completed).filter(v=>v).length;
  ui.totalPointsEl.textContent = appState.points;
  updateProgBar();
  updateUserScore();
}

async function renderLeaderboard() {
    const boardEl = document.getElementById('leaderboard');
    if (!supabase) return;
    boardEl.innerHTML = '<div class="small">Memuat data...</div>';

    const { data: top25, error } = await supabase
        .from('leaderboard').select('name, score').order('score', { ascending: false }).limit(25);

    if (error) {
        boardEl.innerHTML = '<div class="small">Gagal memuat data.</div>';
        return;
    }
    
    boardEl.innerHTML = '';
    if (top25.length > 0) {
        const emojis = ['🥇', '🥈', '🥉'];
        top25.forEach((entry, idx) => {
            const div = document.createElement('div');
            div.className = `leaderboard-entry small ${entry.name === appState.userName ? 'current-user' : ''}`;
            div.innerHTML = `${emojis[idx] || `${idx + 1}.`} <strong>${entry.name}</strong> - ${entry.score} poin`;
            boardEl.appendChild(div);
        });
    }

    if (!top25.some(e => e.name === appState.userName) && appState.userName) {
        const { count } = await supabase.from('leaderboard').select('*', { count: 'exact', head: true }).gt('score', appState.points);
        const rankDiv = document.createElement('div');
        rankDiv.className = 'user-rank current-user';
        rankDiv.innerHTML = `Peringkat Anda: <strong>#${(count ?? 0) + 1}</strong>`;
        boardEl.appendChild(rankDiv);
    }
}

async function updateUserScore() {
    if (!appState.userName || !supabase) return;
    await supabase.from('leaderboard').upsert({ name: appState.userName, score: appState.points }, { onConflict: 'name' });
    renderLeaderboard();
}

function appendMentor(msg, who='ai'){
  const div = document.createElement('div');
  div.className = 'msg ' + (who==='ai' ? 'ai' : 'user');
  div.textContent = msg;
  ui.mentorLog.appendChild(div);
  ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
}
function postMentorMessage(text, who='ai'){ appendMentor(text, who); }

function initFeedbackSystem() {
    const stars = ui.starRatingContainer.querySelectorAll('.star');
    let currentRating = 0;

    function setRating(value) {
        stars.forEach(star => {
            star.innerHTML = star.dataset.value <= value ? '★' : '☆';
            star.classList.toggle('selected', star.dataset.value <= value);
        });
    }
    
    ui.starRatingContainer.addEventListener('mouseover', e => {
        if (!e.target.classList.contains('star')) return;
        const value = e.target.dataset.value;
        stars.forEach(star => star.innerHTML = star.dataset.value <= value ? '★' : '☆');
    });

    ui.starRatingContainer.addEventListener('mouseout', () => setRating(currentRating));
    ui.starRatingContainer.addEventListener('click', e => {
        if (e.target.classList.contains('star')) currentRating = e.target.dataset.value;
    });

    ui.submitFeedbackBtn.addEventListener('click', () => {
        if (currentRating === 0) { alert('Mohon pilih rating bintang.'); return; }
        
        ui.starRatingContainer.style.display = 'none';
        ui.feedbackText.style.display = 'none';
        ui.submitFeedbackBtn.style.display = 'none';
        ui.feedbackThanks.style.display = 'block';
    });
}

function setupEventListeners() {
    ui.hamburgerBtn.addEventListener('click', () => ui.sidebar.classList.toggle('open'));
    
    ui.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.dataset.page);
        });
    });

    ui.startFromHomeBtn.addEventListener('click', () => {
        if (appState.userName) {
            showPage('appPage');
        } else {
            showPage('landingPage');
        }
    });

    ui.startAppBtn.addEventListener('click', () => {
      const name = ui.userNameInput.value.trim();
      if (name.length > 2) {
        appState.userName = name;
        localStorage.setItem('bb_username_v1', name);
        ui.userNameDisplay.textContent = name;
        ui.welcomeUser.style.display = 'block';
        showPage('appPage');
        updateStats();
      } else {
        alert("Nama harus diisi minimal 3 karakter.");
      }
    });

    ui.startSessionBtn.addEventListener('click', startSession);
    ui.skipTopicBtn.addEventListener('click', () => { 
        if(ui.quizArea.style.display === 'block') endSession(false);
        nextTopic();
    });
    ui.nextQBtn.addEventListener('click', () => { 
        if(ui.quizArea.style.display === 'block') endSession(false);
        nextTopic(); 
    });
    ui.endSessionBtn.addEventListener('click', () => endSession(false));
    ui.mentorInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') ui.sendMentorBtn.click(); });
    ui.sendMentorBtn.addEventListener('click', ()=>{
      const v = ui.mentorInput.value.trim();
      if(!v) return;

      appendMentor(v, 'user');
      ui.mentorInput.value = '';
      const lower = v.toLowerCase();
      
      if(appState.openaiApiKey && appState.openaiApiKey.length > 10){
        appState.points = Math.max(0, appState.points - 20);
        postMentorMessage('Bantuan AI Mentor digunakan (-20 poin).', 'ai');
        updateStats();
        // Panggil API OpenAI di sini
      } else {
        if(lower.includes('ringkas')){
          postMentorMessage(`Ringkasan untuk "${currentTopic().title}":\n${currentTopic().questions.map(q=> '- '+ q.q).join('\n')}`, 'ai');
        } else if(lower.includes('ulang soal')){
          const wrongs = appState.mistakes[currentTopic().id] || {};
          const keys = Object.keys(wrongs);
          if(keys.length===0){ 
            postMentorMessage('Belum ada kesalahan untuk topik ini.', 'ai'); 
          } else {
            postMentorMessage('Saya masukkan ulang soal yang pernah salah.', 'ai');
            const wrongQs = currentTopic().questions.filter(q=> keys.includes(q.id)).map(q=> ({...q, attempts:0}));
            appState.quizQueue = wrongQs.concat(appState.quizQueue);
            renderQuiz();
          }
        } else {
          postMentorMessage('Maaf, AI sedang dalam pengembangan. Coba "ringkasan" atau "ulang soal".', 'ai');
        }
      }
    });
}

/* Start app */
init();
