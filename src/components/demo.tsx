import SpotlightCard from "./ui/SpotlightCard";
import { ShieldCheck, Package, PenTool, CreditCard, Award, Clock } from "lucide-react";

export function WhyNeoDemo() {
  const points = [
    {
      title: "Price Transparency",
      text: "Zero hidden charges. What we quote is what you pay.",
      icon: <ShieldCheck className="w-10 h-10" />,
      color: "rgba(199, 214, 26, 0.25)" // Logo Lime
    },
    {
      title: "End-to-End Solution",
      text: "We manage everything—from design to final handover, You don’t have to worry about a thing.",
      icon: <Package className="w-10 h-10" />,
      color: "rgba(0, 34, 124, 0.15)" // Logo Blue
    },
    {
      title: "Custom Designs",
      text: "Your home is unique. We don't do 'copy-paste' designs.",
      icon: <PenTool className="w-10 h-10" />,
      color: "rgba(199, 214, 26, 0.25)"
    },
    {
      title: "EMI Options",
      text: "Flexible payment plans to suit your budget.",
      icon: <CreditCard className="w-10 h-10" />,
      color: "rgba(0, 34, 124, 0.15)"
    },
    {
      title: "25 Years Warranty",
      text: "Long-term quality you can trust.",
      icon: <Award className="w-10 h-10" />,
      color: "rgba(199, 214, 26, 0.25)"
    },
    {
      title: "45 Days Delivery",
      text: "On-time completion, guaranteed.",
      icon: <Clock className="w-10 h-10" />,
      color: "rgba(0, 34, 124, 0.15)"
    }
  ];

  return (
    <div className="bg-[#f0f4ff] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-[#C7D61A] mb-4 text-left leading-tight">
          Design Your Dream Home with Luxury <br /> That Fits Your Budget.
        </h2>
        <p className="text-xl text-[#00227C] opacity-80 mb-16 text-left">
          Delivered in 45 days with 25+ years of expertise and end-to-end service
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {points.map((point, index) => (
            <SpotlightCard 
              key={index} 
              spotlightColor={point.color}
              className="w-full text-center"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-[#00227C] text-[#C7D61A] rounded-xl shadow-lg">
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-[#00227C] leading-snug">{point.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{point.text}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
