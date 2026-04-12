import { Users, UserCheck, Heart, HeartHandshake } from "lucide-react";
import CountUp from "./CountUp";

const stats = [
  { icon: Users, label: "Total Groom and Bride's Biodatas", value: 10840, suffix: "" },
  { icon: UserCheck, label: "Total Groom's Biodatas", value: 5024, suffix: "" },
  { icon: UserCheck, label: "Total Bride's Biodatas", value: 5797, suffix: "" },
  { icon: Heart, label: "Total Successful Marriages", value: 2803, suffix: "+" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          <span className="gradient-text">OrdhekDeen</span> User Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full gradient-primary-light flex items-center justify-center">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
              <CountUp end={stat.value} suffix={stat.suffix} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
