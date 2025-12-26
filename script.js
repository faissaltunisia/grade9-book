// بيانات المنهج
const curriculumData = [
    { unit: "الوحدة 1: البرمجة", lessons: [
        { name: "نشاط 1: الطباعة", code: "print('صلالة الشرقية')" },
        { name: "نشاط 2: المتغيرات", code: "x = 5\ny = 10\nprint(x + y)" }
    ]}
];

// وظائف التشغيل الأساسية
function startApp() {
    document.getElementById('welcome-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcome-overlay').classList.add('hidden');
        document.getElementById('app-content').classList.remove('hidden');
        renderSidebar();
    }, 600);
}

function renderSidebar() {
    const container = document.getElementById('curriculum-list');
    curriculumData.forEach(u => {
        container.innerHTML += `<div class="unit-title">${u.unit}</div>`;
        u.lessons.forEach(l => {
            const div = document.createElement('div');
            div.className = 'lesson-link';
            div.innerText = l.name;
            div.onclick = () => {
                document.getElementById('editor').value = l.code;
                document.getElementById('active-task-name').innerText = l.name;
                if(window.innerWidth < 768) showTab('editor-section');
            };
            container.appendChild(div);
        });
    });
}

// المراقب الآلي الذكي
function liveMonitor() {
    const code = document.getElementById('editor').value;
    const hint = document.getElementById('ai-hint-bubble');
    if (code.includes('print') && !code.includes('(')) {
        hint.innerText = "💡 تِقني: تذكر الأقواس في دالة print()";
        hint.classList.remove('hidden');
    } else {
        hint.classList.add('hidden');
    }
}

// المساعدة السحرية
async function askMagicHelp() {
    const code = document.getElementById('editor').value;
    const task = document.getElementById('active-task-name').innerText;
    showTab('ai-section');
    await sendChatMessage(`أنا أحاول حل ${task}. هذا كودي، أين الخطأ؟ \n${code}`);
}

// محرك الدردشة AI
async function sendChatMessage(customMsg = null) {
    const input = document.getElementById('ai-input');
    const msg = customMsg || input.value;
    if(!msg) return;

    appendMsg(msg, 'user');
    input.value = "";
    const loading = appendMsg("تِقني يفكر الآن... ✍️", 'ai');

    try {
        const res = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: [
                    {role: 'system', content: 'أنت تِقني، معلم بايثون في مدرسة صلالة الشرقية. ساعد الطالب بلطف واختصار.'},
                    {role: 'user', content: msg}
                ],
                model: 'openai'
            })
        });
        loading.innerText = await res.text();
    } catch {
        loading.innerText = "تعذر الاتصال بالمساعد حالياً.";
    }
}

function appendMsg(txt, role) {
    const chat = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = txt;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
}

// التبديل للهاتف
function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
}

// نافذة الكتاب
function openBook() { document.getElementById('book-modal').classList.remove('hidden'); }
function closeBook() { document.getElementById('book-modal').classList.add('hidden'); }
