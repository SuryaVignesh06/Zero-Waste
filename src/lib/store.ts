"use client";

import { create } from "zustand";
import type { 
  Role, Screen, DiscountProduct, Donation, Reservation, ImpactStory,
  ImpactData, NGOProfile, Volunteer, VolunteerRequest, Pickup, 
  VolunteerStats, PickupRecord, RecipientProfile, DistributionPoint, FoodRequest, Shopkeeper
} from "./types";
import {
  MOCK_PRODUCTS,
  MOCK_DONATIONS,
  MOCK_BADGES,
  MOCK_IMPACT_EVENTS,
} from "./mock-data";

interface AppState {
  // Navigation
  screen: Screen;
  prevScreen: Screen | null;
  role: Role | null;
  setRole: (r: Role) => void;
  setScreen: (s: Screen) => void;

  // Onboarding done flag
  onboarded: boolean;
  completeOnboarding: () => void;

  // Auth & Registration
  phoneNumber: string;
  setPhoneNumber: (p: string) => void;
  isOtpSent: boolean;
  isOtpVerified: boolean;
  isAuthenticated: boolean;
  isNewUser: boolean;

  // Setup State
  setupStep: number;
  setupComplete: boolean;
  setSetupStep: (step: number) => void;

  // Global Profile
  userName: string;
  userAvatar: string | null;
  userLocationText: string;
  userLat: number | null;
  userLng: number | null;

  // Role Setup Data
  userPreferences: any | null;
  ngoProfileSetup: any | null;
  volunteerProfileSetup: any | null;
  recipientProfileSetup: any | null;

  // Verification
  ngoVerificationStatus: 'pending' | 'approved' | 'rejected' | null;
  documentsUploaded: string[];

  // Setup Actions
  saveUserProfile: (data: any) => void;
  saveNgoProfile: (data: any) => void;
  saveVolunteerProfile: (data: any) => void;
  saveRecipientProfile: (data: any) => void;
  completeSetup: () => void;
  clearAuth: () => void;

  // Active product (for detail sheet)
  activeProduct: DiscountProduct | null;
  setActiveProduct: (p: DiscountProduct | null) => void;

  // Active donation (for detail sheet)
  activeDonation: Donation | null;
  setActiveDonation: (d: Donation | null) => void;

  // Products & Reservations
  products: DiscountProduct[];
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;

  donations: Donation[];

  // Accept donation (move to accepted state)
  acceptDonation: (id: string) => void;

  // Impact
  impactPoints: number;
  mealsSaved: number;
  co2Saved: number;
  moneySaved: number;
  badges: typeof MOCK_BADGES;
  events: typeof MOCK_IMPACT_EVENTS;

  // Shopkeeper listings
  addShopListing: (p: DiscountProduct) => void;

  // Donate flow state
  donateStep: number;
  setDonateStep: (n: number) => void;
  donateForm: DonationForm;
  setDonateForm: (patch: Partial<DonationForm>) => void;
  resetDonateForm: () => void;
  nextDonateStep: () => void;
  prevDonateStep: () => void;
  submitDonation: () => void;

  donationHistory: DonationRecord[];
  activeDonationId: string | null;
  setActiveDonationId: (id: string | null) => void;

  // Delivery tracking
  activeTrackingId: string | null;
  setActiveTrackingId: (id: string | null) => void;

  // AI assistant
  isAssistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;

  // --- Master Prompt Additional States ---
  activeTab: string;
  setActiveTab: (t: string) => void;

  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;

  impactData: ImpactData;
  setImpactData: (data: Partial<ImpactData>) => void;

  ngoProfile: NGOProfile | null;
  pendingDonations: Donation[];
  acceptedDonations: Donation[];
  ngoVolunteers: Volunteer[];
  volunteerRequests: VolunteerRequest[];

