import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import "../DataTable.css";
import Pagination from "./Pagination";
import {
  DEFAULT_API_ERROR_MESSAGE,
  NUMBER0,
  NUMBER1,
  NUMBER5,
  RESPONSE_OK_ERROR_MESSAGE,
  rowsToFetch,
} from "../Utils/constants";
import Error from "./Error";
import { KICKSTARTER_PROJECT_FETCH_API } from "../Utils/api";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(NUMBER1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rowsPerPage = NUMBER5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(KICKSTARTER_PROJECT_FETCH_API);
        if (!response.ok) {
          throw new Error(RESPONSE_OK_ERROR_MESSAGE);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || DEFAULT_API_ERROR_MESSAGE);
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
    const startIndex = (currentPage - NUMBER1) * rowsPerPage;
    const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

    return currentRows.map((item, index) => (
      <tr key={index}>
        {rowsToFetch.map((row) => {
          return <td key={row.id}>{item[row.id]}</td>;
        })}
      </tr>
    ));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) return <Error errorMessage={error} />;

  return (
    <div className="table">
      <table border="1" aria-label="Data table">
        <thead>
          <tr>
            {rowsToFetch.map((row, index) => {
              return (
                <th scope="col" key={index}>
                  {row.name}
                </th>
              );
            })}
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

      {data.length > NUMBER0 && (
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
