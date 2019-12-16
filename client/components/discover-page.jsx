import React from 'react';
import BottomMenu from './bottom-menu';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class DiscoverPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filter: null
    };
    this.cardWasClicked = this.cardWasClicked.bind(this);
    this.filterWasClicked = this.filterWasClicked.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  getFilter() {
    fetch(`/api/filter?userId=${this.props.currentUser.userId}`)
      .then(res => res.json())
      .then(filterInfo => {
        if (filterInfo !== null) {
          this.setState({
            filter: filterInfo
          }, () => this.getUsers());
        } else {
          this.getUsers();
        }
      });
  }

  getUsers() {
    const user = this.props.currentUser;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch('/api/discover-page', req)
      .then(res => res.json())
      .then(users => {
        if (this.state.filter === null) {
          this.setState({
            users: users
          });
        } else {
          const filteredArray = [];
          users.map(user => {
            if (this.state.filter !== {}) {
              if (this.filterUsers(user)) {
                filteredArray.push(this.filterUsers(user));
                this.setState({
                  users: filteredArray
                });
              }
            }
            this.setState({
              users: filteredArray
            });
          });
        }
      });
  }

  filterUsers(user) {

    const locationArray = user.location.split(',');
    const userCity = locationArray[0];

    const newUserStateArray = locationArray[1].split('');
    newUserStateArray.shift();
    const userState = newUserStateArray.join('');

    const newUserHeightArray = user.height.split('');
    const userHeightFeet = newUserHeightArray[0];
    let userHeightInch = null;

    if (newUserHeightArray.length === 5) {
      userHeightInch = newUserHeightArray[2] + newUserHeightArray[3];
    } else {
      userHeightInch = newUserHeightArray[2];
    }

    if (this.state.filter.heightMinFeet && this.state.filter.heightMinInch === '') {
      this.setState(prevState => ({
        filter: {
          ...prevState.filter,
          heightMinInch: 0
        }
      }));
    }

    if (this.state.filter.heightMaxFeet && this.state.filter.heightMaxInch === '') {
      this.setState(prevState => ({
        filter: {
          ...prevState.filter,
          heightMaxInch: 0
        }
      }));
    }

    if (this.state.filter.heightMinInch && this.state.filter.heightMinFeet === '') {
      this.setState(prevState => ({
        filter: {
          ...prevState.filter,
          heightMinFeet: 4
        }
      }));
    }

    if (this.state.filter.heightMaxInch && this.state.filter.heightMaxFeet === '') {
      this.setState(prevState => ({
        filter: {
          ...prevState.filter,
          heightMaxFeet: 7
        }
      }));
    }

    if (this.state.filter.city !== '' && this.state.filter.city !== userCity) {
      return false;
    }

    if (this.state.filter.state !== userState && this.state.filter.state !== '') {
      return false;
    }

    if (user.age < this.state.filter.ageMin && this.state.filter.ageMin !== 17) {
      return false;
    }

    if (user.age > this.state.filter.ageMax && this.state.filter.ageMax !== 51) {
      return false;
    }

    if (this.state.filter.heightMaxFeet !== '' && this.state.filter.heightMaxFeet < userHeightFeet) {
      return false;
    } else if (this.state.filter.heightMaxInch !== '' && this.state.filter.heightMaxInch < userHeightInch &&
                this.state.filter.heightMaxFeet === userHeightFeet) {
      return false;
    }

    if (this.state.filter.heightMinFeet > userHeightFeet && this.state.filter.heightMinFeet !== '') {
      return false;
    } else if (this.state.filter.heightMinFeet === userHeightFeet && this.state.filter.heightMinInch !== '' &&
                this.state.filter.heightMinInch > userHeightInch) {
      return false;
    }

    if (user.ethnicity !== this.state.filter.ethnicity && this.state.filter.ethnicity !== '') {
      return false;
    }

    if (user.religion !== this.state.filter.religion && this.state.filter.religion !== '') {
      return false;
    }
    return user;
  }

  cardWasClicked(userIdtoRemove) {
    const newArray = [];
    this.state.users.forEach(user => {
      if (user.userId !== userIdtoRemove) {
        newArray.push(user);
      }
    });
    this.setState({
      users: newArray
    });
  }

  filterWasClicked() {
    this.props.setView('filter', this.props.currentUser);
  }

  profileWasClicked() {
    this.props.setView('profile');
  }

  componentDidMount() {
    this.getFilter();
  }

  render() {
    return (
      <div>
        <div className="bg-bar sticky-top d-flex justify-content-between align-items-center">
          <i className="fas fa-sliders-h fas-size p-2"
            onClick={this.filterWasClicked}
          ></i>
          <i className="fas fa-bars fas-size p-2"
            onClick={() =>
              this.props.setView(
                'menu',
                this.props.currentUser,
                this.props.currentPage
              )}
          ></i>
        </div>

        <div className='container fix-overlap'>
          <TransitionGroup>
            {this.state.users.map(user => {
              return (
                <CSSTransition
                  classNames="fade"
                  timeout={500}
                  key={user.userId}
                >
                  <DiscoverDetail
                    key={user.userId}
                    users={user}
                    currentUser={this.props.currentUser}
                    cardWasClicked={this.cardWasClicked}
                    currentPage={this.props.currentPage}
                    setView={this.props.setView}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        <BottomMenu
          currentPage={this.props.currentPage}
          currentUser={this.props.currentUser}
          setView={this.props.setView}
        />
      </div>
    );
  }
}

class DiscoverDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      fade: false,
      darkfade: false
    };
    this.likeClicked = this.likeClicked.bind(this);
    this.dislikeClicked = this.dislikeClicked.bind(this);
  }

  likeClicked() {
    this.setState({ fade: true });
    const likeData = {
      idFrom: this.props.currentUser.userId,
      idTo: this.props.users.userId,
      isLike: true
    };
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(likeData)
    };
    fetch('/api/likes', req)
      .then(res => res.json());
    setTimeout(() => { this.props.cardWasClicked(this.props.users.userId); }, 1500);
  }

  dislikeClicked() {
    this.setState({ darkfade: true });
    const dislikeData = {
      idFrom: this.props.currentUser.userId,
      idTo: this.props.users.userId,
      isLike: 0
    };
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dislikeData)
    };
    fetch('/api/likes', req)
      .then(res => res.json());
    setTimeout(() => { this.props.cardWasClicked(this.props.users.userId); }, 1500);
  }

  render() {
    const fade = this.state.fade;
    const darkfade = this.state.darkfade;
    return (
      <div>
        <div className={darkfade ? 'darkfade card text-center card-padding card-box-shadow' : 'card text-center card-padding card-box-shadow'}>
          <img src={this.props.users.images} className='card-img-top card-image-discover'
            onClick={() => this.props.setView(
              'detailed-profile',
              this.props.currentUser,
              {
                userId: this.props.users.userId,
                previousPage: this.props.currentPage
              }
            )}
          ></img>
          <div className='card-body'>
            <img rel='/images/bouqet-menu.jpg'></img>

            <img src='/images/SwirlsLeft.png' className='swirl-left-image'></img>
            <img src='/images/SwirlsRight.png' className='swirl-right-image'></img>
            <h2 className='card-font'>{this.props.users.firstName}{', '}{this.props.users.age}</h2>
            <div className='justify-content-around'>
              <i onClick={this.likeClicked}
                className={fade ? 'fade heartSizing fas likeHeart fa-heart red' : 'fas fa-heart fas-size3 likeHeart red'}>
              </i>
              <i onClick={this.dislikeClicked}
                className={fade ? 'fas fas-size3 fa-heart-broken displayNone' : 'fas fa-heart-broken fas-size3 dislikeHeart'}>
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverPage;
