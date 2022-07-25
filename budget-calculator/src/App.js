import React, {useState, useEffect} from "react";
import './App.css';
import Alert from "./components/Alert";
import Form from "./components/Form";
import List from "./components/List";
// import uuid from "uuid/v4";
const {v4: uuidv4} = require('uuid');

// const initialExpenses = [
//   {id:uuidv4(), charge:"House rent", amount:15000 },
//   {id:uuidv4(), charge:"Car Payment", amount:40000 },
//   {id:uuidv4(), charge:"School fees", amount:170000 }
// ];

const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

function App() {
  //state values
  // this is where all expenses are and where and I can add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense or charge 
  const [charge, setCharge] = useState('');
  //single amount
  const [amount, setAmount] = useState('');
  //single alert
  const [alert, setAlert] = useState({show:false});
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);

  // UseEffect
  useEffect(()=>{
    console.log("This is the useEffect");
    localStorage.setItem("expenses", JSON.stringify({expenses}), [expenses]);
  });

  // Functionality

  //handle charge
 const handleCharge = (e) => {
  // console.log(`charge: ${e.target.value}`);
  setCharge(e.target.value);
 };

 //handle amount
 const handleAmount = (e) => {
  // console.log(`amount: ${e.target.value}`);
  setAmount(e.target.value);
 };

 //handle alert
 const handleAlert = ({type, text}) => {
  setAlert({show:true, type,text});;
  setTimeout(()=>{
    setAlert({show:false})
  },3000)
 };


 //handle submit
 const handleSubmit = (e) => {
  e.preventDefault();
  if( charge !== "" && amount > 0){
      if(edit){
        let temp_Expenses = expenses.map(item => {
          return item.id === id? {...item, charge, amount} : item;
        });
        setExpenses(temp_Expenses);
        setEdit(false);
        handleAlert({type:"success", text:"Item has been Edited Successfully"})
      }
      else{
        const singleExpense = { id:uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: "success", text:"Item has been added successfully"});
      }
    
    setCharge("");
    setAmount("");
  }
  else{
      //handle alert called
      handleAlert({type:"danger", text:"Charge cannot be an empty value and amount cannot be 0 or less than 0"});
  }
 };

 const clearItems = () => {
  setExpenses([]);
  handleAlert({type:"danger", text: "All Items Deleted"})
 };

 const handleDelete = (id) => {
  let temp_Expenses = expenses.filter(item =>item.id !== id);
  handleAlert({type:"danger", text:"Item deleted"})
  console.log(temp_Expenses);
 };

 const handleEdit = (id) => {
  // console.log(`item has been edited: ${id}`);
  let expense = expenses.find(item => item.id === id);
  let {charge,amount} = expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
 }
  return (
    <div>
      {alert.show  &&  <Alert type={alert.type} text={alert.text}/> }
     <Alert handleAlert={handleAlert}/>
     <h1>Budget Calculator</h1>
     <main className="App">
        <Form charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}/>
        <List expenses = {expenses} clearItems={clearItems} handleDelete={handleDelete} handleEdit= {handleEdit} />
     </main>
     <h1>
      total spending: {" "} 
      <span className="total">
        ₦{expenses.reduce((accumulator, current)=>{
            return (accumulator += parseInt(current.amount));
          }, 0)}
      </span>
     </h1>
    </div>
  );
}

export default App;
