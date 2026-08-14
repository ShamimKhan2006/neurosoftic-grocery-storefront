export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FBF8F2]">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-[#E7E1D3] border-t-[#1F4D3A]" />

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F4D3A] text-xl">
            🌿
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-[#1F4D3A]">
            Fresh items loading..
          </p>

          <div className="mt-2 flex justify-center gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A8D95E]" />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A8D95E]"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A8D95E]"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}