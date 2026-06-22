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
  const send = (text: string) => { if (!text.trim()) return; const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() }; setMessages((m) => [...m, userMsg]); setInput(""); setThinking(true); setTimeout(() => { const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: getResponse(text) }; setMessages((m) => [...m, aiMsg]); setThinking(false); }, 1200); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="absolute inset-0 z-50 glass-overlay" />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 400, damping: 36 }} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }} onDragEnd={(_, info) => { if (info.offset.y > 100) setOpen(false); }} className="absolute inset-x-0 bottom-0 z-50 flex h-[80%] flex-col glass-sheet" style={{ borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 32px rgba(0,0,0,0.12)" }}>
            <div className="relative flex items-center gap-3 border-b border-[#f3efe9] px-5 py-3">
              <div className="mx-auto absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#e8e3dd]" />
              <div className="zw-ai-border h-10 w-10 rounded-full p-[2px]"><div className="flex h-full w-full items-center justify-center rounded-full bg-white"><Sparkles size={16} className="text-[#047857]" /></div></div>
              <div className="flex-1"><div className="flex items-center gap-1.5"><h3 className="text-sm font-bold tracking-tight text-[#1a1a1a]">Zira AI</h3><span className="rounded-full bg-[#ecfdf5] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[#047857]">Beta</span></div><div className="flex items-center gap-1 text-[10px] text-[#8e8e93]"><div className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />Online · here to help</div></div>
              <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3efe9] active:scale-95"><X size={14} className="text-[#4a4a4a]" /></button>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f5f1ed] px-5 py-4" style={{ minHeight: 0 }}>
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] px-4 py-2.5 text-[12px] leading-relaxed`} style={{ borderRadius: m.role === "user" ? "18px 18px 6px 18px" : "18px 18px 18px 6px", background: m.role === "user" ? "linear-gradient(135deg, #047857, #064e3b)" : "#ffffff", color: m.role === "user" ? "#ffffff" : "#1a1a1a", boxShadow: m.role === "ai" ? "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" : "0 4px 12px rgba(4, 120, 87, 0.2)" }}>{m.text}</div>
                </motion.div>
              ))}
              {thinking && (<motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-start"><div className="flex items-center gap-1 bg-white px-5 py-3.5" style={{ borderRadius: "18px 18px 18px 6px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}>{[0, 1, 2].map((i) => (<motion.div key={i} animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="h-2 w-2 rounded-full bg-[#047857]" />))}</div></motion.div>)}
              {messages.length === 1 && (<div className="mt-4 space-y-2"><p className="text-[11px] font-medium text-[#8e8e93]">Try asking:</p>{SUGGESTIONS.map((s, i) => (<motion.button key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.08 }} onClick={() => send(s)} className="flex w-full items-center gap-2 bg-white px-4 py-3 text-left text-[12px] font-medium text-[#1a1a1a] active:scale-98" style={{ borderRadius: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}><Sparkles size={12} className="text-[#047857]" />{s}</motion.button>))}</div>)}
            </div>
            <div className="border-t border-[#f3efe9] bg-white p-3">
              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f3efe9] text-[#4a4a4a] active:scale-90"><Paperclip size={16} /></button>
                <div className="flex flex-1 items-center gap-2 bg-[#faf7f3] px-4 py-2" style={{ borderRadius: "14px" }}>
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(input); }} placeholder="Type a message..." className="flex-1 bg-transparent text-[13px] text-[#1a1a1a] placeholder:text-[#8e8e93] focus:outline-none" />
                  <button className="text-[#4a4a4a] active:scale-90"><Mic size={18} /></button>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => send(input)} className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.3)" }}><Send size={14} /></motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
