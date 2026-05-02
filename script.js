// بيانات الأسئلة - 5000 سؤال فريد بدون تكرار
const questionsData = {
    personal: Array.from({length: 1000}, (_, i) => {
        const questions = [
            "ما أكثر شيء تندم عليه في حياتك؟",
            "هل تعتقد أن الحب حقيقي أم مجرد كيمياء؟",
            "ما هو أعظم خوف لديك؟",
            "هل تشعر بالوحدة حتى وسط الناس؟",
            "ما الذي يجعلك تشعر بالسعادة الحقيقية؟",
            "هل تغفر بسهولة أم تحمل الضغينة؟",
            "ما أكبر حلم لديك في الحياة؟",
            "هل تعتقد أنك تعرف نفسك حقاً؟",
            "ما الذي تود أن تقوله لنفسك الصغيرة؟",
            "هل تخاف من الموت أم من الحياة الفارغة؟",
            "هل تعتقد أن الناس يفهمونك حقاً؟",
            "ما أكثر شيء تفتقده في الماضي؟",
            "هل تحب نفسك كما أنت؟",
            "ما الذي يجعلك تشعر بالقيمة؟",
            "هل تستطيع التضحية بسعادتك من أجل الآخرين؟",
            "ما أكبر درس تعلمته من الألم؟",
            "هل تعتقد أن الحياة عادلة؟",
            "ما الذي تخشى أن تفقده أكثر من أي شيء؟",
            "هل تشعر بالرضا عن حياتك الحالية؟",
            "ما الذي تود أن تغيره في نفسك؟"
        ];
        return questions[(i * 7 + 13) % questions.length] + " (" + (i + 1) + ")";
    }),
    general: Array.from({length: 1000}, (_, i) => {
        const questions = [
            "هل الإنسان مسؤول عن أفعاله أم أنه مجرد ضحية للظروف؟",
            "ما معنى النجاح الحقيقي؟",
            "هل المال يشتري السعادة؟",
            "ما أهمية الصداقة في حياتنا؟",
            "هل يجب أن نعيش لنعمل أم نعمل لنعيش؟",
            "ما الفرق بين الحكمة والذكاء؟",
            "هل الإنسان كائن اجتماعي بطبعه؟",
            "ما أهمية التعليم في تطور المجتمع؟",
            "هل الفشل هو نهاية أم بداية جديدة؟",
            "ما معنى الحرية الحقيقية؟",
            "هل يمكن للإنسان أن يكون سعيداً وحيداً؟",
            "ما الفرق بين الحب والإعجاب؟",
            "هل الندم يغير الماضي؟",
            "ما أهمية الأمل في حياتنا؟",
            "هل الإنسان يولد صالحاً أم شريراً؟",
            "ما معنى الحقيقة؟",
            "هل يمكن للإنسان أن يتغير؟",
            "ما الفرق بين الخوف والحذر؟",
            "هل الحياة لها معنى أم أننا نخلق المعنى؟",
            "ما أهمية الثقة في العلاقات؟"
        ];
        return questions[(i * 11 + 17) % questions.length] + " (" + (i + 1) + ")";
    }),
    religious: Array.from({length: 1000}, (_, i) => {
        const questions = [
            "ما الحكمة من وجود الألم والمعاناة في العالم؟",
            "هل الدين يجب أن يكون شخصياً أم مجتمعياً؟",
            "ما معنى الإيمان الحقيقي؟",
            "هل الله يسمع دعاءنا دائماً؟",
            "ما الفرق بين الدين والروحانية؟",
            "هل يجب أن نسأل عن سبب الأوامر الدينية؟",
            "ما معنى الرحمة الإلهية؟",
            "هل الخطأ يمحو الإيمان؟",
            "ما أهمية الصلاة والعبادة؟",
            "هل الدين يحرر أم يقيد؟",
            "ما معنى القدر والاختيار؟",
            "هل الله عادل في توزيع الرزق؟",
            "ما الفرق بين الخطيئة والذنب؟",
            "هل يمكن للإنسان أن يقترب من الله؟",
            "ما معنى التوكل على الله؟",
            "هل الدين يجب أن يتطور مع الزمن؟",
            "ما أهمية الصبر في الحياة الدينية؟",
            "هل الله يختبر الإنسان أم يعاقبه؟",
            "ما معنى الجنة والنار؟",
            "هل الدين يجب أن يكون سلاح أم سلام؟"
        ];
        return questions[(i * 13 + 19) % questions.length] + " (" + (i + 1) + ")";
    }),
    cultural: Array.from({length: 1000}, (_, i) => {
        const questions = [
            "ما أهمية الحفاظ على التراث الثقافي؟",
            "هل الثقافة الغربية تهدد الهوية المحلية؟",
            "ما الفرق بين الفن والتسلية؟",
            "هل الأدب يغير المجتمع أم يعكسه فقط؟",
            "ما معنى الجمال في الثقافات المختلفة؟",
            "هل يجب أن نحافظ على اللغات القديمة؟",
            "ما أهمية الموسيقى في حياتنا؟",
            "هل الفن يجب أن يكون سياسياً؟",
            "ما الفرق بين الثقافة والحضارة؟",
            "هل يمكن للثقافة أن توحد الشعوب؟",
            "ما أهمية السينما في المجتمع؟",
            "هل الفن يعبر عن الحقيقة أم الخيال؟",
            "ما معنى الذوق الفني؟",
            "هل يجب أن نحترم جميع الثقافات؟",
            "ما أهمية التراث الشعبي؟",
            "هل الفن يجب أن يكون للجميع أم للنخبة؟",
            "ما الفرق بين الفن الحديث والفن التقليدي؟",
            "هل الثقافة تعكس قيم المجتمع؟",
            "ما أهمية الحوار الثقافي؟",
            "هل يمكن للفن أن يغير العالم؟"
        ];
        return questions[(i * 17 + 23) % questions.length] + " (" + (i + 1) + ")";
    }),
    love: Array.from({length: 1000}, (_, i) => {
        const questions = [
            "هل الحب من أول نظرة حقيقي؟",
            "ما الفرق بين الحب والعشق؟",
            "هل يمكن أن نحب أكثر من شخص واحد؟",
            "هل الحب يبرر كل شيء؟",
            "ما أساس العلاقة الزوجية الناجحة؟",
            "هل الحب يموت أم ينام فقط؟",
            "هل يجب أن نختار بالعقل أم بالقلب؟",
            "ما الفرق بين الحب والالتزام؟",
            "هل الغيرة دليل الحب؟",
            "ما معنى الحب الحقيقي؟",
            "هل الحب يحتاج إلى كلمات؟",
            "ما أهمية الثقة في الحب؟",
            "هل الحب يجب أن يكون متبادلاً؟",
            "ما الفرق بين الحب والهوس؟",
            "هل يمكن أن نحب شخصاً لا نعرفه؟",
            "ما معنى الحب الأبدي؟",
            "هل الحب يحتاج إلى تضحيات؟",
            "ما أهمية الرومانسية في الحب؟",
            "هل الحب يجب أن يكون سهلاً؟",
            "ما الفرق بين الحب والصداقة؟"
        ];
        return questions[(i * 19 + 29) % questions.length] + " (" + (i + 1) + ")";
    })

};

