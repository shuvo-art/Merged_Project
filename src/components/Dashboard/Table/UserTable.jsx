import React, { useState } from "react";
import FilterBar from "./FilterBar.jsx";
import Table from "./Table.jsx";
import UserModal from "../../../pages/Modals/UserModal.jsx";
import { AnimatePresence } from "framer-motion";

const dummyData = [
  {
    id: "#12333",
    name: "Alex",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    email: "alex@dashwind.com",
    contactNumber: "(201) 555-0124",
    location: "Paris",
    subscriptionType: "Premium",
    price: 100,
    date: new Date(),
  },
  {
    id: "#12334",
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    email: "ereena@dashwind.com",
    contactNumber: "(202) 555-0134",
    location: "London",
    subscriptionType: "Free",
    price: 190,
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: "#12335",
    name: "John",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    email: "jhon@dashwind.com",
    contactNumber: "(203) 555-0144",
    location: "Canada",
    subscriptionType: "Premium",
    price: 112,
    date: new Date(new Date().setDate(new Date().getDate() - 12)),
  },
  {
    id: "#12336",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    email: "virat@dashwind.com",
    contactNumber: "(201) 555-0156",
    location: "Paris",
    subscriptionType: "Premium",
    price: 117,
    date: new Date(new Date().setDate(new Date().getDate() - 13)),
  },
  {
    id: "#12337",
    name: "Miya",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
    email: "miya@dashwind.com",
    contactNumber: "(202) 555-0176",
    location: "Canada",
    subscriptionType: "Free",
    price: 612,
    date: new Date(new Date().setDate(new Date().getDate() - 23)),
  },
  {
    id: "#12338",
    name: "Matrix",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    email: "matrix@dashwind.com",
    contactNumber: "(203) 555-0193",
    location: "London",
    subscriptionType: "Premium",
    price: 631,
    date: new Date(new Date().setDate(new Date().getDate() - 15)),
  },
  {
    id: "#12339",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    email: "virat@dashwind.com",
    contactNumber: "(204) 555-0114",
    location: "Tokyo",
    subscriptionType: "Free",
    price: 151,
    date: new Date(new Date().setDate(new Date().getDate() - 13)),
  },
  {
    id: "#12340",
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    email: "ereena@dashwind.com",
    contactNumber: "(205) 555-0123",
    location: "Paris",
    subscriptionType: "Premium",
    price: 617,
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  // Add more items as needed
];

const UserTable = ({isOrderManagement}) => {
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
    <div className="p-6">
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
      <Table isOrderManagement={isOrderManagement} data={filteredData} onRowClick={handleRowClick} />
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
