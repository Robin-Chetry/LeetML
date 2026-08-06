import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSubmissions } from "../../redux/submissionSlice";
import SubmissionTable from "../../components/submissions/SubmissionTable";
import SubmissionDetailsDrawer from "../../components/submissions/SubmissionDetailsDrawer";
import Pagination from "../../components/home/Pagination";

function MySubmissions() {
  const dispatch = useDispatch();

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { loading, error, currentPage, totalPages } = useSelector(
    (state) => state.submission
  );

  useEffect(() => {
    dispatch(fetchUserSubmissions(filters));
  }, [dispatch, filters.page, filters.limit]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">My Submissions</h1>

      <SubmissionTable onSelectSubmission={setSelectedSubmission} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />

      <SubmissionDetailsDrawer
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}

export default MySubmissions;