import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useStore from '../store/employeeStore';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({ open, setOpen, deleteEmpID }) {
    const { deleteEmployee } = useStore();
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickDelete = () => {
        deleteEmployee(deleteEmpID);
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Delete Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Do you want to delete this employee?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleClickDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
