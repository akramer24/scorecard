import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Line to be used to separate content.
 */

const Divider = ({ className, alignment, id, style }) => (
  <div
    className={classNames(
      'ari-ui-divider',
      {
        [className]: className,
        'ari-ui-divider-horizontal': alignment === 'horizontal',
        'ari-ui-divider-vertical': alignment === 'vertical'
      }
    )}
    id={id}
    style={style}
  />
)

Divider.defaultProps = {
  alignment: 'horizontal'
}

Divider.propTypes = {
  /**
   * Determines how Divider aligns.
   */
  alignment: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * CSS class(es) applied to Card.
   */
  className: PropTypes.string,
  /**
   * CSS id applied to Card.
   */
  id: PropTypes.string,
  /**
   * CSS styling for card.
   */
  style: PropTypes.object
}

export default Divider;