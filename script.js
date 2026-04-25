// البيانات
const categories = {
    personal: { name: 'أسئلة شخصية', icon: '👤', color: 'from-blue-600 to-blue-400' },
    general: { name: 'أسئلة عامة', icon: '🌍', color: 'from-green-600 to-green-400' },
    religious: { name: 'أسئلة دينية', icon: '🕌', color: 'from-yellow-600 to-yellow-400' },
    cultural: { name: 'أسئلة ثقافية', icon: '📚', color: 'from-purple-600 to-purple-400' },
    love: { name: 'أسئلة عن الحب', icon: '❤️', color: 'from-red-600 to-red-400' }
};

let currentCategory = null;
let currentPage = 1;
const itemsPerPage = 12;
let filteredQuestions = [];

// تهيئة الخلفية المتحركة
function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // إنشاء جزيئات
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // رسم تدرج
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
        gradient.addColorStop(0.5, 'rgba(106, 27, 154, 0.05)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// تحميل الأسئلة
function loadQuestions() {
    if (typeof questionsData === 'undefined') {
        console.error('بيانات الأسئلة غير محملة');
        return;
    }
    
    renderCategories();
    renderStats();
}

// عرض الأقسام
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    
    Object.entries(categories).forEach(([key, cat]) => {
        const count = questionsData[key]?.length || 0;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-icon">${cat.icon}</div>
            <div class="category-name">${cat.name}</div>
            <div class="category-count">${count} سؤال</div>
        `;
        card.addEventListener('click', () => showCategory(key));
        grid.appendChild(card);
    });
}

// عرض الإحصائيات
function renderStats() {
    const grid = document.getElementById('statsGrid');
    grid.innerHTML = '';
    
    const totalQuestions = Object.values(questionsData).reduce((sum, arr) => sum + arr.length, 0);
    const totalCategories = Object.keys(questionsData).length;
    
    const stats = [
        { number: totalQuestions, label: 'سؤال فريد' },
        { number: totalCategories, label: 'قسم رئيسي' },
        { number: '1000+', label: 'سؤال لكل قسم' },
        { number: '100%', label: 'مجاني' }
    ];
    
    stats.forEach(stat => {
        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        grid.appendChild(item);
    });
}

// عرض قسم معين
function showCategory(categoryKey) {
    currentCategory = categoryKey;
    currentPage = 1;
    filteredQuestions = questionsData[categoryKey] || [];
    
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.info-section').style.display = 'none';
    document.getElementById('questionsSection').style.display = 'block';
    
    document.getElementById('categoryTitle').textContent = categories[categoryKey].name;
    renderQuestions();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// عرض الأسئلة
function renderQuestions() {
    const grid = document.getElementById('questionsGrid');
    grid.innerHTML = '';
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedQuestions = filteredQuestions.slice(start, end);
    
    if (paginatedQuestions.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">لا توجد أسئلة تطابق البحث</p>';
        return;
    }
    
    paginatedQuestions.forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <div>
                <div class="question-number">#${start + index + 1}</div>
                <div class="question-text">${question}</div>
            </div>
            <div class="question-hint">اضغط لقراءة السؤال كاملاً</div>
        `;
        card.addEventListener('click', () => showQuestionModal(question));
        grid.appendChild(card);
    });
    
    renderPagination();
}

// عرض التصفح
function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    
    if (totalPages <= 1) return;
    
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderQuestions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(btn);
    }
}

// عرض السؤال في نافذة منفصلة
function showQuestionModal(question) {
    document.getElementById('modalQuestion').textContent = question;
    document.getElementById('questionModal').style.display = 'flex';
}

// إغلاق النافذة
function closeModal() {
    document.getElementById('questionModal').style.display = 'none';
}

// العودة للرئيسية
function goHome() {
    currentCategory = null;
    currentPage = 1;
    filteredQuestions = [];
    
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.categories').style.display = 'block';
    document.querySelector('.info-section').style.display = 'block';
    document.getElementById('questionsSection').style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// سؤال عشوائي
function getRandomQuestion() {
    let questions = [];
    if (currentCategory) {
        questions = questionsData[currentCategory] || [];
    } else {
        Object.values(questionsData).forEach(arr => questions.push(...arr));
    }
    
    if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        showQuestionModal(questions[randomIndex]);
    }
}

// البحث
function performSearch(query) {
    if (!currentCategory) return;
    
    if (query.trim() === '') {
        filteredQuestions = questionsData[currentCategory] || [];
    } else {
        const allQuestions = questionsData[currentCategory] || [];
        filteredQuestions = allQuestions.filter(q => 
            q.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    currentPage = 1;
    renderQuestions();
}

// إغلاق رسالة الترحيب
function closeWelcome() {
    document.getElementById('welcomeModal').style.display = 'none';
    localStorage.setItem('welcomeShown', 'true');
}

// عرض رسالة الترحيب
function showWelcome() {
    const welcomeShown = localStorage.getItem('welcomeShown');
    if (!welcomeShown) {
        document.getElementById('welcomeModal').style.display = 'flex';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    loadQuestions();
    showWelcome();
    
    // أزرار البحث
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value;
        performSearch(query);
    });
    
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = document.getElementById('searchInput').value;
            performSearch(query);
        }
    });
    
    // أزرار البحث في القسم
    document.getElementById('categorySearchBtn').addEventListener('click', () => {
        const query = document.getElementById('categorySearchInput').value;
        performSearch(query);
    });
    
    document.getElementById('categorySearchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = document.getElementById('categorySearchInput').value;
            performSearch(query);
        }
    });
    
    // أزرار الأسئلة العشوائية
    document.getElementById('randomBtn').addEventListener('click', getRandomQuestion);
    document.getElementById('randomCategoryBtn').addEventListener('click', getRandomQuestion);
    
    // أزرار النافذة
    document.getElementById('closeBtn').addEventListener('click', closeModal);
    document.getElementById('anotherBtn').addEventListener('click', () => {
        getRandomQuestion();
    });
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // إغلاق النافذة عند النقر خارجها
    document.getElementById('questionModal').addEventListener('click', (e) => {
        if (e.target.id === 'questionModal') {
            closeModal();
        }
    });
    
    // زر العودة
    document.getElementById('backBtn').addEventListener('click', goHome);
});
