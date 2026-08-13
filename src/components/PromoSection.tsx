const PromoSection = () => {
  return (
    <section className="bg-[#f5f0e5] py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-2">
        
        {/* Organic Oils */}
        <div className="flex min-h-[220px] flex-col justify-center rounded-2xl border border-[#482536] bg-gradient-to-r from-[#472637] to-[#25151f] px-8">
          <h2 className="max-w-md font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
            100% Pure Organic
            <br />
            Oils & Ghee
          </h2>

          <a
            href="#"
            className="mt-4 w-fit border-b-2 border-[#e5b93f] pb-1 text-sm font-semibold text-[#e5b93f]"
          >
            Shop now →
          </a>
        </div>

        {/* Eggs & Milk */}
        <div className="flex min-h-[220px] flex-col justify-center rounded-2xl border border-[#16482e] bg-gradient-to-r from-[#285c3e] to-[#102c20] px-8">
          <h2 className="max-w-md font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
            Fresh Farm Eggs &<br />
            Milk Everyday
          </h2>

          <a
            href="#"
            className="mt-4 w-fit border-b-2 border-[#e5b93f] pb-1 text-sm font-semibold text-[#e5b93f]"
          >
            Shop now →
          </a>
        </div>

      </div>
    </section>
  );
};

export default PromoSection;