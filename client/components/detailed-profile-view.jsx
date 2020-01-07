import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default class DetailedProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      checkValidation: ''
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    const currentProfile = this.props.info.userId;
    fetch(`/api/profile?userId=${currentProfile}`)
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch(err => alert('getUserData error', err));
  }

  likesClickHandler(like, id) {
    const isLike = like === 'like';
    const idFrom = this.props.currentUser.userId;
    const idTo = id;
    const match = {
      isLike,
      idFrom,
      idTo
    };

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'applicatin/json' },
      body: JSON.stringify(match)
    };
    fetch('/api/likes', req)
      .then(res => res.json())
      .then(result => {
        this.props.setView('moments', this.props.currentUser);
      }).catch(err => alert('likesClickHandler error', err));
  }

  render() {
    return (
      <CSSTransition
        in={true}
        appear={true}
        classNames="fade"
        timeout={500}
      >
        <div>
          <div className="d-flex sticky-top bg-bar justify-content-between align-items-center">
            <i className="fas fa-angle-left fas-size p-2"
              onClick={() => this.props.setView(this.props.info.previousPage, this.props.currentUser)}></i>
          </div>
          <div className="container mb-2">
            <div className="row">
              <img src={this.state.user.images} alt="some guy face" className="img-fluid photo-size rounded-top" />
            </div>
            <div className="row bg-secondary rounded-bottom">
              <div className="row col-12 text-light h3">
                <div className="card-font col-12 font-size-2rem">Meet {this.state.user.firstName}</div>
              </div>
              <div className="row col-12 text-light h5 rounded-bottom">
                <div className="col-4 fas fa-birthday-cake">  {this.state.user.age}</div>
                <div className="col-4 fas fa-ruler-vertical">  {this.state.user.height}</div>
                <div className="col-4 fas fa-male">  {this.state.user.gender}</div>
              </div>
            </div>
            <div className='bottomBox'>
              <div className="row">
                <h4 className='col-12'>Job Title</h4>
                <h5 className="text-secondary col-12">{this.state.user.jobTitle}</h5>
              </div>
              <div className="row">
                <h4 className='col-12'>Location</h4>
                <h5 className="text-secondary col-12">{this.state.user.location}</h5>
              </div>
              <div className="row">
                <h4 className='col-12'>Religion</h4>
                <h5 className="text-secondary col-12">{this.state.user.religion}</h5>
              </div>
              <div className="row">
                <h4 className='col-12'>Ethnicity</h4>
                <h5 className="text-secondary col-12">{this.state.user.ethnicity}</h5>
              </div>
              <div className="row">
                <h4 className='col-12'>I am....</h4>
                <h5 className="text-secondary col-12">{this.state.user.iAm}</h5>
              </div>
              <div className="row">
                <h4 className='col-12'>I like...</h4>
                <h5 className="text-secondary col-12">{this.state.user.iLike}</h5>
              </div>
              <div className="row">
                <h4 className='col-12'>I appreciate...</h4>
                <h5 className="text-secondary col-12">{this.state.user.iAppreciate}</h5>
              </div>
              <div className="d-flex justify-content-around">
                <div className="fas fa-heart fas-size3 likeHeart red"
                  onClick={() => this.likesClickHandler('like', this.props.info.userId)}></div>
                <div className="fas fa-heart-broken fas-size3 likeHeart"
                  onClick={() => this.likesClickHandler('dislike', this.props.info.userId)}></div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
