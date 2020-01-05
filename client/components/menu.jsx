import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Menu extends React.Component {
  render() {
    return (
      <div className='bg-color over-flow-hidden'>
        <div className="d-flex justify-content-end">
          <i className="fas fa-times fas-size p-2"
            onClick={() =>
              this.props.setView(
                this.props.previousPage,
                this.props.currentUser
              )
            }
          ></i>
        </div>
        <div className="container">
          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-hello"
            timeout={1300}
          >
            <div
              className="d-flex justify-content-between">
              <div className="menu-hello">
                Hello {' '}
                {this.props.currentUser.firstName}
              </div>
              <img
                src={this.props.currentUser.images}
                className="menu-photo"
              />
            </div>
          </CSSTransition>
        </div>

        <div className="container">
          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-moments"
            timeout={1300}
          >
            <div
              className="menu-text pointer"
              onClick={() => this.props.setView(
                'moments',
                this.props.currentUser
              )}
            >
              <i className="fas fa-camera-retro mr-3"></i>
              Moments
            </div>
          </CSSTransition>

          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-likes"
            timeout={1300}
          >
            <div
              className="menu-text pointer"
              onClick={() => this.props.setView(
                'like-page',
                this.props.currentUser
              )}
            >
              <i className="fas fa-heart mr-3"></i>
              Likes
            </div>
          </CSSTransition>

          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-discover"
            timeout={1300}
          >
            <div
              className="menu-text pointer"
              onClick={() => this.props.setView(
                'discover-page',
                this.props.currentUser
              )}
            >
              <i className="fas fa-search mr-3"></i>
              Discover
            </div>
          </CSSTransition>

          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-chats"
            timeout={1300}
          >
            <div
              className="menu-text pointer"
              onClick={() => this.props.setView(
                'message-history',
                this.props.currentUser
              )}
            >
              <i className="fas fa-comments mr-3"></i>
              Chats
            </div>
          </CSSTransition>

          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-edit"
            timeout={1300}
          >
            <div className="menu-text pointer"
              onClick={() => this.props.setView(
                'edit',
                this.props.currentUser,
                this.props.previousPage
              )}
            >
              <i className="fas fa-edit mr-3"></i>
              Edit
            </div>
          </CSSTransition>

          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-password"
            timeout={1300}
          >
            <div className="menu-text pointer"
              onClick={() =>
                this.props.setView(
                  'change-password',
                  this.props.currentUser,
                  this.props.previousPage
                )
              }
            >
              <i className="fas fa-key mr-3"></i>
              Change password
            </div>
          </CSSTransition>

          <CSSTransition
            in={true}
            appear={true}
            classNames="menu-fade-logout"
            timeout={1300}
          >
            <div className="menu-text pointer"
              onClick={() =>
                this.props.setView(
                  'main',
                  {},
                  {}
                )
              }
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Logout
            </div>
          </CSSTransition>
        </div>
        <CSSTransition
          in={true}
          appear={true}
          classNames="menu-bg-one"
          timeout={1300}
        >
          <div className="menu-bg-one"></div>
        </CSSTransition>
        <CSSTransition
          in={true}
          appear={true}
          classNames="menu-bg-two"
          timeout={1300}
        >
          <div className="menu-bg-two"></div>
        </CSSTransition>
      </div>
    );
  }
}
