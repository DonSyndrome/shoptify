import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Router } from "react-router-dom";
import history from "./history";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilter,
  faDownload,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import EmployeeList from "./Components/Employee/EmployeeList";
import DepartmentList from "./Components/Department/DepartmentList";
import NotFound from "./Components/NotFound";
import ComponentHeader from "./Components/ComponentHeader";
import LandingPage from "./Components/LandingPage";

library.add(faFilter, faDownload, faCalendarAlt);


class App extends Component {
  state = {
    allDepartmentsForSiblingCommunication: [],
    isSideDrawerOpen: false
  };

  onSideDrawerOpen = () => {
    this.setState({
      isSideDrawerOpen: true
    });
  };

  onSideDrawerClose = () => {
    this.setState({
      isSideDrawerOpen: false
    });
  };

  componentDidMount() {
    axios
      .get("/api/department")
      .then(res => {
        this.setState({
          allDepartmentsForSiblingCommunication: res.data
        });
      })
      .catch(error => {});
  }

  setDepartmentForSiblingCommunication = department => {
    this.setState({
      allDepartmentsForSiblingCommunication: department
    });
  };

  render() {
    const { allDepartmentsForSiblingCommunication } = this.state;

    const pad = 16;
    const appBarHeight = 74;
    const drawerWidth = 240;

    const left = this.state.isSideDrawerOpen ? drawerWidth : 85;
    const top = appBarHeight;

    const width = this.state.isSideDrawerOpen
      ? "calc(100% - " + (drawerWidth + 2 * pad) + "px)"
      : "calc(100% - " + 2 * (pad + 50) + "px)";

    const contentStyle = {
      width: width,
      marginTop: top + pad,
      marginLeft: left + pad,
      marginBottom: pad,
      marginRight: pad,

      padding: 0
    };

    return (
      <div>
        <BrowserRouter basename="/cms/employee">
          <Router history={history}>
            <div>
              <ComponentHeader
                onSideDrawerOpen={this.onSideDrawerOpen}
                onSideDrawerClose={this.onSideDrawerClose}
              />
              <div style={contentStyle}>
                <Switch>
                  <Route exact path="/cms" render={props => <LandingPage />} />
                  <Route
                    exact
                    path="/cms/employee"
                    render={props => (
                      <EmployeeList
                        {...props}
                        allDepartmentsForSiblingCommunication={
                          allDepartmentsForSiblingCommunication
                        }
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/cms/department"
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
            </div>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
