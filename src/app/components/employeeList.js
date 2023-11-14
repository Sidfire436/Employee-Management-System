"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AvatarImage } from '../../../public/assets/dummy-image.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, TablePagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import DeleteModal from './deleteModal';
import useStore from '../store/employeeStore';


const EmployeeList = () => {
    const router = useRouter();
    const { employees, setEmployees } = useStore();
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [deleteEmpID, setDeleteEmpID] = useState();


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const truncateName = (name, maxLength) => {
        return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (hasFetchedData) {
                    console.log('Data already fetched. Skipping API request.');
                    return;
                }

                // Check if data is in cache
                const cachedData = sessionStorage.getItem('employeesData');
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    setEmployees(parsedData);
                    setHasFetchedData(true);
                    console.log('Using cached data.');
                    return;
                }

                console.log('Fetching data...');

                const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
                const data = response.data;

                console.log('data:::', data);

                if (data.status === 'success') {
                    // Cache the data in memory
                    setEmployees(data?.data);
                    setHasFetchedData(true);

                    // Cache the data in sessionStorage
                    // sessionStorage.setItem('employeesData', JSON.stringify(data?.data));
                } else {
                    console.error('Failed to fetch data from the API:', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [hasFetchedData, setEmployees]);

    const handleEdit = (id) => {
        router.push(`/edit-employee/${id}`)
    }

    const handleDelete = (id) => {
        setDeleteEmpID(id);
        setOpen(true)
    };



    return (
        <div style={{ overflow: 'auto', overflowX: 'auto' }}>
            <TableContainer component={Paper}>
                <Table style={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Profile Image</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Employee Age</TableCell>
                            <TableCell>Employee Salary</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    {employees && employees.length > 0 ? (
                        <TableBody>
                            {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>
                                        {employee.profile_image !== "" ? (
                                            <Avatar alt={employee.employee_name} src={employee.profile_image} />
                                        ) : (
                                            <Avatar alt={employee.employee_name} src={AvatarImage} />
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {truncateName(employee.employee_name, 25)}
                                    </TableCell>
                                    <TableCell>{employee.employee_age}</TableCell>
                                    <TableCell>{employee.employee_salary}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEdit(employee.id)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DeleteModal open={open} setOpen={setOpen} deleteEmpID={deleteEmpID} />
        </div>
    )
}

export default EmployeeList