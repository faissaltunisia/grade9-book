// قاعدة بيانات الحلول للأنشطة الموجودة في الكتاب
const bookSolutions = {
    "activity1": "print('مرحباً بك في صف تقنية المعلومات')\nname = input('أدخل اسمك: ')\nprint(name)",
    "area_calc": "length = int(input('أدخل الطول: '))\nwidth = int(input('أدخل العرض: '))\narea = length * width\nprint('المساحة هي:', area)"
};

// 1. وظيفة المراقبة اللحظية (تنبيه عند الخطأ أثناء الكتابة)
function monitorCode() {
    const code = document.getElementById('code-editor').value;
    const hintBox = document.getElementById('ai-hint');
    const aiBody = document.getElementById('chat-body');

    // فحص نسيان علامات التنصيص في دالة print
    if (code.includes("print(") && !code.includes("'") && !code.includes('"')) {
        hintBox.innerHTML = "💡 تنبيه من تِقني: تذكر وضع النص داخل علامات تنصيص ' ' في دالة print.";
    } 
    // فحص نسيان إغلاق الأقواس
    else if ((code.match(/\(/g) || []).length > (code.match(/\)/g) || []).length) {
        hintBox.innerHTML = "💡 تنبيه من تِقني: يبدو أنك فتحت قوساً ولم تغلقه بعد!";
    }
    else {
        hintBox.innerHTML = ""; // مسح التنبيه إذا كان الكود يبدو سليماً
    }
}

// 2. وظيفة كتابة الكود الصحيح للطالب
function requestSolution() {
    const aiBody = document.getElementById('chat-body');
    const editor = document.getElementById('code-editor');

    aiBody.innerHTML += `<div style="text-align:right; color:#27ae60;">🤖: حسناً، سأكتب لك الكود الصحيح لنشاط حساب المساحة (مثلاً) كما ورد في صفحة 25 من الكتاب. راقب المحرر!</div>`;
    
    // كتابة الكود داخل المحرر تلقائياً
    editor.value = bookSolutions["area_calc"];
    
    // تأثير بصري للمحرر عند كتابة الحل
    editor.style.borderColor = "#27ae60";
    setTimeout(() => editor.style.borderColor = "#333", 2000);
}

// 3. تطوير ردود المساعد لتوجيه الطالب
function askAI() {
    const inputField = document.getElementById('ai-input');
    const question = inputField.value;

    if (question.includes("خطأ")) {
        showResponse("لا تقلق، الأخطاء البرمجية هي جزء من التعلم! تأكد من أن جميع الكلمات مكتوبة بالإنجليزية الصغيرة (Small letters).");
    } else if (question.includes("ساعدني")) {
        showResponse("بالطبع! جرب البدء بكتابة دالة print، وإذا تعثرت اضغط على زر 'أعطني الحل الصحيح'.");
    } else {
        // الردود العادية التي برمجناها سابقاً
        processGeneralQuestion(question);
    }
    inputField.value = "";
}
