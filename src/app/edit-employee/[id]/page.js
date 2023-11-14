// pages/edit-employee/[id].js
"use client"
import React from 'react';
import AddEmployee from '../../add-employee/page';

const EditEmployee = ({ params }) => {
  return (
    <div>
      <AddEmployee employeeId={params.id} />
    </div>
  );
};

export default EditEmployee;
