import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BelajarBarengApp from './BelajarBarengApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BelajarBarengApp />
  </React.StrictMode>,
)

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// === BelajarBareng (Siap Deploy GitHub Pages) ===

const VIDEO_BASE = import.meta.env.BASE_URL + "sample-videos/";

const SAMPLE_TOPICS = [
  {
    id: "t1",
    title: "Dasar Sistem Pencernaan",
    duration: 120,
    video: VIDEO_BASE + "digestive.mp4",
    description: "Ringkasan singkat tentang fungsi utama sistem pencernaan.",
    quiz: [
      { id: "q1", text: "Organ pertama saluran pencernaan adalah?", choices: ["Usus","Mulut","Lambung","Hati"], answer: 1, tags:["anatomi"] },
      { id: "q2", text: "Fungsi lambung adalah...", choices: ["Mencerna secara mekanik & kimiawi","Menampung cairan empedu","Menyerap nutrisi","Menyaring darah"], answer: 0, tags:["fungsi"] },
      { id: "q3", text: "Enzim pencernaan yang aktif di mulut adalah...", choices: ["Pepsin","Amilase","Lipase","Tripsin"], answer: 1, tags:["enzim"] },
    ],
  },
  {
    id: "t2",
    title: "Keamanan Diri untuk Anak",
    duration: 150,
    video: VIDEO_BASE + "safety.mp4",
    description: "Cara sederhana ajarkan anak untuk menjaga batasan tubuh dan meminta tolong.",
    quiz: [
      { id: "q4", text: "Siapa yang boleh memeriksa area pribadi anak?", choices: ["Semua orang","Hanya dokter saat orang tua setuju","Teman sekelas","Saudara jauh"], answer: 1, tags:["etika"] },
      { id: "q5", text: "Apa tindakan pertama jika merasa tidak nyaman?", choices: ["Diam saja","Mencari orang terpercaya","Membalas","Menghapus memori"], answer: 1, tags:["tindakan"] },
    ],
  },
];

const STORAGE_KEY = "belajarbareng_progress_v3";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) { return {}; }
}
function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function useAdaptiveQuiz(topic) {
  const [history, setHistory] = useState(() => {
    const p = loadProgress();
    return p[topic.id]?.quizHistory || [];
  });
  useEffect(() => {
    const p = loadProgress();
    p[topic.id] = p[topic.id] || {};
    p[topic.id].quizHistory = history;
    saveProgress(p);
  }, [history, topic.id]);
  function recordResult(questionId, correct, tags) {
    setHistory(h => [...h, { questionId, correct, tags, time: Date.now() }]);
  }
  function suggestNextQuestion() {
    const mistakesByTag = {};
    history.forEach(h => {
      if (!h.correct) {
        (h.tags || []).forEach(tag => {
          mistakesByTag[tag] = (mistakesByTag[tag] || 0) + 1;
        });
      }
    });
    const asked = new Set(history.map(h => h.questionId));
    const pool = topic.quiz.filter(q => !asked.has(q.id));
    if (pool.length === 0) return null;
    const scored = pool.map(q => {
      const score = (q.tags || []).reduce((s,t) => s + (mistakesByTag[t] || 0), 0);
      return { q, score };
    });
    scored.sort((a,b) => b.score - a.score);
    const top = scored.slice(0, Math.max(1, Math.ceil(scored.length * 0.5)));
    return top[Math.floor(Math.random() * top.length)].q;
  }
  return { history, recordResult, suggestNextQuestion };
}

