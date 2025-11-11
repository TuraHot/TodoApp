import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";

import "./Carts.css";

const Carts = ({ carts, setCarts }) => {
  return (
    <div className="carts-container">
      <div className="carts-items-container">
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove from Carts
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4>
        Products: <Badge bg="danger">{carts.length} items</Badge> - Total Price: <Badge bg="success">${carts.reduce((prev, cart) => prev + cart.price, 0).toFixed(2)}</Badge>
      </h4>
      <Button className="btn btn-warning">Checkout <i className="bi bi-credit-card"></i></Button>
    </div>
  );
};

export default Carts;
