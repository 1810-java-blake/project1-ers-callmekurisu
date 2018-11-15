import React from 'react';
import ErsClient from '../../Axios/ErsClient';
import time from '../../Include/time';
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
export class ManagerComponent extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     reimbs: []
   }
 }
 
 //watch out now! lexical this!
  componentDidMount(){
    ErsClient.get('users/')
      .then((response) => {
        console.log(`got ${response.data.length} reimbursements`)
        this.setState({reimbs: response.data })
    })
      
    .catch(err => {
      console.log(err);
     })
    }
  
    logout = () => {
      
      ErsClient.post('users/logout')
        .then(res => {
          if (res.status === 200){
            window.location.assign('/home')
          }
        })
        .catch(err => {
         window.location.assign('127.0.0.1/404')
          console.log(err);
        })
      }
 
  render() {
    return (
        <div>
          <span id="logout"><FaSignOutAlt className='pointer' style={{color: "grey"}} size={20} onClick={this.logout}/>Logout</span>
          <h4>Logged in as: Finance Manager</h4>
          
            <>
        <hr />
          {this.state.reimbs.map((info, index) => (
            <div className="col col-12 col-md-12 col-lg-12 reimb-col">
            <div key={index} className="card reimb-card">
            <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>REVATURE ERS FORM v0.1B1810</strong></li>
            <li  className="list-group-item">First Name: {info.firstName.toUpperCase()}</li>
            <li  className="list-group-item flex-row-sb">Last Name: {info.lastName.toUpperCase()}</li>
            <li  className="list-group-item flex-row-sb">Email: {info.email.toUpperCase()}</li>
            <li  className="list-group-item flex-row-sb">Request #: {info.request.reimbId}</li>
            <li  className="list-group-item flex-row-sb">Amount $: {info.request.amount}</li>
            <li  className="list-group-item flex-row-sb">Submitted on: {time(info.request.submitted)}</li>
            <li  className="list-group-item flex-row-sb">Description: {info.request.description.toUpperCase()}</li>
            <li  className="list-group-item flex-row-sb">Type: {info.request.typeString.toUpperCase()}</li>
            <li  className="list-group-item flex-row-sb">Status: {info.request.statusString.toUpperCase()}</li>
            <li className="list-group-item flex-row-sb">
            <div id ="approval" container> 
            <FaCheckCircle className='pointer' style={{color: "green"}} size={50}/>
            </div>
            <div>
            <FaRegTimesCircle className='pointer' style={{color: "red"}} size={50}/>
            </div>
            </li>
            </ul>
            </div>
      
      </div>
          ))}
         
       
    </>
        </div>
    )
  }
}