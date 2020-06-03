import React from 'react';
import Navbar from './components/navbar/Navbar';
import routes from './Routes';
import { Divider } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";

export default function App() {
    const AppRoutes = () => (
      <Switch>
        { routes?.map(route => (
            <>
              { route?.component && 
                <Route path={ route?.path } component={ route?.component } /> 
              }
              { route?.children?.map(child => 
                <Route path={ route?.path + child?.path } component={ child?.component } />
              )}
            </>
          ))
        }
      </Switch>
    );

    return (
        <Router>
          <Navbar />
          <Divider />
          <AppRoutes />
        </Router>
    );
}
