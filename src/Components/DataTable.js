import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import "../DataTable.css";
import Pagination from "./Pagination";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        console.log("Data is ", result);
      } catch (err) {
        setError(
          err.message || "Failed to fetch data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

    console.log("CUrrent rows is ", currentRows);

    return currentRows.map((item, index) => (
      <tr key={index}>
        <td>{item["s.no"]}</td>
        <td>{item["percentage.funded"]}</td>
        <td>{item["amt.pledged"]}</td>
      </tr>
    ));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="table">
      <table border="1" aria-label="Data table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage funded</th>
            <th scope="col">Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            renderTableRows()
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {data.length > 0 && (
        <Pagination
					onPageChange={handlePageChange}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
      )}
    </div>
  );
};

export default DataTable;
