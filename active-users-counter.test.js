import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('عداد المستخدمين النشطين', () => {
    let localStorage;
    let currentTime;

    beforeEach(() => {
        // محاكاة localStorage
        localStorage = {
            data: {},
            getItem(key) {
                return this.data[key] || null;
            },
            setItem(key, value) {
                this.data[key] = value;
            },
            removeItem(key) {
                delete this.data[key];
            },
            clear() {
                this.data = {};
            }
        };

        // تعيين localStorage العام
        global.localStorage = localStorage;
        currentTime = Date.now();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('إنشاء معرّف الجلسة', () => {
        it('يجب إنشاء معرّف جلسة فريد', () => {
            const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            
            expect(sessionId).toMatch(/^session_/);
            expect(sessionId).toMatch(/_\d+$/);
        });

        it('يجب أن تكون معرّفات الجلسات مختلفة', () => {
            const sessionIds = new Set();
            
            for (let i = 0; i < 100; i++) {
                const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                sessionIds.add(sessionId);
            }
            
            expect(sessionIds.size).toBeGreaterThan(50);
        });
    });

    describe('تحديث عداد المستخدمين', () => {
        it('يجب إضافة جلسة جديدة إلى العداد', () => {
            const activeUsers = {};
            const sessionId = 'session_123_' + currentTime;
            
            activeUsers[sessionId] = currentTime;
            localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
            
            const stored = JSON.parse(localStorage.getItem('activeUsers'));
            expect(Object.keys(stored).length).toBe(1);
            expect(stored[sessionId]).toBe(currentTime);
        });

        it('يجب إضافة عدة جلسات نشطة', () => {
            const activeUsers = {};
            
            for (let i = 0; i < 5; i++) {
                const sessionId = 'session_' + i + '_' + currentTime;
                activeUsers[sessionId] = currentTime;
            }
            
            localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
            const stored = JSON.parse(localStorage.getItem('activeUsers'));
            
            expect(Object.keys(stored).length).toBe(5);
        });

        it('يجب إزالة الجلسات المنتهية (أكثر من 5 دقائق)', () => {
            const activeUsers = {};
            const sessionTimeout = 5 * 60 * 1000;
            
            // إضافة جلسة حديثة
            const recentSessionId = 'session_recent_' + currentTime;
            activeUsers[recentSessionId] = currentTime;
            
            // إضافة جلسة قديمة (أكثر من 5 دقائق)
            const oldSessionId = 'session_old_' + (currentTime - sessionTimeout - 1000);
            activeUsers[oldSessionId] = currentTime - sessionTimeout - 1000;
            
            // تنظيف الجلسات المنتهية
            Object.keys(activeUsers).forEach(id => {
                if (currentTime - activeUsers[id] > sessionTimeout) {
                    delete activeUsers[id];
                }
            });
            
            expect(Object.keys(activeUsers).length).toBe(1);
            expect(activeUsers[recentSessionId]).toBeDefined();
            expect(activeUsers[oldSessionId]).toBeUndefined();
        });
    });

    describe('حساب عدد المستخدمين النشطين', () => {
        it('يجب أن يكون الحد الأدنى 1 مستخدم', () => {
            const activeUsers = {};
            const activeCount = Object.keys(activeUsers).length;
            const displayCount = Math.min(Math.max(activeCount, 1), 729);
            
            expect(displayCount).toBe(1);
        });

        it('يجب أن يكون الحد الأقصى 729 مستخدم', () => {
            const activeUsers = {};
            
            // إضافة 1000 جلسة
            for (let i = 0; i < 1000; i++) {
                activeUsers['session_' + i] = currentTime;
            }
            
            const activeCount = Object.keys(activeUsers).length;
            const displayCount = Math.min(Math.max(activeCount, 1), 729);
            
            expect(displayCount).toBe(729);
        });

        it('يجب عرض العدد الصحيح للمستخدمين النشطين', () => {
            const activeUsers = {};
            
            // إضافة 50 جلسة
            for (let i = 0; i < 50; i++) {
                activeUsers['session_' + i] = currentTime;
            }
            
            const activeCount = Object.keys(activeUsers).length;
            const displayCount = Math.min(Math.max(activeCount, 1), 729);
            
            expect(displayCount).toBe(50);
        });
    });

    describe('تحديث عرض العداد', () => {
        it('يجب تحديث قيمة العداد في الواجهة', () => {
            const count = 42;
            const counterElement = {
                textContent: '1',
                classList: {
                    remove: () => {},
                    add: () => {}
                }
            };
            
            const oldCount = parseInt(counterElement.textContent);
            counterElement.textContent = count;
            
            expect(counterElement.textContent).toBe(42);
            expect(parseInt(counterElement.textContent)).not.toBe(oldCount);
        });

        it('يجب تطبيق تأثير الحركة عند التحديث', () => {
            const counterElement = {
                textContent: '1',
                classList: {
                    items: [],
                    remove: function(className) {
                        this.items = this.items.filter(item => item !== className);
                    },
                    add: function(className) {
                        this.items.push(className);
                    }
                }
            };
            
            const oldCount = parseInt(counterElement.textContent);
            counterElement.textContent = 42;
            
            if (oldCount !== parseInt(counterElement.textContent)) {
                counterElement.classList.remove('updated');
                counterElement.classList.add('updated');
            }
            
            expect(counterElement.classList.items).toContain('updated');
        });
    });

    describe('تنظيف الجلسات', () => {
        it('يجب تنظيف الجلسات المنتهية بشكل دوري', () => {
            const activeUsers = {};
            const sessionTimeout = 5 * 60 * 1000;
            
            // إضافة جلسات متعددة
            for (let i = 0; i < 10; i++) {
                const sessionId = 'session_' + i;
                // بعضها حديث، وبعضها قديم
                activeUsers[sessionId] = currentTime - (i * 60000);
            }
            
            // تنظيف الجلسات المنتهية
            Object.keys(activeUsers).forEach(id => {
                if (currentTime - activeUsers[id] > sessionTimeout) {
                    delete activeUsers[id];
                }
            });
            
            const remainingCount = Object.keys(activeUsers).length;
            expect(remainingCount).toBeLessThan(10);
        });

        it('يجب الاحتفاظ بجميع الجلسات النشطة', () => {
            const activeUsers = {};
            const sessionTimeout = 5 * 60 * 1000;
            
            // إضافة جلسات حديثة فقط
            for (let i = 0; i < 5; i++) {
                const sessionId = 'session_' + i;
                activeUsers[sessionId] = currentTime - (i * 10000); // أقل من 5 دقائق
            }
            
            // تنظيف الجلسات المنتهية
            Object.keys(activeUsers).forEach(id => {
                if (currentTime - activeUsers[id] > sessionTimeout) {
                    delete activeUsers[id];
                }
            });
            
            expect(Object.keys(activeUsers).length).toBe(5);
        });
    });

    describe('نطاق العداد', () => {
        it('يجب أن يكون العداد بين 1 و 729', () => {
            const testCases = [0, 1, 50, 100, 500, 729, 1000, 10000];
            
            testCases.forEach(count => {
                const displayCount = Math.min(Math.max(count, 1), 729);
                expect(displayCount).toBeGreaterThanOrEqual(1);
                expect(displayCount).toBeLessThanOrEqual(729);
            });
        });

        it('يجب أن يكون 729 هو الحد الأقصى الدقيق', () => {
            const displayCount = Math.min(Math.max(729, 1), 729);
            expect(displayCount).toBe(729);
        });

        it('يجب أن يكون 1 هو الحد الأدنى الدقيق', () => {
            const displayCount = Math.min(Math.max(0, 1), 729);
            expect(displayCount).toBe(1);
        });
    });
});
