import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        userId: '',
        images: 'images/imgplaceholder.png',
        firstName: '',
        lastName: '',
        location: '',
        age: '',
        height: '',
        jobTitle: '',
        ethnicity: '',
        religion: '',
        iLike: '',
        iAm: '',
        iAppreciate: ''
      },
      imageFile: {},
      imageCheck: ''
    };
    this.inputHandler = this.inputHandler.bind(this);
  }

  updateHandler(event) {
    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.userInfo)
    };
    fetch('/api/edit', req)
      .then(res => res.json())
      .then(result => {
        this.props.setView('menu', this.props.currentUser, this.props.previousPage);
      }).catch(err => alert('updateHandler error', err));
    event.preventDefault();
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const userId = this.props.currentUser.userId;
    fetch(`/api/edit?userId=${userId}`)
      .then(res => res.json())
      .then(userInfo => {
        this.setState({ userInfo });
      }).catch(err => alert('getUserInfo error', err));
  }

  fileSelectHandler(event) {
    this.setState({
      imageFile: event.target.files[0]
    });
  }

  uploadHandler(event) {
    event.preventDefault();

    const getExtension = fileName => {
      let result = '';
      for (let index = fileName.length - 1; index > 0; index--) {
        if (fileName[index] === '.') {
          break;
        }
        result = fileName[index] + result;
      }
      return result.toLowerCase();
    };
    const fd = new FormData();
    fd.append(
      'image',
      this.state.imageFile,
      getExtension(this.state.imageFile.name)
    );

    const extensions = ['jpg', 'jpeg', 'png'];
    const imageSize = fd.get('image').size;
    const imageExt = fd.get('image').name;

    if (extensions.includes(imageExt)) {
      if (imageSize < 2097152) {
        const req = {
          method: 'POST',
          body: fd
        };
        fetch('/api/upload-image', req)
          .then(res => res.json())
          .then(result => {
            const userInfo = { ...this.state.userInfo };
            userInfo.images = result.split('/').slice(2).join('/');
            this.setState({
              userInfo,
              imageCheck: ''
            });
          }).catch(err => alert('uploaderHandler error', err));
      } else {
        this.setState({ imageCheck: 'picture should be no bigger than 2MB' });
      }
    } else {
      this.setState({ imageCheck: 'wrong picture type, only accept jpg/png/jpeg' });
    }

    event.preventDefault();
  }

  inputHandler(event) {
    const userInfo = { ...this.state.userInfo };
    userInfo[event.target.name] = event.target.value;
    this.setState({ userInfo });
  }

  render() {
    return (
      <CSSTransition
        in={true}
        appear={true}
        classNames="fade"
        timeout={500}
      >
        <div className="pb-2">
          <div
            className="bg-bar sticky-top d-flex justify-content-left align-items-center"
            onClick={() => this.props.setView(
              'menu',
              this.props.currentUser,
              this.props.previousPage
            )}
          >
            <i
              className="fas fa-angle-left fas-size p-2"
            ></i>
          </div>

          <div className="container">
            <form onSubmit={this.uploadHandler.bind(this)}>
              <div className="form-group row">
                <img src={this.state.userInfo.images} className="photo-size col-12" />
              </div>
              <div className="text-danger">{this.state.imageCheck}</div>
              <div className="form-group row d-flex justify-content-center">
                <input type="file" className="btn btn-secondary col-8" onChange={this.fileSelectHandler.bind(this)} />
                <button type="submit" name="upload" className="btn btn-primary btn-block col-3 ml-2">Upload</button>
              </div>
            </form>

            <form
              onSubmit={this.updateHandler.bind(this)}
              className="mb-3">
              <div className="form-group row">
                <div className="col-6">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" className="form-control form-rounded input" id="firstName"
                    name="firstName"
                    value={this.state.userInfo.firstName}
                    onChange={this.inputHandler}
                    placeholder="First name"
                    minLength='1'
                    required />
                  <div className="invalid-feedback">Cannot be empty!</div>
                </div>
                <div className="col-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control form-rounded input" id="lastName"
                    name="lastName"
                    value={this.state.userInfo.lastName}
                    onChange={this.inputHandler}
                    placeholder="Last name"
                    minLength='1'
                    required />
                  <div className="invalid-feedback">Cannot be empty!</div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" className="form-control form-rounded input" id="location"
                  name="location"
                  value={this.state.userInfo.location}
                  onChange={this.inputHandler}
                  placeholder="location"
                  minLength='1'
                  required />
                <div className="invalid-feedback">Cannot be empty!</div>
              </div>

              <div className="form-group row">
                <div className="col-6">
                  <label htmlFor="age">Age</label>
                  <input type="number" className="form-control form-rounded input" id="age"
                    name="age"
                    value={this.state.userInfo.age}
                    onChange={this.inputHandler}
                    placeholder="Age"
                    minLength='1'
                    maxLength='3'
                    required />
                  <div className="invalid-feedback">Cannot be empty!</div>
                </div>
                <div className="col-6">
                  <label htmlFor="height">Height</label>
                  <input type="text" className="form-control form-rounded input" id="height"
                    name="height"
                    value={this.state.userInfo.height}
                    onChange={this.inputHandler}
                    placeholder="5&apos;11&quot;"
                    minLength='1'
                    required />
                  <div className="invalid-feedback">Cannot be empty!</div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input type="text" className="form-control form-rounded input" id="jobTitle"
                  name="jobTitle"
                  value={this.state.userInfo.jobTitle}
                  onChange={this.inputHandler}
                  placeholder="Job Title"
                  minLength='1'
                  required />
                <div className="invalid-feedback">Cannot be empty!</div>
              </div>

              <div className="form-group row">
                <div className="col-6">
                  <label htmlFor="ethnicity">Ethnicity</label>
                  <select id="ethinicity" className="custom-select input"
                    name="ethnicity"
                    value={this.state.userInfo.ethnicity}
                    onChange={this.inputHandler}>
                    <option defaultValue>Choose...</option>
                    <option value="Asian">Asian</option>
                    <option value="Caucasian">Caucasian</option>
                    <option value="Latino">Latino</option>
                    <option value="Black">Black</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                  </select>
                </div>
                <div className="col-6">
                  <label htmlFor="religion">Religion</label>
                  <select id="religion" className="custom-select input"
                    name="religion"
                    value={this.state.userInfo.religion}
                    onChange={this.inputHandler}>
                    <option defaultValue>Choose...</option>
                    <option value="Christian">Christian</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Catholic">Catholic</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="iAm">I am...</label>
                <textarea rows="2" className="form-control form-rounded input" id="iAm"
                  name="iAm"
                  value={this.state.userInfo.iAm}
                  onChange={this.inputHandler}
                  placeholder="One sentence about yourself"
                  minLength='1'
                  required />
                <div className="invalid-feedback">Cannot be empty!</div>
              </div>

              <div className="form-group">
                <label htmlFor="iLike">I like...</label>
                <textarea rows="4" className="form-control form-rounded input" id="iLike"
                  name="iLike"
                  value={this.state.userInfo.iLike}
                  onChange={this.inputHandler}
                  placeholder="More description for yourself, let other users know more about you"
                  minLength='1'
                  required />
                <div className="invalid-feedback">Cannot be empty!</div>
              </div>

              <div className="form-group">
                <label htmlFor="iAppreciate">I appreciate my soulmate...</label>
                <textarea rows="4" className="form-control form-rounded input" id="iAppreciate"
                  name="iAppreciate"
                  value={this.state.userInfo.iAppreciate}
                  onChange={this.inputHandler}
                  placeholder="More description about your ideal other half, like what your soulmate should looks like"
                  minLength='1'
                  required />
                <div className="invalid-feedback">Cannot be empty!</div>
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary button">Update</button>
                <button
                  type="button"
                  className="btn btn-secondary ml-5 button"
                  onClick={() => this.props.setView(
                    'menu',
                    this.props.currentUser,
                    this.props.previousPage
                  )}>
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
