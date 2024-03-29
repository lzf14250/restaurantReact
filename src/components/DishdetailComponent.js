import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalBody, ModalHeader, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, FadeTransform, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }

    render() {
        return(
            <>
                <Button onClick={this.toggleModal}>
                    <i className="fa fa-pencil"></i> 
                    {' '} Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        {this.props.auth.isAuthenticated ?
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" className="col-12">
                                        Rating
                                    </Label>
                                    <Col>
                                        <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control custom-select" defaultValue="5">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" className="col-12">
                                        Comment
                                    </Label>
                                    <Col>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control"
                                            placeholder="Your Comment"
                                            validators={{
                                                required,
                                                minLength: minLength(10),
                                                maxLength: maxLength(2000)
                                            }} />
                                        <Errors className="text-danger" 
                                            model=".comment"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be 10 characters or more ',
                                                maxLength: 'Must be 2000 characters or less'
                                            }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                            :
                            <div className='container'>
                                <div className='row'>
                                    <h4>Please log in first</h4>
                                </div>
                            </div>
                            }
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderDish({ dish, favorite, deleteFavorite, postFavorite }) {
    if(dish == null) {
        return (
            <div></div>
        );
    } else {
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            {favorite ? 
                                <Button outline color="primary" onClick={() => deleteFavorite(dish._id)}>
                                    <span className='fa fa-heart'></span>
                                </Button>
                                :
                                <Button outline color="primary" onClick={() => postFavorite(dish._id)}>
                                    <span className='fa fa-heart-o'></span>
                                </Button>
                            }
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
}

function addZero(num, length) {
    if((num + "").length >= length) {
        return num;
    } else {
        return addZero("0" + num,length);
    }
}

function RenderComments({comments, postComment, deleteComment, dishId, auth}) {
    const addDeleteButton = (comment) => {
        if (!localStorage.getItem('creds')) 
            return <div></div>;
        else if (comment.author.username === JSON.parse(localStorage.getItem('creds')).username)
            return (
                <Button color="primary" onClick={() => deleteComment(comment._id)}>
                    Delete
                </Button>
            );
        else 
            return <div></div>;
    }

    if (comments == null) {
        return (
            <div></div>
        );
    } else {
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'
                        , 'Sep', 'Oct', 'Nov', 'Dec'];
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {
                            comments.map((comment) => {
                                var d = new Date(comment.createdAt);
                                return (
                                    <Fade in>
                                        <li key={comment._id} className="row m-1">
                                            <div className="col-12">{comment.comment}</div>
                                            <div className="col-12">-- {comment.author.username}, {month[d.getMonth()]} {addZero(d.getDay()+1,2)}, {d.getFullYear()}</div>
                                            {addDeleteButton(comment)}
                                        </li>
                                    </Fade>
                                );
                            })
                        }
                    </Stagger>
                </ul>
                <CommentForm 
                    postComment={postComment}
                    dishId={dishId}
                    auth={auth} />
            </div>
        );
    }
}

function DishDetail(props) {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish == null) {
        return (
            <div></div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to={'/menu'}>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} favorite={props.favorite}
                        deleteFavorite={props.deleteFavorite}
                        postFavorite={props.postFavorite} />
                    <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        deleteComment={props.deleteComment}
                        dishId={props.dish._id}
                        auth={props.auth} />
                </div>
            </div>
        );
    }
}

export default DishDetail;