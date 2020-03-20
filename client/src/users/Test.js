import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AppBar from 'material-ui/AppBar';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const currencies = [
    {
      value: 'Male',
      label: 'Mal e',
     
    },
    {
        value: 'Female',
        label: 'Female',
      },]

export default function MultilineTextFields() {
  const classes = useStyles();
  
  const [values, setValues] = React.useState({
  
    password: '',
    passwordConfirm:"",
    showPassword: false,
    showPasswordConfirm:false,
    email:'',
    redirectToHome:false, 
    isError:false, username:"",


  })


  const sexHandleChange = event => {
    setValues(event.target.value);
  };

   const passwordHandleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPasswordConfirm = () => {
    setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleMouseDownPasswordConfirm = event => {
    event.preventDefault();
  };

  const confirmPasswordHandleChange= props =>event => {
    setValues({ ...values, [props]: event.target.value });
  };

  

  


  return (
   
    <form className={classes.root} noValidate autoComplete="off">
         
        <h3>Account Information</h3>
     
        <div>

        <TextField
          id="outlined-textarea"
          label="User Name"
          placeholder="User Name"
          multiline
          variant="filled"
          style={{ width:"410px",  }}
        />

        </div>
     
      <div>
       
        <TextField
          id="outlined-textarea"
          label="First Name"
          placeholder="First Name"
          multiline
          variant="filled"
          
        />
        <TextField
          id="outlined-textarea"
          label="Last Name"
          placeholder="Last Name"
          multiline
          variant="filled"
        />
    
        
      </div>
      <div>
        <TextField
          id="outlined-textarea"
          label="Email Address"
          placeholder="Email Address"
          multiline
          variant="filled"
        />
        <TextField
          id="outlined-textarea"
          label="Confirm Email Address"
          placeholder="Confirm Email Address"
          multiline
          variant="filled"
        />
        
      </div>
      <div>
      <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={values}
          onChange={sexHandleChange}
          helperText="Please select your sex"
        >
            {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
             </TextField>
      <TextField
          id="outlined-textarea"
          label="Phone Number"
          placeholder="Phone Number"
          multiline
          variant="filled"
        /> 
      </div>

<h3>Account Protection</h3>
      <div>
        <TextField
          id="outlined-textarea"
          label="User Name"
          placeholder="User Name"
          multiline
          variant="filled"
          style={{ width:"410px",  }}
        />

        </div>


        <div>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={passwordHandleChange('password')
          
        }
           
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{ width:"30px",  }}

                  
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPasswordConfirm ? 'text' : 'password'}
            value={values.passwordConfirm}
            onChange={confirmPasswordHandleChange('passwordConfirm')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirm}
                  onMouseDown={handleMouseDownPasswordConfirm}
                  edge="end"
                  
                >
                  {values.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
            
        </div>


    </form>
  );
}
