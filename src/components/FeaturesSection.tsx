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
    <section className="border-t border-[#d9ceb1] bg-[#eee5ce] py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-[#171717]">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-2 max-w-[240px] text-sm leading-5 text-[#55504a]">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default FeaturesSection;