function AIMentor() {
  const [messages, setMessages] = useState([
    { from: "mentor", text: "Halo! Saya Mentor AI Anda. Tanyakan ringkasan atau minta soal latihan." }
  ]);
  const [input, setInput] = useState("");
  async function send() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    const reply = { from: "mentor", text: `(${input}) — ini contoh respons. Hubungkan AI di langkah berikut.` };
    setTimeout(() => setMessages(m => [...m, reply]), 400);
  }
  return (
    <motion.div layout className="p-4 bg-white rounded-2xl shadow-md">
      <div className="h-56 overflow-y-auto mb-3 bg-gray-50 p-2 rounded-xl">
        {messages.map((m,i)=>(
          <div key={i} className={`mb-2 ${m.from==='user'?'text-right':'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-xl text-sm ${m.from==='user'?'bg-blue-100':'bg-gray-200'}`}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 border rounded-xl px-3 py-2 text-sm" value={input} onChange={e=>setInput(e.target.value)} placeholder="Tanya mentor..." />
        <button onClick={send} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Kirim</button>
      </div>
    </motion.div>
  );
}

function TopicPlayer({ topic, onBack, onComplete, addPoints }){
  const { recordResult, suggestNextQuestion } = useAdaptiveQuiz(topic);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const videoRef = useRef(null);

  useEffect(()=>{ setCurrentQuestion(suggestNextQuestion()); }, []);

  function answerQuestion(i){
    if(!currentQuestion) return;
    const correct = i === currentQuestion.answer;
    recordResult(currentQuestion.id, correct, currentQuestion.tags);
    setScore(s=>s + (correct?20:0));
    if(correct) addPoints(10);
    const next = suggestNextQuestion();
    if(next) setCurrentQuestion(next); else setShowQuiz(false);
  }

  return (
    <motion.div layout className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div>
          <button onClick={onBack} className="text-sm text-gray-600">← Kembali</button>
          <h2 className="text-xl font-bold text-blue-700 mt-1">{topic.title}</h2>
        </div>
        <div className="text-sm text-gray-500">Skor: {score}</div>
      </div>

      <video ref={videoRef} className="w-full rounded-xl mb-4" src={topic.video} controls preload="metadata" />

      <div className="flex flex-wrap gap-3">
        {!showQuiz && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            onClick={() => setShowQuiz(true)}
          >
            Mulai Quiz
          </button>
        )}
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
          onClick={()=>{
            if(window.confirm("Yakin ingin menandai topik ini selesai?")) {
              onComplete();
              addPoints(50);
              setShowQuiz(false);
              setCurrentQuestion(null);
            }
          }}
        >
          Selesai
        </button>
      </div>

      {showQuiz && currentQuestion && (
        <motion.div layout className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="font-medium mb-3">{currentQuestion.text}</p>
          {currentQuestion.choices.map((c,i)=>(
            <button key={i} onClick={()=>answerQuestion(i)} className="block w-full text-left px-3 py-2 mb-2 bg-white border rounded-lg hover:bg-blue-50">
              {c}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function BelajarBarengApp(){
  const [userName, setUserName] = useState(() => localStorage.getItem('bb_user') || 'Peserta');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('bb_points') || '0'));

  useEffect(()=>{
    saveProgress(progress);
    localStorage.setItem('bb_points', points);
  }, [progress, points]);

  function markCompleted(id){
    const p={...progress};
    p[id]={completed:true};
    setProgress(p);
    setPoints(pt=>pt+50);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 font-sans">
      <header className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-700">BelajarBareng</h1>
        <div className="flex items-center gap-3">
          <input className="border px-2 py-1 rounded-md text-sm" value={userName} onChange={e=>{setUserName(e.target.value);localStorage.setItem('bb_user', e.target.value)}} />
          <span className="text-gray-500 text-sm">Poin: <b>{points}</b></span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <motion.section layout className="md:col-span-2 space-y-4">
          {!selectedTopic && SAMPLE_TOPICS.map(t => (
            <motion.article key={t.id} whileHover={{scale:1.02}} className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-gray-800">{t.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{t.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">Durasi: {Math.ceil(t.duration/60)} menit</span>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl" onClick={()=>setSelectedTopic(t)}>Mulai</button>
              </div>
            </motion.article>
          ))}
          {selectedTopic && <TopicPlayer topic={selectedTopic} onBack={()=>setSelectedTopic(null)} onComplete={()=>markCompleted(selectedTopic.id)} addPoints={(p)=>setPoints(pt=>pt+p)} />}
        </motion.section>

        <aside className="space-y-4">
          <AIMentor />
          <div className="p-4 bg-white rounded-2xl shadow-md">
            <h4 className="font-semibold mb-2 text-gray-800">Progress Kamu</h4>
            {SAMPLE_TOPICS.map(t => (
              <div key={t.id} className="flex justify-between text-sm py-1">
                <span>{t.title}</span>
                <span className={progress[t.id]?.completed? 'text-green-600':'text-gray-500'}>
                  {progress[t.id]?.completed ? '✔ Selesai' : 'Belum'}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

