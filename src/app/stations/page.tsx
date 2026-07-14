import PaginationBasic from '@/components/pagination/Pagination';
import StationFilters from '@/components/SerachFilttering';
import StationCard from '@/components/ui/StationCard';
import { getAllStations } from '@/lib/api/station';
import { StationInput } from '@/types';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    location?: string;
    pricing?: string;
    sortBy?: string;
    page?: string;
  }>;
}

const Allstation = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  
  const search = resolvedParams.search || '';
  const location = resolvedParams.location || '';
  const pricing = resolvedParams.pricing || '';
  const sortBy = resolvedParams.sortBy || 'newest';
  const page = resolvedParams.page || '1';

  let apiQuery = `?page=${page}&sortBy=${sortBy}`;
  if (search) apiQuery += `&search=${encodeURIComponent(search)}`;
  if (location) apiQuery += `&location=${encodeURIComponent(location)}`;
  
  if (pricing === 'low') apiQuery += `&maxPrice=20`;
  if (pricing === 'high') apiQuery += `&minPrice=21`;
  const data = await getAllStations(apiQuery);
  const stations: StationInput[] = data?.stations || [];
  const pagination = data?.pagination || { totalPages: 1, currentPage: 1, totalItems: 0 };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="mb-8 border-b border-slate-100 pb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          All Charging Stations
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Explore and locate available EV charging hubs near you ({pagination.totalItems || 0} stations found).
        </p>
      </div>
      <StationFilters />
      {!stations || stations.length === 0 ? (
        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No charging stations found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stations.map((station) => (
              <StationCard 
                key={station._id || Math.random().toString()} 
                station={station} 
              />
            ))}
          </div>
          <div className="mt-8">
            <PaginationBasic 
              pages={page} 
              totalPages={pagination.totalPages} 
              baseRoute=""
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Allstation;