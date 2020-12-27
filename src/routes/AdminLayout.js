import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import AlertMsg from "../components/AlertMsg";
import PublicNavbar from "../components/PublicNavbar";
import SideMenu from "../pages/Admin/SideMenu";

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row>
          <Col md={3} lg={2}>
            <SideMenu />
          </Col>
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
