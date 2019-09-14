import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Divider from '../Divider/Divider';

/**
 * Rectangular container, used to display content.
 */

const Card = ({
  bordered,
  children,
  className,
  footer,
  footerStyle,
  header,
  headerStyle,
  id,
  padded,
  style,
}) => {
  return (
    <div
      className={classNames(
        'ari-ui-card',
        {
          'ari-ui-card-bordered': bordered,
          [className]: className
        }
      )}
      id={id}
      style={style}
    >
      {
        header
          ? (
            <div className="ari-ui-card-header" style={headerStyle}>
              <div className="ari-ui-small-padding">
                {header}
              </div>
              <Divider />
            </div>
          )
          : null
      }
      <div
        className={classNames(
          'ari-ui-card-content',
          {
            'ari-ui-small-padding': padded,
          }
        )}
      >
        {children}
      </div>
      {
        footer
          ? (
            <div className="ari-ui-card-footer" style={footerStyle}>
              <Divider />
              <div className="ari-ui-small-padding">
                {footer}
              </div>
            </div>
          )
          : null
      }
    </div>
  )
}

Card.defaultProps = {
  bordered: true,
  padded: true
}

Card.propTypes = {
  /**
   * Determines whether or not card has a border.
   */
  bordered: PropTypes.bool,
  /**
   * CSS class(es) applied to Card.
   */
  className: PropTypes.string,
  /**
   * Card footer.
   */
  footer: PropTypes.node,
  /**
   * CSS styling for footer.
   */
  footerStyle: PropTypes.object,
  /**
   * Card header.
   */
  header: PropTypes.node,
  /**
   * CSS styling for header.
   */
  headerStyle: PropTypes.object,
  /**
   * CSS id applied to Card.
   */
  id: PropTypes.string,
  /**
   * Determines whether or not card content is padded.
   */
  padded: PropTypes.bool,
  /**
   * CSS styling for card.
   */
  style: PropTypes.object
}

export default Card;