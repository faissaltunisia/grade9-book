// بيانات الأنشطة المستخلصة من كتاب الصف التاسع
const curriculumData = [
    {
        lesson: "الدرس الأول: مقدمة البرمجة",
        tasks: [
            { id: "1-1", title: "نشاط (1-1): إخراج البيانات", desc: "اكتب كود يطبع 'مرحباً بك في بايثون'.", target: "print", hint: "تذكر استخدام دالة print والأقواس ()[cite: 24]." },
            { id: "1-2", title: "نشاط (1-2): علامة الحث", desc: "اكتب عملية حسابية مباشرة (مثلاً 10 + 20) لتراها في المخرجات[cite: 19].", target: "+", hint: "بايثون يعامل الأرقام مباشرة في واجهة الأوامر." }
        ]
    },
    {
        lesson: "الدرس الثاني: المتغيرات والحساب",
        tasks: [
            { id: "2-1", title: "نشاط (1-3): تعريف المتغيرات", desc: "عرف متغير x=10 و y=20 واطبع ناتج جمعهم[cite: 27].", target: "=", hint: "استخدم علامة المساواة لإسناد القيم للمتغيرات." },
            { id: "2-2", title: "نشاط (1-4): مساحة المستطيل", desc: "احسب مساحة مستطيل طوله 10 وعرضه 5 باستخدام الطول * العرض[cite: 35].", target: "*", hint: "استخدم النجمة (*) لعملية الضرب." }
        ]
    },
    {
        lesson: "الدرس الثالث: دالة الإدخال والتحويل",
        tasks: [
            { id: "3-1", title: "نشاط (1-5): استقبال البيانات", desc: "اطلب من المستخدم إدخال اسمه باستخدام دالة input[cite: 25].", target: "input", hint: "دالة input() تسمح للمستخدم بالكتابة." },
            { id: "3-2", title: "نشاط (1-6): تحويل البيانات", desc: "حول نصاً مدخلاً إلى رقم صحيح باستخدام دالة int()[cite: 31].", target: "int", hint: "لا تنسَ أن input تعيد نصوصاً، وللحساب نحتاج int()." }
        ]
    }
];

let activeTask = null;

// بناء القائمة الجانبية
function initMenu() {
    const sidebar = document.getElementById('sidebar-menu');
    curriculumData.forEach(section => {
        let sectionHtml = `<div class="lesson-block"><div class="lesson-title">${section.lesson}</div>`;
        section.tasks.forEach(t => {
            sectionHtml += `<div class="activity-item" onclick="loadTask('${t.id}')">${t.title}</div>`;
        });
        sectionHtml += `</div>`;
        sidebar.innerHTML += sectionHtml;
    });
}

function loadTask(id) {
    for(let section of curriculumData) {
        activeTask = section.tasks.find(t => t.id === id);
        if(activeTask) break;
    }
    document.getElementById('act-title').innerText = activeTask.title;
    document.getElementById('act-desc').innerText = activeTask.desc;
    document.getElementById('code-editor').value = "";
    talkAI(`حسناً! سنبدأ حل ${activeTask.title}. نصيحتي: ${activeTask.hint}`);
}

// المراقبة الذكية للكود
function aiMonitor() {
    if(!activeTask) return;
    const code = document.getElementById('code-editor').value;

    if(code.includes("print") && !code.includes("(")) {
        talkAI("تنبيه: دالة الطباعة print تحتاج دائماً إلى أقواس هكذا ( ).");
    }
    if(code.includes(activeTask.target)) {
        talkAI("عمل رائع! لقد استخدمت الأداة الصحيحة للحل. اضغط تشغيل الآن.");
    }
}

function talkAI(msg) {
    const chat = document.getElementById('ai-chat');
    if(chat.lastElementChild && chat.lastElementChild.innerText === msg) return;
    chat.innerHTML += `<div class="ai-msg">${msg}</div>`;
    chat.scrollTop = chat.scrollHeight;
}

initMenu();
