import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
    if(dish == null) {
        return (
            <div></div>
        );
    } else {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
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

function RenderComments({comments}) {
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
                    {
                        comments.map((comment) => {
                            var d = new Date(comment.date);
                            return (
                                <li key={comment.id} className="row m-1">
                                    <div className="col-12">{comment.comment}</div>
                                    <div className="col-12">-- {comment.author}, {month[d.getMonth()]} {addZero(d.getDay()+1,2)}, {d.getFullYear()}</div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

function DishDetail(props) {
    var dish = props.dish;
    if (dish == null) {
        return (
            <div></div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={dish} />
                    <RenderComments comments={dish.comments} />
                </div>
            </div>
        );
    }
}

export default DishDetail;