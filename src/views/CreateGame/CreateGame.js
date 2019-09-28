import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';

import withLeague from '../hocs/withLeague';
import { withFirebase } from '../../components/Firebase';
import { Button, Load, Input, Select } from '../../components';

class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      away: '',
      home: '',
      date: new Date(),
      location: ''
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  handleSelect(value, homeOrAway) {
    this.setState({ [homeOrAway]: value });
  }

  handleInputChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt) {
    const { away, home, date, location } = this.state;
    const { league } = this.props;
    evt.preventDefault();
    evt.stopPropagation();
    const momentizedDate = moment.tz(date, league.timezone).format('MM/DD/YYYY');
    const momentizedTime = moment.tz(date, league.timezone).format('H:mm');
    this.props.firebase.doCreateGame({ away, home, date: momentizedDate, time: momentizedTime, location, leagueId: this.props.league.id });
  }

  render() {
    const { away, date, home, location } = this.state;
    const { league, loading, teams } = this.props;
    const awayTeamChoices = league && league.teams.filter(teamId => teams[teamId].name !== home.label).map(teamId => ({ label: teams[teamId].name, value: teamId }));
    const homeTeamChoices = league && league.teams.filter(teamId => teams[teamId].name !== away.label).map(teamId => ({ label: teams[teamId].name, value: teamId }));

    return league
      ? (
        <form className="form">
          <div className="header medium-header">Add {league.name} game</div>
          <DatePicker
            selected={date}
            onSelect={this.handleDateChange}
            onChange={this.handleDateChange}
            showTimeSelect
            timeIntervals={15}
            timeCaption="time"
            dateFormat="Ppa"
            placeholderText="Select date"
            customInput={<Input label="Select date" />}
            popperPlacement="top-middle"
          />
          <Select
            name="away"
            value={away}
            onChange={this.handleInputChange}
            onSelectChoice={value => this.handleSelect(value, 'away')}
            choices={awayTeamChoices}
            placeholder="Away"
            label="Away"
            labelOnly
          />
          <Select
            name="home"
            value={home}
            onChange={this.handleInputChange}
            onSelectChoice={value => this.handleSelect(value, 'home')}
            choices={homeTeamChoices}
            placeholder="Home"
            label="Home"
            labelOnly
          />
          <Input
            name="location"
            value={location}
            onChange={this.handleInputChange}
            placeholder="Location"
            label="Location"
          />
          <Button appearance="primary" type="submit" onClick={this.handleSubmit}>Add game</Button>
        </form>
      )
      : <Load loading={loading} />
  }
}

const mapState = state => ({
  leagues: state.leagues,
  teams: state.teams
})

export default connect(mapState, null)(withFirebase(withLeague(CreateGame)));