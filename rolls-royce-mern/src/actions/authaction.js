import axios from 'axios';
 import {Route,browserHistory} from 'react-router';

 export function loginUser(loginData){
 	console.log(loginData);
    console.log("Calling function !!!-RegisterUser")
    return function(dispatch){
         
    axios.post('http://localhost:8080/api/loginuser',loginData).then((response)=>{         
        if(response.data.success)
        {
        console.log(response.data.msg)
      
        dispatch({type:"LOGIN_USER",payload:response.data})
        if(response.data.data.isAdmin){
            
            localStorage.setItem('userdetails',JSON.stringify(response.data.data))
            browserHistory.push('/dashboardadmin');
        }
        else{
            console.log("Normal User")
          
            localStorage.setItem('userdetails',JSON.stringify(response.data.data))
              browserHistory.push('/dashboard');
        }
        
         
    }else{
          console.log("Login failed")
        dispatch({type:"LOGIN_USER",payload:response.data})
        }
    })
    }
}