import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class LeftMessage extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <div className="text-center message-date">
            {this.props.user.createdAt}
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src={this.props.user.images} className="message-photo" />
          <div className="d-flex">
            <i className="fas fa-angle-left message-arrow-left"></i>
            <p className="message-body-left align-self-center">
              {this.props.user.message}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class RightMessage extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <div className="text-center message-date">
            {this.props.user.createdAt}
          </div>
        </div>
        <div className="d-flex flex-row-reverse mb-2">
          <img src={this.props.user.images} className="message-photo" />
          <div className="d-flex">
            <p className="message-body-right align-self-center">
              {this.props.user.message}
            </p>
            <i className="fas fa-angle-right message-arrow-right"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default class IndividualMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
  }

  componentDidMount() {
    this.getMessages(
      this.props.userId.idFrom,
      this.props.userId.idTo
    );
  }

  sendMessage() {
    if (this.state.newMessage) {
      const messageObj = {
        idFrom: this.props.userId.idFrom,
        idTo: this.props.userId.idTo,
        message: this.state.newMessage
      };
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageObj)
      };
      fetch('/api/individual-message', req)
        .then(res => res.json())
        .then(message => {
          this.setState({
            messages: this.state.messages.concat(message),
            newMessage: ''
          });
        }).catch(err => alert('sendMessage error', err));
    }
  }

  getMessages(idFrom, idTo) {
    fetch(`/api/individual-message?idFrom=${idFrom}&idTo=${idTo}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      }).catch(err => alert('getMessages error', err));
  }

  inputOnChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const currentUserId = this.props.userId.idFrom;
    return (
      <div>
        <div className="bg-bar sticky-top">
          <i
            className="fas fa-angle-left fas-size p-2"
            onClick={() => this.props.setView('message-history', this.props.userId.currentUser)}></i>
        </div>

        <div className="container fix-overlap mt-2">
          <TransitionGroup>
            {this.state.messages.map(cur => {
              const currentMessage = cur.idFrom === currentUserId
                ? <RightMessage key={cur.createdAt} user={cur} />
                : <LeftMessage key={cur.createdAt} user={cur} />;
              return (
                <CSSTransition
                  classNames="fade"
                  timeout={500}
                  key={cur.createdAt}
                >
                  {currentMessage}
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        <div className="fixed-bottom message-box">
          <div className="container d-flex align-items-center">
            <textarea
              name="newMessage"
              value={this.state.newMessage}
              onChange={this.inputOnChangeHandler.bind(this)}
              type="text"
              className="message-input"
              rows="1"/>
            <i className="fas fa-feather fas-size p-2 text-white"
              onClick={this.sendMessage.bind(this)}></i>
          </div>
        </div>
      </div>
    );
  }
}
