import React, { useState } from 'react';

const Pagination = ({ postsPerPage, length, handlePagination }) => {
  const [activePage, setActivePage] = useState(1);
  const paginationNumbers = [];

  for (let i = 1; i <= 10; i++) {
    paginationNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setActivePage(pageNumber);
    handlePagination(pageNumber);
  };

  return (
    <div className='pagination'>
      {paginationNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === activePage ? 'active' : ''}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
