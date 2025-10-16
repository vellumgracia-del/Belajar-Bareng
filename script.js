 /* =========================

  Aplikasi BelajarBareng

  ========================= */



// --- KONFIGURASI SUPABASE ---

const SUPABASE_URL = 'https://rgntufyuatlkikwuyrxx.supabase.co'; // <-- GANTI DENGAN URL SUPABASE ANDA

const SUPABASE_ANON_KEY = 'sb_publishable_Qb5hBsxj26EbriOtqipRBQ_a9HNxjx0'; // <-- GANTI DENGAN KUNCI ANON ANDA



let supabase = null;

try {

  if (SUPABASE_URL !== 'URL_SUPABASE_ANDA' && SUPABASE_ANON_KEY !== 'KUNCI_ANON_SUPABASE_ANDA' && window.supabase) {

      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  }

} catch (e) {

  console.error("Supabase client could not be initialized. Please check your URL and Key.", e);

}



const SUBJECTS_DATA = {

  "Biologi": [

    { id: "b1", title: "Sistem Pencernaan", video: "Belajar IPA Sistem Pencernaan Manusia #SiapNaikLevel (1).mp4", description: "Video: organ & proses pencernaan (≤3 menit).", questions: [

      { id: "q1", q: "Proses memecah makanan secara kimiawi pertama kali terjadi di?", opts:["Lambung","Mulut","Usus Halus"], a:1 },

      { id: "q2", q: "Organ yang menyerap sebagian besar nutrisi adalah?", opts:["Usus Besar","Usus Halus","Lambung"], a:1 },

      { id: "q3", q: "Enzim yang memulai pencernaan karbohidrat di mulut adalah?", opts:["Lipase","Pepsin","Amilase"], a:2 }

    ] },

    { id: "b2", title: "Sirkulasi Darah", video: "videos/topic2.mp4", description: "Sirkulasi darah ringkas (≤3 menit).", questions: [

      { id: "q1", q: "Bagian darah yang berperan dalam pembekuan darah?", opts:["Eritrosit","Leukosit","Trombosit"], a:2 },

      { id: "q2", q: "Pembuluh yang membawa darah kaya oksigen dari paru-paru ke jantung?", opts:["Vena Kava","Arteri Pulmonalis","Vena Pulmonalis"], a:2 }

    ] }

  ],

  "Matematika": [

    { id: "m1", title: "Konsep Pecahan", video: "videos/math1.mp4", description: "Apa itu pembilang dan penyebut?", questions: [

      { id: "q1", q: "Berapakah hasil dari 1/2 + 1/4?", opts:["2/6","3/4","1/3"], a:1 },

      { id: "q2", q: "Angka di bagian bawah pecahan disebut?", opts:["Pembilang","Penyebut","Koefisien"], a:1 }

    ] },

    { id: "m2", title: "Dasar Aljabar", video: "videos/math2.mp4", description: "Variabel dan konstanta (≤3 menit).", questions: [

      { id: "q1", q: "Jika 2x + 5 = 11, berapakah nilai x?", opts:["2","3","4"], a:1 }

    ] }

  ],

  "Ekonomi": [

    { id: "e1", title: "Pengantar Permintaan & Penawaran", video: "videos/eco1.mp4", description: "Mengenal kurva D dan S (≤3 menit).", questions: [

      { id: "q1", q: "Jika harga barang naik, maka jumlah barang yang diminta cenderung...", opts:["Naik","Tetap","Turun"], a:2 },

      { id: "q2", q: "Titik pertemuan antara kurva permintaan dan penawaran disebut?", opts:["Harga Maksimum","Keseimbangan Pasar","Titik Impas"], a:1 }

    ] }

  ]

};





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

  // === BAGIAN PENTING UNTUK DIGANTI ===

  openaiApiKey: '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' // <-- GANTI DENGAN KUNCI API OpenAI ASLI-MU

  // ====================================

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

const videoDurationEl = document.getElementById('videoDuration');

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



