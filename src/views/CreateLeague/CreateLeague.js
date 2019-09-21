import React from 'react';
import moment from 'moment';
import { Button, Input, Load, Select } from '../../components';
import { withFirebase } from '../../components/Firebase';
import { toTitleCase } from '../utils/titleCase';
import history from '../../history';

const NAME = 'name';
const SPORT = 'sport';
const SEASON = 'season';
const YEAR = 'year';
const INITIAL_STATE = {
  [NAME]: '',
  [`${NAME}Error`]: '',
  [SPORT]: '',
  [`${SPORT}Error`]: '',
  [SEASON]: '',
  [`${SEASON}Error`]: '',
  [YEAR]: '',
  [`${YEAR}Error`]: '',
  loading: false
}

class CreateLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectInputChange = this.handleSelectInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.sportChoices = ['Baseball', 'Basketball'];
    this.seasonChoices = ['Winter', 'Spring', 'Summer', 'Fall'];
    this.yearChoices = [moment().year().toString(), `${moment().year()}-${(moment().year() + 1).toString().slice(-2)}`, (moment().year() + 1).toString()];
  }

  handleInputChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSelectInputChange(evt, name) {
    this.setState({ [name]: evt.target.value });
  }

  handleSelect(value, name) {
    value && this[`${name}Choices`].includes(value)
      ? this.setState({ [name]: value, [`${name}Error`]: '' })
      : this.setState({ [`${name}Error`]: 'Must select value from dropdown', [name]: '' })
  }

  async handleSubmit() {
    this.setState({ loading: true });
    const leagueId = await this.props.firebase.doCreateLeague({
      name: this.state[NAME],
      sport: this.state[SPORT],
      season: this.state[SEASON],
      year: this.state[YEAR]
    });
    history.push(`/leagues/${leagueId}`);
  }

  render() {
    return (
      <div className="form">
        <Load loading={this.state.loading} />
        <Input
          name={NAME}
          value={this.state[NAME]}
          onChange={this.handleInputChange}
          type="text"
          placeholder={`League ${NAME}`}
          label={`League ${NAME}`}
        />
        <Select
          name={SPORT}
          value={this.state[SPORT]}
          onChange={evt => this.handleSelectInputChange(evt, SPORT)}
          onSelectChoice={value => this.handleSelect(value, SPORT)}
          choices={this.sportChoices}
          placeholder={toTitleCase(SPORT)}
          label={toTitleCase(SPORT)}
          error={this.state[`${SPORT}Error`]}
        />
        <Select
          name={SEASON}
          value={this.state[SEASON]}
          onChange={evt => this.handleSelectInputChange(evt, SEASON)}
          onSelectChoice={value => this.handleSelect(value, SEASON)}
          choices={this.seasonChoices}
          placeholder={toTitleCase(SEASON)}
          label={toTitleCase(SEASON)}
          error={this.state[`${SEASON}Error`]}
        />
        <Select
          name={YEAR}
          value={this.state[YEAR]}
          onChange={evt => this.handleSelectInputChange(evt, YEAR)}
          onSelectChoice={value => this.handleSelect(value, YEAR)}
          choices={this.yearChoices}
          placeholder={toTitleCase(YEAR)}
          label={toTitleCase(YEAR)}
          error={this.state[`${YEAR}Error`]}
        />
        <Button onClick={this.handleSubmit}>Create</Button>
      </div>
    )
  }
}

export default withFirebase(CreateLeague);