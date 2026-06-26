import { ReactNode } from "react";
import { LightCard } from "./LightCard";
import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon?: ReactNode;
  iconColor?: string;
  className?: string;
}

interface StatCardPairProps {
  stat1: Stat;
  stat2: Stat;
}

export function StatCardPair({ stat1, stat2 }: StatCardPairProps) {
  const count1 = useCountUp(stat1.value);
  const count2 = useCountUp(stat2.value);

  return (
    <div className="grid grid-cols-2 gap-4">
      <LightCard className={`flex flex-col p-5 ${stat1.className || ""}`}>
        {stat1.icon && (
          <div className={`mb-2 ${stat1.iconColor || "text-accent-gold"}`}>
            {stat1.icon}
          </div>
        )}
        <div className="text-stat text-text-primary">
          {count1}{stat1.suffix}
        </div>
        <div className="text-body text-text-secondary mt-1">{stat1.label}</div>
      </LightCard>

      <LightCard className={`flex flex-col p-5 ${stat2.className || ""}`}>
        {stat2.icon && (
          <div className={`mb-2 ${stat2.iconColor || "text-accent-gold"}`}>
            {stat2.icon}
          </div>
        )}
        <div className="text-stat text-text-primary">
          {count2}{stat2.suffix}
        </div>
        <div className="text-body text-text-secondary mt-1">{stat2.label}</div>
      </LightCard>
    </div>
  );
}
