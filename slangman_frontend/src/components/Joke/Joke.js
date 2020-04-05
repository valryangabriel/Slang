import React, { useState , useEffect } from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';

const Joke = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>
        CAT FACT
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Random Cat Facts </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.fact}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>  
    </>
  )
}

export default Joke;