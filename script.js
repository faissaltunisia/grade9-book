// بيانات الكتاب المدرسي
const curriculum = [
    { title: "الدرس 1: المتغيرات", code: "name = 'Salalah'\nprint(name)", pages: "ص 12" },
    { title: "الدرس 2: الجمل الشرطية", code: "score = 90\nif score >= 50:\n  print('ناجح')", pages: "ص 18" }
];

// تهيئة المنصة
function startApp() {
    document.getElementById('welcome-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcome-overlay').classList.add('hidden');
        document.getElementById('app-content').classList.remove('hidden');
        loadCurriculum();
    }, 800);
}

// تحميل الدروس
function loadCurriculum() {
    const list = document.getElementById('curriculum-list');
    curriculum.forEach(item => {
        const div = document.createElement('div');
        div.className = 'lesson-card';
        div.innerHTML = `<strong>${item.title}</strong><small>${item.pages}</small>`;
        div.onclick = () => {
            document.getElementById('editor').value = item.code;
            document.getElementById('active-task-name').innerText = item.title;
            if(window.innerWidth < 768) showTab('editor-section');
        };
        list.appendChild(div);
    });
}

// المراقب الآلي (Live Monitoring)
function liveMonitor() {
    const code = document.getElementById('editor').value;
    const hint = document.getElementById('ai-hint-bubble');
    
    // فحص ذكي بسيط (Regex) قبل الـ AI
    if (code.includes('print') && !code.includes('(')) {
        hint.innerHTML = "💡 تِقني: تذكر أقواس دالة print()";
        hint.classList.remove('hidden');
    } else if (code.includes('if') && !code.endsWith(':')) {
        hint.innerHTML = "💡 تِقني: لا تنسَ النقطتين : بعد if";
        hint.classList.remove('hidden');
    } else {
        hint.classList.add('hidden');
    }
}

// المساعدة السحرية (تبحث في ما كتبه الطالب)
async function askMagicHelp() {
    const studentCode = document.getElementById('editor').value;
    const task = document.getElementById('active-task-name').innerText;
    const prompt = `أنا طالب في مدرسة صلالة الشرقية، أحاول حل "${task}". هذا هو كودي: \n${studentCode}\n أخبرني أين الخطأ؟`;
    
    showTab('ai-section');
    await sendToAI(prompt);
}

// محرك الدردشة AI
async function sendToAI(message) {
    const chatFlow = document.getElementById('chat-messages');
    appendMessage('user', message);
    
    const loading = appendMessage('ai', 'جاري التفكير في الحل...');
    
    try {
        const res = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: [
                    {role: 'system', content: 'أنت تِقني، معلم بايثون في مدرسة صلالة الشرقية بسلطنة عمان. ساعد الطلاب في حل الأنشطة من كتاب الطالب.'},
                    {role: 'user', content: message}
                ],
                model: 'openai'
            })
        });
        const responseText = await res.text();
        loading.innerText = responseText;
    } catch (e) {
        loading.innerText = "تعذر الاتصال بالمساعد حالياً.";
    }
}

function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = text;
    document.getElementById('chat-messages').appendChild(div);
    return div;
}

// وظائف الكتاب والتبديل
function openBook() { document.getElementById('book-modal').classList.remove('hidden'); }
function closeBook() { document.getElementById('book-modal').classList.add('hidden'); }
function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