  isVolunteerOnline: boolean;
  setVolunteerOnline: (v: boolean) => void;
  volunteerZoneRadius: number;
  setVolunteerZoneRadius: (r: number) => void;
  activePickup: Pickup | null;
  setActivePickup: (p: Pickup | null) => void;
  volunteerStats: VolunteerStats;
  volunteerHistory: PickupRecord[];

  recipientProfile: RecipientProfile | null;
  nearbyDistributionPoints: DistributionPoint[];
  activeRequest: FoodRequest | null;
  requestHistory: FoodRequest[];
  
  impactStories: any[];
  activeStoryId: string | null;
  setActiveStoryId: (id: string | null) => void;
}

export interface DonationForm {
  photos: string[];
  foodName: string;
  category: string;
  servings: number;
  condition: "freshly_cooked" | "good_condition" | "needs_quick_pickup" | null;
  availableFrom: Date | null;
  availableUntil: Date | null;
  pickupAddress: string;
  pickupLat: number | null;
  pickupLng: number | null;
  specialInstructions: string;
  donorType: string;
  notifyAllNGOs: boolean;
  selectedNGOs: string[];
}

export interface DonationRecord {
  id: string;
  foodName: string;
  category: string;
  servings: number;
  status: "listed" | "accepted" | "picked_up" | "delivered";
  listedAt: Date;
  acceptedBy: string | null;
  deliveredTo: string | null;
  impactPoints: number;
}

const initialDonateForm: DonationForm = {
  photos: [],
  foodName: "",
  category: "Cooked Meal",
  servings: 10,
  condition: null,
  availableFrom: null,
  availableUntil: null,
  pickupAddress: "",
  pickupLat: null,
  pickupLng: null,
  specialInstructions: "",
  donorType: "Individual",
  notifyAllNGOs: true,
  selectedNGOs: [],
};

