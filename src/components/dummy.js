import React, { useEffect } from 'react'
//import useStyles from './styles';
import { gapi } from "gapi-script";

//import Icon from './icon'; 3.40.01
import Input from '../components/Auth/Input';
import { useState } from 'react';


//const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Dummy = () => {

    const [formData, setFormData] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
      /*  if(isSignup) {

            dispatch(signup(formData,history))
        }else {
            dispatch(signin(formData, history))
        } */

    }



    const handleChange = (event) => {
        /*setFormData ({ ...formData, [e.target.name]: e.target.value});
        setFormData ({...formData,[e.target.name]:e.target.value})  */

        const name = event.target.name;
        const value = event.target.value;
        console.log(name,value)
        setFormData(values => ({...values, [name]: value}))
    }





    useEffect(() => {
        const clientId = "589333494845-u3c5onapvn68cnl10i57s10brv9orhiu.apps.googleusercontent.com";
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "", }); }
                gapi.load("client:auth2", start);
            });
    //You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated.New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."


  return (
<form onSubmit={handleSubmit}>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={()=>{
                                        alert("abcd")
                                    }}
                                    autoFocus half
                                />
                      <button type="submit" >Submit</button>
                      </form>
  )
}

export default Dummy;