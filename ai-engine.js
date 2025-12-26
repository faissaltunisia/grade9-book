// بيانات الأنشطة
const activities = [
    { id: 1, title: "نشاط (1-1): دالة الطباعة", desc: "اكتب كود يطبع اسمك واسم مدرستك 'صلالة الشرقية'.", hint: "استخدم print() وضع النص بين علامات تنصيص." },
    { id: 2, title: "نشاط (1-4): المدخلات", desc: "اطلب من المستخدم إدخال عمره واطبع النتيجة.", hint: "استخدم متغير مثل age مع دالة input()." }
];

// منطق الدخول
function enterPlatform() {
    document.getElementById('welcome-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('main-platform').classList.remove('hidden');
    }, 800);
}

// محاكي الذكاء الاصطناعي (Advanced AI Simulator)
function aiCoreProcess() {
    const input = document.getElementById('ai-input');
    const text = input.value.trim();
    if (!text) return;

    addMsg('user', text);
    input.value = "";

    // تفكير المساعد
    setTimeout(() => {
        let reply = "";
        const q = text.toLowerCase();

        // منطق الرد المطور
        if (q.includes("print") || q.includes("اطبع")) {
            reply = "دالة print() هي نافذة البرنامج. أي شيء تضعه بداخلها سيراه المستخدم. تذكر دائماً الأقواس ( ) وعلامات التنصيص ' ' للنصوص.";
        } else if (q.includes("خطأ") || q.includes("ما يشتغل")) {
            reply = "لا تقلق، معظم المبرمجين يواجهون أخطاء. تأكد من: 1- تهجئة الكلمات (print وليست Print)، 2- إغلاق الأقواس، 3- علامات التنصيص.";
        } else if (q.includes("input") || q.includes("ادخال")) {
            reply = "دالة input() تجعل البرنامج ينتظر المستخدم. مثال: x = input('ما اسمك؟'). تذكر أن النتيجة دائماً تكون نصاً!";
        } else if (q.includes("شرح") || q.includes("حل")) {
            reply = "بالطبع! انظر للجانب الأيمن من الشاشة، لقد وضعت لك خطوات النشاط الحالية. ابدأ بتعريف المتغيرات أولاً.";
        } else {
            reply = "أنا 'تِقني'، مساعدك الذكي. سؤالك مثير للاهتمام! في بايثون، نحاول دائماً كتابة كود بسيط وواضح. هل تريدني أن أشرح لك مفهوماً معيناً في المنهج؟";
        }

        addMsg('ai', reply);
    }, 600);
}

function handleEnter(e) { if (e.key === 'Enter') aiCoreProcess(); }

function addMsg(role, content) {
    const chat = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = content;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// تحميل القائمة
const list = document.getElementById('task-list');
activities.forEach(a => {
    const d = document.createElement('div');
    d.style = "padding:12px; border-bottom:1px solid #eee; cursor:pointer; font-size:0.9rem";
    d.innerHTML = `<i class="fa-solid fa-code"></i> ${a.title}`;
    d.onclick = () => {
        document.getElementById('active-task-title').innerText = a.title;
        addMsg('ai', `نشاط رائع! ${a.desc}`);
    };
    list.appendChild(d);
});
