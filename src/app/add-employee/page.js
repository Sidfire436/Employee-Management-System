"use client"
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Button, Paper, Grid } from '@material-ui/core';
import useStore from '../store/employeeStore';
import { useRouter } from 'next/navigation';

const AddEmployee = ({ employeeId }) => {
  const router = useRouter()
  const { employees, addEmployees, updateEmployees } = useStore();
  const [employeeImage, setEmployeeImage] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (!values.employee_name) {
      errors.employee_name = 'Name is required';
    }
    if (!values.employee_salary) {
      errors.employee_salary = 'Salary is required';
    } else {
      const numericValue = parseFloat(values.employee_salary);

      if (isNaN(numericValue) || !Number.isInteger(numericValue) || numericValue <= 0) {
        errors.employee_salary = 'Must be a positive integer';
      }
    }

    return errors;
  };



  const onSubmit = (values) => {
    const profileImageDataURL = employeeImage ? URL.createObjectURL(employeeImage) : null;
    const lastEmployeeId = employees.length > 0 ? employees[employees.length - 1].id : 0;
    const data = {
      id: employeeId || lastEmployeeId + 1,
      employee_name: values.employee_name,
      employee_age: values.employee_age,
      employee_salary: values.employee_salary,
      profile_image: profileImageDataURL
    }
    if (employeeId) {
      updateEmployees(employeeId, data);
      router.push("/");
    } else {
      addEmployees(data);
      router.push("/")
    }
  };

  const handleFileChange = (event) => {
    setEmployeeImage(event.target.files[0]);
  };

  const getInitialValues = () => {
    const employee = employees.find((emp) => emp.id == employeeId);
    return {
      employee_name: employee ? employee.employee_name : '',
      employee_age: employee ? employee.employee_age : '',
      employee_salary: employee ? employee.employee_salary : '',
    };
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full">
      <h1 className="text-2xl font-bold mb-6">{!employeeId ? 'Add' : 'Edit'} Employee</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={getInitialValues()}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field name="employee_name">
                    {({ input, meta }) => (
                      <div>
                        <TextField {...input} type="text" placeholder='Employee Name' />
                        {meta.error && meta.touched && (
                          <div className="text-red-500 text-sm">
                            {meta.error}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field name="employee_age">
                    {({ input, meta }) => (
                      <TextField {...input} type="text" placeholder='Employee Age' />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field name="employee_salary">
                    {({ input, meta }) => (
                      <div>
                        <TextField {...input} type="text" placeholder='Employee Salary' />
                        {meta.error && meta.touched && (
                          <div className="text-red-500 text-sm">
                            {meta.error}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {employeeImage && (
                      <img
                        src={URL.createObjectURL(employeeImage)}
                        alt="Preview"
                        style={{ maxWidth: '250px', maxHeight: '250px', marginTop: '10px' }}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
};

export default AddEmployee;
