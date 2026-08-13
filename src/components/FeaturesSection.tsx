

const features = [
  {
    icon: "🌱",
    title: "Farm Fresh Quality",
    description: "Sourced directly from local farms daily",
  },
  {
    icon: "🚚",
    title: "Same Day Delivery",
    description: "Order before 6pm for same-day drop-off",
  },
  {
    icon: "🔒",
    title: "Safe Payment",
    description: "Cards, mobile banking & cash on delivery",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    description: "Not fresh? Replaced or refunded, no questions",
  },
];

const FeaturesSection = () => {
  return (
    <section className="border-t border-[#C9A24B]/15 bg-[#F5EFE2] py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group flex flex-col items-center text-center animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm ring-1 ring-[#C9A24B]/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_25px_-8px_rgba(201,162,75,0.5)] group-hover:ring-[#C9A24B]/50"
            >
              {feature.icon}
            </div>

            <h3 className="text-base font-bold text-[#163A2E]">
              {feature.title}
            </h3>

            <p className="mt-2 max-w-[240px] text-sm leading-5 text-[#55504a]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;