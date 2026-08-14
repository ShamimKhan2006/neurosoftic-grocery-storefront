const features = [
  { title: "100% Fresh Products", desc: "Fresh vegetables and fruits sourced directly from farms every day." },
  { title: "Affordable Prices", desc: "We ensure the highest quality products at the lowest possible prices." },
  { title: "Fast Home Delivery", desc: "Your order reaches your doorstep within just a few hours." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="text-center bg-gray-50 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2 text-green-700">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}