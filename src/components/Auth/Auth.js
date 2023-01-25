import React, { useEffect } from 'react'
import { Avatar,Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import useStyles from './styles';
import { gapi } from "gapi-script";
import { useHistory } from 'react-router-dom';
//import {signin, signup} from '../../actions/auth';

//import Icon from './icon'; 3.40.01
import  LockOutlinedIcon  from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

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

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
       const result = res?.profileObj;
       const token = res?.tokenId;

       try {
        dispatch({type:"AUTH", data:{result, token}});
        history.push('/');
       } catch (error) {
        console.log(error)
       }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sign In was unsuccessful. Try Again Later');
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
    <Container component="main" maxWidth="xs" >
        <Paper className={classes.paper} elevation={3}  >
            <Avatar className={classes.avatar} >
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5' >
                {isSignup ? 'Sign Up' : 'Sign In' }
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container spacing={2} >
                    {
                        isSignup && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus half
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    onChange={handleChange}
                                    half
                                />
                            </>
                        )
                    } <Input
                        name="email"
                        label="Email Address"
                        onChange={handleChange}
                        type="email" />
                      <Input
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        handleShowPassword={handleShowPassword} />
                      { isSignup && <Input
                        name="confirmPassword"
                        label="Repeat Password"
                        onChange={handleChange}
                        type="password" /> }
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                    clientId='589333494845-u3c5onapvn68cnl10i57s10brv9orhiu.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color='primary'
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}

                            variant="contained"
                        >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify='flex-end' >
                    <Grid item >
                        <Button onClick={switchMode} >
                            { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth