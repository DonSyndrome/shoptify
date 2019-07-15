import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import EmployeeList from "./Components/Employee/EmployeeList";
import DepartmentList from "./Components/Department/DepartmentList";
import NotFound from "./Components/NotFound";

class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter basename="/employee">
          <div>
            <Switch>
              <Route exact path={"/employee"} component={EmployeeList} />
              <Route
                exact
                path="/department"
                render={props => (
                  <DepartmentList
                    {...props}
                    setDepartmentForSiblingCommunication={
                      this.setDepartmentForSiblingCommunication
                    }
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
