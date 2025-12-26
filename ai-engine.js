// بيانات الأنشطة حرفياً من كتاب الطالب
const bookData = [
    {
        id: 1,
        title: "النشاط (1-1): دالة الطباعة",
        details: "الهدف: استخدام دالة print لإخراج نصوص. \nالمطلوب: اكتب برنامجاً يطبع جملة 'أنا أحب سلطنة عمان'.",
        hint: "استخدم print('النص هنا') ولا تنسَ علامات التنصيص.",
        keywords: ["print"]
    },
    {
        id: 2,
        title: "النشاط (1-4): العمليات الحسابية",
        details: "الهدف: إجراء عمليات حسابية. \nالمطلوب: عرف متغير x بقيمة 10 ومتغير y بقيمة 5، ثم اطبع ناتج ضربهما.",
        hint: "استخدم x = 10 و y = 5 ثم print(x * y).",
        keywords: ["=", "*", "print"]
    },
    {
        id: 3,
        title: "النشاط (1-5): دالة الإدخال",
        details: "الهدف: استقبال البيانات. \nالمطلوب: اطلب من المستخدم إدخال اسمه باستخدام input ثم اطبع رسالة ترحيب باسمه.",
        hint: "استخدم name = input('ما اسمك؟') ثم print('مرحباً', name).",
        keywords: ["input", "print"]
    }
];

let activeActivity = null;

// تشغيل الأزرار
function runCode() {
    window.runPythonEngine(); // استدعاء محرك بايثون
}

function getHint() {
    if (!activeActivity) {
        addChat("bot", "من فضلك اختر نشاطاً أولاً لأعطيك تلميحاً.");
        return;
    }
    addChat("bot", "💡 تلميح للنشاط: " + activeActivity.hint);
}

// تحميل الأنشطة في القائمة الجانبية
const container = document.getElementById('activities-container');
bookData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'activity-card';
    div.innerHTML = `<h4>${item.title}</h4><small>انقر لعرض التفاصيل</small>`;
    div.onclick = () => {
        activeActivity = item;
        document.getElementById('current-task-title').innerText = item.title;
        document.getElementById('task-description').innerText = item.details;
        addChat("bot", `بدأنا ${item.title}. سأراقب كودك الآن لمساعدتك.`);
    };
    container.appendChild(div);
});

// المساعد الذكي (Chatbot)
function askAI() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (!msg) return;

    addChat("user", msg);
    input.value = "";

    // منطق الرد الذكي (Simplified AI Logic)
    let response = "";
    const lowMsg = msg.toLowerCase();

    if (lowMsg.includes("print") || lowMsg.includes("طباعة")) {
        response = "دالة print() هي أهم دالة في بايثون، نستخدمها لعرض المعلومات. مثال: print('مرحباً صلالة'). هل تريدني أن أكتب لك كوداً كاملاً؟";
    } else if (lowMsg.includes("input") || lowMsg.includes("إدخال")) {
        response = "دالة input() تسمح للمستخدم بالكتابة للبرنامج. دائماً تذكر أن البيانات التي تأتي منها تكون 'نصاً' (String).";
    } else if (lowMsg.includes("متغير") || lowMsg.includes("variable")) {
        response = "المتغير هو مثل الصندوق، تخزن فيه قيمة (رقم أو نص) لتعود إليها لاحقاً. مثال: score = 100.";
    } else if (lowMsg.includes("حل") || lowMsg.includes("مساعدة")) {
        response = activeActivity ? `لحل هذا النشاط، جرب البدء بـ: ${activeActivity.keywords[0]}.` : "اختر نشاطاً وسأساعدك في حله فوراً.";
    } else {
        response = "أنا معك يا بطل مدرسة صلالة الشرقية! سؤالك جميل، بايثون لغة سهلة، هل تريد شرحاً لدرس معين في الكتاب؟";
    }

    setTimeout(() => addChat("bot", response), 500);
}

function addChat(role, text) {
    const chatFlow = document.getElementById('chat-flow');
    const div = document.createElement('div');
    div.className = `bubble ${role === 'bot' ? 'bot-msg' : 'user-msg'}`;
    div.innerText = text;
    chatFlow.appendChild(div);
    chatFlow.scrollTop = chatFlow.scrollHeight;
}
