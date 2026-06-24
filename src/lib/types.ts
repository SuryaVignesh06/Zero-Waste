export type Role = "user" | "shopkeeper" | "ngo" | "volunteer" | "recipient";

export type Screen =
  | "onboarding"
  | "login"
  | "otp"
  | "role-select"
  | "auth"
  | "home"
  | "donate"
  | "impact"
  | "profile"
  | "ngo-feed"
  | "volunteer-map"
  | "ai-assistant"
  // Master Prompt Screens
  | "splash"
  | "roleSelect"
  | "userHome"
  | "donateFood"
  | "donationTracking"
  | "rescueMap"
  | "userProfile"
  | "impactDashboard"
  | "ngoMap"
  | "ngoDeliveryTracking"
  | "ngoVolunteers"
  | "ngoProfile"
  | "ngoReports"
  | "volunteerPickup"
  | "volunteerHistory"
  | "volunteerProfile"
  | "recipientHome"
  | "recipientMap"
  | "foodRequest"
  | "requestStatus"
  | "recipientProfile"
  // V2 New Screens
  | "shopkeeperSetup"
  | "shopkeeperDashboard"
  | "addProductWizard"
  | "productManager"
  | "localSavingsMarket"
  | "productDetailReserve"
  | "reservationConfirmation"
  | "myReservations"
  | "ngoDistributionProofUploader"
  | "donorImpactStoryView"
  | "ngo-auth-choice"
  | "recipient-auth-choice"
  | "recipient-login"
  | "recipient-setup"
  | "ngo-setup"
  | "volunteer-auth-choice";

export type UrgencyLevel = 'fresh' | 'attention' | 'high_discount' | 'urgent' | 'critical';

export interface DiscountProduct {
  id: string;
  shopkeeperId: string;
  name: string;
  categoryId: ProductCategory;
  mrp: number;
  sellingPrice: number;
  discountPercent: number; // auto-calculated
  stockQuantity: number;
  imageUrl?: string;
  imageColor: string; // fallback
  manufacturingDate: Date;
  expiryDate: Date;
  daysUntilExpiry: number; // auto-calculated
  urgencyLevel: UrgencyLevel;
  autoDiscountRecommended: boolean;
  isListed: boolean;
  soldCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type ProductCategory =
  | "dairy"
  | "bakery"
  | "vegetables"
  | "fruits"
  | "snacks"
  | "staples"
  | "beverages"
  | "cooked";

export interface Donation {
  id: string;
  donorName: string;
  donorType: "marriage-hall" | "restaurant" | "hostel" | "household" | "event";
  title: string;
  description: string;
  foodType: "cooked" | "raw" | "packaged";
  quantity: number;
  unit: string;
  servings: number;
  pickupAddress: string;
  pickupDistanceKm: number;
  pickupWindowStart: string; // ISO
  pickupWindowEnd: string; // ISO
  expiryDeadline: string; // ISO — countdown target
  aiFreshnessScore: number; // 0-1
  aiMatchScore?: number; // 0-100, for volunteer matching
  status: "listed" | "accepted" | "picked_up" | "delivered" | "expired";
  imageColor: string;
  imageUrl?: string;
  ngoAssigned?: string;
  volunteerAssigned?: string;
}

export interface Reservation {
  id: string;
  productId: string;
  userId: string;
  shopkeeperId: string;
  status: 'pending' | 'active' | 'completed' | 'expired' | 'cancelled';
  reservationCode: string; // ZWR-2024-XXXX
  reservationSlot: 'today_am' | 'today_pm' | 'tomorrow_morning';
  claimedAt: Date;
  collectedAt?: Date | null;
  cancelledAt?: Date | null;
  qrCodeUrl?: string;
  verifiedPickup: boolean;
  createdAt: Date;
  expiresAt: Date;
  notes: string;
}

export interface ImpactBadge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide name
  unlocked: boolean;
  progress?: number; // 0-100
}

export interface ImpactEvent {
  id: string;
  type: "rescue" | "purchase" | "donate" | "volunteer";
  label: string;
  mealsSaved: number;
  co2SavedKg: number;
  moneySaved: number;
  points: number;
  timestamp: string;
}

export interface Shopkeeper {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  gstNumber?: string;
  address: string;
  lat: number;
  lng: number;
  contactNumbers: string[];
  operatingHours: any[];
  verified: boolean;
  isActive: boolean;
  totalRevenueEarned: number;
  totalWasteSaved: number;
  rating: number;
}

export interface ImpactStory {
  id: string;
  donationId: string;
  ngoId: string;
  volunteerId: string;
  images: { url: string; caption?: string }[];
  beneficiaryCount: number;
  distributionDescription: string;
  gpsLocation: { lat: number; lng: number };
  verificationStatus: 'pending' | 'verified';
  verifiedAt?: Date;
  createdAt: Date;
  viewedByDonor: boolean;
}
export interface ShopListing {
  id: string;
  name: string;
  category: ProductCategory;
  qtyLeft: number;
  originalPrice: number;
  discountedPrice: number;
  discountPct: number;
  daysToExpiry: number;
  imageColor: string;
  imageUrl?: string;
  soldToday: number;
  revenueToday: number;
}

export interface ImpactData {
  mealsRescued: number;
  co2Prevented: number;
  moneySaved: number;
  impactPoints: number;
}

export interface NGOProfile {
  id: string;
  name: string;
  verified: boolean;
  location: string;
  mealsReceived: number;
  volunteersCount: number;
  successRate: number;
}

export interface Volunteer {
  id: string;
  name: string;
  status: "online" | "on-duty" | "offline";
  rating: number;
  rescues: number;
  zone: number;
}

export interface VolunteerRequest {
  id: string;
  volunteerId: string;
  status: "pending" | "accepted" | "declined";
}

export interface Pickup {
  id: string;
  donationId: string;
  status: "assigned" | "in_transit" | "completed";
}

export interface VolunteerStats {
  mealsToday: number;
  points: number;
  rescues: number;
}

export interface PickupRecord {
  id: string;
  donationId: string;
  timestamp: Date;
}

export interface RecipientProfile {
  id: string;
  name: string;
  location: string;
}

export interface DistributionPoint {
  id: string;
  name: string;
  location: string;
  distance: number;
}

export interface FoodRequest {
  id: string;
  recipientId: string;
  servings: number;
  status: "pending" | "fulfilled";
}
