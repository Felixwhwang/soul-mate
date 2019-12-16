import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      matchPassword: '',
      errorMessage: ''
    };
  }

  checkMatchPassword(newPassword, matchPassword) {
    return newPassword === matchPassword;
  }

  updatePassword() {
    event.preventDefault();
    const check = this.checkMatchPassword(
      this.state.newPassword,
      this.state.matchPassword
    );

    if (!check) {
      this.setState({ errorMessage: 'password doesn\'t match' });
      return;
    }

    const password = {
      userId: this.props.currentUser.userId,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(password)
    };
    fetch('/api/change-password', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'wrong password') {
          this.setState({ errorMessage: 'wrong password' });
        } else {
          this.props.setView(
            'menu',
            this.props.currentUser,
            this.props.previousPage
          );
        }
      }).catch(err => alert('createHandler error', err));
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <CSSTransition
        in={true}
        appear={true}
        classNames="fade"
        timeout={500}
      >
        <div className="container bg-bar">
          <div className="d-flex justify-content-center row align-content-center full-view-height">
            <h1 className="title col-12">Soul Mate</h1>
            <div className="mt-3 slogan">Soulmate is an overused term,</div>
            <div className="mb-5 slogan">but a true soul connection is very rare, and very real.</div>
            <form
              className="col-10"
              onSubmit={this.updatePassword.bind(this)}
            >
              <div className="form-group mt-4">
                <input
                  type="password"
                  className="simple-box col-12"
                  placeholder="old password"
                  minLength='4'
                  name='oldPassword'
                  value={this.state.oldPassword}
                  onChange={this.onChangeHandler.bind(this)}
                  required />
                <div className="invalid-feedback">At least 4 characters!</div>
              </div>
              <div className="form-group mt-4">
                <input
                  type="password"
                  className="simple-box col-12"
                  placeholder="new password"
                  minLength='4'
                  name='newPassword'
                  value={this.state.newPassword}
                  onChange={this.onChangeHandler.bind(this)}
                  required />
                <div className="invalid-feedback">At least 4 characters!</div>
              </div>
              <div className="form-group mt-4">
                <input
                  type="password"
                  className="simple-box col-12"
                  placeholder="repeat password"
                  minLength='4'
                  name='matchPassword'
                  value={this.state.matchPassword}
                  onChange={this.onChangeHandler.bind(this)}
                  required />
                <div className="invalid-feedback">At least 4 characters!</div>
                <div className="text-danger">
                  {this.state.errorMessage}
                </div>
              </div>

              <div className="row mt-4 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary col-5.5 btn-shadow button">Save</button>
                <button
                  type="button"
                  className="btn btn-dark col-5.5 ml-4 btn-shadow button"
                  onClick={() => this.props.setView(
                    'menu',
                    this.props.currentUser,
                    this.props.previousPage
                  )}
                >Back</button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
