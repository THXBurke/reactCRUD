const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const superagent = require('superagent');

var List = React.createClass({
  handleDeleteClick: function(e) {
    e.preventDefault();
    this.handleWineDelete();
  },
  handleWineDelete: function() {
    console.log(this.wines._id);
    superagent
    .delete('http://localhost:5000/api/wine' + this.wines._id)
    .end((err) => {
      console.log(err);
      this.wines.loadWinesFromServer();
    }
  );
  },
  render: function() {
    return (
    <li>
    (id: { this.wines._id }) name: { this.wines.name } description: { this.wines.description }
    <button onClick={ this.handleWineDelete } type="submit">Drink the wine</button>
    </li>
  );
  }
});

var App = React.createClass({
  getInitialStat: function() {
    return {
      wines: []
    };
  },
  componentDidMount: function() {
    this.loadWinesFromServer();
  },

  loadWinesFromServer: function() {
    $.ajax({
      url: 'http://localhost:5000/api/wine',
      type: 'GET',
      success: function(wines) {
        this.setState({ wines: wines });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(status, err.toString());
      }
    });
  },
  handleWineSubmit: function(pets) {
    console.log(wines);
    superagent
    .post('http://localhost:5000/api/wine')
    .send(wines)
    .end((err) => {
      console.log(err);
      this.loadWinesFromServer();
    }
  );
  },
  render: function() {
    return (
    <section>
    <ul>
    { this.state.wines.map((wine) => {
      return (
        <List _id= {wine._id} name={wine.name} description={wine.description}
        loadWinesFromServer = {this.loadWinesFromServer}
        >
        </List>
      );
    })}
    </ul>
    <h2>
    Create wine
    </h2>
    <CreateNewWine onWineSubmit={ this.handleWineSubmit } />
    </section>
  );
  }
});

var CreateNewWine = React.createClass({
  getInitialState: function() {
    return ({ name: '', description: '' });
  },
  nameInput: function(e) {
    this.setState({ name: e.target.value });
  },
  descriptionInput: function(e) {
    this.setState({ description: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var description = this.state.description.trim();
    if (!name || !description) {
      return;
    }
    this.props.onWineSubmit({ name: name, description: description });
    this.setState({ name: '', description: '' });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label for="name">Name</label>
      <input type="text" name="name" value={this.state.name} onChange={this.nameInput}/>
      <label name="description" >description</label>
      <input type="text" name="description" value={this.state.description} onChange={this.descriptionInput}/>
      <button type="submit">Create a Wine</button>
      </form>
    );
  }
});

ReactDom.render(<App></App>, document.getElementById('app'));
