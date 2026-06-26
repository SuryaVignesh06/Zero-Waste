"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Sparkles, X, Send, Mic, Paperclip } from "lucide-react";

interface Message { id: number; role: "user" | "ai"; text: string; }

const SUGGESTIONS = ["Find cheapest milk near me", "How do I donate surplus food?", "What is my impact level?", "Show me urgent rescues"];
const AI_RESPONSES: Record<string, string> = {
  milk: "I found 3 milk options near you. The cheapest is Amul Toned Milk 1L at ₹30 (was ₹80) from FreshMart Anna Nagar, 0.8km away. It expires in 2 days but our AI predicts it's safe for 3 more days.",
  donate: "To donate food: tap the Donate button at the bottom center of the home screen, then take a photo of your food. Our AI will identify it and auto-fill the details. Add your pickup address and confirm — nearby NGOs will be notified instantly.",
  impact: "You're a Gold Member with 1,248 impact points! You've saved 84 meals and prevented 33.6kg of CO2 emissions — equivalent to planting 1.6 trees. You need 752 more points to reach Platinum level.",
  urgent: "There are 2 urgent rescues near you right now: (1) Saravana Bhavan — 30 servings, expires in less than 2 hours, 2km away. (2) TechConf 2025 — 60 lunch boxes, expires in 2.5 hours, 5.1km away. Tap Rescue Now on the home screen to accept.",
  default: "I can help you find affordable groceries, donate surplus food, track your impact, or coordinate rescues. Try one of the suggested prompts below, or ask me anything about Zero-Waste.",
};

export function AiAssistant() {
  const isOpen = useAppStore((s) => s.isAssistantOpen);
  const setOpen = useAppStore((s) => s.setAssistantOpen);
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: "ai", text: "Hi Ramesh! I'm Zira, your Zero-Waste AI assistant. How can I help you save food today?" }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, thinking]);

  const getResponse = (text: string): string => { const lower = text.toLowerCase(); if (lower.includes("milk")) return AI_RESPONSES.milk; if (lower.includes("donate")) return AI_RESPONSES.donate; if (lower.includes("impact") || lower.includes("level")) return AI_RESPONSES.impact; if (lower.includes("urgent") || lower.includes("rescue")) return AI_RESPONSES.urgent; return AI_RESPONSES.default; };
  
  const send = (text: string) => { 
    if (!text.trim()) return; 
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() }; 
    setMessages((m) => [...m, userMsg]); 
    setInput(""); 
    setThinking(true); 
    setTimeout(() => { 
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: getResponse(text) }; 
      setMessages((m) => [...m, aiMsg]); 
      setThinking(false); 
    }, 1200); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setOpen(false)} 
            className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", stiffness: 400, damping: 36 }} 
            drag="y" 
            dragConstraints={{ top: 0, bottom: 0 }} 
            dragElastic={{ top: 0, bottom: 0.4 }} 
            onDragEnd={(_, info) => { if (info.offset.y > 100) setOpen(false); }} 
            className="absolute inset-x-0 bottom-0 z-[101] flex h-[85%] flex-col bg-bg-base" 
            style={{ borderRadius: "32px 32px 0 0", boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-border-light px-5 py-4 bg-bg-card-light rounded-t-[32px]">
              <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-border-medium" />
              
              <div className="h-10 w-10 rounded-full bg-accent-gold/20 flex items-center justify-center">
                <Sparkles size={18} className="text-accent-gold-dark" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-body-md font-bold text-text-primary">Zira AI</h3>
                  <span className="rounded-full bg-color-info-bg px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-color-info">Beta</span>
                </div>
                <div className="flex items-center gap-1 text-caption">
                  <div className="h-1.5 w-1.5 rounded-full bg-color-success" />
                  Online
                </div>
              </div>
              
              <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-input active:scale-95 text-text-muted hover:text-text-primary">
                <X size={16} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] px-4 py-3 text-body shadow-sm`} 
                    style={{ 
                      borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", 
                      background: m.role === "user" ? "var(--color-text-primary)" : "var(--color-bg-card-light)", 
                      color: m.role === "user" ? "white" : "var(--color-text-primary)", 
                      border: m.role === "ai" ? "1px solid var(--color-border-light)" : "none"
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {thinking && (
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-1.5 bg-bg-card-light px-5 py-4 border border-border-light" style={{ borderRadius: "20px 20px 20px 4px" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="h-2 w-2 rounded-full bg-accent-gold-dark" />
                    ))}
                  </div>
                </motion.div>
              )}
              
              {messages.length === 1 && (
                <div className="mt-6 space-y-2">
                  <p className="text-caption font-bold text-text-muted uppercase tracking-wide">Suggested questions:</p>
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button 
                      key={i} 
                      initial={{ y: 10, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ delay: 0.2 + i * 0.08 }} 
                      onClick={() => send(s)} 
                      className="flex w-full items-center gap-3 bg-bg-card-light border border-border-light px-4 py-3 text-left text-body text-text-primary active:scale-95 shadow-sm rounded-2xl"
                    >
                      <Sparkles size={14} className="text-accent-gold-dark" />
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="border-t border-border-light bg-bg-card-light p-4 rounded-b-[32px] mb-8">
              <div className="flex items-center gap-2">
                <button className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-bg-input text-text-muted active:scale-95">
                  <Paperclip size={18} />
                </button>
                <div className="flex flex-1 items-center gap-2 bg-bg-input px-4 py-2 h-12 rounded-full border border-border-light">
                  <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === "Enter") send(input); }} 
                    placeholder="Ask Zira anything..." 
                    className="flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none" 
                  />
                  <button className="text-text-muted active:scale-90"><Mic size={18} /></button>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }} 
                  onClick={() => send(input)} 
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white bg-text-primary shadow-md" 
                >
                  <Send size={16} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
