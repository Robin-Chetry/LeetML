import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import WelcomeSection from "../../components/home/WelcomeSection";
import StatsCards from "../../components/home/StatsCards";
import ProblemFilters from "../../components/home/ProblemFilters";
import ProblemTable from "../../components/home/ProblemTable";
import Pagination from "../../components/home/Pagination";
import { fetchProblems } from "../../redux/problemSlice";
import { fetchDashboardStats } from "../../redux/dashboardSlice";

function Home() {
  const dispatch = useDispatch();

  // Instant filters state
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    difficulty: "",
    topic: "",
    sort: "_id",
  });

  // Dedicated state for debounced search term only
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  // 1. Fetch static dashboard statistics once on initial mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // 2. Debounce ONLY the search term (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // 3. Re-fetch problem list whenever dropdowns/page change OR debounced search resolves
  useEffect(() => {
    dispatch(
      fetchProblems({
        ...filters,
        search: debouncedSearch,
      })
    );
  }, [
    dispatch,
    filters.page,
    filters.limit,
    filters.difficulty,
    filters.topic,
    filters.sort,
    debouncedSearch,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <WelcomeSection />
      <StatsCards />
      <ProblemFilters filters={filters} setFilters={setFilters} />
      <ProblemTable />
      <Pagination setFilters={setFilters} />
    </div>
  );
}

export default Home;