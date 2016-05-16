const React = require('react');
const ReactDOM = require('react-dom');

var getWine = React.createClass({
  getInitialState: function() {
    this.displayWine();
    return {
      wine: []
    };
  },

  editWine: function(id) {
    return () => {
      var holder = this.state.wine.map(function(wine) {
        if (id === wine._id) wine.editing = true;
        return wine;
      });
      this.setState({
        wine: holder
      });
    };
  },

  removeWine: function(id) {
    return () => {
      var holder = this.state.wine.filter(function(wine) {
        if (wine._id === id) return false;
        return true;
      });
      this.setState({
        wine: holder
      });

      $.ajax({
        url: 'http://localhost:3000/api/wine/' + id,
        type: 'DELETE'
      }).then(function(data) {
        console.log(data);
      });
    };
  },

  saveWine: function(event) {
    event.preventDefault();
    var wineData = {
      name: event.target.children['wine-name'].value,
      description: event.target.children['wine-description'].value,
    };

    $.ajax({
      url: 'http//localhost:3000/api/wine/' + event.target.id,
      type: 'PUT',
      data: wineData
    }).then(function(data) {
      console.log(data);
      }, function(err) {
        console.log(err);
      });

      var holder = this.state.wine.map(function(wine) {
        if (wine._id === event.target.id) {
          wine.name = wineData.name;
          wine.description = wineData.description;
          wine.editing = false;
        }
        return wine;
      });
      this.setState({
        wine: holder
      });
    },

    displayWine: function() {
      $.ajax({
        url: 'http://localhost:3000/api/wine',
        type: 'GET'
      }).then((data) => {
        data.forEach(function(wine) {
          wine.editing = false;
        });
        this.setState({
          wine: data
        });
      });
    },

    render: function() {
      return (
        <ol>
        { this.state.wine.map((wine) => {
          return (
            <li key = { wine._id } >
              <p>Name: { wine.name }</p>
              <p>Description: { wine.description }</p>
              <p><button onClick = { this.editWine(wine._id) } > EDIT < /button>
              <button onClick = { this.removeWine(wine._id) } > DELETE < /button> </p>

            <form id = { wine._id } className = { wine.editing ? null : 'hidden' } onSubmit = { this.saveWine }>
                <input type = "text" name = "wine-name" placeholder = "Wine Name" defaultValue = { wine.name } />
                <input type = "text" name = "wine-description" placeholder = "Wine Description" defaultValue = { wine.description } />
                <button type = "submit"> SAVE WINE</button>
            </form>
              </li>
          );
        })}
        </ol>
      );
    }
  });

  var NewWine = React.createClass({
    createWine: function(event) {
      event.preventDefault();

      var wineData = {
        name: event.target.children['wine-name'].value,
        description: event.target.children['wine-description'].value,
      };

      $.post('http://localhost:3000/api/wine', wineData, function(data) {
        console.log(data);
        document.location.reload(true);
      });
    },

    render: function() {
      return (
        <form onSubmit={this.createWine}>
          <input type="text" name="wine-name" placeholder="Wine Name" />
          <input type="text" name="wine-description" placeholder="Wine Description" />
          <button type="submit">CREATE WINE</button>
        </form>
      );
    }
  });

  ReactDOM.render( < GetWine /> , document.getElementById('wine-holder'));
  ReactDOM.render( < NewWine /> , document.getElementByID('newwine'));
