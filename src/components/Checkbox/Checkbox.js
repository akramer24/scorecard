import React from 'react';
import classNames from 'classnames';
import { omitBy, isUndefined } from 'lodash';
import PropTypes from 'prop-types';
import withForm from '../hocs/withForm';

const Checkbox = ({
  autoFocus,
  checked,
  className,
  disabled,
  id,
  name,
  onChange,
  required,
}) => {
  const passthroughToCheckbox = omitBy({
    autoFocus,
    checked,
    disabled,
    id,
    name,
    onChange,
    required
  }, isUndefined);

  return (
    <input
      className={classNames('ari-ui-checkbox', { [className]: className })}
      type="checkbox"
      {...passthroughToCheckbox}
    />
  )
}

Checkbox.defaultProps = {
  /**
   * Determines whether or not Checkbox has focus on mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Determines whether or not Checkbox is checked.
   */
  checked: PropTypes.bool,
  /**
   * CSS class(es) applied to Checkbox.
   */
  className: PropTypes.string,
  /**
   * Determines whether or not Checkbox is disabled
   */
  disabled: PropTypes.bool,
  /**
   * CSS id applied to Checkbox.
   */
  id: PropTypes.string,
  /**
   * Name of Checkbox.
   */
  name: PropTypes.string,
  /**
   * Callback griggered on check/uncheck.
   */
  onChange: PropTypes.func,
  /**
   * Determines whether or not Checkbox is required.
   */
  required: PropTypes.bool
}

export default withForm(Checkbox);