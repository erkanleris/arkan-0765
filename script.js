// بيانات التطبيق
let appData = {
    user: null,
    questions: [],
    chatMessages: [],
    quotes: [],
    phrases: [],
    activeUsers: 0
};

// تحميل البيانات من localStorage
function loadData() {
    const savedUser = localStorage.getItem('arkanUser');
    const savedChat = localStorage.getItem('arkanChat');
    const savedQuotes = localStorage.getItem('arkanQuotes');
    const savedPhrases = localStorage.getItem('arkanPhrases');

    if (savedUser) appData.user = JSON.parse(savedUser);
    if (savedChat) appData.chatMessages = JSON.parse(savedChat);
    if (savedQuotes) appData.quotes = JSON.parse(savedQuotes);
    if (savedPhrases) appData.phrases = JSON.parse(savedPhrases);

    // تحميل الأسئلة
    if (typeof questionsData !== 'undefined' && questionsData.questions) {
        appData.questions = questionsData.questions;
    }
}

// حفظ البيانات في localStorage
function saveData() {
    localStorage.setItem('arkanUser', JSON.stringify(appData.user));
    localStorage.setItem('arkanChat', JSON.stringify(appData.chatMessages));
    localStorage.setItem('arkanQuotes', JSON.stringify(appData.quotes));
    localStorage.setItem('arkanPhrases', JSON.stringify(appData.phrases));
}

// معالجة تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const age = parseInt(document.getElementById('userAge').value);
    const gender = document.querySelector('input[name="userGender"]:checked')?.value;

    if (name && age > 0 && gender) {
        appData.user = {
            id: Date.now(),
            name: name,
            age: age,
            gender: gender,
            joinDate: new Date().toISOString(),
            comments: 0,
            quotes: 0,
            phrases: 0
        };

        saveData();
        
        // إخفاء شاشة التسجيل
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'none';
        }
        
        // إظهار رسالة الترحيب
        showWelcomeModal();
    } else {
        alert('يرجى ملء جميع الحقول');
    }
});

// إظهار التطبيق الرئيسي
function showApp() {
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('mainApp').style.display = 'flex';
    updateProfile();
    updateActiveUsers();
    renderQuestions();
    showWelcomeModal();
}

// إظهار رسالة الترحيب
function showWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal && appData.user) {
        document.getElementById('welcomeMessage').textContent = `مرحباً بك يا ${appData.user.name}! 👋`;
        modal.style.display = 'flex';
        modal.classList.add('active');
    }
}

// إغلاق رسالة الترحيب والذهاب للتطبيق
document.getElementById('closeWelcomeBtn')?.addEventListener('click', () => {
    // إغلاق رسالة الترحيب
    const welcomeModal = document.getElementById('welcomeModal');
    if (welcomeModal) {
        welcomeModal.style.display = 'none';
    }
    
    // إغلاق شاشة التسجيل
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen) {
        loginScreen.style.display = 'none';
    }
    
    // إظهار الموقع الأساسي
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.display = 'flex';
    }
    
    // تحديث البيانات
    updateProfile();
    updateActiveUsers();
    renderQuestions();
    
    // عرض قسم الأسئلة ببشكل افتراضي
    showPage('questionsPage');
});

// تحديث الملف الشخصي
function updateProfile() {
    if (appData.user) {
        document.getElementById('profileName').textContent = appData.user.name;
        document.getElementById('profileAge').textContent = `${appData.user.age} سنة`;
        document.getElementById('statComments').textContent = appData.user.comments;
        document.getElementById('statQuotes').textContent = appData.user.quotes;
        document.getElementById('statPhrases').textContent = appData.user.phrases;
    }
}

// تحديث عداد المستخدمين النشطين
function updateActiveUsers() {
    const min = 284;
    const max = 828;
    appData.activeUsers = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('activeUsersCount').textContent = appData.activeUsers;
    document.getElementById('onlineCount').textContent = `${appData.activeUsers} نشيط`;
}

