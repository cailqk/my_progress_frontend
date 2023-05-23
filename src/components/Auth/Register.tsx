const Register = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <form>
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="******"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender-input">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Date of birth</label>
            <div className="input-group date" id="datetimepicker2">
              <input type="date" className="form-control" />
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="nameInput">Height</label>
            <input
              type="number"
              className="form-control"
              min="100"
              max="230"
              placeholder="Enter height"
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div>
            <a>Already have an account ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
