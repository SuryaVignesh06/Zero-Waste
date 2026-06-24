"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Store, User, FileText, MapPin, Phone, Clock, Upload, CheckCircle2, ChevronLeft } from "lucide-react";

const BUSINESS_TYPES = [
  "Supermarket",
  "Bakery",
  "Dairy Shop",
  "Vegetable Stall",
  "Restaurant/Kitchen",
  "Hotel/Catering",
  "Fruit Vendor",
  "Convenience Store",
];

export function ShopkeeperSetup() {
  const [step, setStep] = useState(1);
  const setScreen = useAppStore((s) => s.setScreen);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    businessType: "",
    gstNumber: "",
    address: "",
    primaryPhone: "",
    walkIn: true,
    fileUploaded: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((s) => Math.min(3, s + 1));
  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      completeSetup();
      setScreen("shopkeeperDashboard" as any);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-[#F7F5F0] px-5 py-4">
        {step > 1 ? (
          <button onClick={handlePrev} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronLeft size={24} color="#0A0A0A" />
          </button>
        ) : (
          <button onClick={() => setScreen("role-select")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronLeft size={24} color="#0A0A0A" />
          </button>
        )}
        <div className="ml-4 flex-1">
          <h1 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Shop Registration
          </h1>
        </div>
        <div className="text-[14px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          {step} of 3
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-[#E8E8E4]">
        <motion.div
          className="h-full bg-[#F59E0B]"
          initial={{ width: "33%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  Shop Name
                </label>
                <div className="flex items-center rounded-2xl border-2 border-[#E8E8E4] bg-white px-4 py-3">
                  <Store size={20} color="#8A8A8A" />
                  <input
                    className="ml-3 w-full bg-transparent text-[15px] outline-none placeholder:text-[#AEAEB2]"
                    placeholder="e.g., Fresh Mart Supermarket"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  Owner Name
                </label>
                <div className="flex items-center rounded-2xl border-2 border-[#E8E8E4] bg-white px-4 py-3">
                  <User size={20} color="#8A8A8A" />
                  <input
                    className="ml-3 w-full bg-transparent text-[15px] outline-none placeholder:text-[#AEAEB2]"
                    placeholder="Full Legal Name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  Business Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_TYPES.map((type) => {
                    const isSelected = formData.businessType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, businessType: type })}
                        className="rounded-full border-2 px-4 py-2 text-[14px] font-medium transition-colors"
                        style={{
                          borderColor: isSelected ? "#F59E0B" : "#E8E8E4",
                          backgroundColor: isSelected ? "#F59E0B" : "#FFFFFF",
                          color: isSelected ? "#FFFFFF" : "#4A4A4A",
                          fontFamily: "var(--font-jakarta)",
                        }}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  GST Number <span className="text-[#8A8A8A] font-normal lowercase">(Optional)</span>
                </label>
                <div className="flex items-center rounded-2xl border-2 border-[#E8E8E4] bg-white px-4 py-3">
                  <FileText size={20} color="#8A8A8A" />
                  <input
                    className="ml-3 w-full bg-transparent text-[15px] outline-none placeholder:text-[#AEAEB2]"
                    placeholder="GSTIN"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  Shop Address
                </label>
                <div className="flex items-center rounded-2xl border-2 border-[#E8E8E4] bg-white px-4 py-3">
                  <MapPin size={20} color="#8A8A8A" className="shrink-0" />
                  <textarea
                    className="ml-3 w-full bg-transparent text-[15px] outline-none placeholder:text-[#AEAEB2] resize-none"
                    placeholder="Full street address..."
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  Primary Contact
                </label>
                <div className="flex items-center rounded-2xl border-2 border-[#E8E8E4] bg-white px-4 py-3">
                  <Phone size={20} color="#8A8A8A" />
                  <input
                    type="tel"
                    className="ml-3 w-full bg-transparent text-[15px] outline-none placeholder:text-[#AEAEB2]"
                    placeholder="+91"
                    value={formData.primaryPhone}
                    onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  Business Hours
                </label>
                <div className="flex items-center justify-between rounded-2xl border-2 border-[#E8E8E4] bg-white px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Clock size={20} color="#8A8A8A" />
                    <span className="text-[15px] text-[#0A0A0A] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Everyday, 10:00 AM - 10:00 PM
                    </span>
                  </div>
                  <span className="text-[13px] text-[#F59E0B] font-bold underline" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Edit
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                <div>
                  <h4 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Accept Walk-in</h4>
                  <p className="text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Can customers visit without reservation?</p>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, walkIn: !formData.walkIn })}
                  className="relative h-7 w-12 rounded-full transition-colors"
                  style={{ backgroundColor: formData.walkIn ? "#F59E0B" : "#E8E8E4" }}
                >
                  <motion.div
                    className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
                    animate={{ left: formData.walkIn ? "24px" : "4px" }}
                  />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7] mb-4">
                  <FileText size={32} color="#F59E0B" />
                </div>
                <h3 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Verify Your Business
                </h3>
                <p className="mt-2 text-[14px] text-[#4A4A4A] px-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Upload a business license, shop registration certificate, or FSSAI license to get the "Verified" badge.
                </p>
              </div>

              <div 
                className="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors"
                style={{
                  borderColor: formData.fileUploaded ? "#F59E0B" : "#E8E8E4",
                  backgroundColor: formData.fileUploaded ? "#FEF3C7" : "#FFFFFF"
                }}
                onClick={() => setFormData({ ...formData, fileUploaded: true })}
              >
                {formData.fileUploaded ? (
                  <>
                    <CheckCircle2 size={40} color="#F59E0B" className="mb-3" />
                    <span className="text-[15px] font-bold text-[#F59E0B]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      shop_license.pdf
                    </span>
                    <span className="mt-1 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Tap to replace</span>
                  </>
                ) : (
                  <>
                    <Upload size={32} color="#8A8A8A" className="mb-3" />
                    <span className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Tap to upload document
                    </span>
                    <span className="mt-1 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      JPEG, PNG or PDF (Max 5MB)
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white p-5 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={step === 1 && (!formData.shopName || !formData.ownerName || !formData.businessType)}
            className="flex h-[54px] w-full items-center justify-center rounded-full bg-[#F59E0B] text-[17px] font-bold text-white transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-outfit)", boxShadow: "0 8px 24px rgba(245,158,11,0.25)" }}
          >
            Next: {step === 1 ? "Location & Contact" : "Verification"}
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!formData.fileUploaded || isSubmitting}
            className="flex h-[54px] w-full items-center justify-center rounded-full bg-[#F59E0B] text-[17px] font-bold text-white transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-outfit)", boxShadow: "0 8px 24px rgba(245,158,11,0.25)" }}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Verifying...</span>
            ) : (
              "Complete Registration"
            )}
          </button>
        )}
      </footer>
    </div>
  );
}
