// محرك الذكاء الاصطناعي لمحاكاة الاستجابة الذكية
const AI_KNOWLEDGE = {
    "print": "دالة print() هي أداة بايثون للتحدث. أي شيء تضعه داخل القوسين (سواء نص بين ' ' أو رقم) سيظهر في المخرجات. مثال: print('مدرسة صلالة').",
    "input": "دالة input() هي طريقة بايثون لسؤال المستخدم. البرنامج يتوقف وينتظر منك كتابة شيء. ملاحظة مهمة: كل ما تكتبه في input يعتبره بايثون 'نصاً'.",
    "variable": "المتغير هو مثل الصندوق (مخزن). نعطيه اسماً ونضع فيه قيمة. مثال: score = 95. هنا score هو اسم الصندوق.",
    "int": "دالة int() هي محول سحري، تحول النصوص (التي تشبه الأرقام) إلى أرقام حقيقية لنتمكن من جمعها أو ضربها.",
    "error": "لا تقلق من الخطأ! الأخطاء هي التي تصنع المبرمجين. تأكد من إغلاق الأقواس أو مراجعة علامات التنصيص."
};

const ACTIVITIES = [
    { id: 1, title: "نشاط (1-1): الترحيب", desc: "اكتب برنامجاً يطبع اسم مدرستك الجميلة 'صلالة الشرقية'.", hint: "استخدم دالة print واكتب الاسم داخل علامات تنصيص." },
    { id: 2, title: "نشاط (1-3): الجمع الذكي", desc: "عرف متغيرين x و y واجمع قيمتهما واطبع النتيجة.", hint: "عرف x = 5 ثم y = 10 ثم اطبع x + y." }
];

let selectedTask = null;

// تحميل الأنشطة
function initPlatform() {
    const list = document.getElementById('activities-list');
    ACTIVITIES.forEach(act => {
        const div = document.createElement('div');
        div.className = 'act-item';
        div.innerHTML = `<i class="fa-solid fa-code"></i> ${act.title}`;
        div.onclick = () => {
            selectedTask = act;
            document.getElementById('current-task-name').innerText = act.title;
            document.getElementById('code-editor').value = "";
            addChatMessage("ai", `رائع! لقد اخترت ${act.title}. المطلوب هو: ${act.desc}. أنا بانتظارك لتبدأ البرمجة!`);
        };
        list.appendChild(div);
    });
}

// طلب مساعدة ذكية (Smart Hint)
function requestSmartHint() {
    if (!selectedTask) {
        addChatMessage("ai", "من فضلك اختر نشاطاً من القائمة الجمنى أولاً لكي أتمكن من مساعدتك.");
        return;
    }
    addChatMessage("ai", `تلميح لهذا النشاط: ${selectedTask.hint}`);
}

// معالجة الدردشة (Gemini/ChatGPT Style)
function processAISearch() {
    const input = document.getElementById('ai-user-input');
    const query = input.value.trim();
    if (!query) return;

    addChatMessage("user", query);
    input.value = "";

    // ذكاء اصطناعي محاكي (Semantic Search)
    setTimeout(() => {
        let response = "سؤال ممتاز! بصفتي مساعدك الذكي في مدرسة صلالة الشرقية، إليك الإجابة: ";
        const q = query.toLowerCase();

        if (q.includes("print") || q.includes("طباعة")) response += AI_KNOWLEDGE.print;
        else if (q.includes("input") || q.includes("ادخال")) response += AI_KNOWLEDGE.input;
        else if (q.includes("متغير")) response += AI_KNOWLEDGE.variable;
        else if (q.includes("خطأ")) response += AI_KNOWLEDGE.error;
        else if (q.includes("مرحبا") || q.includes("سلام")) response = "أهلاً بك يا بطل! أنا تِقني، مساعدك الذكي. كيف يمكنني مساعدتك في تعلم بايثون اليوم؟";
        else response = "هذا سؤال تقني دقيق! بايثون لغة رائعة، هل تقصد السؤال عن الدوال الأساسية مثل print أو input؟ يمكنني أيضاً مساعدتك في حل أنشطة الكتاب.";

        addChatMessage("ai", response);
    }, 600);
}

// التعامل مع مفتاح Enter
function handleKeyPress(e) {
    if (e.key === 'Enter') processAISearch();
}

function addChatMessage(role, text) {
    const window = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.className = `msg ${role === 'ai' ? 'ai-msg' : 'user-msg'}`;
    div.innerText = text;
    window.appendChild(div);
    window.scrollTop = window.scrollHeight;
}

initPlatform();
