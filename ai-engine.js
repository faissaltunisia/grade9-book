// بيانات المنهج المستنتجة من الكتاب
const syllabus = {
    theory: [
        { term: "print", def: "دالة تستخدم لإخراج النصوص والأرقام على الشاشة." },
        { term: "input", def: "دالة تستخدم لاستقبال البيانات من المستخدم أثناء تشغيل البرنامج." },
        { term: "int", def: "تستخدم لتحويل النصوص إلى أرقام صحيحة لإجراء عمليات حسابية." }
    ],
    tasks: [
        { id: 1, title: "نشاط (1-4): حساب المساحة", desc: "اكتب برنامجاً يحسب مساحة المستطيل (10 * 5) واطبع النتيجة.", code: "10 * 5" },
        { id: 2, title: "نشاط (1-5): الترحيب", desc: "اطلب اسم الطالب واطبع له رسالة ترحيب.", code: "input" }
    ]
};

// تبديل التبويبات
function showTab(type) {
    document.getElementById('theory-section').style.display = type === 'theory' ? 'block' : 'none';
    document.getElementById('tasks-section').style.display = type === 'tasks' ? 'block' : 'none';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

// محادثة المساعد الذكي (المعلم الافتراضي)
function chatWithAI() {
    const input = document.getElementById('user-ask');
    const msg = input.value;
    if(!msg) return;

    appendMsg(msg, 'user');
    
    // منطق الرد الذكي
    let response = "سؤال رائع! سأقوم بتبسيط المعلومة لك: ";
    if(msg.includes("print")) response += syllabus.theory[0].def + " جرب تكتب print('صلالة') في المحرر.";
    else if(msg.includes("input")) response += syllabus.theory[1].def + " هي تجعل البرنامج يتفاعل مع الشخص الذي يستخدمه.";
    else if(msg.includes("مساعدة")) response = "بالطبع! انظر لنشاط الكتاب رقم 1 وحاول تعريف المتغيرات أولاً.";
    else response = "أنا معك من مدرسة صلالة الشرقية، هل تقصد سؤالاً في وحدة بايثون؟";

    setTimeout(() => appendMsg(response, 'bot'), 600);
    input.value = "";
}

function appendMsg(text, type) {
    const flow = document.getElementById('chat-flow');
    flow.innerHTML += `<div class="msg ${type}">${text}</div>`;
    flow.scrollTop = flow.scrollHeight;
}

// مراقبة الكود لحظياً (Active Monitoring)
function aiLiveMonitor() {
    const code = document.getElementById('code-editor').value;
    if(code.includes("print") && !code.includes("(")) {
        // تنبيه خفيف في الدردشة دون إزعاج
        if(!window.notified) {
            appendMsg("💡 تنبيه من تِقني: تذكر دائماً وضع الأقواس () بعد دالة print.", 'bot');
            window.notified = true;
            setTimeout(() => window.notified = false, 5000);
        }
    }
}

// تحميل الأنشطة في القائمة
function initTasks() {
    const container = document.getElementById('tasks-section');
    syllabus.tasks.forEach(t => {
        container.innerHTML += `
            <div class="card" onclick="loadTask(${t.id})" style="background:#30363d; cursor:pointer; padding:10px; margin-bottom:10px; border-radius:5px;">
                <strong>${t.title}</strong>
            </div>`;
    });
}

function loadTask(id) {
    const t = syllabus.tasks.find(x => x.id === id);
    document.getElementById('task-title').innerText = t.title;
    appendMsg(`لقد اخترت ${t.title}. المطلوب هو: ${t.desc}`, 'bot');
}

initTasks();
