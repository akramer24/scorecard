import React from 'react';
import { connect } from 'react-redux';
import withLeague from '../hocs/withLeague';
import { withFirebase } from '../../components/Firebase';
import { Button, Checkbox, Input } from '../../components';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isCreatorOnTeam: false,
      isNameSet: false,
      players: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePlayerInputChange = this.handlePlayerInputChange.bind(this);
    this.renderPlayerInputs = this.renderPlayerInputs.bind(this);
  }

  handleInputChange(evt) {
    this.setState({
      [evt.target.name]:
        evt.target.name === 'isCreatorOnTeam'
          ? evt.target.checked
          : evt.target.value
    });
  }

  handlePlayerInputChange(evt) {
    const target = evt.target;
    this.setState(state => {
      const players = state.players;
      const [name, index] = target.name.split('-');
      if (players[+index]) {
        name === 'playerName' ? players[+index].displayName = target.value : players[+index].email = target.value;
      } else {
        name === 'playerName' ? players[+index] = { displayName: target.value } : players[+index] = { email: target.value };
      }
      return players;
    })
  }

  renderPlayerInputs() {
    const inputs = [];
    for (let i = 0; i <= this.state.players.length; i++) {
      inputs.push(
        <React.Fragment key={`player-${i}`}>
          <Input
            name={`playerName-${i}`}
            onChange={this.handlePlayerInputChange}
            type="text"
            placeholder={`Player ${i + 1} name`}
            label={`Player ${i + 1} name`}
          />
          <Input
            name={`playerEmail-${i}`}
            onChange={this.handlePlayerInputChange}
            type="text"
            placeholder={`Player ${i + 1} Email`}
            label={`Player ${i + 1} Email`}
          />
        </React.Fragment>
      )
    }

    return inputs;
  }

  render() {
    const { firebase, league } = this.props;
    const { isCreatorOnTeam, isNameSet, name, players } = this.state;

    return league
      ? (
        <form className="create-team">
          <div>{isNameSet ? name : `New ${league.name} team`}</div>
          {
            !isNameSet
              ? (
                <React.Fragment>
                  <Input
                    name='name'
                    value={name}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Name"
                    label="Name"
                  />
                  <Button
                    type="submit"
                    disabled={!name.length}
                    onClick={() => this.setState({ isNameSet: true })}
                  >
                    Add players
                  </Button>
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <Checkbox
                    name="isCreatorOnTeam"
                    label="I'm a player on this team"
                    labelPosition="left"
                    onChange={this.handleInputChange}
                  />
                  {this.renderPlayerInputs()}
                  <div className="create-team-button-footer">
                    <Button onClick={() => this.setState({ isNameSet: false })}>Back</Button>
                    <Button appearance="primary" onClick={() => firebase.doCreateTeam(name, players, league, isCreatorOnTeam, window.location.origin)}>Create team</Button>
                  </div>
                </React.Fragment>
              )
          }
        </form>
      )
      : null
  }
}

const mapState = state => ({
  leagues: state.leagues,
  user: state.auth.user
})

export default connect(mapState, null)(withFirebase(withLeague(CreateTeam)));