export const useAppStore = create<AppState>((set, get) => ({
  screen: "splash",
  prevScreen: null,
  role: null,
  setRole: (r) => set({ role: r, screen: "login" }),
  setScreen: (s) => set((state) => ({ screen: s, prevScreen: state.screen })),

  onboarded: false,
  completeOnboarding: () => set({ onboarded: true, screen: "role-select" }),

  phoneNumber: "",
  setPhoneNumber: (p) => set({ phoneNumber: p }),
  isOtpSent: false,
  isOtpVerified: false,
  isAuthenticated: false,
  isNewUser: true,

  setupStep: 1,
  setupComplete: false,
  setSetupStep: (step) => set({ setupStep: step }),

  userName: "",
  userAvatar: null,
  userLocationText: "",
  userLat: null,
  userLng: null,

  userPreferences: null,
  ngoProfileSetup: null,
  volunteerProfileSetup: null,
  recipientProfileSetup: null,

  ngoVerificationStatus: null,
  documentsUploaded: [],

  saveUserProfile: (data) => set((state) => ({ ...state, ...data, userPreferences: { ...state.userPreferences, ...data } })),
  saveNgoProfile: (data) => set((state) => ({ ngoProfileSetup: { ...state.ngoProfileSetup, ...data } })),
  saveVolunteerProfile: (data) => set((state) => ({ volunteerProfileSetup: { ...state.volunteerProfileSetup, ...data } })),
  saveRecipientProfile: (data) => set((state) => ({ recipientProfileSetup: { ...state.recipientProfileSetup, ...data } })),
  completeSetup: () => set({ setupComplete: true, isAuthenticated: true }),
  clearAuth: () => set({
    phoneNumber: "", isOtpVerified: false, isAuthenticated: false,
    role: null, setupComplete: false, screen: "login"
  }),

  activeProduct: null,
  setActiveProduct: (p) => set({ activeProduct: p }),

  activeDonation: null,
  setActiveDonation: (d) => set({ activeDonation: d }),

  products: MOCK_PRODUCTS as unknown as DiscountProduct[],
  reservations: [],
  addReservation: (r) => set((state) => ({ reservations: [...state.reservations, r] })),
  updateReservationStatus: (id, status) => set((state) => ({
    reservations: state.reservations.map(r => r.id === id ? { ...r, status } : r)
  })),

  donations: MOCK_DONATIONS,

  acceptDonation: (id) =>
    set((state) => ({
      donations: state.donations.map((d) =>
        d.id === id ? { ...d, status: "accepted" } : d
      ),
    })),

  impactPoints: 1248,
  mealsSaved: 84,
  co2Saved: 33.6,
  moneySaved: 540,
  badges: MOCK_BADGES,
  events: MOCK_IMPACT_EVENTS,

  addShopListing: (p) => set((state) => ({
    products: [...state.products, p]
  })),

  donateStep: 1,
  setDonateStep: (n) => set({ donateStep: n }),
  donateForm: initialDonateForm,
  setDonateForm: (patch) =>
    set((state) => ({ donateForm: { ...state.donateForm, ...patch } })),
  resetDonateForm: () => set({ donateForm: initialDonateForm, donateStep: 1 }),
  nextDonateStep: () => set((state) => ({ donateStep: state.donateStep + 1 })),
  prevDonateStep: () => set((state) => ({ donateStep: Math.max(1, state.donateStep - 1) })),
  submitDonation: () => set((state) => {
    const newDonation: DonationRecord = {
      id: `d${Date.now()}`,
      foodName: state.donateForm.foodName,
      category: state.donateForm.category,
      servings: state.donateForm.servings,
      status: "listed",
      listedAt: new Date(),
      acceptedBy: null,
      deliveredTo: null,
      impactPoints: state.donateForm.servings * 3,
    };
    return {
      donationHistory: [newDonation, ...state.donationHistory],
      donateForm: initialDonateForm,
      donateStep: 1,
      activeDonationId: newDonation.id,
      screen: "donation-tracking",
    };
  }),

  donationHistory: [],
  activeDonationId: null,
  setActiveDonationId: (id) => set({ activeDonationId: id }),

  activeTrackingId: null,
  setActiveTrackingId: (id) => set({ activeTrackingId: id }),

  isAssistantOpen: false,
  setAssistantOpen: (v) => set({ isAssistantOpen: v }),

  // --- Master Prompt Initial States ---
  activeTab: "home",
  setActiveTab: (t) => set({ activeTab: t }),
  
  userLocation: { lat: 12.9352, lng: 77.6245 }, // Koramangala
  setUserLocation: (loc) => set({ userLocation: loc }),

  impactData: {
    mealsRescued: 248,
    co2Prevented: 18.4,
    moneySaved: 1240,
    impactPoints: 320
  },
  setImpactData: (data) => set((state) => ({ impactData: { ...state.impactData, ...data } })),

  ngoProfile: {
    id: "ngo1",
    name: "NSS Chapter",
    verified: true,
    location: "Bangalore",
    mealsReceived: 2450,
    volunteersCount: 48,
    successRate: 98
  },
  pendingDonations: [],
  acceptedDonations: [],
  ngoVolunteers: [
    { id: "v1", name: "Vijay Kumar", status: "online", rating: 4.9, rescues: 32, zone: 18 },
    { id: "v2", name: "Ramesh T", status: "on-duty", rating: 4.8, rescues: 14, zone: 10 },
    { id: "v3", name: "Sarah M", status: "offline", rating: 5.0, rescues: 8, zone: 5 }
  ],
  volunteerRequests: [],

  isVolunteerOnline: true,
  setVolunteerOnline: (v) => set({ isVolunteerOnline: v }),
  volunteerZoneRadius: 5,
  setVolunteerZoneRadius: (r) => set({ volunteerZoneRadius: r }),
  activePickup: null,
  setActivePickup: (p) => set({ activePickup: p }),
  volunteerStats: { mealsToday: 12, points: 340, rescues: 5 },
  volunteerHistory: [],

  recipientProfile: null,
  nearbyDistributionPoints: [],
  activeRequest: null,
  requestHistory: [],

  impactStories: [],
  activeStoryId: null,
  setActiveStoryId: (id) => set({ activeStoryId: id })
}));
