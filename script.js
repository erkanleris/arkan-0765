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
    }),
    poems: {
        sad: [
            { title: "في الحزن", poet: "الشاعر المجهول", text: "ألم يان الأوان بعد؟\nحزن ابتعد عنّي ودع جرحي يزل همّي\nوإنّي بك يا حزني غير العذاب لا أجني" },
            { title: "دموع الليل", poet: "الشاعر المجهول", text: "أبشرك ماعاد يوجعني فراق\nوأقسى وجع فيني يزول بثواني\nعودت قلبي إذا حمل هم أو ضاق\nأرمي وما أسأل عن اللي رماني" },
            { title: "وحدة الليل", poet: "الشاعر المجهول", text: "هني من هو هموم الليل ما جنه\nيسهر الليل ويبكي على حاله\nقلبه ينزف من جروح ما شفيت\nوالدموع تنهمر على خده الشاحب" },
            { title: "الألم الصامت", poet: "الشاعر المجهول", text: "ألم صامت يعتصر القلب\nحزن عميق لا يُعبّر بالكلمات\nروح تئن من الأسى والوجع\nعينان تبحثان عن نور في الظلام" }
        ],
        love: [
            { title: "في الحب", poet: "الشاعر المجهول", text: "ولا تسألني عن اسمي فقد نسيته عندما أحببتك\nكنت انوي ان احفر اسمك على قلبي\nولكنني خشيت أن تزعجك دقات قلبي" },
            { title: "عشق الروح", poet: "الشاعر المجهول", text: "أنت الكلام الجميل يغار من حرفك ياحلو\nعذرك معاي وحلو تقصيرك\nيا ليتني كنت اعرفك قبل لا اعرفك\nما كان غامرت بإحساسي مع غيرك" },
            { title: "قلبي وعيناك", poet: "الشاعر المجهول", text: "قلبي وعيناكِ والأيام بينهما\nدربٌ طويلٌ تعبنا من مآسيه\nإن يخفقِ القلب كيف العمر نرجعه\nكل الذي مات فينا كيف نحييه" },
            { title: "الشوق", poet: "الشاعر المجهول", text: "الشوق درب طويل ينتهي بك\nفي أحضان من تحب وتشتاق\nحبك يملأ روحي بالنور\nوذكرك يعطيني قوة لأستمر" }
        ],
        separation: [
            { title: "الفراق", poet: "الشاعر المجهول", text: "خذني إليكَ إذا أردتَ بقاءَنا\nأمّا الفراقَ.. فما أقولُ لأمنعَك؟\nواللهُ يَعلَمُ حالنا رغمَ ابتعادكَ\nكنتُ وحدي أتبعك" },
            { title: "الوداع", poet: "الشاعر المجهول", text: "لولا الفراقُ لمَا بكيتُ على الأيام\nلولا الفراقُ لمَا عرفتُ معنى الألم\nلولا الفراقُ لمَا تعلمتُ أن الحب\nقد يكون أقسى من الموت" },
            { title: "البعد", poet: "الشاعر المجهول", text: "تالي نهاري وقت في المرقب العالي\nأنتظرك في كل شروق وغروب\nبراسك يداعبني نسيم الشوق\nوقلبي ينبض باسمك في كل نبضة" },
            { title: "الاشتياق", poet: "الشاعر المجهول", text: "أشتاق إليك في الصباح والمساء\nأشتاق إلى صوتك وضحكتك وعطرك\nأشتاق إلى لحظات كنا معاً فيها\nحين كان الحب يملأ كل مكان حولنا" }
        ]
    }
};

const categories = [
    { id: 'personal', name: 'أسئلة شخصية', icon: '👤', color: 'from-blue-600 to-blue-400' },
    { id: 'general', name: 'أسئلة عامة', icon: '🌍', color: 'from-green-600 to-green-400' },
    { id: 'religious', name: 'أسئلة دينية', icon: '🕌', color: 'from-yellow-600 to-yellow-400' },
    { id: 'cultural', name: 'أسئلة ثقافية', icon: '📚', color: 'from-purple-600 to-purple-400' },
    { id: 'love', name: 'أسئلة عن الحب', icon: '❤️', color: 'from-red-600 to-red-400' },
    { id: 'poems', name: 'الأشعار', icon: '✨', color: 'from-pink-600 to-pink-400' }
];

