import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
        this.toggleCommentModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}/>
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater that 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
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

function RenderDish({dish}) {
    if(dish != null) {
        return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>                
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
        )
    } else {
        return(
            <div></div>
        )
    }
}

function RenderComments({comments, postComment, dishId}) {
    if(comments != null) {
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return(
                                <Fade in>
                                    <li key={comment.id} >
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p> 
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm postComment={postComment} dishId={dishId} />
            </div>
        );
    } else {
        return(
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errorMessage) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errorMessage}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );
    }
}
        
export default DishDetail;