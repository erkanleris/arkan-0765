import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Search } from "lucide-react";

interface QuestionsData {
  [key: string]: string[];
}

const categoryNames: { [key: string]: string } = {
  personal: "أسئلة شخصية",
  general: "أسئلة عامة",
  religious: "أسئلة دينية",
  cultural: "أسئلة ثقافية",
  love: "أسئلة عن الحب",
};

const categoryColors: { [key: string]: string } = {
  personal: "from-blue-600 to-blue-400",
  general: "from-green-600 to-green-400",
  religious: "from-yellow-600 to-yellow-400",
  cultural: "from-purple-600 to-purple-400",
  love: "from-red-600 to-red-400",
};

const ITEMS_PER_PAGE = 12;

// مكون البطاقة 3D
function QuestionCard3D({
  question,
  index,
  onClick,
}: {
  question: string;
  index: number;
  onClick: () => void;
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotationX = (e.clientY - centerY) * 0.05;
    const rotationY = (e.clientX - centerX) * -0.05;

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
      className="h-48 cursor-pointer perspective"
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
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 flex flex-col items-center justify-center text-center group hover:border-amber-400/50 transition-all duration-300 overflow-hidden"
          style={{
            boxShadow: `0 10px 40px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          }}
        >
          {/* خلفية متوهجة */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-purple-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-purple-500/5 group-hover:to-amber-500/5 transition-all duration-300"></div>

          {/* الرقم */}
          <div className="absolute top-4 left-4 text-xs font-bold text-amber-400/50 group-hover:text-amber-400 transition-colors">
            #{index + 1}
          </div>

          {/* المحتوى */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <p className="text-white/80 group-hover:text-white transition-colors line-clamp-4 text-sm leading-relaxed mb-3">
              {question}
            </p>
            <div className="text-xs text-white/50 group-hover:text-amber-400 transition-colors">
              اضغط لقراءة كاملاً
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionsPage({ params }: { params: { category: string } }) {
  const [, navigate] = useLocation();
  const category = params.category;
  const [questionsData, setQuestionsData] = useState<QuestionsData>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [randomQuestion, setRandomQuestion] = useState<string>("");
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Load questions data
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(data);
        setFilteredQuestions(data[category] || []);
      })
      .catch((err) => console.error("Error loading questions:", err));
  }, [category]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredQuestions(questionsData[category] || []);
      setCurrentPage(1);
      return;
    }

    const results = (questionsData[category] || []).filter((q) =>
      q.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(results);
    setCurrentPage(1);
  };

  const getRandomQuestion = () => {
    const questions = questionsData[category] || [];
    if (questions.length > 0) {
      const randomIdx = Math.floor(Math.random() * questions.length);
      setRandomQuestion(questions[randomIdx]);
      setShowRandomModal(true);
    }
  };

  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(startIdx, endIdx);

  const categoryColor = categoryColors[category] || "from-amber-600 to-amber-400";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 flex items-center justify-between py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            العودة للرئيسية
          </Button>
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
            {categoryNames[category] || category}
          </h1>
          <Button
            onClick={getRandomQuestion}
            className={`bg-gradient-to-r ${categoryColor} hover:shadow-lg text-black font-bold transition-all`}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            سؤال عشوائي
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Search Bar */}
        <div className="mb-12 flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن سؤال في هذا القسم..."
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
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentQuestions.map((question, idx) => (
            <QuestionCard3D
              key={idx}
              question={question}
              index={startIdx + idx}
              onClick={() => {
                setRandomQuestion(question);
                setShowRandomModal(true);
              }}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 flex-wrap mb-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={
                  currentPage === page
                    ? `bg-gradient-to-r ${categoryColor} text-black font-bold`
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all"
                }
              >
                {page}
              </Button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-white/70 mb-6">
              لم نجد أسئلة تطابق بحثك
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilteredQuestions(questionsData[category] || []);
                setCurrentPage(1);
              }}
              className={`bg-gradient-to-r ${categoryColor} text-black font-bold`}
            >
              إعادة تعيين البحث
            </Button>
          </div>
        )}
      </main>

      {/* Random Question Modal */}
      {showRandomModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50"
          onClick={() => setShowRandomModal(false)}
        >
          <div
            className={`relative max-w-3xl w-full mx-4 rounded-2xl border border-white/20 bg-gradient-to-br from-black/80 to-purple-900/20 p-12 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "slideUp 0.3s ease-out",
              boxShadow: `0 0 60px rgba(212, 175, 55, 0.3)`,
            }}
          >
            <button
              onClick={() => setShowRandomModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className={`text-3xl font-bold bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent mb-8`}>
                السؤال
              </h3>
              <p className="text-2xl text-white leading-relaxed mb-12 font-light">
                {randomQuestion}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => {
                    getRandomQuestion();
                  }}
                  className={`bg-gradient-to-r ${categoryColor} text-black font-bold px-8 py-3 rounded-lg`}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  سؤال آخر
                </Button>
                <Button
                  onClick={() => setShowRandomModal(false)}
                  className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold px-8 py-3 rounded-lg transition-all"
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
