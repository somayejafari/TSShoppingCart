

import { Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { NavLink } from "react-router-dom"
 import { BsCart } from 'react-icons/bs'
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {

    const { openCart, cartQuantity } = useShoppingCart()

    return (
        <NavbarBs sticky="top" expand="lg"  className="bg-white shadow-sm mb-3">
            <Container>
            <NavbarBs.Collapse>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>
                    Home
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>
                    Store
                    </Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>
                    About
                    </Nav.Link>
                </Nav>
               </NavbarBs.Collapse> 
               {cartQuantity > 0 &&
               <Button 
               onClick={openCart}
               style={{width: "3rem", height: "3rem" , position: "relative"}}
               variant="outline-primary"
               className="rounded-circle"
               >
               <BsCart className = 'mx-2'></BsCart>
               <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
               style={{color: "white",
                width: "1.5rem",
                 height: " 1.5rem", 
                 position: "absolute",
                  bottom: 0,
                   right:0,
                    transform: "translate(25%,25%)"}}>
                {cartQuantity}
               </div>
               </Button>
    }
            </Container>
        </NavbarBs>
    )
}