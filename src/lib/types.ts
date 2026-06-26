// ─── ENUMS & UNIONS ──────────────────────────────

export type PanelRole = 
  "donor_shopkeeper" | "ngo_receiver" | "volunteer"

export type SubRole = "donor" | "shopkeeper"

export type DonorType = 
  "hotel" | "marriage_hall" | "hostel" | 
  "canteen" | "individual" | "corporate_cafeteria"

export type ShopType = 
  "grocery" | "bakery" | "restaurant" | 
  "supermarket" | "dairy" | "sweet_shop"

export type UrgencyLevel = 
  "emergency" | "urgent" | "moderate" | "normal"

export type FoodCategory = 
  "cooked" | "raw" | "packaged" | 
  "bakery" | "beverages" | "dairy"

export type InventoryCategory = 
  "vegetables" | "fruits" | "dairy" | "bakery" | 
  "packaged" | "beverages" | "grains" | 
  "snacks" | "sweets" | "spices" | "oils" | "others"

export type ItemUnit = 
  "kg" | "pieces" | "packets" | 
  "liters" | "dozen" | "boxes" | "bundles"

export type FoodCondition = 
  "freshly_cooked" | "good" | "needs_quick_pickup"

export type ItemCondition = 
  "fresh" | "near_expiry" | "expiring_today" | "expired"

export type SellCondition = 
  "near_expiry" | "excess" | 
  "damaged_packaging" | "old_stock"

export type DonationStatus = 
  "listed" | "reserved" | 
  "picked_up" | "completed" | "expired"

export type SellItemStatus = 
  "available" | "reserved" | "sold"

export type InventoryStatus = 
  "in_stock" | "listed_for_sale" | 
  "listed_for_donation" | "reserved" | "removed"

export type InventoryAction = 
  "sell_discounted" | "donate" | "notify_only"

export type RequestStatus = 
  "open" | "accepted" | "fulfilled" | "expired"

export type BadgeTier = 
  "bronze" | "silver" | "gold" | "platinum"

// ─── CORE MODELS ─────────────────────────────────

export interface User {
  id: string
  name: string
  phone: string
  subRole: SubRole
  donorType?: DonorType
  shopType?: ShopType
  address: string
  area: string
  city: string
  lat: number
  lng: number
  avatar: string
  joinedDate: Date
  totalPoints: number
  totalDonations: number
  totalMealsServed: number
  totalCO2Saved: number
  badgeTier: BadgeTier
  isVerified: boolean
}

export interface PullRequest {
  id: string
  ngoName: string
  ngoId: string
  ngoRating: number
  ngoVerified: boolean
  ngoAvatar: string
  foodType: FoodCategory | "any"
  servingsNeeded: number
  urgency: UrgencyLevel
  message: string
  distance: number
  requestedAt: Date
  expiresAt: Date
  status: RequestStatus
  acceptedBy?: string
  acceptedAt?: Date
}

export interface Donation {
  id: string
  donorId: string
  foodName: string
  photo: string
  category: FoodCategory
  servings: number
  condition: FoodCondition
  pickupDeadline: Date
  specialInstructions?: string
  address: string
  lat: number
  lng: number
  status: DonationStatus
  reservedBy?: string
  reservedAt?: Date
  pickedUpAt?: Date
  completedAt?: Date
  listedAt: Date
  pointsEarned: number
  estimatedValue: number
}

export interface SellItem {
  id: string
  donorId: string
  itemName: string
  photo: string
  condition: SellCondition
  quantity: number
  unit: ItemUnit
  category: string
  originalPrice: number
  sellingPrice: number
  discountPercent: number
  expiresAt?: Date
  description: string
  status: SellItemStatus
  listedAt: Date
  soldAt?: Date
  earnedAmount?: number
  pointsEarned: number
}

export interface InventoryItem {
  id: string
  shopId: string
  itemName: string
  photos: string[]
  category: InventoryCategory
  subCategory?: string
  quantity: number
  unit: ItemUnit
  originalPrice: number
  sellingPrice: number
  discountPercent: number
  manufacturedDate?: Date
  expiryDate: Date
  daysToExpiry: number
  condition: ItemCondition
  storageType: "refrigerated" | "room_temp" | "frozen"
  batchId?: string
  notes?: string
  autoAction: InventoryAction
  autoDiscountPercent?: number
  autoListDaysBefore?: number
  status: InventoryStatus
  addedAt: Date
  updatedAt: Date
}

