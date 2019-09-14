import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omitBy, isUndefined } from 'lodash';

const Button = ({
  appearance,
  children,
  className,
  disabled,
  edge,
  id,
  onClick,
  style,
  type,
}) => {
  const passthroughToButton = omitBy({
    onClick,
    style
  }, isUndefined);

  let appearanceClassName;
  switch (appearance) {
    case 'primary':
      appearanceClassName = 'ari-ui-btn-primary';
      break;
    case 'danger':
      appearanceClassName = 'ari-ui-btn-danger';
      break;
    default:
      appearanceClassName = 'ari-ui-btn-default';
  }

  return (
    <button
      {...passthroughToButton}
      className={classNames(
        'ari-ui-btn',
        appearanceClassName,
        {
          [className]: className,
          'ari-ui-btn-disabled': disabled,
          'ari-ui-btn-rounded-edge': edge === 'round'
        }
      )}
      id={id}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  edge: 'straight',
  appearance: 'default',
  type: 'button'
}

Button.propTypes = {
  /**
   * Content inside Button.
   */
  children: PropTypes.string.isRequired,
  /**
   * CSS class(es) applied to Button.
   */
  className: PropTypes.string,
  /**
   * Determines whether or not Button is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Determines whether Button takes a straight or round edge.
   */
  edge: PropTypes.oneOf(['straight', 'round']),
  /**
   * CSS id applied to Button.
   */
  id: PropTypes.string,
  /**
   * Button appearance.
   */
  appearance: PropTypes.oneOf(['default', 'primary', 'danger']),
  /**
   * Callback triggered by clicking Button.
   */
  onClick: PropTypes.func,
  /**
   * CSS styling applied to Button.
   */
  style: PropTypes.object,
  /**
   * Button type.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button;