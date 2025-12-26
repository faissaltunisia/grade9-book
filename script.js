// وظائف التنقل
function startApp() {
    document.getElementById('welcome-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcome-overlay').style.display = 'none';
        document.getElementById('app-content').classList.remove('hidden');
    }, 800);
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// محرك الذكاء الاصطناعي (مطور بأسلوب WhatsApp)
async function askAI() {
    const input = document.getElementById('user-query');
    const flow = document.getElementById('chat-flow');
    const val = input.value.trim();
    if(!val) return;

    // إضافة رسالة المستخدم
    addBubble(val, 'user');
    input.value = "";

    // رسالة تفكير
    const loading = addBubble("المساعد يكتب الآن... ✍️", 'ai');

    try {
        const res = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: [
                    {role: 'system', content: 'أنت مساعد ذكي مخصص لمدرسة صلالة الشرقية العمانية. تخصصك بايثون. أجب بلطف.'},
                    {role: 'user', content: val}
                ],
                model: 'openai'
            })
        });
        const text = await res.text();
        loading.innerText = text;
    } catch (e) {
        loading.innerText = "عذراً، حدث خطأ في الاتصال!";
    }
}

function addBubble(txt, role) {
    const flow = document.getElementById('chat-flow');
    const d = document.createElement('div');
    d.className = `msg ${role}`;
    d.innerText = txt;
    flow.appendChild(d);
    flow.scrollTop = flow.scrollHeight;
    return d;
}

function handleKey(e) { if(e.key === 'Enter') askAI(); }

// قائمة الأنشطة
const tasks = [
    {t: "نشاط 1: ترحيب صلالة", c: "print('مدرسة صلالة الشرقية')"},
    {t: "نشاط 2: العمليات", c: "print(5 * 5)"}
];
const list = document.getElementById('tasks-list');
tasks.forEach(task => {
    const div = document.createElement('div');
    div.style = "padding:15px; border-bottom:1px solid #eee; cursor:pointer";
    div.innerText = task.t;
    div.onclick = () => {
        document.getElementById('active-task').innerText = task.t;
        document.getElementById('editor').value = task.code;
        if(window.innerWidth < 768) showTab('editor-section');
    };
    list.appendChild(div);
});
