import { BadgeTier } from "./types"

export const getBadgeTier = (points: number): BadgeTier => {
  if (points >= 2500) return "platinum"
  if (points >= 1000) return "gold"
  if (points >= 500) return "silver"
  return "bronze"
}

export const getBadgeLabel = (tier: BadgeTier): string => {
  const labels = {
    bronze: "Bronze Donor",
    silver: "Silver Donor",
    gold: "Gold Donor",
    platinum: "Platinum Donor"
  }
  return labels[tier]
}

export const getBadgeColor = (tier: BadgeTier): string => {
  const colors = {
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    platinum: "#E5E4E2"
  }
  return colors[tier]
}

export const getNextMilestone = (points: number): {
  target: number
  label: string
  progress: number
} => {
  if (points < 500) return {
    target: 500,
    label: "Silver Donor",
    progress: (points / 500) * 100
  }
  if (points < 1000) return {
    target: 1000,
    label: "Gold Donor",
    progress: ((points - 500) / 500) * 100
  }
  if (points < 2500) return {
    target: 2500,
    label: "Platinum Donor",
    progress: ((points - 1000) / 1500) * 100
  }
  return {
    target: 2500,
    label: "Platinum (Max)",
    progress: 100
  }
}

export const calculateDonationPoints = (servings: number): number => 
  Math.min(50, Math.max(5, Math.floor(servings / 10) * 10))

export const getUrgencyBonus = (
  urgency: "emergency" | "urgent" | "moderate" | "normal"
): number => {
  const bonuses = { 
    emergency: 25, 
    urgent: 10, 
    moderate: 5, 
    normal: 0 
  }
  return bonuses[urgency]
}

export const formatPoints = (points: number): string => {
  if (points >= 1000) return `${(points / 1000).toFixed(1)}K`
  return points.toString()
}

export const getExpiryColor = (daysToExpiry: number): {
  bar: string
  text: string
  bg: string
} => {
  if (daysToExpiry <= 1) return {
    bar: "bg-red-400",
    text: "text-red-600",
    bg: "bg-red-50"
  }
  if (daysToExpiry <= 5) return {
    bar: "bg-yellow-400",
    text: "text-yellow-600",
    bg: "bg-yellow-50"
  }
  return {
    bar: "bg-green-400",
    text: "text-green-600",
    bg: "bg-green-50"
  }
}

export const getUrgencyStyle = (
  urgency: "emergency" | "urgent" | "moderate" | "normal"
): {
  border: string
  badge: string
  badgeText: string
  label: string
} => {
  const styles = {
    emergency: {
      border: "border-l-4 border-l-red-600",
      badge: "bg-red-100 text-red-700",
      badgeText: "text-red-600",
      label: "EMERGENCY"
    },
    urgent: {
      border: "border-l-4 border-l-red-400",
      badge: "bg-red-50 text-red-500",
      badgeText: "text-red-500",
      label: "URGENT"
    },
    moderate: {
      border: "border-l-4 border-l-yellow-400",
      badge: "bg-yellow-50 text-yellow-600",
      badgeText: "text-yellow-600",
      label: "MODERATE"
    },
    normal: {
      border: "border-l-4 border-l-green-400",
      badge: "bg-green-50 text-green-600",
      badgeText: "text-green-600",
      label: "NORMAL"
    }
  }
  return styles[urgency]
}
