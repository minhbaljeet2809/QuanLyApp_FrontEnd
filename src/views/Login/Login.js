import { Box, Button, Card } from '@material-ui/core';
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import bgImg from 'assets/img/logo.jpeg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#ce8181',
        backgroundImage: `url('${bgImg}')`,
        backgroundSize: 'cover'
    },
    textField: {
        margin: '10px 0px'
    },
    title: {
        margin: 0,
        textAlign: 'center',
        padding: '40px 0px',
        fontWeight: 'bold'
    },
    layoutLogin: {
        width: '20%',
        height: 'auto',
        margin: 'auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
    },
    btn: {
        padding: 10,
    }
}));

export function Login(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const history = useHistory();
    console.log(history);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const loginHandle = () => {
        if (values.username === 'admin' && values.password === 'admin') {
            history.push(`/admin`);
        }
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>Website quản lý đề tài đồ án tốt nghiệp khoa CNTT - Học viện kỹ thuật Mật Mã</h2>
            <Box className={classes.layoutLogin} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <h3 className={classes.title}>Đăng nhập</h3>
                <TextField
                    autoFocus
                    className={classes.textField}
                    fullWidth
                    label="Đăng nhập"
                    name="username"
                    onChange={handleChange('username')}
                    variant="outlined"
                    value={values.username}
                />
                <FormControl variant="outlined" fullWidth className={classes.textField} >
                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                    <OutlinedInput
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Button variant="outlined"
                    fullWidth
                    className={classes.btn}
                    onClick={loginHandle}>
                    Đăng nhập
                </Button>
            </Box>
        </div>
    );
}