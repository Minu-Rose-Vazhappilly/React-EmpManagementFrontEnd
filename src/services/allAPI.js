import baseurl from "./baseUrl";
import commonAPI from "./commonAPI";

export const addEmployee = async (userInput)=>{
    return await commonAPI("POST",`${baseurl}`,{userInput})
}
export const employeeList = async ()=>{

    return await commonAPI("GET",`${baseurl}`,{})
}
export const deleteEmployeeList = async (id)=>{
    return await commonAPI("DELETE",`${baseurl}/${id}`,{})
 }

export const editEmployeeList = async (id,userInput)=>{
    return await commonAPI("PUT",`${baseurl}/${id}`,{userInput})
 }