export interface DonationHistory {
  id: string
  type: "donation" | "sell"
  foodName: string
  servings?: number
  quantity?: number
  unit?: ItemUnit
  date: Date
  receivedBy?: string
  soldTo?: string
  pointsEarned: number
  status: "completed" | "expired" | "cancelled"
  taxValue: number
  earnedAmount?: number
}

export interface Certificate {
  id: string
  type: "tax_receipt" | "donation_certificate" | "milestone"
  title: string
  receiptNumber: string
  date: Date
  periodStart: Date
  periodEnd: Date
  totalDonationValue: number
  taxBenefitValue: number
  donorName: string
  donorAddress: string
  donorPhone: string
  donationItems: DonationHistory[]
}

export interface ToastNotification {
  id: string
  type: "success" | "error" | "warning" | "info"
  message: string
  duration?: number
}

export interface VolunteerLocation {
  lat: number
  lng: number
  address: string
}

export interface VolunteerMission {
  id: string
  providerName: string
  providerLocation: VolunteerLocation
  ngoName: string
  ngoLocation: VolunteerLocation
  servings: number
  urgency: UrgencyLevel
  status: "available" | "active" | "completed"
  pointsAwarded?: number
  completedAt?: Date
}

export type VolunteerType = "nss" | "ncc" | "college_club" | "corporate_csr" | "independent"

export interface VolunteerProfileData {
  id: string
  displayName: string
  totalDeliveries: number
  impactPoints: number
  distanceCovered: number
  badges: string[]
  volunteerType: VolunteerType
  streak: number
  weeklyHours: number[] // Array of hours for the line chart (7 data points)
  rank: number
  totalHours: number
  milestoneHours: number // For "50 Hour Certificate" goal
  institution?: string // e.g. "SRM University"
  role?: string // e.g. "NSS Student"
}

// ─── STORE SHAPE ──────────────────────────────────

export interface AppStore {
  // Auth & Role
  activePanel: PanelRole
  subRole: SubRole
  isLoggedIn: boolean
  user: User | null
  volunteerProfile: VolunteerProfileData | null
  activeScreen: string
  previousScreen: string

  activePanel2SubRole?: "ngo" | "recipient"
  ngoUser?: any
  recipientUser?: any
  ngoVolunteers?: any[]
  bulkStoreItems?: any[]
  smallStoreItems?: any[]
  myRequests?: any[]

  // Donor Data
  pullRequests: PullRequest[]
  donations: Donation[]
  sellItems: SellItem[]
  donationHistory: DonationHistory[]

  // Shopkeeper Data
  inventory: InventoryItem[]

  // Volunteer Data
  availableMissions: VolunteerMission[]
  activeMission: VolunteerMission | null
  completedMissions: VolunteerMission[]

  // UI State
  toasts: ToastNotification[]
  isLoading: boolean
  selectedRequestId: string | null
  selectedInventoryItemId: string | null
  taxReceiptPeriod: "month" | "quarter" | "year" | "custom"
  showAddMenu: boolean

  // Actions — Auth
  setActivePanel: (panel: PanelRole) => void
  setSubRole: (role: SubRole) => void
  setActivePanel2SubRole: (role: "ngo" | "recipient") => void
  login: (phone: string) => void
  logout: () => void
  setActiveScreen: (screen: string) => void
  setShowAddMenu: (show: boolean) => void

  // Actions — Pull Requests
  acceptRequest: (requestId: string) => void

  // Actions — Donations
  addDonation: (donation: Omit<Donation, "id" | "listedAt" | "pointsEarned" | "estimatedValue">) => void
  
  // Actions — Sell Items
  addSellItem: (item: Omit<SellItem, "id" | "listedAt" | "discountPercent" | "pointsEarned">) => void

  // Actions — Inventory
  addInventoryItem: (item: Omit<InventoryItem, "id" | "addedAt" | "updatedAt" | "daysToExpiry" | "condition" | "discountPercent">) => void
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void
  removeInventoryItem: (id: string) => void
  donateFromInventory: (itemId: string, quantity: number, pickupHours: number) => void
  sellFromInventory: (itemId: string, quantity: number, sellingPrice: number) => void

  // Actions — Volunteer
  acceptMission: (missionId: string) => void
  completeMission: () => void

  // Actions — UI
  addToast: (toast: Omit<ToastNotification, "id">) => void
  removeToast: (id: string) => void
  setSelectedRequest: (id: string | null) => void
  setSelectedInventoryItem: (id: string | null) => void
  setTaxReceiptPeriod: (period: "month" | "quarter" | "year" | "custom") => void
  calculatePoints: () => number
}
