import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import axios from 'axios';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
// export REACT_APP_API_SERVICE_URL=http://localhost:5004

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      'username':'',
      'email': ''
    };
  }

  componentDidMount() {
    this.getUsers();
  };

  addUser = (event) => {
    event.preventDefault();


    const data = {
      username: this.state.username,
      email: this.state.email
    };

    axios.post(`${process.env.REACT_APP_API_SERVICE_URL}/users`, data)
      .then((res) => { 
        this.getUsers(); 
        this.setState({ username: '', email: '' }); 
       })
      .catch((err) => { console.log(err); });

  };

  handleChange = (event) => {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  getUsers =() => {
    axios.get(`${process.env.REACT_APP_API_SERVICE_URL}/users`)
      .then((res) => { this.setState({ users: res.data }); })
      .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br />
              <h1 className="title is-1">Users</h1>
              <hr /><br />
              <AddUser 
                username={this.state.username}
                email={this.state.email}
                addUser={this.addUser}
                // eslint-disable-next-line react/jsx-handler-names
                handleChange={this.handleChange} />
              <br /><br />
              <UsersList users={this.state.users} />
            </div>
          </div>
        </div>
      </section>
    )
  }
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
