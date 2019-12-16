import React from 'react';
import BottomMenu from './bottom-menu';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class IndividualMoment extends React.Component {
  render() {
    return (
      <div className="mb-3 mt-2 moment">
        <div className="d-flex align-items-center container"
          onClick={() => this.props.setView(
            'detailed-profile',
            this.props.currentUser,
            {
              userId: this.props.moment.userId,
              previousPage: this.props.currentPage
            }
          )}
        >
          <img src={this.props.moment.images} className="img-fluid micro-photo" />
          <div className="micro-font ml-3">{this.props.moment.firstName}</div>
        </div>
        <div className="micro-font2 mt-2 mb-2 container">
          {this.props.moment.message}
        </div>
        <img src={this.props.moment.picture} className="img-fluid photo-stats" />
      </div>
    );
  }
}

export default class Moments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: []
    };
  }

  componentDidMount() {
    this.getMomentsData();
  }

  shuffleMoments(array) {
    for (let index = array.length - 1; index > 0; index--) {
      const current = Math.floor(Math.random() * (index + 1));
      [array[index], array[current]] = [array[current], array[index]];
    }
    return array;
  }

  getMomentsData() {
    const gender = this.props.currentUser.gender;

    fetch(`/api/moments?gender=${gender}`)
      .then(res => res.json())
      .then(moments => {
        this.setState({ moments: this.shuffleMoments(moments) });
      }).catch(err => alert('getMomentsData error', err));
  }

  render() {
    return (
      <div>
        <div className="bg-bar d-flex justify-content-between align-items-center sticky-top">
          <i
            className="fas fa-camera fas-size p-2"
            onClick={() => this.props.setView('post', this.props.currentUser)}></i>
          <i className="fas fa-bars fas-size p-2"
            onClick={() =>
              this.props.setView(
                'menu',
                this.props.currentUser,
                this.props.currentPage)
            }
          ></i>
        </div>

        <div className="fix-overlap">
          <TransitionGroup>
            {this.state.moments.map(cur => {
              return (
                <CSSTransition
                  classNames="fade"
                  timeout={500}
                  key={cur.momentId}
                >
                  <IndividualMoment
                    key={cur.momentId}
                    moment={cur}
                    currentUser={this.props.currentUser}
                    setView={this.props.setView}
                    currentPage={this.props.currentPage}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        <BottomMenu
          currentPage={this.props.currentPage}
          currentUser={this.props.currentUser}
          setView={this.props.setView} />
      </div>
    );
  }
}
