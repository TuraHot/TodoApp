import { useEffect, useState, useRef } from "react";
import { Form, Table, Badge, Button, Modal } from "react-bootstrap";

import { fetchTodos } from "../data/todos";

const Todos = () => {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(3);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  //fetch todos raw
  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  //filter onlywaiting
  useEffect(() => {
    if (onlyWaiting) setTodos(todosRaw.filter((todo) => !todo.completed));
    else setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);

  //number page
  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurrentPage(0);
    else if (currentPage > numPages) setCurrentPage(numPages);
    else if (currentPage <= 0) setCurrentPage(1);
  }, [numPages]);

  const waitingClicked = (id) => {
    console.log(id);
    const selectedTodo = todosRaw.find((todo) => {
      return todo.id === id;
    });

    selectedTodo.completed = true;
    setTodosRaw([...todosRaw]);
  };

  const deleteClicked = (id) => {
    const remainTodos = todosRaw.filter((todo) => {
      return todo.id !== id;
    });

    setTodosRaw(remainTodos);
  };

  const saveClicked = (id, title) => {
    console.log(id, title);

    if (title.trim() !== "") {
      const newTodo = {
        userId: 1,
        id,
        title,
        completed: false,
      };

      setTodosRaw([...todosRaw, newTodo]);
    }

    handleClose();
  };

  //Modal State and Handle
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Modal Begin */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                value={
                  todosRaw.reduce(
                    (prev, todo) => (todo.id > prev ? todo.id : prev),
                    -1
                  ) + 1
                }
                disabled
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder="ใส่ todo ใหม่ตรงนี้"
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClicked(Number(newIdRef.current.value), newTitleRef.current.value)
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal End */}

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
            <Button variant="warning" style={{ pointerEvents: "none" }}>
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
                <Button variant="primary" onClick={() => handleShow()}>
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo, index) => {
                return (
                  index >= (currentPage - 1) * itemsPerPage &&
                  index <= currentPage * itemsPerPage - 1
                );
              })
              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td className="text-center">
                      <Badge bg="secondary">{todo.id}</Badge>
                    </td>
                    <td>{todo.title}</td>
                    <td className="text-end">
                      {todo.completed ? (
                        <Badge
                          bg="success"
                          className="align-content-center fs-6 fw-normal"
                          style={{ width: "6rem", height: "2.3rem" }}
                        >
                          done&nbsp;<i className="bi bi-check"></i>
                        </Badge>
                      ) : (
                        <Button
                          variant="warning"
                          onClick={() => waitingClicked(todo.id)}
                        >
                          waiting&nbsp;<i className="bi bi-clock"></i>
                        </Button>
                      )}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => deleteClicked(todo.id)}
                      >
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
