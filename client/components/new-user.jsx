import React from 'react';

export default class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        email: '',
        password: '',
        images: 'images/imgplaceholder.png',
        firstName: '',
        lastName: '',
        gender: '',
        city: '',
        state: '',
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
      emailCheck: '',
      imageCheck: 'please upload your picture'
    };
    this.inputHandler = this.inputHandler.bind(this);
  }

  createHandler() {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.newUser)
    };
    fetch('/api/new-user', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'email has already exist') {
          this.setState({ emailCheck: 'The email has already existed' });
        } else {
          this.props.setView('discover-page', result);
        }
      }).catch(err => alert('createHandler error', err));
  }

  fileSelectHandler(event) {
    this.setState({
      imageFile: event.target.files[0]
    });
  }

  uploadHandler(event) {
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
            const newUser = { ...this.state.newUser };
            newUser.images = result.split('/').slice(2).join('/');
            this.setState({
              newUser,
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
    const newUser = { ...this.state.newUser };
    newUser[event.target.name] = event.target.value;
    this.setState({ newUser });
  }

  backHandler() {
    this.props.setView('main', {});
  }

  render() {
    return (
      <div className="container pb-2">
        <div className="bg-bar sticky-top d-flex justify-content-left align-items-center">
          <i
            className="fas fa-angle-left fas-size p-2"
            onClick={this.backHandler.bind(this)}></i>
        </div>

        <form onSubmit={this.uploadHandler.bind(this)}>
          <div className="form-group row">
            <img src={this.state.newUser.images} className="photo-size col-12" />
          </div>
          <div className="text-danger">
            {this.state.imageCheck}
          </div>
          <div className="form-group row d-flex justify-content-center">
            <input type="file" className="btn btn-secondary col-8" onChange={this.fileSelectHandler.bind(this)}/>
            <button type="submit" name="upload" className="btn btn-primary btn-block col-3 ml-2">Upload</button>
          </div>
        </form>

        <form onSubmit={this.createHandler.bind(this)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control form-rounded input" id="email"
              name="email"
              value={this.state.newUser.email}
              onChange={this.inputHandler}
              placeholder="email"
              minLength='1'
              required/>
            <div className="text-danger">{this.state.emailCheck}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control form-rounded input" id="password"
              name="password"
              value={this.state.newUser.password}
              onChange={this.inputHandler}
              placeholder="password"
              minLength='4'
              required />
            <div className="invalid-feedback">At least 4 characters!</div>
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control form-rounded input" id="firstName"
                name="firstName"
                value={this.state.newUser.firstName}
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
                value={this.state.newUser.lastName}
                onChange={this.inputHandler}
                placeholder="Last name"
                minLength='1'
                required />
              <div className="invalid-feedback">Cannot be empty!</div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio"
                name="gender"
                value="Male"
                onChange={this.inputHandler} />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio"
                name="gender"
                value="Female"
                onChange={this.inputHandler} />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-8">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control form-rounded input" id="city"
                name="city"
                value={this.state.newUser.city}
                onChange={this.inputHandler}
                placeholder="City"
                minLength='1'
                required />
              <div className="invalid-feedback">Cannot be empty!</div>
            </div>
            <div className="col-4">
              <label htmlFor="state">State</label>
              <input type="text" className="form-control form-rounded input" id="state"
                name="state"
                value={this.state.newUser.state}
                onChange={this.inputHandler}
                placeholder="CA"
                minLength='2'
                maxLength='2'
                required />
              <div className="invalid-feedback">Cannot be empty!</div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="age">Age</label>
              <input type="number" className="form-control form-rounded input" id="age"
                name="age"
                value={this.state.newUser.age}
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
                value={this.state.newUser.height}
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
              value={this.state.newUser.jobTitle}
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
                value={this.state.newUser.ethnicity}
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
                value={this.state.newUser.religion}
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
              value={this.state.newUser.iAm}
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
              value={this.state.newUser.iLike}
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
              value={this.state.newUser.iAppreciate}
              onChange={this.inputHandler}
              placeholder="More description about your ideal other half, like what your soulmate should looks like"
              minLength='1'
              required />
            <div className="invalid-feedback">Cannot be empty!</div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary button">Create</button>
            <button
              type="button"
              className="btn btn-secondary ml-5 button"
              onClick={this.backHandler.bind(this)}>Back</button>
          </div>
        </form>
      </div>
    );
  }
}
