import "..//login.css";

function Login(props){

return (
      <div className="naslovna_strana">
        <div className="form-div">
          <div>
            <h1 className="naslov">Chat app ZB</h1>
            <form className="form" onSubmit={props.onByChangeUser}>
              <div className="form-control">
                <div>
                  <label htmlFor="name">Ime korisnika:</label>
                </div>
                <input
                  className="input"
                  type="text"
                  minLength="4"
                  maxLength="20"
                  autoFocus={true}
                  onChange={props.onChangeUser}/>
              </div>
              <div className="form-control">
                <button type="submit" className="button">Prijavi se!</button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
  );
}

export default Login;
  