// بيانات الأنشطة والحلول مستنتجة من كتاب التاسع
const activities = {
    'intro': {
        task: "نشاط (1-1): اكتب كود يطبع 'مرحباً بك في عالم البرمجة'.",
        hint: "استخدم دالة print() وضع النص بين علامتي تنصيص.",
        keywords: ["print(", "'", ")"],
        solution: "print('مرحباً بك في عالم البرمجة')"
    },
    'vars': {
        task: "نشاط (1-3): عرف متغير باسم x قيمته 10 ومتغير y قيمته 20 ثم اطبع مجموعهما.",
        hint: "اكتب x = 10 ثم y = 20 ثم print(x + y).",
        keywords: ["x", "y", "print"],
        solution: "x = 10\ny = 20\nprint(x + y)"
    },
    'input': {
        task: "نشاط (1-5): اطلب من المستخدم إدخال اسمه باستخدام دالة input ثم رحب به.",
        hint: "استخدم name = input('ما اسمك؟') ثم اطبع المتغير name.",
        keywords: ["input", "print"],
        solution: "name = input('أدخل اسمك: ')\nprint('أهلاً بك يا', name)"
    },
    'final': {
        task: "التحدي الختامي: اكتب برنامجاً يحسب مساحة مستطيل (الطول × العرض) عبر إدخال القيم من المستخدم.",
        hint: "تذكر تحويل المدخلات إلى أرقام باستخدام int().",
        keywords: ["int", "input", "*"],
        solution: "L = int(input('الطول: '))\nW = int(input('العرض: '))\nprint('المساحة هي:', L * W)"
    }
};

let activeKey = null;

function loadActivity(key) {
    activeKey = key;
    const act = activities[key];
    document.getElementById('current-task').innerText = "نشاط نشط";
    document.getElementById('activity-text').innerText = act.task;
    document.getElementById('code-editor').value = "";
    document.getElementById('console-output').innerText = "";
    
    sendAIMessage(`رائع! لقد اخترت ${act.task.split(':')[0]}. ابدأ الكتابة وسأراقبك!`);
}

function monitorCode() {
    if (!activeKey) return;
    const code = document.getElementById('code-editor').value;
    const act = activities[activeKey];
    const badge = document.getElementById('status-badge');

    // 1. فحص الأخطاء الشائعة (Syntax Monitoring)
    if (code.includes("print") && !code.includes("(")) {
        sendAIMessage("⚠️ انتبه: لقد نسيت فتح القوس بعد دالة print.");
        badge.innerText = "تنبيه خطأ! 🔴";
    } 
    else if (code.includes("'") && (code.match(/'/g) || []).length % 2 !== 0) {
        sendAIMessage("⚠️ تذكر: علامات التنصيص يجب أن تكون زوجية (بداية ونهاية النص).");
        badge.innerText = "تنبيه خطأ! 🔴";
    }
    // 2. فحص التقدم في الحل
    else if (act.keywords.every(k => code.includes(k))) {
        sendAIMessage("✨ مذهل! كودك يحتوي على العناصر المطلوبة. جرب تشغيله الآن.");
        badge.innerText = "تقدم ممتاز! 🟢";
    }
}

function getHint() {
    if (activeKey) {
        sendAIMessage("💡 نصيحة: " + activities[activeKey].hint);
    }
}

function sendAIMessage(text) {
    const msgBox = document.getElementById('ai-messages');
    // منع تكرار نفس الرسالة الأخيرة
    if (msgBox.lastElementChild && msgBox.lastElementChild.innerText === text) return;
    
    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.innerText = text;
    msgBox.appendChild(bubble);
    msgBox.scrollTop = msgBox.scrollHeight;
}
