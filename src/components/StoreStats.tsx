const stats = [
  { number: "500+", label: "Happy Customers" },
  { number: "100+", label: "Product Varieties" },
  { number: "5", label: "Years of Experience" },
  { number: "24/7", label: "Customer Support" },
];

export default function StoreStats() {
  return (
    <section className="py-16 px-6 md:px-20 bg-green-700 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="text-3xl md:text-4xl font-bold">{s.number}</p>
            <p className="text-sm md:text-base mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}