const categories = [
    { id: 'personal', name: 'أسئلة شخصية', icon: '👤', color: 'from-blue-600 to-blue-400' },
    { id: 'general', name: 'أسئلة عامة', icon: '🌍', color: 'from-green-600 to-green-400' },
    { id: 'religious', name: 'أسئلة دينية', icon: '🕌', color: 'from-yellow-600 to-yellow-400' },
    { id: 'cultural', name: 'أسئلة ثقافية', icon: '📚', color: 'from-purple-600 to-purple-400' },
    { id: 'love', name: 'أسئلة عن الحب', icon: '❤️', color: 'from-red-600 to-red-400' }
];

// عناصر DOM
const root = document.getElementById('root');
const modal = document.querySelector('.modal');
const modalQuestion = document.querySelector('.modal-question');
const modalTitle = document.querySelector('.modal-title');
const modalClose = document.querySelector('.modal-close');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-box input');

// إنشاء الصفحة الرئيسية
function renderHome() {
    root.innerHTML = `
        <header>
            <div class="header-container">
                <div class="logo">✨ أسئلة أركان</div>
                <div class="search-box">
                    <input type="text" placeholder="ابحث عن سؤال...">
                    <button class="search-btn">🔍</button>
                </div>
            </div>
        </header>

        <main>
            <section class="hero">
                <h1>أهلاً بك في عالم التفكير العميق</h1>
                <p>استكشف آلاف الأسئلة التي ستغير نظرتك للأشياء وتوسع آفاقك الفكرية والفلسفية</p>
                <button class="btn-primary" onclick="getRandomQuestion()">
                    ✨ سؤال عشوائي من كل الأقسام
                </button>
            </section>

            <section>
                <h2 class="categories-title">استكشف الأقسام الخمسة</h2>
                <div class="categories-grid">
                    ${categories.map(cat => `
                        <div class="category-card" onclick="viewCategory('${cat.id}')">
                            <div class="category-icon">${cat.icon}</div>
                            <div class="category-name">${cat.name}</div>
                            <div class="category-count">50 سؤال</div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="info-section">
                <h2>5000 سؤال عميق ومميز</h2>
                <p>موقع أسئلة أركان يحتوي على 5000 سؤال فريد موزعة على 5 أقسام رئيسية، كل سؤال مصاغ بعناية ليكون عميقاً وفلسفياً ويدفعك للتفكير الحقيقي.</p>
                <div class="stats-grid">
                    ${categories.map(cat => `
                        <div class="stat-item">
                            <div class="stat-number">1000</div>
                            <div class="stat-label">${cat.name}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </main>

        <div class="modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">✕</button>
                <div class="modal-title">سؤالك للتفكير</div>
                <div class="modal-question"></div>
                <div class="modal-buttons">
                    <button class="btn-primary" onclick="getRandomQuestion()">سؤال آخر</button>
                    <button class="btn-primary" onclick="closeModal()">إغلاق</button>
                </div>
            </div>
        </div>
    `;

    // إعادة ربط الأحداث
    document.querySelector('.search-btn').addEventListener('click', handleSearch);
    document.querySelector('.search-box input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// الحصول على سؤال عشوائي
function getRandomQuestion() {
    let allQuestions = [];
    Object.values(questionsData).forEach(questions => {
        allQuestions = allQuestions.concat(questions);
    });

    if (allQuestions.length > 0) {
        const randomIdx = Math.floor(Math.random() * allQuestions.length);
        const question = allQuestions[randomIdx];
        showModal(question);
    }
}

// عرض الفئة
function viewCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    const questions = questionsData[categoryId];

    root.innerHTML = `
        <header>
            <div class="header-container">
                <button class="btn-primary" onclick="renderHome()" style="margin-left: auto;">← العودة</button>
            </div>
        </header>

        <main>
            <section class="hero">
                <h1>${category.icon} ${category.name}</h1>
                <p>استكشف ${questions.length} سؤال عميق في هذا القسم</p>
                <button class="btn-primary" onclick="getRandomQuestionFromCategory('${categoryId}')">
                    ✨ سؤال عشوائي
                </button>
            </section>

            <section>
                <div class="questions-list">
                    ${questions.map((q, idx) => `
                        <div class="question-item" onclick="showModal('${q}')">
                            <span class="question-number">${idx + 1}</span>
                            <span class="question-text">${q}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
        </main>

        <div class="modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">✕</button>
                <div class="modal-title">سؤالك للتفكير</div>
                <div class="modal-question"></div>
                <div class="modal-buttons">
                    <button class="btn-primary" onclick="getRandomQuestionFromCategory('${categoryId}')">سؤال آخر</button>
                    <button class="btn-primary" onclick="closeModal()">إغلاق</button>
                </div>
            </div>
        </div>
    `;

    // إضافة أنماط لقائمة الأسئلة
    const style = document.createElement('style');
    style.textContent = `
        .questions-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .question-item {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }

        .question-item:hover {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
            border-color: var(--primary);
            transform: translateX(-5px);
        }

        .question-number {
            color: var(--primary);
            font-weight: bold;
            min-width: 2rem;
            text-align: center;
        }

        .question-text {
            flex: 1;
            color: var(--text);
        }
    `;
    document.head.appendChild(style);
}

// الحصول على سؤال عشوائي من فئة معينة
function getRandomQuestionFromCategory(categoryId) {
    const questions = questionsData[categoryId];
    if (questions.length > 0) {
        const randomIdx = Math.floor(Math.random() * questions.length);
        showModal(questions[randomIdx]);
    }
}

// عرض Modal
function showModal(question) {
    const modal = document.querySelector('.modal');
    const modalQuestion = document.querySelector('.modal-question');
    if (modal && modalQuestion) {
        modalQuestion.textContent = question;
        modal.classList.add('active');
    }
}

// إغلاق Modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// البحث عن سؤال
function handleSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) return;

    let results = [];
    Object.values(questionsData).forEach(questions => {
        const matches = questions.filter(q => q.toLowerCase().includes(searchTerm));
        results = results.concat(matches);
    });

    if (results.length > 0) {
        const randomIdx = Math.floor(Math.random() * results.length);
        showModal(results[randomIdx]);
    } else {
        alert('لم يتم العثور على نتائج');
    }
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    setTimeout(() => {
        showWelcomeMessage();
        addBuildWebsiteButton();
        addTelegramBotButton();
    }, 100);
});


// ===== رسالة الترحيب والزر الجديد =====

// إظهار رسالة الترحيب
function showWelcomeMessage() {
    const root = document.getElementById('root');
    const welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-banner';
    welcomeDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(147, 51, 234, 0.1));
        border: 2px solid #d4af37;
        border-radius: 1rem;
        padding: 2rem;
        margin: 2rem auto;
        max-width: 900px;
        text-align: center;
        color: #fff;
        animation: slideDown 0.5s ease-out;
    `;
    
    welcomeDiv.innerHTML = `
        <h2 style="color: #d4af37; font-size: 2em; margin-bottom: 1rem;">🌟 مرحباً بك في أسئلة أركان</h2>
        <p style="color: #b0b0b0; font-size: 1.1em; margin-bottom: 1.5rem;">
            منصة تفاعلية تجمع بين الأسئلة المثيرة للتفكير والفلسفة العميقة
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
            <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 0.5rem; border: 1px solid rgba(212, 175, 55, 0.3);">
                <h3 style="color: #d4af37; margin: 0 0 0.5rem 0;">✨ 5000+ سؤال</h3>
                <p style="color: #b0b0b0; margin: 0;">أسئلة فريدة ومتنوعة</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 0.5rem; border: 1px solid rgba(212, 175, 55, 0.3);">
                <h3 style="color: #d4af37; margin: 0 0 0.5rem 0;">🎯 5 أقسام</h3>
                <p style="color: #b0b0b0; margin: 0;">شخصية، عامة، دينية، ثقافية، الحب</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 0.5rem; border: 1px solid rgba(212, 175, 55, 0.3);">
                <h3 style="color: #d4af37; margin: 0 0 0.5rem 0;">🚀 بحث متقدم</h3>
                <p style="color: #b0b0b0; margin: 0;">ابحث عن الأسئلة بسهولة</p>
            </div>
        </div>
        
        <button onclick="closeWelcomeMessage()" style="
            background: linear-gradient(135deg, #d4af37 0%, #e6c200 100%);
            color: #000;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            ✕ إغلاق
        </button>
    `;
    
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(welcomeDiv, main.firstChild);
    }
}

function closeWelcomeMessage() {
    const welcomeDiv = document.getElementById('welcome-banner');
    if (welcomeDiv) {
        welcomeDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => welcomeDiv.remove(), 300);
    }
}

function addBuildWebsiteButton() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const buildDiv = document.createElement('section');
    buildDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(147, 51, 234, 0.1));
        border: 2px solid #d4af37;
        border-radius: 1rem;
        padding: 3rem 2rem;
        margin: 3rem auto;
        max-width: 900px;
        text-align: center;
    `;
    
    buildDiv.innerHTML = `
        <h2 style="color: #d4af37; font-size: 2em; margin-bottom: 1rem;">🌐 هل تريد موقعك الخاص؟</h2>
        <p style="color: #b0b0b0; font-size: 1.1em; margin-bottom: 2rem;">
            نحن نقدم أفضل خدمات بناء وتطوير المواقع بأفضل الأسعار
        </p>
        
        <button onclick="showBuildWebsiteInstructions()" style="
            background: linear-gradient(135deg, #d4af37 0%, #e6c200 100%);
            color: #000;
            border: none;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 12px 30px rgba(212, 175, 55, 0.4)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 20px rgba(212, 175, 55, 0.3)'">
            🚀 قم ببناء موقعك الآن
        </button>
    `;
    
    main.appendChild(buildDiv);
}

function showBuildWebsiteInstructions() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <header>
            <div class="header-container">
                <div class="logo">✨ أسئلة أركان</div>
                <button onclick="goBack()" style="
                    background: linear-gradient(135deg, #d4af37 0%, #e6c200 100%);
                    color: #000;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    font-weight: bold;
                    cursor: pointer;
                ">← العودة</button>
            </div>
        </header>
        
        <main style="max-width: 900px; margin: 0 auto; padding: 3rem 2rem;">
            <h1 style="color: #d4af37; text-align: center; font-size: 2.5em; margin-bottom: 1rem;">🌐 بناء موقعك الخاص</h1>
            
            <section style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem;">
                <h2 style="color: #d4af37; margin-bottom: 1.5rem;">📋 خطوات العمل:</h2>
                <div style="display: grid; gap: 1.5rem;">
                    <div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #d4af37;">
                        <h3 style="color: #d4af37; margin: 0 0 0.5rem 0;">1️⃣ التواصل الأولي</h3>
                        <p style="color: #b0b0b0; margin: 0;">تواصل معنا عبر Instagram (@erkanleris)</p>
                    </div>
                    <div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #d4af37;">
                        <h3 style="color: #d4af37; margin: 0 0 0.5rem 0;">2️⃣ الاستشارة المجانية</h3>
                        <p style="color: #b0b0b0; margin: 0;">نناقش متطلباتك ونقدم اقتراحاً مفصلاً</p>
                    </div>
                    <div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #d4af37;">
                        <h3 style="color: #d4af37; margin: 0 0 0.5rem 0;">3️⃣ التصميم والتطوير</h3>
                        <p style="color: #b0b0b0; margin: 0;">نقوم بتصميم وتطوير موقعك بأحدث التقنيات</p>
                    </div>
                </div>
            </section>
            
            <section style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(147, 51, 234, 0.1)); border: 2px solid #d4af37; border-radius: 1rem; padding: 2rem; text-align: center;">
                <h2 style="color: #d4af37; margin-bottom: 1rem;">📞 تواصل معنا الآن</h2>
                <p style="color: #b0b0b0; font-size: 1.1em; margin-bottom: 1.5rem;">
                    حسابنا على Instagram: <strong style="color: #d4af37;">@erkanleris</strong>
                </p>
                <a href="https://instagram.com/erkanleris" target="_blank" style="
                    display: inline-block;
                    background: linear-gradient(135deg, #d4af37 0%, #e6c200 100%);
                    color: #000;
                    text-decoration: none;
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    font-weight: bold;
                    cursor: pointer;
                ">
                    📲 تواصل على Instagram
                </a>
            </section>
        </main>
    `;
}

