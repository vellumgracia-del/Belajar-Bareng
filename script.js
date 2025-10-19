/* =========================
  Aplikasi BelajarBareng
  ========================= */

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://rgntufyuatlkikwuyrxx.supabase.co'; // Ganti dengan URL Supabase Anda
const SUPABASE_ANON_KEY = 'sb_publishable_Qb5hBsxj26EbriOtqipRBQ_a9HNxjx0'; // Ganti dengan Kunci Anon Anda

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

/* UI binding */
const subjectsWrap = document.getElementById('subjectsWrap');
const topicsWrap = document.getElementById('topicsWrap');
const topicTitle = document.getElementById('topicTitle');
const topicVideo = document.getElementById('topicVideo');
const sessTimer = document.getElementById('sessTimer');
const startSessionBtn = document.getElementById('startSession');
const skipTopicBtn = document.getElementById('skipTopic');
const progBar = document.getElementById('progBar');
const quizArea = document.getElementById('quizArea');
const questionWrap = document.getElementById('questionWrap');
const remainingQ = document.getElementById('remainingQ');
const nextQBtn = document.getElementById('nextQ');
const endSessionBtn = document.getElementById('endSession');
const pointsEl = document.getElementById('points');
const totalPointsEl = document.getElementById('totalPoints');
const completedCountEl = document.getElementById('completedCount');
const topicCountEl = document.getElementById('topicCount');
const doneTopicsEl = document.getElementById('doneTopics');
const historyEl = document.getElementById('history');
const tipsEl = document.getElementById('tips');
const mentorLog = document.getElementById('mentorLog');
const mentorInput = document.getElementById('mentorInput');
const sendMentorBtn = document.getElementById('sendMentor');
const completionOverlay = document.getElementById('completionOverlay');

const splashScreen = document.getElementById('splashScreen');
const landingScreen = document.getElementById('landingScreen');
const mainScreen = document.getElementById('mainScreen');
const userNameInput = document.getElementById('userNameInput');
const startAppBtn = document.getElementById('startAppBtn');

/* Initialize */
loadState();

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  if(target) target.classList.add('active');
}

function init(){
  showScreen('splashScreen');

  setTimeout(() => {
    renderSubjects();
    loadTopic(0);
    updateStats();
    renderHistory();
    renderLeaderboard();

    if (appState.userName) {
      userNameInput.value = appState.userName;
      showScreen('mainScreen');
    } else {
      showScreen('landingScreen');
    }
  }, 2500);
}

function renderSubjects() {
  subjectsWrap.innerHTML = '';
  Object.keys(appState.subjects).forEach(subjectName => {
    const b = document.createElement('button');
    b.className = 'topic-btn' + (subjectName === appState.currentSubject ? ' active' : '');
    b.textContent = subjectName;
    b.onclick = () => {
      appState.currentSubject = subjectName;
      renderSubjects();
      loadTopic(0);
    };
    subjectsWrap.appendChild(b);
  });
}

function renderTopics(){
  topicsWrap.innerHTML = '';
  const currentTopics = appState.subjects[appState.currentSubject];
  topicCountEl.textContent = currentTopics.length;
  currentTopics.forEach((t, idx)=>{
    const b = document.createElement('button');
    b.className = 'topic-btn' + (idx === appState.currentTopicIndex ? ' active':'');
    b.textContent = t.title;
    b.onclick = ()=>{ loadTopic(idx); };
    topicsWrap.appendChild(b);
  });
}

