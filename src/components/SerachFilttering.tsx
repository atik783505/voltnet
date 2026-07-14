"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StationFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1"); 

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      
      replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, replace]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");

      if (location) {
        params.set("location", location);
      } else {
        params.delete("location");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [location, pathname, replace]);
  const handleDropdownChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters = search || location || searchParams.get("pricing") || (searchParams.get("sortBy") && searchParams.get("sortBy") !== "newest");

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Search Station</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Tesla Supercharger..."
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Filter by Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Dhaka, Chittagong..."
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Filter by Pricing</label>
          <select
            value={searchParams.get("pricing") || ""}
            onChange={(e) => handleDropdownChange("pricing", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            <option value="">All Prices</option>
            <option value="low">Budget (≤ $20)</option>
            <option value="high">Premium (&gt; $20)</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Sort By</label>
          <select
            value={searchParams.get("sortBy") || "newest"}
            onChange={(e) => handleDropdownChange("sortBy", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            <option value="newest">Newest Added</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="power_desc">Power Output</option>
          </select>
        </div>

      </div>

      {/* Clear Filter Section */}
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <Link 
            href="?" 
            onClick={() => {
              setSearch("");
              setLocation("");
            }}
            className="text-xs font-medium text-red-500 hover:text-red-600 underline"
          >
            Clear All Filters
          </Link>
        </div>
      )}
    </div>
  );
}