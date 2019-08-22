import React from 'react';
import { Breadcrumb, BreadcrumbItem, Media, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderMenuItem({ dish, deleteFavorite }) {
    return(
        <Media tag="li">
            <Link to={`/menu/${dish._id}`}>
                <Media left middle>
                    <Media object src={baseUrl + dish.image} alt={dish.name} />
                </Media>
            </Link>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}

function Favorite(props) {
    if (!props.auth.isAuthenticated) {
        // not logged in
        return (
            <div className='container'>
                <div className='row'>
                    <h4>You have no favorites, please log in</h4>
                </div>
            </div>
        );
    }
    else {
        // logged in
        if (props.favorites.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.favorites.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.favorites.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.favorites.favorites) {
            //logged in not null
            const favorites = props.favorites.favorites.dishes.map((dish) => {
                return (
                    <div key={dish._id} className='col-12 mt-5'>
                        <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite} />
                    </div>
                );
            });
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>My Favorites</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <Media list>
                            {favorites}
                        </Media>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>You have no favorites, please go add some!</h4>
                    </div>
                </div>
            );
        }
    }
}

export default Favorite; 