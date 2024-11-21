import React, { useState } from "react";
import FilterBar from "./FilterBar.jsx";
import Table from "./Table.jsx";

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
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
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
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
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
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
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
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
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
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
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
const UserTable = () => {
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState("");
  const [sortOrder, setSortOrder] = useState("start-end");

  const filteredData = dummyData
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      const matchesSubscription = subscription
        ? item.subscriptionType === subscription
        : true;
      return matchesSearch && matchesSubscription;
    })
    .sort((a, b) => {
      if (sortOrder === "start-end") {
        return new Date(a.date) - new Date(b.date); // Ascending order
      } else {
        return new Date(b.date) - new Date(a.date); // Descending order
      }
    });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Subscriber</h1>
      <FilterBar
        search={search}
        setSearch={setSearch}
        subscription={subscription}
        setSubscription={setSubscription}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Table data={filteredData} />
    </div>
  );
};

export default UserTable;