function loadTopic(index){
  appState.currentTopicIndex = index;
  const t = currentTopic();
  document.querySelectorAll('#topicsWrap .topic-btn').forEach((n,i)=> n.classList.toggle('active', i===index));
  topicTitle.textContent = t.title;
  topicVideo.querySelector('source').src = t.video;
  topicVideo.load();
  topicVideo.onloadedmetadata = ()=>{
    tipsEl.textContent = t.description;
  };
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

function startSession(){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  appState.remainingSeconds = appState.sessionSeconds;
  sessTimer.textContent = formatTime(appState.remainingSeconds);
  appState.timerHandle = setInterval(()=>{
    appState.remainingSeconds--;
    sessTimer.textContent = formatTime(appState.remainingSeconds);
    if(appState.remainingSeconds <= 0){
      clearInterval(appState.timerHandle);
      endSession(true);
    }
  }, 1000);
  topicVideo.play().catch(()=>{});
  quizArea.style.display = 'block';
  updateStats();
}

function renderQuiz(){
  questionWrap.innerHTML = '';
  if(!appState.quizQueue || appState.quizQueue.length === 0){
    questionWrap.innerHTML = '<div class="small">Tidak ada soal. Klik lanjut untuk topik berikutnya.</div>';
    nextQBtn.style.display = 'inline-block';
    remainingQ.textContent = 0;
    return;
  }
  const q = appState.quizQueue[0];
  const container = document.createElement('div');
  container.className = 'question';
  container.innerHTML = `<div style="font-weight:600; font-size:16px;">${q.q}</div>`;
  const optsWrap = document.createElement('div');
  optsWrap.className = 'options';
  q.opts.forEach((o, i)=>{
    const op = document.createElement('div');
    op.className = 'option';
    op.textContent = o;
    op.onclick = ()=> handleAnswer(q, i, op);
    optsWrap.appendChild(op);
  });
  container.appendChild(optsWrap);
  questionWrap.appendChild(container);
  remainingQ.textContent = appState.quizQueue.length;
  nextQBtn.style.display = 'none';
  endSessionBtn.style.display = 'none';
}

function handleAnswer(question, selectedIndex, elNode){
  const correct = (selectedIndex === question.a);
  elNode.parentElement.querySelectorAll('.option').forEach(node=> node.style.pointerEvents='none');

  const correctAnswerNode = elNode.parentElement.querySelectorAll('.option')[question.a];
  correctAnswerNode.classList.add('correct');

  if(correct){
    appState.points += 10;
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
  saveState();
  updateStats();
  setTimeout(()=>{
    if(appState.quizQueue.length > 0){
      renderQuiz();
    } else {
      questionWrap.innerHTML = '<div class="small" style="text-align:center; padding: 20px 0;">🎉<br/><b>Selamat!</b><br/>Semua soal selesai untuk topik ini.</div>';
      remainingQ.textContent = 0;
      nextQBtn.style.display = 'inline-block';
      endSessionBtn.style.display = 'inline-block';
    }
  }, 1800);
}

function triggerCompletionAnimation() {
    if(window.confetti) {
        completionOverlay.style.display = 'block';
        window.confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => { completionOverlay.style.display = 'none'; }, 2000);
    }
}

function endSession(timedOut=false){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  const t = currentTopic();
  const mistakesForTopic = appState.mistakes[t.id] || {};
  const uniqueWrongs = Object.keys(mistakesForTopic).length;
  const totalQs = t.questions.length;
  const successRate = totalQs > 0 ? Math.max(0, totalQs - uniqueWrongs) / totalQs : 1;

  if(successRate >= 0.5) {
    appState.points += 20;
    appState.history.unshift({ t: new Date().toISOString(), topic: t.id, q: 'session', result: 'completed' });
    markCompleted(true);
    postMentorMessage(`Bagus! Kamu dapat bonus 20 poin untuk topik "${t.title}".`, 'ai');
    triggerCompletionAnimation();
  } else {
    appState.history.unshift({ t: new Date().toISOString(), topic: t.id, q: 'session', result: 'partial' });
    markCompleted(false);
    postMentorMessage(`Sesi selesai. Perlu latihan lagi untuk topik "${t.title}".`, 'ai');
  }
  saveState();
  updateStats();
  quizArea.style.display = 'none';
}

function markCompleted(success){
  const t = currentTopic();
  if(success) appState.completed[t.id] = true;
  else appState.completed[t.id] = appState.completed[t.id] || false;
  saveState();
  updateStats();
}

function nextTopic(){
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
  progBar.style.width = done + '%';
}

function updateStats(){
  pointsEl.textContent = appState.points;
  totalPointsEl.textContent = appState.points;
  const doneCount = Object.values(appState.completed).filter(v=>v).length;
  doneTopicsEl.textContent = doneCount;
  completedCountEl.textContent = doneCount;
  updateProgBar();
  renderHistory();
  updateUserScore();
}

function renderHistory(){
  if(!appState.history || appState.history.length===0){ historyEl.textContent = 'Belum ada riwayat.'; return; }
  const lines = appState.history.slice(0,5).map(h=>{
    let topicTitle = h.topic;
    for(const subject in appState.subjects) {
      const found = appState.subjects[subject].find(x=>x.id===h.topic);
      if(found) { topicTitle = found.title; break; }
    }
    const when = new Date(h.t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const icon = h.result === 'correct' ? '✅' : h.result === 'completed' ? '🏆' : '❌';
    return `<div>${icon} [${when}] ${topicTitle}</div>`;
  });
  historyEl.innerHTML = lines.join('');
}

async function renderLeaderboard() {
    const boardEl = document.getElementById('leaderboard');
    if (!supabase) {
        boardEl.innerHTML = '<div class="small">Supabase belum dikonfigurasi.</div>';
        return;
    }
    boardEl.innerHTML = '<div class="small">Memuat data...</div>';

    const { data: top25, error: top25Error } = await supabase
        .from('leaderboard')
        .select('name, score')
        .order('score', { ascending: false })
        .limit(25);

    if (top25Error) {
        console.error('Gagal mengambil data leaderboard:', top25Error);
        boardEl.innerHTML = '<div class="small">Gagal memuat data. Periksa konsol.</div>';
        return;
    }

    if (top25.length === 0) {
        boardEl.innerHTML = '<div class="small">Belum ada data. Jadilah yang pertama!</div>';
    } else {
        boardEl.innerHTML = '';
        const emojis = ['🥇', '🥈', '🥉'];
        top25.forEach((entry, idx) => {
            const div = document.createElement('div');
            div.className = 'small';
            const rank = emojis[idx] || `${idx + 1}.`;
            div.innerHTML = `${rank} <strong>${entry.name}</strong> - ${entry.score} poin`;
            boardEl.appendChild(div);
        });
    }

    const userInTop25 = top25.some(entry => entry.name === appState.userName);

    if (!userInTop25 && appState.userName) {
        const { count, error: countError } = await supabase
            .from('leaderboard')
            .select('*', { count: 'exact', head: true })
            .gt('score', appState.points);
        
        if (countError) {
            console.error('Gagal menghitung peringkat pengguna:', countError);
            return;
        }

        const userRank = (count ?? 0) + 1;
        
        const rankDiv = document.createElement('div');
        rankDiv.className = 'user-rank';
        rankDiv.innerHTML = `Peringkat Anda: <strong>#${userRank}</strong> dengan ${appState.points} poin`;
        boardEl.appendChild(rankDiv);
    }
}


async function updateUserScore() {
    if (!appState.userName || !supabase) return;
    const { error } = await supabase
        .from('leaderboard')
        .upsert({ name: appState.userName, score: appState.points }, { onConflict: 'name' });

    if (error) {
        console.error('Gagal update skor:', error);
    } else {
        renderLeaderboard();
    }
}

function appendMentor(msg, who='ai'){
  const div = document.createElement('div');
  div.className = 'msg ' + (who==='ai' ? 'ai' : 'user');
  div.textContent = msg;
  mentorLog.appendChild(div);
  mentorLog.scrollTop = mentorLog.scrollHeight;
}
function postMentorMessage(text, who='ai'){ appendMentor(text, who); }

/* Event Listeners */
startAppBtn.addEventListener('click', ()=>{
  const name = userNameInput.value.trim();
  if (name.length > 2) {
    appState.userName = name;
    localStorage.setItem('bb_username_v1', name);
    showScreen('mainScreen');
    updateStats();
  } else {
    alert("Nama harus diisi minimal 3 karakter.");
  }
});

startSessionBtn.addEventListener('click', startSession);
skipTopicBtn.addEventListener('click', ()=>{ markCompleted(false); nextTopic(); });
nextQBtn.addEventListener('click', ()=>{ markCompleted(true); nextTopic(); });
endSessionBtn.addEventListener('click', ()=>{ endSession(false); });
mentorInput.addEventListener('keydown', (e)=> { if(e.key === 'Enter') sendMentorBtn.click(); });
sendMentorBtn.addEventListener('click', ()=>{
  const v = mentorInput.value.trim();
  if(!v) return;

  // --- PERUBAHAN DIMULAI DI SINI ---
  // Kurangi 20 poin setiap kali AI Mentor digunakan.
  appState.points = Math.max(0, appState.points - 20); // Pastikan skor tidak menjadi negatif
  saveState(); // Simpan skor baru
  updateStats(); // Perbarui tampilan UI
  // Beri notifikasi kepada pengguna tentang pengurangan poin
  setTimeout(() => {
    postMentorMessage('Bantuan AI Mentor digunakan (-20 poin).', 'ai');
  }, 500);
  // --- PERUBAHAN SELESAI ---

  appendMentor(v, 'user');
  mentorInput.value = '';
  const lower = v.toLowerCase();
  if(lower.includes('ringkas')){
    const t = currentTopic();
    const bullets = t.questions.map(q=> '- '+ q.q);
    postMentorMessage(`Ringkasan singkat untuk "${t.title}":\n${bullets.join('\n')}`, 'ai');
    return;
  }
  if(lower.includes('ulang soal')){
    const t = currentTopic();
    const wrongs = appState.mistakes[t.id] || {};
    const keys = Object.keys(wrongs);
    if(keys.length===0){ postMentorMessage('Belum ada kesalahan untuk topik ini.', 'ai'); }
    else {
      postMentorMessage('Saya masukkan ulang soal yang pernah salah.', 'ai');
      const wrongQs = t.questions.filter(q=> keys.includes(q.id)).map(q=> ({...q, attempts:0}));
      appState.quizQueue = wrongQs.concat(appState.quizQueue);
      renderQuiz();
    }
    return;
  }
  if(appState.openaiApiKey && appState.openaiApiKey.length > 10){
    postMentorMessage('Menghubungkan ke layanan AI...', 'ai');
    // Kode OpenAI tetap sama
  } else {
    postMentorMessage('Maaf, saya masih dalam tahap pengembangan. Coba "ringkasan" atau "ulang soal".', 'ai');
  }
});

/* Start app */
init();
