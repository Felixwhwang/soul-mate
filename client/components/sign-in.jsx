import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordCheck: ''
    };
  }

  getUserInfo() {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch('/api/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'no user exist') {
          this.setState({ passwordCheck: 'wrong password or email' });
        } else if (result === 'wrong password') {
          this.setState({
            passwordCheck: 'wrong password or email'
          });
        } else {
          this.props.setView('discover-page', result);
        }
      }).catch(err => alert('getUserInfo Error', err));
  }

  backHandler() {
    this.props.setView('main', {});
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="container bg-bar">
        <div className="d-flex justify-content-center row align-content-center full-view-height add-bot-margin">
          <img src='/images/flower5-menu1.png' className='sign-in-background1'></img>
          <img src='/images/flower5-menu2.png' className='sign-in-background2'></img>
          <h1 className="title col-12">Soul Mate</h1>
          <div className="mt-2 slogan">Soulmate is an overused term,</div>
          <div className="mb-5 slogan">but a true soul connection is very rare, and very real.</div>
          <form onSubmit={this.getUserInfo.bind(this)} className="col-10">
            <div className="form-group">
              <input
                name="email"
                value={this.state.email}
                onChange={this.onChangeHandler.bind(this)}
                type="email"
                className="simple-box col-12"
                id="email"
                placeholder="email"
                minLength="3"
                required />
              <div className="invalid-feedback">Cannot be empty!</div>
            </div>
            <div className="form-group mt-4">
              <input
                name="password"
                value={this.state.password}
                onChange={this.onChangeHandler.bind(this)}
                type="password"
                className="simple-box col-12"
                id="password"
                placeholder="password"
                minLength='4'
                required />
              <div className="invalid-feedback">At least 4 characters!</div>
              <div className="text-danger">{this.state.passwordCheck}</div>
            </div>

            <div className="row mt-4 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary col-5.5 btn-shadow button">Sign in </button>
              <button type="button" className="btn btn-dark col-5.5 ml-4 btn-shadow button"
                onClick={this.backHandler.bind(this)}>Back</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
