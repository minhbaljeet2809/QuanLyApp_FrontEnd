import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Admin from "layouts/Admin.js";

function ProtectedRoute({ isAuth: isAuth, ...rest }) {

    console.log(isAuth)
    return (
        <Route
            {...rest}
            render={(props) => {
                return <Admin />;
                // if (isAuth) {
                // } else {
                //     return (
                //         <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                //     );
                // }
            }}
        />
    );
}

export default ProtectedRoute;