import React,{Component} from "react";
// import PureModal from 'react-pure-modal';
// import 'react-pure-modal/dist/react-pure-modal.min.css';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


class Terms extends Component {
  constructor(props){
    super(props);
  }
  
  render() { 
    return (
      <div>

      <h1>מדיניות האתר</h1>
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        תקנון מדיניות
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="container">
        <h4>מדיניות האתר</h4>
        תקנון האתר
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>







        <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="מדיניות האתר" />
  </Form.Group>

      </div>
       
    </Modal.Body>
    <Modal.Footer>
      <Button  variant='danger' onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  </div>
      )
  }
}
 
export default Terms;

