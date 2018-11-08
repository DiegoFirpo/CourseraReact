import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isCommentModalOpen: false
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }

    handleCommentSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    toggleCommentModal(){
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        })
    }

    render() {
        return(
            <div>
                <div className="row">
                    <Button outline onClick={this.toggleCommentModal}>
                        <span className="fa fa-edit fa-lg">
                            Submit comment
                        </span>
                    </Button>
                </div>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}> 
                    <ModalHeader toggle={this.toggleCommentModal}>Submit comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>    
                                        <option>2</option>    
                                        <option>3</option>    
                                        <option>4</option>    
                                        <option>5</option>    
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}/>
                                    <Errors className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater that 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;