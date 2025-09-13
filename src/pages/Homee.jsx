import React, { useEffect, useState } from 'react'
import { addEmployee, deleteEmployeeList, editEmployeeList, employeeList } from '../services/allAPI';
import { Link } from 'react-router-dom';
import Employee from './Employee';

function Homee() {
    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        status: "active"
    })
    console.log(userInput);
    const [emp,setEmp] = useState([])
    console.log(emp);
    
    useEffect(()=>{
        fetchEmployee()
    },[])
    const [showModal,setShowModal] = useState(false)
    const [selectedEmp, setSelectedEmp] = useState(null); // current employee to edit
    console.log(selectedEmp);
    

    const fetchEmployee = async ()=>{
        
    try{
      const list =  await employeeList()
      console.log(list.data);
      setEmp(list.data)
      
    }catch(err){
      return err
    }
    
  }

  const updateEmployeeValue = async (empid,item)=>{
      const updatedValue = emp.find(i=>i.id == empid)
      console.log(updatedValue);
      
      if(updatedValue){
        //setUpTask({...updated,userInput:{...updated.userInput,completed:completedValue}})
        const newTask = {
      ...updatedValue,
      userInput: {
        ...updatedValue.userInput,
        username:item.userInput.username,
        email:item.userInput.email,
        status:item.userInput.status
      }
    };
    try{
        const updatedTask = await editEmployeeList(newTask.id,newTask.userInput);
        setEmp(updatedTask.data)
        fetchEmployee()
        setShowModal(false)
      }catch(err){
        console.log(err);
        
      }
        
      }
      
  }

   const deleteEmployee = async (id)=>{

    try{
      await deleteEmployeeList(id)
      fetchEmployee()
    }catch(err){
      console.log(err);
      
    }
    
  }

    const addDetails = async()=>{
        try{
            const addEmployeeDetail = await addEmployee(userInput)
            setEmp(addEmployeeDetail.data)
            fetchEmployee()

        }catch(err){

        }
    }
    

    return (
        <div className='d-flex  align-items-center flex-column' style={{minHeight:"100vh"}}>
            <div className="card mt-5" style={{ width: "18rem" }}>

                <div className="card-body d-flex  align-items-center flex-column justify-content-center">
                    <input type="text" className='form-control ' placeholder='Add  username' onChange={(e) => setUserInput({ ...userInput, username: e.target.value })} />
                    <input type="text" className='form-control  mt-2' placeholder='Add  email' onChange={(e) => setUserInput({ ...userInput, email: e.target.value })} />
                    <select
                        className="form-control  mt-2"
                        value={userInput.status}
                        onChange={(e) => setUserInput({ ...userInput, status: e.target.value })}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button className='btn btn-primary mt-2' onClick={addDetails}><>ADD</></button>
                </div>
            </div>

          
            <div className="mt-4">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {emp.length > 0 ? (
              emp.map((item, index) => (
                <tr key={item.userInput.id}>
                  <td>{index + 1}</td>
                  <td>{item.userInput.username}</td>
                  <td>{item.userInput.email}</td>
                  <td>{item.userInput.status}</td>
                  <td><button className='btn btn-danger btn-sm' onClick={()=>deleteEmployee(item.id)}><i className="fa-solid fa-trash"></i></button></td>
                  <td><button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setSelectedEmp(item);
                        setShowModal(true);
                      }}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

           {
            showModal && 
            <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={selectedEmp.userInput.username}
                  onChange={(e) =>
                    setSelectedEmp({ ...selectedEmp, userInput:{...selectedEmp.userInput, username: e.target.value }})
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={selectedEmp.userInput.email}
                  onChange={(e) =>
                    setSelectedEmp({ ...selectedEmp, userInput:{...selectedEmp.userInput, email: e.target.value }})
                  }
                />
                <select
                  className="form-control mb-2"
                  value={selectedEmp.userInput.status}
                  onChange={(e) =>
                    setSelectedEmp({ ...selectedEmp, userInput:{...selectedEmp.userInput, status: e.target.value }})
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={()=>updateEmployeeValue(selectedEmp.id,selectedEmp)}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
           } 
      
        </div>
    )
}

export default Homee