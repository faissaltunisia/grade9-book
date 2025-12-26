const chatBody = document.getElementById('chat-body');
const editor = document.getElementById('code-editor');

// 1. وظيفة المراقبة اللحظية
function monitorCode() {
    const code = editor.value;
    
    if (code.includes("print(") && !code.includes("'") && !code.includes('"')) {
        updateAIStatus("تنبيه: لقد نسيت وضع النص داخل علامات تنصيص ' ' في دالة الطباعة.");
    } else if (code.match(/\(/g)?.length > code.match(/\)/g)?.length) {
        updateAIStatus("تنبيه: يبدو أنك لم تغلق القوس الخاص بالدالة!");
    } else {
        updateAIStatus("كودك يبدو سليماً حتى الآن.. استمر!");
    }
}

// 2. إعطاء حل صحيح للنشاط الموجود في الكتاب
function getAISolution() {
    const solution = "# حل نشاط حساب المساحة\nlength = 10\nwidth = 5\narea = length * width\nprint('المساحة هي:', area)";
    editor.value = solution;
    updateAIStatus("لقد كتبت لك الكود الصحيح لنشاط حساب المساحة في المحرر.");
}

function updateAIStatus(msg) {
    chatBody.innerHTML = `<div style="color:blue; font-weight:bold;">تِقني:</div><div>${msg}</div>`;
}

// 3. نظام الرد على أسئلة الطالب
function sendMsg() {
    const input = document.getElementById('user-msg');
    const msg = input.value;
    chatBody.innerHTML += `<div style="color:gray;">أنت: ${msg}</div>`;
    
    let response = "سؤال رائع! هذا الجزء مشروح في الوحدة الأولى من كتابك.";
    if(msg.includes("print")) response = "دالة print تستخدم لعرض المخرجات على الشاشة.";
    if(msg.includes("input")) response = "دالة input تستخدم لاستقبال بيانات من المستخدم.";
    
    setTimeout(() => {
        chatBody.innerHTML += `<div style="color:blue; font-weight:bold;">تِقني:</div><div>${response}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
    input.value = "";
}
