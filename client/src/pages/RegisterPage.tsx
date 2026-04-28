import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    // التحقق من ملء جميع الحقول
    if (!name.trim() || !age.trim() || !gender.trim()) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    // التحقق من أن العمر رقم صحيح
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("يرجى إدخال عمر صحيح (1-120)");
      return;
    }

    // حفظ بيانات المستخدم
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        age: ageNum,
        gender,
        registeredAt: new Date().toISOString(),
      })
    );

    // إعادة التوجيه إلى الصفحة الرئيسية مباشرة
    window.location.href = "/";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Registration Form */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div
          className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 p-8 shadow-2xl"
          style={{
            animation: "slideUp 0.5s ease-out",
            boxShadow: "0 0 60px rgba(212, 175, 55, 0.2)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              أسئلة أركان
            </h1>
            <p className="text-white/70 text-sm">
              تسجيل جديد
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                اسمك
              </label>
              <Input
                type="text"
                placeholder="أدخل اسمك"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400 focus:bg-white/10 transition-all rounded-lg"
              />
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                عمرك
              </label>
              <Input
                type="number"
                placeholder="أدخل عمرك"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400 focus:bg-white/10 transition-all rounded-lg"
              />
            </div>

            {/* Gender Select */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                جنسك
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setGender("male");
                    setError("");
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    gender === "male"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  ذكر
                </button>
                <button
                  onClick={() => {
                    setGender("female");
                    setError("");
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    gender === "female"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  أنثى
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          {/* Warning Message */}
          <div className="mb-6 p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs text-center">
            ⚠️ لا تشارك معلومات شخصية حقيقية
          </div>

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-105"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            تسجيل
          </Button>

          {/* Footer */}
          <p className="text-center text-white/50 text-xs mt-4">
            بالتسجيل، أنت توافق على شروط الاستخدام
          </p>
        </div>
      </div>

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
