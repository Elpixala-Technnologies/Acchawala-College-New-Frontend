export function FilteredCardSkeleton() {
  return (
    <div className="relative mb-5 w-full rounded-lg bg-white shadow-lg">
      <div className="flex gap-y-2 p-5 max-lg:flex-wrap">
        <div className="h-[175px] w-[220px] animate-pulse rounded-md bg-orange-300 max-lg:w-full"></div>
        <div className="flex w-full flex-col gap-y-3 md:px-5">
          <div className="flex w-full gap-x-10">
            <div className="h-8 w-20 animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-8 w-20 animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-8 w-20 animate-pulse rounded-md bg-orange-300"></div>
          </div>
          <div className="mb-3 flex flex-wrap gap-x-6 max-md:gap-y-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
                <div className="h-4 w-40 animate-pulse rounded-md bg-orange-300"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
                <div className="h-4 w-40 animate-pulse rounded-md bg-orange-300"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
                <div className="h-4 w-40 animate-pulse rounded-md bg-orange-300"></div>
              </div>
            </div>
          </div>
          <div className="mb-3 flex flex-wrap gap-x-6 max-md:gap-y-2">
            <div className="flex items-center gap-x-2">
              <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
              <div className="h-4 w-40 animate-pulse rounded-md bg-orange-300"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
              <div className="h-4 w-40 animate-pulse rounded-md bg-orange-300"></div>
            </div>
          </div>
          <div className="space-y-1 text-zinc-600">
            <div className="h-4 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-orange-300"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-y-2 border-t border-zinc-600 p-5">
        <ul className="flex flex-wrap items-center gap-4 rounded-md bg-orange-100 px-4 py-1 text-sm text-orange-600">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="h-4 w-24 animate-pulse cursor-pointer rounded-md bg-orange-300 capitalize"
            ></li>
          ))}
          <li className="h-4 w-20 animate-pulse cursor-pointer rounded-md bg-orange-300 capitalize"></li>
        </ul>
        <div className="flex w-full gap-4 sm:w-44">
          <div className="h-10 w-full flex-[1] animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-10 w-full flex-[1] animate-pulse rounded-md bg-orange-300"></div>
        </div>
      </div>
    </div>
  );
}