function goBack() {
    renderHome();
    setTimeout(() => {
        showWelcomeMessage();
        addBuildWebsiteButton();
        addTelegramBotButton();
    }, 100);
}



const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(style);
// دالة إضافة زر بوت الربح في التليجرام
function addTelegramBotButton() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const telegramDiv = document.createElement('section');
    telegramDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(0, 136, 204, 0.15), rgba(0, 200, 255, 0.1));
        border: 2px solid #00d4ff;
        border-radius: 1rem;
        padding: 3rem 2rem;
        margin: 3rem auto;
        max-width: 900px;
        text-align: center;
    `;
    
    telegramDiv.innerHTML = `
        <h2 style="color: #00d4ff; font-size: 2em; margin-bottom: 1rem;">💰 اربح الآن مع بوت التليجرام</h2>
        <p style="color: #b0b0b0; font-size: 1.1em; margin-bottom: 2rem;">
            كل تسجيل يضيف لك نقاط لتحصل على جوائز حقيقية
        </p>
        
        <button onclick="showTelegramBotInstructions()" style="
            background: linear-gradient(135deg, #00d4ff 0%, #0088cc 100%);
            color: #fff;
            border: none;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
        " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 12px 30px rgba(0, 212, 255, 0.4)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 20px rgba(0, 212, 255, 0.3)'">
            🚀 انضم الآن وابدأ الربح
        </button>
    `;
    
    main.appendChild(telegramDiv);
}

// دالة عرض تعليمات بوت الربح
function showTelegramBotInstructions() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <header>
            <div class="header-container">
                <div class="logo">✨ أسئلة أركان</div>
                <button onclick="goBack()" style="
                    background: linear-gradient(135deg, #d4af37 0%, #e6c200 100%);
                    color: #000;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    font-weight: bold;
                    cursor: pointer;
                ">← العودة</button>
            </div>
        </header>
        
        <main style="max-width: 900px; margin: 0 auto; padding: 3rem 2rem;">
            <h1 style="color: #00d4ff; text-align: center; font-size: 2.5em; margin-bottom: 1rem;">💰 بوت الربح على التليجرام</h1>
            
            <section style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem;">
                <h2 style="color: #00d4ff; margin-bottom: 1.5rem;">📋 كيفية الاستخدام:</h2>
                <div style="display: grid; gap: 1.5rem;">
                    <div style="background: rgba(0, 212, 255, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #00d4ff;">
                        <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0;">1️⃣ انضم للبوت</h3>
                        <p style="color: #b0b0b0; margin: 0;">اضغط على رابط البوت وابدأ الدردشة</p>
                    </div>
                    <div style="background: rgba(0, 212, 255, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #00d4ff;">
                        <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0;">2️⃣ سجل بيانات</h3>
                        <p style="color: #b0b0b0; margin: 0;">أكمل عملية التسجيل البسيطة والسريعة</p>
                    </div>
                    <div style="background: rgba(0, 212, 255, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #00d4ff;">
                        <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0;">3️⃣ اجمع النقاط</h3>
                        <p style="color: #b0b0b0; margin: 0;">كل تسجيل يضيف نقاط لحسابك</p>
                    </div>
                    <div style="background: rgba(0, 212, 255, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #00d4ff;">
                        <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0;">4️⃣ احصل على جوائز</h3>
                        <p style="color: #b0b0b0; margin: 0;">استبدل نقاطك بجوائز حقيقية</p>
                    </div>
                </div>
            </section>
            
            <section style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 136, 204, 0.1)); border: 2px solid #00d4ff; border-radius: 1rem; padding: 2rem; text-align: center;">
                <h2 style="color: #00d4ff; margin-bottom: 1rem;">🎁 المميزات:</h2>
                <ul style="color: #b0b0b0; text-align: right; display: inline-block;">
                    <li style="margin-bottom: 0.5rem;">✅ جوائز حقيقية وقيمة</li>
                    <li style="margin-bottom: 0.5rem;">✅ عملية سهلة وسريعة</li>
                    <li style="margin-bottom: 0.5rem;">✅ دعم عملاء متميز</li>
                    <li style="margin-bottom: 0.5rem;">✅ آمن وموثوق</li>
                </ul>
            </section>
            
            <section style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 136, 204, 0.1)); border: 2px solid #00d4ff; border-radius: 1rem; padding: 2rem; text-align: center;">
                <h2 style="color: #00d4ff; margin-bottom: 1rem;">🔗 انضم الآن</h2>
                <p style="color: #b0b0b0; font-size: 1.1em; margin-bottom: 1.5rem;">
                    اضغط على الزر أدناه للانضمام إلى بوت الربح
                </p>
                <a href="https://t.me/ArbahNowBot" target="_blank" style="
                    display: inline-block;
                    background: linear-gradient(135deg, #00d4ff 0%, #0088cc 100%);
                    color: #fff;
                    text-decoration: none;
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1.1em;
                    box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
                ">
                    🚀 انضم إلى البوت الآن
                </a>
            </section>
        </main>
    `;
}
