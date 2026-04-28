import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

const SYSTEM_WARNING_MESSAGE = "روححححح حركات حلم ابليس بلجنة مافي دردشة لان بعرفكم اهل مشاكل اكتفو بلاسالة فقط";

export default function ChatPage() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // تحميل الرسائل من localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    const savedHasUserSent = localStorage.getItem("hasUserSentMessage");
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    }
    
    if (savedHasUserSent === "true") {
      setHasUserSentMessage(true);
    }
  }, []);

  // حفظ الرسائل في localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // حفظ حالة إرسال أول رسالة
  useEffect(() => {
    localStorage.setItem("hasUserSentMessage", hasUserSentMessage.toString());
  }, [hasUserSentMessage]);

  // التمرير التلقائي إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");

    // إذا كانت أول رسالة، أضف رسالة النظام
    if (!hasUserSentMessage) {
      setHasUserSentMessage(true);

      // إضافة رسالة النظام بعد تأخير صغير
      setTimeout(() => {
        const systemMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: SYSTEM_WARNING_MESSAGE,
          sender: "system",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, systemMessage]);
      }, 500);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            دردشة المجتمع
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto relative z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-white/70 mb-4">
                لا توجد رسائل حتى الآن
              </p>
              <p className="text-white/50">
                أرسل أول رسالة لك لبدء المحادثة
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-slideUp`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-6 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-br-none"
                      : "bg-white/10 border border-white/20 text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm lg:text-base leading-relaxed">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-black/70"
                        : "text-white/50"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 z-40 backdrop-blur-xl bg-black/30 border-t border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="اكتب رسالتك هنا..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400 focus:bg-white/10 transition-all rounded-lg"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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
