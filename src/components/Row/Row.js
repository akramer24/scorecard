import React from 'react';
import PropTypes from 'prop-types';
import withFlex from '../hocs/withFlex';

const Row = ({ children, className, style }) =>
  <div
    className={className}
    style={style}
  >
    {children}
  </div>

Row.defaultProps = {
  horizontalAlignment: 'left',
  verticalAlignment: 'center',
  wrap: true
}

Row.propTypes = {
  /**
   * Row content.
   */
  children: PropTypes.array,
  /**
   * Determines how row content is aligned horizontally.
   */
  horizontalAlignment: PropTypes.oneOf(['center', 'left', 'right', 'space-evenly', 'space-between', 'space-around']),
  /**
   * Style applied to Row.
   */
  style: PropTypes.object,
  /**
   * Determines how row content is aligned vertically.
   */
  verticalAlignment: PropTypes.oneOf(['center', 'top', 'bottom', 'space-evenly', 'space-between', 'space-around']),
  /**
   * Determines whether content should wrap when it does not fit on screen.
   */
  wrap: PropTypes.bool
}

export default withFlex(Row, 'row');