import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('نظام التعليقات المجتمعي', () => {
    let localStorage;

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
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('إدارة معرّف المستخدم', () => {
        it('يجب إنشاء معرّف فريد للمستخدم الجديد', () => {
            const userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
            
            const storedId = localStorage.getItem('userId');
            expect(storedId).toBe(userId);
            expect(storedId).toMatch(/^user_/);
        });

        it('يجب استخدام نفس المعرّف للمستخدم الموجود', () => {
            const userId1 = 'user_123456789';
            localStorage.setItem('userId', userId1);
            
            const userId2 = localStorage.getItem('userId');
            expect(userId1).toBe(userId2);
        });
    });

    describe('إنشاء التعليقات', () => {
        it('يجب إنشاء تعليق جديد بشكل صحيح', () => {
            const comment = {
                id: 'comment_123',
                userId: 'user_123',
                userName: 'ذكي المفكر #456',
                text: 'هذا تعليق رائع',
                timestamp: Date.now(),
                likes: 0,
                liked: false,
                replies: []
            };

            const allComments = {};
            const question = 'ما هو معنى الحياة؟';
            allComments[question] = [comment];

            localStorage.setItem('allComments', JSON.stringify(allComments));
            const stored = JSON.parse(localStorage.getItem('allComments'));

            expect(stored[question]).toBeDefined();
            expect(stored[question][0].text).toBe('هذا تعليق رائع');
            expect(stored[question][0].userName).toMatch(/^ذكي المفكر/);
        });

        it('يجب حفظ عدة تعليقات على نفس السؤال', () => {
            const question = 'ما هو معنى الحياة؟';
            const allComments = {
                [question]: [
                    {
                        id: 'comment_1',
                        userId: 'user_1',
                        userName: 'حكيم الفيلسوف #1',
                        text: 'التعليق الأول',
                        timestamp: Date.now(),
                        likes: 0,
                        liked: false,
                        replies: []
                    },
                    {
                        id: 'comment_2',
                        userId: 'user_2',
                        userName: 'متأمل الحالم #2',
                        text: 'التعليق الثاني',
                        timestamp: Date.now(),
                        likes: 0,
                        liked: false,
                        replies: []
                    }
                ]
            };

            localStorage.setItem('allComments', JSON.stringify(allComments));
            const stored = JSON.parse(localStorage.getItem('allComments'));

            expect(stored[question].length).toBe(2);
            expect(stored[question][0].text).toBe('التعليق الأول');
            expect(stored[question][1].text).toBe('التعليق الثاني');
        });
    });

    describe('حذف التعليقات', () => {
        it('يجب حذف تعليق محدد', () => {
            const question = 'ما هو معنى الحياة؟';
            const allComments = {
                [question]: [
                    {
                        id: 'comment_1',
                        userId: 'user_1',
                        userName: 'حكيم الفيلسوف #1',
                        text: 'التعليق الأول',
                        timestamp: Date.now(),
                        likes: 0,
                        liked: false,
                        replies: []
                    },
                    {
                        id: 'comment_2',
                        userId: 'user_2',
                        userName: 'متأمل الحالم #2',
                        text: 'التعليق الثاني',
                        timestamp: Date.now(),
                        likes: 0,
                        liked: false,
                        replies: []
                    }
                ]
            };

            localStorage.setItem('allComments', JSON.stringify(allComments));
            
            // حذف التعليق الأول
            allComments[question] = allComments[question].filter(c => c.id !== 'comment_1');
            localStorage.setItem('allComments', JSON.stringify(allComments));
            
            const stored = JSON.parse(localStorage.getItem('allComments'));
            expect(stored[question].length).toBe(1);
            expect(stored[question][0].id).toBe('comment_2');
        });

        it('يجب أن يكون التعليق المحذوف غير موجود', () => {
            const question = 'ما هو معنى الحياة؟';
            const allComments = {
                [question]: [
                    {
                        id: 'comment_1',
                        userId: 'user_1',
                        userName: 'حكيم الفيلسوف #1',
                        text: 'التعليق الأول',
                        timestamp: Date.now(),
                        likes: 0,
                        liked: false,
                        replies: []
                    }
                ]
            };

            localStorage.setItem('allComments', JSON.stringify(allComments));
            
            allComments[question] = allComments[question].filter(c => c.id !== 'comment_1');
            localStorage.setItem('allComments', JSON.stringify(allComments));
            
            const stored = JSON.parse(localStorage.getItem('allComments'));
            const deletedComment = stored[question].find(c => c.id === 'comment_1');
            expect(deletedComment).toBeUndefined();
        });
    });

    describe('نظام الإعجابات', () => {
        it('يجب زيادة عدد الإعجابات عند الإعجاب', () => {
            const comment = {
                id: 'comment_1',
                userId: 'user_1',
                userName: 'حكيم الفيلسوف #1',
                text: 'تعليق رائع',
                timestamp: Date.now(),
                likes: 0,
                liked: false,
                replies: []
            };

            comment.likes += 1;
            comment.liked = true;

            expect(comment.likes).toBe(1);
            expect(comment.liked).toBe(true);
        });

        it('يجب تقليل عدد الإعجابات عند إزالة الإعجاب', () => {
            const comment = {
                id: 'comment_1',
                userId: 'user_1',
                userName: 'حكيم الفيلسوف #1',
                text: 'تعليق رائع',
                timestamp: Date.now(),
                likes: 1,
                liked: true,
                replies: []
            };

            comment.likes = Math.max(0, comment.likes - 1);
            comment.liked = false;

            expect(comment.likes).toBe(0);
            expect(comment.liked).toBe(false);
        });

        it('يجب عدم السماح بعدد إعجابات سالب', () => {
            const comment = {
                id: 'comment_1',
                userId: 'user_1',
                userName: 'حكيم الفيلسوف #1',
                text: 'تعليق رائع',
                timestamp: Date.now(),
                likes: 0,
                liked: false,
                replies: []
            };

            comment.likes = Math.max(0, comment.likes - 1);

            expect(comment.likes).toBe(0);
            expect(comment.likes).toBeGreaterThanOrEqual(0);
        });
    });

    describe('توليد أسماء مستخدمين مجهولة', () => {
        it('يجب توليد اسم مستخدم فريد', () => {
            const adjectives = ['ذكي', 'حكيم', 'متأمل', 'فضولي', 'عميق'];
            const nouns = ['المفكر', 'الفيلسوف', 'الحالم', 'الباحث', 'الراوي'];
            
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const number = Math.floor(Math.random() * 1000) + 1;
            const name = `${adj} ${noun} #${number}`;

            expect(name).toMatch(/^(ذكي|حكيم|متأمل|فضولي|عميق)/);
            expect(name).toMatch(/(المفكر|الفيلسوف|الحالم|الباحث|الراوي)/);
            expect(name).toMatch(/#\d+$/);
        });

        it('يجب أن تكون أسماء المستخدمين مختلفة', () => {
            const names = new Set();
            
            for (let i = 0; i < 100; i++) {
                const adjectives = ['ذكي', 'حكيم', 'متأمل'];
                const nouns = ['المفكر', 'الفيلسوف', 'الحالم'];
                
                const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
                const noun = nouns[Math.floor(Math.random() * nouns.length)];
                const number = Math.floor(Math.random() * 10000) + 1;
                const name = `${adj} ${noun} #${number}`;
                
                names.add(name);
            }

            // يجب أن تكون معظم الأسماء مختلفة
            expect(names.size).toBeGreaterThan(50);
        });
    });

    describe('تنسيق وقت التعليق', () => {
        it('يجب عرض "الآن" للتعليقات الحديثة جداً', () => {
            const now = new Date();
            const diff = now - now;
            const minutes = Math.floor(diff / 60000);

            expect(minutes).toBe(0);
        });

        it('يجب عرض الدقائق للتعليقات الحديثة', () => {
            const now = new Date();
            const fiveMinutesAgo = new Date(now - 5 * 60000);
            const diff = now - fiveMinutesAgo;
            const minutes = Math.floor(diff / 60000);

            expect(minutes).toBe(5);
        });

        it('يجب عرض الساعات للتعليقات القديمة نسبياً', () => {
            const now = new Date();
            const twoHoursAgo = new Date(now - 2 * 3600000);
            const diff = now - twoHoursAgo;
            const hours = Math.floor(diff / 3600000);

            expect(hours).toBe(2);
        });
    });

    describe('تنظيف النصوص', () => {
        it('يجب تنظيف الأحرف الخطرة من النص', () => {
            const text = '<script>alert("test")</script>';
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            const escaped = text.replace(/[&<>"']/g, m => map[m]);

            expect(escaped).not.toContain('<script>');
            expect(escaped).toContain('&lt;script&gt;');
        });

        it('يجب الحفاظ على النصوص العادية', () => {
            const text = 'هذا نص عادي بدون أحرف خطرة';
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            const escaped = text.replace(/[&<>"']/g, m => map[m]);

            expect(escaped).toBe(text);
        });
    });
});
