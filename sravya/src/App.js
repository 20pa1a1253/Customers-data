// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from './Table';
import Pagination from './Pagination';


function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(20);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/");
      setCustomers(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine which customers to display based on whether search term is empty
  const displayedCustomers = searchTerm ? filteredCustomers : customers;

  // Get current customers based on currentPage and customersPerPage
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = displayedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      {/* <Search handleSearch={handleSearch} /> */}
      <Table customers={currentCustomers} filteredCustomers={filteredCustomers} displayedCustomers={displayedCustomers} handleSearch={handleSearch} />
      <Pagination
        customersPerPage={customersPerPage}
        totalCustomers={displayedCustomers.length}
        paginate={paginate} setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
