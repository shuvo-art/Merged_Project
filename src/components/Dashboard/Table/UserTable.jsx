import React, { useState } from "react";
import FilterBar from "./FilterBar.jsx";
import Table from "./Table.jsx";
import UserModal from "../../../pages/Modals/UserModal.jsx";
import { AnimatePresence } from "framer-motion";
import { dummyData } from "../../../database/DummyData.js";



const UserTable = ({isDashboard, isOrderManagement}) => {
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredData = dummyData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());
    const matchesSubscription = subscription
      ? item.subscriptionType === subscription
      : true;

    const matchesDate =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));

    return matchesSearch && matchesSubscription && matchesDate;
  });

  const handleRowClick = (user) => {
    setSelectedUser(user); // Open the modal with selected user details
  };

  return (
    <div className="p-6 ">
      <h1 className="text-xl font-bold mb-4">Subscriber</h1>
      <FilterBar
        search={search}
        setSearch={setSearch}
        subscription={subscription}
        setSubscription={setSubscription}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Table isDashboard = {isDashboard} isOrderManagement={isOrderManagement} data={filteredData} onRowClick={handleRowClick} />
      <AnimatePresence>
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserTable;
