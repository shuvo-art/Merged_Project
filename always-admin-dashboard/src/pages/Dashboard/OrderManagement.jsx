import React from 'react';
import UserTable from '../../components/Dashboard/Table/UserTable';

const OrderManagement = () => {
  return (
    <div>
      <UserTable isOrderManagement={true} />
    </div>
  );
};

export default OrderManagement;