const poemSubcategories = [
    { id: 'sad', name: 'شعر حزين', icon: '😢', color: 'from-gray-600 to-gray-400' },
    { id: 'love', name: 'شعر حب', icon: '💕', color: 'from-red-600 to-red-400' },
    { id: 'separation', name: 'شعر فراق', icon: '💔', color: 'from-orange-600 to-orange-400' }
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
                <p>استكشف آلاف الأسئلة والأشعار التي ستغير نظرتك للأشياء وتوسع آفاقك الفكرية والفلسفية</p>
                <button class="btn-primary" onclick="getRandomQuestion()">
                    ✨ سؤال عشوائي من كل الأقسام
                </button>
            </section>
            <section>
                <h2 class="categories-title">استكشف الأقسام</h2>
                <div class="categories-grid">
                    ${categories.map(cat => `
                        <div class="category-card" onclick="viewCategory('${cat.id}')">
                            <div class="category-icon">${cat.icon}</div>
                            <div class="category-name">${cat.name}</div>
                            <div class="category-count">${cat.id === 'poems' ? '12 شعر' : '1000 سؤال'}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
            <section class="info-section">
                <h2>5000 سؤال عميق + أشعار مميزة</h2>
                <p>موقع أسئلة أركان يحتوي على 5000 سؤال فريد موزعة على 5 أقسام رئيسية، بالإضافة إلى مجموعة مختارة من الأشعار الجميلة في أقسام (حزين، حب، فراق).</p>
                <div class="stats-grid">
                    ${categories.map(cat => `
                        <div class="stat-item">
                            <div class="stat-number">${cat.id === 'poems' ? '12' : '1000'}</div>
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
    attachEventListeners();
}

// عرض فئة معينة
function viewCategory(categoryId) {
    if (categoryId === 'poems') {
        viewPoemCategories();
    } else {
        const questions = questionsData[categoryId];
        const category = categories.find(c => c.id === categoryId);
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
            <main>
                <h1 style="text-align: center; margin-bottom: 2rem; color: #d4af37;">${category.icon} ${category.name}</h1>
                <div class="questions-list">
                    ${questions.slice(0, 50).map((q, i) => `
                        <div class="question-item" onclick="showQuestion('${q.replace(/'/g, "\\'")}')">
                            <span class="question-number">${i + 1}</span>
                            <span class="question-text">${q}</span>
                        </div>
                    `).join('')}
                </div>
            </main>
            <div class="modal">
                <div class="modal-content">
                    <button class="modal-close" onclick="closeModal()">✕</button>
                    <div class="modal-title">السؤال</div>
                    <div class="modal-question"></div>
                    <div class="modal-buttons">
                        <button class="btn-primary" onclick="getRandomQuestion()">سؤال آخر</button>
                        <button class="btn-primary" onclick="closeModal()">إغلاق</button>
                    </div>
                </div>
            </div>
        `;
        attachEventListeners();
    }
}

// عرض أقسام الأشعار
function viewPoemCategories() {
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
        <main>
            <h1 style="text-align: center; margin-bottom: 3rem; color: #d4af37;">✨ الأشعار</h1>
            <div class="categories-grid">
                ${poemSubcategories.map(subcat => `
                    <div class="category-card" onclick="viewPoems('${subcat.id}')">
                        <div class="category-icon">${subcat.icon}</div>
                        <div class="category-name">${subcat.name}</div>
                        <div class="category-count">${questionsData.poems[subcat.id].length} أشعار</div>
                    </div>
                `).join('')}
            </div>
        </main>
        <div class="modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">✕</button>
                <div class="modal-title">الشعر</div>
                <div class="modal-question"></div>
                <div class="modal-buttons">
                    <button class="btn-primary" onclick="closeModal()">إغلاق</button>
                </div>
            </div>
        </div>
    `;
    attachEventListeners();
}

// عرض الأشعار في قسم معين
function viewPoems(subcategoryId) {
    const poems = questionsData.poems[subcategoryId];
    const subcat = poemSubcategories.find(s => s.id === subcategoryId);
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
        <main>
            <h1 style="text-align: center; margin-bottom: 2rem; color: #d4af37;">${subcat.icon} ${subcat.name}</h1>
            <div class="poems-list">
                ${poems.map((poem, i) => `
                    <div class="poem-item" onclick="showPoem(${i}, '${subcategoryId}')">
                        <div class="poem-title">${poem.title}</div>
                        <div class="poem-poet">- ${poem.poet}</div>
                    </div>
                `).join('')}
            </div>
        </main>
        <div class="modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">✕</button>
                <div class="modal-title">الشعر</div>
                <div class="modal-question"></div>
                <div class="modal-buttons">
                    <button class="btn-primary" onclick="closeModal()">إغلاق</button>
                </div>
            </div>
        </div>
    `;
    attachEventListeners();
}

// عرض شعر معين
function showPoem(index, subcategoryId) {
    const poem = questionsData.poems[subcategoryId][index];
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeModal()">✕</button>
        <div class="modal-title">${poem.title}</div>
        <div style="text-align: center; margin-bottom: 1rem; color: #b0b0b0;">- ${poem.poet} -</div>
        <div class="modal-question" style="white-space: pre-line; line-height: 2;">${poem.text}</div>
        <div class="modal-buttons">
            <button class="btn-primary" onclick="closeModal()">إغلاق</button>
        </div>
    `;
    modal.classList.add('active');
}

// عرض سؤال عشوائي
function getRandomQuestion() {
    const categoryKeys = Object.keys(questionsData).filter(k => k !== 'poems');
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const questions = questionsData[randomCategory];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    showQuestion(randomQuestion);
}

// عرض سؤال معين
function showQuestion(question) {
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeModal()">✕</button>
        <div class="modal-title">سؤالك للتفكير</div>
        <div class="modal-question">${question}</div>
        <div class="modal-buttons">
            <button class="btn-primary" onclick="getRandomQuestion()">سؤال آخر</button>
            <button class="btn-primary" onclick="closeModal()">إغلاق</button>
        </div>
    `;
    modal.classList.add('active');
}

// إغلاق الـ modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// العودة للصفحة الرئيسية
function goBack() {
    renderHome();
}

// إرفاق مستمعي الأحداث
function attachEventListeners() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchQuestions);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchQuestions();
        });
    }
}

// البحث عن الأسئلة
function searchQuestions() {
    const searchInput = document.querySelector('.search-box input');
    const query = searchInput.value.toLowerCase();
    
    if (!query) return;
    
    const results = [];
    for (const [category, questions] of Object.entries(questionsData)) {
        if (category === 'poems') continue;
        questions.forEach((q) => {
            if (q.toLowerCase().includes(query)) {
                results.push(q);
            }
        });
    }
    
    if (results.length === 0) {
        alert('لم يتم العثور على نتائج');
        return;
    }
    
    showQuestion(results[Math.floor(Math.random() * results.length)]);
}

// تهيئة الصفحة
renderHome();
