// بيانات الكتاب
const bookPages = [
    { title: "مقدمة البرمجة", text: "بايثون لغة سهلة وقوية.", img: "https://via.placeholder.com/300x200?text=Page+1" },
    { title: "دالة الطباعة", text: "استخدم print() لعرض النتائج.", img: "https://via.placeholder.com/300x200?text=Page+2" }
];

let currentPage = 0;

// فتح المنصة
function enterPlatform() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-container').classList.remove('hidden');
}

// تبديل صفحات الكتاب
function changePage(dir) {
    currentPage += dir;
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= bookPages.length) currentPage = bookPages.length - 1;
    
    document.getElementById('book-title').innerText = bookPages[currentPage].title;
    document.getElementById('book-text').innerText = bookPages[currentPage].text;
    document.getElementById('book-img').src = bookPages[currentPage].img;
}

// فتح/إغلاق الكتاب
function toggleBook() {
    document.getElementById('book-window').classList.toggle('hidden');
}

// المساعد الذكي
async function sendAI() {
    const input = document.getElementById('chat-input');
    if (!input.value) return;
    
    appendChat('user', input.value);
    const loading = appendChat('ai', 'تِقني يفكر...');
    
    try {
        const res = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: [{role:'system', content:'أنت تِقني معلم مدرسة صلالة الشرقية.'}, {role:'user', content: input.value}],
                model: 'openai'
            })
        });
        loading.innerText = await res.text();
    } catch { loading.innerText = "خطأ في الاتصال."; }
    input.value = "";
}

function appendChat(role, text) {
    const flow = document.getElementById('chat-flow');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = text;
    flow.appendChild(div);
    flow.scrollTop = flow.scrollHeight;
    return div;
}

// المراقب الحي
function liveMonitor() {
    const code = document.getElementById('editor').value;
    const hint = document.getElementById('ai-hint');
    if (code.includes('print') && !code.includes('(')) {
        hint.innerText = "💡 تِقني: تذكر الأقواس ()";
        hint.classList.remove('hidden');
    } else {
        hint.classList.add('hidden');
    }
}
