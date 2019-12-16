import React from 'react';
import BottomMenu from './bottom-menu';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class IndividualMatch extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.setView('individual-message', {
        idFrom: this.props.currentUserId,
        idTo: this.props.user.userId,
        currentUser: this.props.currentUser
      })}>
        <div className="row mb-3 mt-2">
          <div className="col-3">
            <img src={this.props.user.images} className="rounded img-fluid chat-photo" />
          </div>
          <div className="col-9 d-flex align-content-center likes-bottom-line row">
            <div className="col-12">{this.props.user.firstName}</div>
            <div className="col-12 mdate2">Start conversation now...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default class MessageHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: []
    };
  }

  componentDidMount() {
    this.getMatchData();
  }

  getMatchData() {
    const currentUser = this.props.currentUser.userId;
    fetch(`/api/message-history?idFrom=${currentUser}`)
      .then(res => res.json())
      .then(match => {
        this.setState({ match });
      }).catch(err => alert('getMatchData error', err));
  }

  render() {
    return (
      <div>
        <div className="bg-bar d-flex justify-content-end sticky-top">
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
            {this.state.match.map((cur, index) => {
              return (
                <CSSTransition
                  classNames="fade"
                  timeout={500}
                  key={cur.userId}
                >
                  <IndividualMatch
                    key={cur.userId}
                    user={cur}
                    currentUserId={this.props.currentUser.userId}
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
          setView={this.props.setView} />
      </div>
    );
  }
}
