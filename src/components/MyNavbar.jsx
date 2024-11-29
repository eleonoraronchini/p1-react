
import { Navbar, Container, Nav, Button, Image, Dropdown } from "react-bootstrap";
import avatar from "../assets/avatar.png";
import logo from "../assets/netflix_logo.png";

function MyNavbar(props) {
  function handlePage(page) {
    props.callbackDetailPage(page);
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="text-white" href="#" onClick={() => handlePage("main")}>
          <Image src={logo} alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link /* href="#" */ onClick={() => handlePage("main")}>Home</Nav.Link>
            <Nav.Link href="#" active>
              TV Shows
            </Nav.Link>
            <Nav.Link href="#">Movies</Nav.Link>
            <Nav.Link href="#">Recently added</Nav.Link>
            <Nav.Link href="#">My list</Nav.Link>
          </Nav>
          <div id="rightbar" className="d-none d-lg-flex justify-content-around align-items-center">
            <i className="bi bi-search text-white px-3"></i>
            <p className="text-white px-3 m-0">KIDS</p>
            <i className="bi bi-bell-fill text-white px-3"></i>

            <Dropdown className="btn-group">
              <Button variant="darkgray" size="sm">
                <Image className="avatar px-3" src={avatar} alt="avatar" />
              </Button>
              <Dropdown.Toggle split className="text-white bg-dark border-0" id="dropdown-split-basic" />
              <Dropdown.Menu className="border-secondary">
                <Dropdown.Item className="text-dark"  href="#" onClick={() => handlePage("profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item className="text-dark"  href="#" onClick={() => handlePage("settings")}>
                  Settings
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;