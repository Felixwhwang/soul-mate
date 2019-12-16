import React from 'react';
import BottomMenu from './bottom-menu';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class IndividualLike extends React.Component {
  render() {
    const data = this.props.user.createdAt;
    return (
      <div className="row mb-3 align-content-center mt-2">
        <div className="col-6">
          <img
            src={this.props.user.images}
            className="rounded img-fluid likes-photo"
            onClick={() => this.props.setView(
              'detailed-profile',
              this.props.currentUser,
              {
                userId: this.props.user.userId,
                previousPage: this.props.currentPage
              }
            )}
          />
        </div>
        <div className="col-6 row likes-bottom-line row">
          <div className="mdate col-12 text-center">{data.split(' ').shift()}</div>
          <div className=" col-12 h2 text-center">{this.props.user.firstName}</div>
          <div className=" col-12 row">
            <div className="fas fa-heart fas-size3 likeHeart red col-6"
              onClick={() => this.props.likesClickHandler('like', this.props.user.userId)}
              name='like'></div>
            <div className="fas fa-heart-broken fas-size3 likeHeart col-6"
              onClick={() => this.props.likesClickHandler('dislike', this.props.user.userId)}
              name='dislike'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default class Likepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
    };
  }

  componentDidMount() {
    this.getLikesData();
  }

  getLikesData() {
    const currentUser = this.props.currentUser.userId;
    fetch(`/api/likes?idTo=${currentUser}`)
      .then(res => res.json())
      .then(likes => this.setState({ likes }))
      .catch(err => alert('getLikesData error', err));
  }

  likesClickHandler(like, id) {
    const isLike = like === 'like' ? 1 : 0;
    const idFrom = this.props.currentUser.userId;
    const idTo = id;
    const match = {
      isLike,
      idFrom,
      idTo
    };
    const likes = this.state.likes.filter(cur => {
      if (cur.userId !== idTo) return cur;
    });

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'applicatin/json' },
      body: JSON.stringify(match)
    };
    fetch('/api/likes', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ likes });
      }).catch(err => alert('likesClickHandler error', err));
  }

  render() {
    return (
      <div>
        <div className="bg-bar d-flex justify-content-end align-items-center sticky-top">
          <i className="fas fa-bars fas-size p-2"
            onClick={() =>
              this.props.setView(
                'menu',
                this.props.currentUser,
                this.props.currentPage)
            }
          ></i>
        </div>

        <div className="container fix-overlap">
          <TransitionGroup>
            {this.state.likes.map(cur => {
              return (
                <CSSTransition
                  classNames="fade"
                  timeout={500}
                  key={cur.userId}
                >
                  <IndividualLike
                    user={cur}
                    key={cur.userId}
                    likesClickHandler={this.likesClickHandler.bind(this)}
                    currentPage={this.props.currentPage}
                    setView={this.props.setView}
                    currentUser={this.props.currentUser}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        <BottomMenu
          currentPage={this.props.currentPage}
          currentUser={this.props.currentUser}
          setView={this.props.setView}/>
      </div>
    );
  }
}
