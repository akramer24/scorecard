import React from 'react';
import { connect } from 'react-redux';
import withLeague from '../hocs/withLeague';
import { withFirebase } from '../../components/Firebase';
import { Button, Input } from '../../components';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const { league } = this.props;
    const { name } = this.state;

    return league
      ? (
        <div className="create-team">
          <div>New {league.name} team</div>
          <Input
            name='name'
            value={name}
            onChange={this.handleInputChange}
            type="text"
            placeholder="Name"
            label="Name"
          />
          <Button onClick={() => this.props.firebase.sendMail({ to: 'daniellakatowitz@gmail.com', subject: 'heyyy', body: '<div>This is Ari! Sending an email from my app!</div>' })}>Send mail</Button>
        </div>
      )
      : null
  }
}

const mapState = state => ({
  leagues: state.leagues
})

export default connect(mapState, null)(withFirebase(withLeague(CreateTeam)));