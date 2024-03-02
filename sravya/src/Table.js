import React, { useState } from 'react';
import './index.css'; // Import the CSS file

const Table = ({ customers, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('dsc');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle sort order if clicking on the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending order
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedCustomers = customers
  .filter((customer) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      customer.customer_name.toLowerCase().includes(lowerCaseSearchTerm) ||
      customer.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
  })
  .sort((a, b) => {
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];

    // Handle undefined fields
    if (typeof fieldA === 'undefined') return 1;
    if (typeof fieldB === 'undefined') return -1;

    if (sortBy === 'created_at') {
      const dateA = new Date(fieldA);
      const dateB = new Date(fieldB);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    }
  });


  return (
    <center>
      <div className="table-container">
        <h1>Customer List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className='searchinput'
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className='SearchButton'>Search</button>
        </form>
        <div>
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="created_at">Date</option>
            <option value="time">Time</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('sno')}>Sno</th>
              <th onClick={() => handleSort('customer_name')}>Customer Name</th>
              <th onClick={() => handleSort('age')}>Age</th>
              <th onClick={() => handleSort('phone')}>Phone</th>
              <th onClick={() => handleSort('location')}>Location</th>
              <th onClick={() => handleSort('created_at')}>Date</th>
              <th onClick={() => handleSort('created_at')}>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr key={customer.sno}>
                <td>{customer.sno}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.age}</td>
                <td>{customer.phone}</td>
                <td>{customer.location}</td>
                <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </center>
  );
};

export default Table;
