import { create } from 'zustand';

const useStore = create((set) => ({
    employees: [],
    setEmployees: (newEmployees) => {
        set({ employees: newEmployees });
        sessionStorage.setItem('employeesData', JSON.stringify(newEmployees));
    },

    addEmployees: (newEmployees) => {
        set((state) => {
            const addedEmployee = [...state.employees, newEmployees];
            sessionStorage.setItem('employeesData', JSON.stringify(addedEmployee));
            return { employees: addedEmployee }
        })
    },
    updateEmployees: (id, updatedEmployee) => {
        set((state) => {
            const updatedEmployees = state.employees.map((employee) => {
                if (employee.id == id) {
                    return { ...employee, ...updatedEmployee }
                }
                return employee;
            })
            sessionStorage.setItem('employeesData', JSON.stringify(updatedEmployees));
            return { employees: updatedEmployees }
        })
    },
    deleteEmployee: (id) => {
        set((state) => {
            const updatedEmployees = state.employees.filter((employee) => employee.id !== id);
            sessionStorage.setItem('employeesData', JSON.stringify(updatedEmployees));
            return { employees: updatedEmployees };
        });
    },
}));

export default useStore;