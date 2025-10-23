import { useEffect, useState } from "react";
import { Form, Table, Badge, Button } from "react-bootstrap";

import { fetchTodos } from "../data/todos";

const Todos = () => {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(3);

  useEffect(() => {
    setTodosRaw(fetchTodos);
  }, []);

  useEffect(() => {
    console.log("onlyWaiting: " + onlyWaiting);
  }, [onlyWaiting]);

  useEffect(() => {
    console.log("itemsPerPage: " + itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    setTodos(todosRaw);
  }, [todosRaw]);

  return (
    <div>
      {/* Filter */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            //   label="Show only waiting"
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label htmlFor="custom-switch">
            Show only&nbsp;
            <Button variant="warning" style={{pointerEvents: 'none'}}>
              waiting&nbsp;<i className="bi bi-clock"></i>
            </Button>
          </label>
        </div>
        <Form.Select
          aria-label="Default select example"
          className="w-25"
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </Form.Select>
      </div>
      {/* Table */}
      <div className="mt-3">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "4rem" }}>
                ID
              </th>
              <th className="text-center">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button variant="primary">
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="text-center">
                    <Badge bg="secondary">{todo.id}</Badge>
                  </td>
                  <td>{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? (
                      <Badge bg="success" className="align-content-center fs-6 fw-normal" style={{width: "6rem", height: "2.25rem"}}>
                        done&nbsp;<i className="bi bi-check"></i>
                      </Badge>
                    ) : (
                      <Button variant="warning">
                        waiting&nbsp;<i className="bi bi-clock"></i>
                      </Button>
                    )}
                    &nbsp;
                    <Button variant="danger">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* Page control */}
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage <= 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {currentPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => currentPage < numPages && setCurrentPage((p) => p + 1)}
          disabled={currentPage >= numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurrentPage(numPages)}
          disabled={currentPage >= numPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Todos;