/* New UI bindings for Landing Screen */

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

  if (appState.userName) {

    userNameInput.value = appState.userName;

    showScreen('mainScreen'); // Langsung ke main screen jika nama sudah ada

  } else {

    showScreen('landingScreen'); // Tampilkan landing screen

  }



  renderSubjects();

  loadTopic(0);

  updateStats();

  renderHistory();

  renderLeaderboard();

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

    const sec = Math.round(topicVideo.duration||0);

    videoDurationEl.textContent = sec? formatTime(sec) + 's':'-';

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

    // Put the question back if it's the first wrong answer

    if(question.attempts < 2){

      appState.quizQueue.push(appState.quizQueue.shift()); // Move to back

    } else {

      postMentorMessage(`Sepertinya kamu belum paham soal: "${question.q}". Coba tinjau video lagi.`, 'ai');

      appState.quizQueue.shift(); // Remove after 2nd mistake

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



// --- FUNGSI BARU UNTUK LEADERBOARD ---

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



async function renderLeaderboard() {

    const boardEl = document.getElementById('leaderboard');

    if (!supabase) {

        boardEl.innerHTML = '<div class="small">Supabase belum dikonfigurasi.</div>';

        return;

    }

    boardEl.innerHTML = '<div class="small">Memuat data...</div>';



    const { data, error } = await supabase

        .from('leaderboard')

        .select('name, score')

        .order('score', { ascending: false })

        .limit(5);



    if (error) {

        console.error('Gagal mengambil data leaderboard:', error);

        boardEl.innerHTML = '<div class="small">Gagal memuat data.</div>';

        return;

    }



    if (data.length === 0) {

        boardEl.innerHTML = '<div class="small">Belum ada data. Jadilah yang pertama!</div>';

        return;

    }



    boardEl.innerHTML = '';

    const emojis = ['🥇', '🥈', '🥉', '4.', '5.'];

    data.forEach((entry, idx) => {

        const div = document.createElement('div');

        div.className = 'small';

        div.innerHTML = `${emojis[idx] || (idx+1)+'.'} <strong>${entry.name}</strong> - ${entry.score} poin`;

        boardEl.appendChild(div);

    });

}



function appendMentor(msg, who='ai'){

  const div = document.createElement('div');

  div.className = 'msg ' + (who==='ai' ? 'ai' : 'user');

  div.textContent = msg;

  mentorLog.appendChild(div);

  mentorLog.scrollTop = mentorLog.scrollHeight;

}

function postMentorMessage(text, who='ai'){ appendMentor(text, who); }





// =======================================================

// --- FUNGSI BARU UNTUK INTEGRASI OPENAI (TAMBAHAN) ---

// =======================================================



/**

 * Menghubungi API Chat Completions OpenAI untuk mendapatkan respons

 * berdasarkan pesan pengguna dan konteks topik.

 * @param {string} userMessage - Pesan dari pengguna di kolom mentor.

 * @returns {Promise<string>} - Respons teks dari AI.

 */

async function getOpenAIChatResponse(userMessage) {

    // 1. Cek Kunci API

    if (!appState.openaiApiKey || appState.openaiApiKey.length < 10 || appState.openaiApiKey.startsWith('KUNCI_API_OPENAI_ANDA_DI_SINI')) {

        return "ERROR: Kunci API OpenAI tidak valid. Mohon periksa konfigurasi API Key.";

    }



    const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

    const currentTopicTitle = currentTopic().title;



    // 2. Tentukan Konteks (System Prompt)

    const messages = [

        { 

            "role": "system", 

            "content": `Kamu adalah 'Mentor BelajarBareng' yang positif, sabar, dan suportif. Balas semua pertanyaan dalam Bahasa Indonesia. 

                        Topik yang sedang dipelajari saat ini adalah **${currentTopicTitle}** (${appState.currentSubject}). 

                        Jawablah sebagai mentor yang suportif, fokus pada konsep pelajaran, dan dorong pengguna untuk terus mencoba. Jangan gunakan emoji.`

        },

        // 3. Pesan Pengguna

        { "role": "user", "content": userMessage }

    ];



    try {

        const response = await fetch(API_ENDPOINT, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

                // PENTING: Menggunakan API Key untuk otentikasi

                'Authorization': `Bearer ${appState.openaiApiKey}` 

            },

            body: JSON.stringify({

                model: "gpt-3.5-turbo", // Model yang stabil dan cepat

                messages: messages,

                temperature: 0.7, // Keseimbangan antara faktual dan kreatif

                max_tokens: 200 // Batas panjang respons

            })

        });



        if (!response.ok) {

            // Menangkap error HTTP

            const errorData = await response.json().catch(() => ({ message: "Unknown error format" }));

            console.error("OpenAI API Error:", response.status, errorData);

            return `Maaf, terjadi kesalahan saat menghubungi layanan AI (${response.status}). Detail: ${errorData.error ? errorData.error.message : 'Silakan cek konsol browser.'}`;

        }



        const data = await response.json();



        // Ambil teks respons dari hasil JSON

        if (data.choices && data.choices.length > 0) {

            return data.choices[0].message.content.trim();

        } else {

            return "Maaf, AI tidak memberikan respons yang jelas. Coba lagi dengan pertanyaan berbeda.";

        }



    } catch (e) {

        console.error("Kesalahan koneksi/fetch OpenAI:", e);

        return "Terjadi kesalahan koneksi. Periksa jaringan atau konsol browser.";

    }

}





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

  appendMentor(v, 'user');

  mentorInput.value = '';

  const lower = v.toLowerCase();

  

  // Logika perintah khusus

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

  

  // --- INTEGRASI OPENAI DIMULAI DI SINI ---

  // Cek apakah API Key sudah terisi dan tidak menggunakan placeholder

  if(appState.openaiApiKey && appState.openaiApiKey.length > 10 && !appState.openaiApiKey.startsWith('KUNCI_API_OPENAI_ANDA_DI_SINI')){

    postMentorMessage('Menghubungkan ke layanan AI, mohon tunggu...', 'ai');

    

    // Panggil fungsi asinkron dan tampilkan hasilnya

    getOpenAIChatResponse(v)

        .then(aiResponse => {

            postMentorMessage(aiResponse, 'ai');

        })

        .catch(e => {

            postMentorMessage('Gagal mendapatkan respons AI karena masalah teknis.', 'ai');

            console.error("Kesalahan saat memanggil OpenAI:", e);

        });

    return;

  } else {

    postMentorMessage('Maaf, Kunci API OpenAI belum diatur atau tidak valid. Coba "ringkasan" atau "ulang soal".', 'ai');

  }

});



/* Start app */

init()
