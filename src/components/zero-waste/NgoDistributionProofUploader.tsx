"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Camera, UploadCloud, Users, CheckCircle, ShieldCheck } from "lucide-react";
import { LiveCamera } from "./DonateFood";

export function NgoDistributionProofUploader() {
  const setScreen = useAppStore((s) => s.setScreen);
  const addImpactStory = useAppStore((s) => s.addImpactStory);
  const activeTrackingId = useAppStore((s) => s.activeTrackingId);
  const donations = useAppStore((s) => s.donations);
  
  const donation = donations.find(d => d.id === activeTrackingId);

  const [step, setStep] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(2);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Create the impact story
      addImpactStory({
        id: `story-${Date.now()}`,
        donationId: activeTrackingId || "d1",
        donorId: donation?.donorId || "u1",
        ngoId: "n1",
        imageUrl: photoUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80",
        beneficiariesCount: parseInt(beneficiaries) || 12,
        foodType: donation?.items[0]?.name || "Mixed Meals",
        verifiedAt: new Date()
      });
      setIsSubmitting(false);
      setStep(3); // Show Success
    }, 1500);
  };

  const handleDone = () => {
    setScreen("ngoFeed");
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-[#F7F5F0] px-5 py-4 pb-2 pt-6">
        {step < 3 && (
          <button 
            onClick={() => step === 1 ? setScreen("ngoDeliveryTracking") : setStep(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ArrowLeft size={20} color="#0A0A0A" />
          </button>
        )}
        <div className="ml-4">
          <h1 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Distribution Proof
          </h1>
        </div>
      </header>

      {/* Progress Bar */}
      {step < 3 && (
        <div className="h-1 w-full bg-[#E8E8E4]">
          <motion.div
            className="h-full bg-[#1A6B3C]"
            initial={{ width: "50%" }}
            animate={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      )}

      <main className="flex-1 overflow-y-auto px-5 pt-6 pb-32">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Upload Photo Evidence</h2>
                <p className="mt-2 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Take a photo of the food being distributed. This is sent to the donor to show their impact.
                </p>
              </div>

              <div 
                className={`mt-4 w-full rounded-[24px] overflow-hidden transition-colors ${photoAdded ? 'border-2 border-[#1A6B3C] bg-[#F0F7F2] p-4' : ''}`}
              >
                {photoAdded && photoUrl ? (
                  <div className="flex flex-col items-center">
                    <img src={photoUrl} alt="Captured" className="h-[200px] w-full object-cover rounded-xl shadow-sm mb-3" />
                    <span className="text-[16px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>Photo Captured</span>
                    <button onClick={() => { setPhotoAdded(false); setPhotoUrl(null); setShowCamera(true); }} className="mt-2 text-[13px] text-[#1A6B3A] underline" style={{ fontFamily: "var(--font-jakarta)" }}>Retake Photo</button>
                  </div>
                ) : showCamera ? (
                  <div className="h-[300px] w-full relative bg-black rounded-[24px] overflow-hidden">
                    <LiveCamera 
                      onCapture={(url) => {
                        setPhotoUrl(url);
                        setPhotoAdded(true);
                        setShowCamera(false);
                      }} 
                      onCancel={() => setShowCamera(false)} 
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => setShowCamera(true)}
                    className="flex h-[240px] w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#E8E8E4] bg-white cursor-pointer"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F7] mb-4">
                      <Camera size={28} color="#8A8A8A" />
                    </div>
                    <span className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Tap to open camera</span>
                    <span className="mt-2 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Make sure faces are visible (optional)</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Impact Metrics</h2>
                <p className="mt-2 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  How many people were fed with this donation?
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Number of Beneficiaries</label>
                <div className="flex items-center rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 shadow-sm">
                  <Users size={24} color="#8A8A8A" />
                  <input
                    type="number"
                    className="ml-3 w-full bg-transparent text-[20px] font-bold outline-none placeholder:text-[#AEAEB2]"
                    placeholder="e.g., 12"
                    value={beneficiaries}
                    onChange={(e) => setBeneficiaries(e.target.value)}
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-[16px] bg-[#F0F7F2] p-4 flex items-start gap-3 border border-[#C8E8D0]">
                <ShieldCheck size={20} color="#1A6B3C" className="shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#1A6B3A] leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <b>Transparency Promise:</b> Your uploaded photo and metric will instantly generate an "Impact Story" on the donor's dashboard.
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center pt-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-[#C8E8D0]"
              >
                <CheckCircle size={48} color="#1A6B3C" />
              </motion.div>
              <h2 className="mt-6 text-[32px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Proof Verified!</h2>
              <p className="mt-3 text-[15px] text-[#4A4A4A] max-w-[260px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Thank you for completing the circle. The donor has been notified of their impact.
              </p>

              <div className="mt-8 rounded-[24px] bg-white p-5 shadow-sm border border-[#E8E8E4] w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                    <Users size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{beneficiaries || 12} People Fed</h4>
                    <p className="text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Impact recorded successfully</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {step < 3 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/90 p-5 pb-8 backdrop-blur-xl border-t border-[rgba(0,0,0,0.05)] shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
          {step === 1 ? (
            <button
              onClick={handleNext}
              disabled={!photoAdded}
              className="flex h-[56px] w-full items-center justify-center rounded-full bg-[#0A0A0A] text-[17px] font-bold text-white transition-opacity disabled:opacity-50"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !beneficiaries}
              className="flex h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#1A6B3C] text-[17px] font-bold text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)] transition-opacity disabled:opacity-50"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Uploading Proof...</span>
              ) : (
                <>
                  <UploadCloud size={20} />
                  Submit Verification
                </>
              )}
            </button>
          )}
        </footer>
      )}

      {step === 3 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/90 p-5 pb-8 backdrop-blur-xl border-t border-[rgba(0,0,0,0.05)]">
          <button
            onClick={handleDone}
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-[#0A0A0A] text-[17px] font-bold text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Back to Dashboard
          </button>
        </footer>
      )}
    </div>
  );
}