// تحديث العداد كل 3 ثوانٍ
setInterval(updateActiveUsers, 3000);

// عرض الأسئلة
function renderQuestions() {
    const container = document.getElementById('questionsList');
    if (!container) return;
    
    container.innerHTML = '';

    appData.questions.slice(0, 20).forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `<p>${question}</p>`;
        card.addEventListener('click', () => showQuestionModal(question, index));
        container.appendChild(card);
    });
}

// عرض السؤال في Modal
function showQuestionModal(question, index) {
    const modal = document.getElementById('questionModal');
    if (!modal) return;
    
    document.getElementById('questionTitle').textContent = question;
    
    // عرض التعليقات
    const commentsContainer = document.getElementById('questionComments');
    commentsContainer.innerHTML = '';
    
    const comments = appData.chatMessages.filter(msg => msg.questionId === index);
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
        `;
        commentsContainer.appendChild(div);
    });

    modal.classList.add('active');

    // معالج إضافة تعليق
    const addBtn = document.getElementById('addCommentBtn');
    if (addBtn) {
        addBtn.onclick = () => {
            const text = document.getElementById('commentInput').value.trim();
            if (text && appData.user) {
                const comment = {
                    author: appData.user.name,
                    text: text,
                    questionId: index,
                    timestamp: new Date().toISOString()
                };
                appData.chatMessages.push(comment);
                appData.user.comments++;
                saveData();
                updateProfile();
                document.getElementById('commentInput').value = '';
                renderQuestions();
                showQuestionModal(question, index);
            }
        };
    }

    // إغلاق Modal
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.classList.remove('active');
        };
    }
// إضافة رسالة في الدردشة
document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (text && appData.user) {
        const message = {
            author: appData.user.name,
            text: text,
            timestamp: new Date().toISOString(),
            own: true,
            id: Date.now()
        };

        appData.chatMessages.push(message);
        saveData();
        input.value = '';
        
        // إظهار الرسالة فوراً مع تأثير بصري
        renderChatMessages();
        
        // محاكاة رد من مستخدم آخر بعد ثانية
        setTimeout(() => {
            const randomUsers = ['أحمد', 'فاطمة', 'محمد', 'نور', 'سارة', 'علي'];
            const randomReplies = [
                'موافق تماماً! 👍',
                'فكرة رائعة جداً! ✨',
                'أتفق معك بنسبة 100%',
                'شكراً على هذه الملاحظة',
                'نقطة مهمة جداً',
                'أحسنت! 🌟'
            ];
            
            const reply = {
                author: randomUsers[Math.floor(Math.random() * randomUsers.length)],
                text: randomReplies[Math.floor(Math.random() * randomReplies.length)],
                timestamp: new Date().toISOString(),
                own: false,
                id: Date.now() + 1
            };
            
            appData.chatMessages.push(reply);
            saveData();
            renderChatMessages();
        }, 1000);
    }
});

// عرض رسائل الدردشة
function renderChatMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    container.innerHTML = '';

    appData.chatMessages.slice(-20).forEach((msg, index) => {
        const div = document.createElement('div');
        div.className = `chat-message ${msg.own ? 'own' : ''}`;
        div.style.animation = `slideUp 0.5s ease-out ${index * 0.05}s both`;
        div.innerHTML = `
            <div class="message-author">${msg.author}</div>
            <div class="message-text">${msg.text}</div>
            <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString('ar-SA')}</div>
        `;
        container.appendChild(div);
    });

    // تمرير سلس إلى آخر رسالة
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

// إضافة اقتباس
document.getElementById('addQuoteBtn')?.addEventListener('click', () => {
    const input = document.getElementById('quoteInput');
    const text = input.value.trim();

    if (text && appData.user) {
        const quote = {
            text: text,
            author: appData.user.name,
            timestamp: new Date().toISOString()
        };

        appData.quotes.push(quote);
        appData.user.quotes++;
        saveData();
        updateProfile();
        input.value = '';
        renderQuotes();
    }
});

// عرض الاقتباسات
function renderQuotes() {
    const container = document.getElementById('quotesList');
    if (!container) return;
    
    container.innerHTML = '';

    appData.quotes.forEach(quote => {
        const div = document.createElement('div');
        div.className = 'quote-card';
        div.innerHTML = `
            <div class="quote-text">"${quote.text}"</div>
            <div class="quote-author">— ${quote.author}</div>
        `;
        container.appendChild(div);
    });
}

// إضافة عبارة
document.getElementById('addPhraseBtn')?.addEventListener('click', () => {
    const input = document.getElementById('phraseInput');
    const text = input.value.trim();

    if (text && appData.user) {
        const phrase = {
            text: text,
            author: appData.user.name,
            timestamp: new Date().toISOString()
        };

        appData.phrases.push(phrase);
        appData.user.phrases++;
        saveData();
        updateProfile();
        input.value = '';
        renderPhrases();
    }
});

// عرض العبارات
function renderPhrases() {
    const container = document.getElementById('phrasesList');
    if (!container) return;
    
    container.innerHTML = '';

    appData.phrases.forEach(phrase => {
        const div = document.createElement('div');
        div.className = 'phrase-card';
        div.innerHTML = `
            <div class="phrase-text">${phrase.text}</div>
            <div class="phrase-author">— ${phrase.author}</div>
        `;
        container.appendChild(div);
    });
}

// قائمة التنقل السفلية
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const pageId = item.dataset.page;
        
        // إزالة الفئة النشطة من جميع العناصر
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // إضافة الفئة النشطة للعنصر المختار
        item.classList.add('active');
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
        }

        // تحديث المحتوى
        if (pageId === 'questionsPage') {
            renderQuestions();
        } else if (pageId === 'chatPage') {
            renderChatMessages();
        } else if (pageId === 'quotesPage') {
            renderQuotes();
        } else if (pageId === 'phrasesPage') {
            renderPhrases();
        }
    });
});

// تسجيل الخروج
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('arkanUser');
    appData.user = null;
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginScreen').classList.add('active');
    const form = document.getElementById('loginForm');
    if (form) form.reset();
});

// أزرار عشوائية
document.getElementById('randomQuestionBtn')?.addEventListener('click', () => {
    if (appData.questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * appData.questions.length);
        showQuestionModal(appData.questions[randomIndex], randomIndex);
    }
});

document.getElementById('randomQuoteBtn')?.addEventListener('click', () => {
    if (appData.quotes.length > 0) {
        const randomQuote = appData.quotes[Math.floor(Math.random() * appData.quotes.length)];
        alert(`"${randomQuote.text}"\n— ${randomQuote.author}`);
    }
});

document.getElementById('randomPhraseBtn')?.addEventListener('click', () => {
    if (appData.phrases.length > 0) {
        const randomPhrase = appData.phrases[Math.floor(Math.random() * appData.phrases.length)];
        alert(`${randomPhrase.text}\n— ${randomPhrase.author}`);
    }
});

// البحث عن الأسئلة
document.getElementById('questionSearch')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const container = document.getElementById('questionsList');
    if (!container) return;
    
    container.innerHTML = '';

    const filtered = appData.questions.filter(q => q.toLowerCase().includes(query));
    filtered.slice(0, 20).forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `<p>${question}</p>`;
        card.addEventListener('click', () => showQuestionModal(question, index));
        container.appendChild(card);
    });
});

// إغلاق Modal بالنقر خارجه
document.getElementById('welcomeModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'welcomeModal') {
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal) {
            welcomeModal.style.display = 'none';
        }
    }
});

// دالة لعرض الصفحات
function showPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // عرض الصفحة المطلوبة
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
}

// تحميل البيانات عند بدء التطبيق
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // التحقق من وجود مستخدم مسجل دخول
    if (appData.user) {
        showApp();
    } else {
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.classList.add('active');
        }
    }
});
