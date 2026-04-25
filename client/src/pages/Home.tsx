import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Search, Sparkles, ChevronRight } from "lucide-react";

interface QuestionsData {
  [key: string]: string[];
}

const categories = [
  { id: "personal", name: "أسئلة شخصية", icon: "👤", color: "from-blue-600 to-blue-400" },
  { id: "general", name: "أسئلة عامة", icon: "🌍", color: "from-green-600 to-green-400" },
  { id: "religious", name: "أسئلة دينية", icon: "🕌", color: "from-yellow-600 to-yellow-400" },
  { id: "cultural", name: "أسئلة ثقافية", icon: "📚", color: "from-purple-600 to-purple-400" },
  { id: "love", name: "أسئلة عن الحب", icon: "❤️", color: "from-red-600 to-red-400" },
];

// مكون 3D للخلفية المتحركة
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // إنشاء جزيئات
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      // خلفية متدرجة
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0f0f1e");
      gradient.addColorStop(0.5, "#1a0f2e");
      gradient.addColorStop(1, "#0f0f1e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // رسم الجزيئات
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // إعادة تعيين الجزيئات عند الخروج من الشاشة
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // رسم خطوط متموجة
      ctx.strokeStyle = "rgba(147, 51, 234, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 50) {
          const y =
            canvas.height / 2 +
            Math.sin((x + time) * 0.01) * 50 +
            Math.cos((time + i) * 0.005) * 30 +
            i * 60;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.5;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(135deg, #0f0f1e 0%, #1a0f2e 50%, #0f0f1e 100%)" }}
    />
  );
}

// مكون بطاقة 3D
function Card3D({
  category,
  onClick,
}: {
  category: (typeof categories)[0];
  onClick: () => void;
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotationX = (e.clientY - centerY) * 0.1;
    const rotationY = (e.clientX - centerX) * -0.1;

    setRotation({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="h-64 cursor-pointer perspective"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} p-8 shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:shadow-3xl transition-all duration-300`}
          style={{
            boxShadow: `0 20px 60px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          }}
        >
          {/* خلفية متوهجة */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* المحتوى */}
          <div className="relative z-10">
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            <p className="text-sm text-white/80 mb-4">1000 سؤال عميق</p>
            <div className="flex items-center justify-center gap-2 text-white/70 group-hover:text-white transition-colors">
              <span>استكشف الآن</span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [questionsData, setQuestionsData] = useState<QuestionsData>({});
  const [randomQuestion, setRandomQuestion] = useState<string>("");
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // تحميل بيانات الأسئلة
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestionsData(data))
      .catch((err) => console.error("Error loading questions:", err));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/questions/${categoryId}`);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    let results: string[] = [];
    Object.values(questionsData).forEach((questions) => {
      const matches = questions.filter((q) =>
        q.toLowerCase().includes(searchTerm.toLowerCase())
      );
      results = results.concat(matches);
    });

    if (results.length > 0) {
      const randomIdx = Math.floor(Math.random() * results.length);
      setRandomQuestion(results[randomIdx]);
      setShowRandomModal(true);
    }
  };

  const getRandomQuestion = () => {
    let allQuestions: string[] = [];
    Object.values(questionsData).forEach((questions) => {
      allQuestions = allQuestions.concat(questions);
    });

    if (allQuestions.length > 0) {
      const randomIdx = Math.floor(Math.random() * allQuestions.length);
      setRandomQuestion(allQuestions[randomIdx]);
      setShowRandomModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      {/* مؤشر الماوس المخصص */}
      <div
        className="fixed w-8 h-8 border-2 border-amber-400 rounded-full pointer-events-none z-50 opacity-50"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-amber-400 animate-pulse" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              أسئلة أركان
            </h1>
          </div>

          {/* البحث */}
          <div className="flex items-center gap-2 max-w-md">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="ابحث عن سؤال..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400 focus:bg-white/10 transition-all rounded-lg"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-lg"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            أهلاً بك في عالم التفكير العميق
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            استكشف آلاف الأسئلة التي ستغير نظرتك للأشياء وتوسع آفاقك الفكرية والفلسفية
          </p>
          <Button
            onClick={getRandomQuestion}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="mr-2 h-6 w-6" />
            سؤال عشوائي من كل الأقسام
          </Button>
        </section>

        {/* Categories Grid */}
        <section className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            استكشف الأقسام الخمسة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {categories.map((cat) => (
              <Card3D
                key={cat.id}
                category={cat}
                onClick={() => handleCategoryClick(cat.id)}
              />
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 p-12 text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
            5000 سؤال عميق ومميز
          </h3>
          <p className="text-white/70 mb-8 text-lg">
            موقع أسئلة أركان يحتوي على 5000 سؤال فريد موزعة على 5 أقسام رئيسية، كل سؤال مصاغ بعناية ليكون عميقاً وفلسفياً ويدفعك للتفكير الحقيقي.
          </p>
          <div className="grid grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">1000</div>
                <div className="text-sm text-white/60">{cat.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Random Question Modal */}
      {showRandomModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50"
          onClick={() => setShowRandomModal(false)}
        >
          <div
            className="relative max-w-3xl w-full mx-4 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-black/80 to-purple-900/20 p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "slideUp 0.3s ease-out",
              boxShadow: "0 0 60px rgba(212, 175, 55, 0.3)",
            }}
          >
            <button
              onClick={() => setShowRandomModal(false)}
              className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-2xl transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-amber-400 mb-8">سؤالك للتفكير</h3>
              <p className="text-2xl text-white leading-relaxed mb-12 font-light">
                {randomQuestion}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => setShowRandomModal(false)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-3 rounded-lg"
                >
                  سؤال آخر
                </Button>
                <Button
                  onClick={() => setShowRandomModal(false)}
                  variant="outline"
                  className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 font-bold px-8 py-3 rounded-lg"
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
