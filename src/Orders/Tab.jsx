import { useEffect, useState } from "react";
import "./tab.css";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("allOrders");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 3;

  //fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./fakeDB.json");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //filter data according to active tab
  const filteredOrders = orders.filter(function (order) {
    if (activeTab === "allOrders") {
      return true;
    } else {
      return order.deliveryType.toLowerCase() === activeTab;
    }
  });

  // pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / pageLimit);

  const startPage = (currentPage - 1) * pageLimit;

  const endPage = startPage + pageLimit;

  const activePage = filteredOrders.slice(startPage, endPage);

  //pagination btn
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    const isActive = currentPage === i;
    paginationButtons.push(
      <button
        key={i}
        className={`pagination-button ${isActive ? "active" : ""}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div>
      <h1>Anti Blue Ray Glass Orders</h1>
      <div className="tabs">
        <button
          className={activeTab === "allOrders" ? "active" : ""}
          onClick={() => setActiveTab("allOrders")}
        >
          All Orders
        </button>
        <button
          className={activeTab === "regular" ? "active" : ""}
          onClick={() => setActiveTab("regular")}
        >
          Regular Delivery
        </button>
        <button
          className={activeTab === "express" ? "active" : ""}
          onClick={() => setActiveTab("express")}
        >
          Express Delivery
        </button>
      </div>
      <div className="tableDiv">
        <table>
          <thead>
            <tr className="tableRow">
              <th>ID</th>
              <th>Name</th>
              <th>Delivery Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activePage.map((order) => (
              <tr
                key={order.id}
                className={`${
                  order?.status === "Delivered" ? "delivered" : "pending"
                }
                  `}
              >
                <td>{order?.id}</td>
                <td>{order?.name}</td>
                <td>{order?.deliveryType}</td>
                <td>{order?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>{paginationButtons}</div>
    </div>
  );
};

export default Tab;
