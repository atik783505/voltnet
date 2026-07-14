"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationBasicProps {
  pages: string | number;
  totalPages: number;
  baseRoute: string;
}

export default function PaginationBasic({ pages, totalPages, baseRoute }: PaginationBasicProps) {
  const page = Number(pages) || 1;
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${baseRoute}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="justify-center pt-6 flex-wrap w-full overflow-x-auto select-none">
      <Pagination.Content className="flex-wrap gap-1 sm:gap-2">
        {/* Previous Button */}
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1}>
            <Link 
              className={`flex items-center px-2 py-1 text-xs sm:text-sm ${page === 1 ? 'pointer-events-none opacity-50' : ''}`} 
              href={createPageURL(page - 1)}
            >
              <Pagination.PreviousIcon />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Link>
          </Pagination.Previous>
        </Pagination.Item>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Link href={createPageURL(p)}>
              <Pagination.Link 
                className={`min-w-[32px] h-8 text-xs sm:text-sm flex items-center justify-center rounded-full transition-colors ${
                  p === page 
                    ? "bg-emerald-500 text-white font-bold" 
                    : "hover:bg-slate-800 text-slate-300"
                }`} 
                isActive={p === page}
              >
                {p}
              </Pagination.Link>
            </Link>
          </Pagination.Item>
        ))}

        {/* Next Button */}
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages}>
            <Link 
              className={`flex items-center px-2 py-1 text-xs sm:text-sm ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`} 
              href={createPageURL(page + 1)}
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <Pagination.NextIcon />
            </Link>
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}