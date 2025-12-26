// بيانات الأنشطة
const curriculum = [
    { id: 1, title: "نشاط (1-1): الطباعة", code: "print('مرحباً بكم في صلالة الشرقية')" },
    { id: 2, title: "نشاط (1-3): المتغيرات", code: "x = 10\ny = 20\nprint(x + y)" }
];

// دخول المنصة
function launchPlatform() {
    document.getElementById('welcome-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcome-overlay').style.display = 'none';
        document.getElementById('main-app').classList.remove('hidden');
    }, 1000);
}

// المساعد الذكي الحقيقي (المطور من كود مدونة ظفار)
async function sendToAI() {
    const input = document.getElementById("ai-input");
    const container = document.getElementById("chat-messages");
    const text = input.value.trim();

    if (!text) return;

    // إضافة رسالة المستخدم
    appendMsg("user", text);
    input.value = "";

    // رسالة تفكير
    const botMsg = appendMsg("bot", "تِقني يكتب الآن... ✍️");

    try {
        // الاتصال بمحرك AI (مثل المستخدم في الكود الذي أرسلته)
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'أنت مساعد ذكي مخصص لمدرسة صلالة الشرقية للتعليم الأساسي بسلطنة عمان. تخصصك لغة بايثون. أجب بلغة عربية فصيحة ومشجعة للطلاب.' },
                    { role: 'user', content: text }
                ],
                model: 'openai'
            })
        });

        const data = await response.text();
        botMsg.innerText = data; // وضع الإجابة الحقيقية
    } catch (e) {
        botMsg.innerText = "عذراً يا بطل، يبدو أن هناك مشكلة في الاتصال. تأكد من الإنترنت!";
    }
}

function appendMsg(role, text) {
    const container = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.className = `msg ${role}`;
    div.innerText = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

// تعبئة الأنشطة
const actList = document.getElementById('activities-list');
curriculum.forEach(item => {
    const d = document.createElement('div');
    d.className = 'act-card';
    d.innerHTML = `<i class="fa-solid fa-code"></i> ${item.title}`;
    d.onclick = () => {
        document.getElementById('task-title').innerText = item.title;
        document.getElementById('code-editor').value = item.code;
    };
    actList.appendChild(d);
});
