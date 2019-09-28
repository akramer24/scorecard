import React from 'react';
import PropTypes from 'prop-types';
import {
  FaAngleDown
} from 'react-icons/fa';
import uniqid from 'uniqid';
import classNames from 'classnames';
import withForm from '../hocs/withForm';
import { Input } from '../Input/Input';
import Dropdown from './Dropdown';

class Select extends React.Component {
  static defaultProps = {
    choices: [],
    placeholder: 'Select',
    searchable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeChoiceIndex: 0,
      filteredChoices: props.choices,
      isDropdownVisible: false,
    };

    this.id = uniqid();
    this.dropdownId = `ari-ui-dropdown-${uniqid()}`;
    const div = document.createElement('div');
    div.id = this.dropdownId;
    document.querySelector('body').appendChild(div);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleHoverChoice = this.handleHoverChoice.bind(this);
    this.handleSelectChoice = this.handleSelectChoice.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleCaretClick = this.handleCaretClick.bind(this);

    this.inputRef = React.createRef();
    this.choiceHeight = 24;
    this.maxToShow = 10;
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.value.length) {
      return {
        filteredChoices: props.choices
      }
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    const modalDiv = document.getElementById(this.dropdownId);
    modalDiv.remove();
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(evt) {
    if (this.state.isDropdownVisible && !evt.path.includes(document.getElementById(this.id))) {
      this.setState({ isDropdownVisible: false }, () => this.inputRef.current.blur());
    }
  }

  handleFocus() {
    !this.props.searchable && this.inputRef.current.blur();
    this.setState({ isDropdownVisible: true, activeChoiceIndex: 0 });
  }

  handleHoverChoice(idx) {
    this.setState({ activeChoiceIndex: idx });
  }

  handleSelectChoice() {
    const { activeChoiceIndex, filteredChoices } = this.state;
    const value = filteredChoices[activeChoiceIndex];
    this.props.onSelectChoice && this.props.onSelectChoice(value)
    this.setState({
      isDropdownVisible: false
    }, () => this.inputRef.current.blur());
  }

  handleInputChange(evt) {
    const value = evt.target.value;
    const newState = { value, activeChoiceIndex: 0 };
    if (this.props.searchable) {
      newState.filteredChoices =
        value.length <= this.props.value.length
          ? Select.filterChoices(this.props.choices, value)
          : Select.filterChoices(this.state.filteredChoices, value);
      const dropdown = document.querySelector(`#${this.dropdownId} .ari-ui-dropdown`);
      dropdown.scrollTop = 0;
    }
    this.setState(newState);
    this.props.onChange && this.props.onChange(evt);
  }

  handleInputKeyDown(evt) {
    const { activeChoiceIndex, filteredChoices } = this.state;
    if (evt.keyCode === 40) {
      // Down arrow
      evt.preventDefault();
      evt.stopPropagation();
      if (activeChoiceIndex !== filteredChoices.length - 1) {
        const dropdown = document.querySelector(`#${this.dropdownId} .ari-ui-dropdown`);
        this.setState(
          state => ({ activeChoiceIndex: state.activeChoiceIndex + 1 }),
          () => {
            if (this.state.activeChoiceIndex >= this.maxToShow) {
              dropdown.scrollTop += this.choiceHeight;
            }
          }
        );
      }
    } else if (evt.keyCode === 38) {
      // Up arrow
      evt.preventDefault();
      evt.stopPropagation();
      if (activeChoiceIndex !== 0) {
        const dropdown = document.querySelector(`#${this.dropdownId} .ari-ui-dropdown`);
        this.setState(
          state => ({ activeChoiceIndex: state.activeChoiceIndex - 1 }),
          () => {
            if (this.state.activeChoiceIndex >= this.maxToShow - 1) {
              dropdown.scrollTop -= this.choiceHeight;
            }
          }
        );
      }
    } else if (evt.keyCode === 13) {
      // Enter
      this.handleSelectChoice();
    } else if (evt.keyCode === 9 || evt.keyCode === 27) {
      // Tab/Esc
      this.setState({ isDropdownVisible: false }, () => this.inputRef.current.blur());
    }
  }

  handleCaretClick() {
    this.setState(
      state => ({ isDropdownVisible: !state.isDropdownVisible, activeChoiceIndex: 0 }),
      () => {
        this.state.isDropdownVisible ? this.inputRef.current.focus() : this.inputRef.current.blur();
      }
    );
  }

  static filterChoices(choices, value) {
    return choices.filter(c => Select.getChoice(c).toLowerCase().includes(value.toLowerCase()));
  }

  static getChoice(choice, labelOnly) {
    if (typeof choice === 'object') {
      return labelOnly ? choice.label : choice.value;
    }
    return choice;
  }

  render() {
    const { activeChoiceIndex, filteredChoices, isDropdownVisible } = this.state;
    const { labelOnly, placeholder, searchable, value } = this.props;

    return (
      <div id={this.id} className="ari-ui-select-container">
        <Input
          className={classNames(
            'ari-ui-dropdown-parent',
            {
              'ari-ui-non-searchable-select-input': !searchable
            }
          )}
          onChange={this.handleInputChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleInputKeyDown}
          placeholder={placeholder}
          ref={this.inputRef}
          suffix={<FaAngleDown
            className={
              classNames(
                'ari-ui-select-caret',
                {
                  'ari-ui-select-caret-open': isDropdownVisible,
                  'ari-ui-select-caret-closed': !isDropdownVisible
                }
              )
            }
            onClick={this.handleCaretClick}
          />}
          value={Select.getChoice(value, labelOnly)}
        />
        {
          isDropdownVisible
            ? (
              <Dropdown
                activeChoiceIndex={activeChoiceIndex}
                choices={filteredChoices}
                getChoice={Select.getChoice}
                handleHoverChoice={this.handleHoverChoice}
                handleSelectChoice={this.handleSelectChoice}
                id={this.dropdownId}
                labelOnly={labelOnly}
                parentId={this.id}
              />
            )
            : null
        }
      </div>
    )
  }
}

Select.propTypes = {
  /**
   * Choices that populate dropdown.
   */
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  ),
  /**
   * Placeholder text.
   */
  placeholder: PropTypes.string,
  /**
   * Callback triggered on selecting a choice.
   * 
   * @param value str Selected value
   */
  onSelectChoice: PropTypes.func,
  /**
   * If true, typing into input will filter choices.
   */
  searchable: PropTypes.bool,
  /**
   * Value of Select.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default withForm(Select);