const pythonKnowledge = {
    "print": "دالة print() هي أول دالة نتعلمها في الكتاب، وتستخدم لعرض النتائج. تأكد دائماً من وضع النص بين علامتي تنصيص ' '.",
    "input": "في الوحدة الأولى، نستخدم input() لجعل البرنامج تفاعلياً. مثال: name = input('ما اسمك؟').",
    "المتغيرات": "المتغير هو مخزن للبيانات. في بايثون، يمكنك تسمية المتغير بأي اسم بشرط ألا يبدأ برقم ولا يحتوي على رموز خاصة.",
    "int": "نستخدم int() عندما نريد تحويل النص القادم من input() إلى رقم لعمل حسابات، مثل: age = int(input()).",
    "نشاط": "لحل أنشطة الكتاب، تذكر دائماً ترتيب الكود: المدخلات أولاً، ثم العمليات، ثم المخرجات print.",
    "خطأ": "إذا ظهر خطأ، تأكد من المسافات البادئة (Indentation) ومن إغلاق جميع الأقواس () في الكود."
};

function askAI() {
    const inputField = document.getElementById('ai-input');
    const chatBody = document.getElementById('chat-body');
    const question = inputField.value.toLowerCase();

    if (question.trim() === "") return;

    chatBody.innerHTML += `<div style="text-align:left; color:#2c3e50; margin:5px;">👤: ${inputField.value}</div>`;

    let answer = "سؤال ذكي! هذا الموضوع في صميم الوحدة الأولى. هل يمكنني مساعدتك في شرح دالة معينة أو تصحيح كود في المحاكي؟";

    for (let key in pythonKnowledge) {
        if (question.includes(key)) {
            answer = pythonKnowledge[key];
            break;
        }
    }

    setTimeout(() => {
        chatBody.innerHTML += `<div style="text-align:right; color:#27ae60; margin:5px;">🤖: ${answer}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);

    inputField.value = "";
}
