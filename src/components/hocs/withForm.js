import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormItem = Component => React.forwardRef(({
  error,
  label,
  labelPosition,
  style,
  ...rest
}, ref) => {
  let width = null;
  let maxWidth = null;

  if (style) {
    width = style.width;
    maxWidth = style.maxWidth;
    delete style.width;
    delete style.maxWidth;
  }

  return (
    <div
      className={classNames(
        'ari-ui-form-item',
        {
          'ari-ui-form-item-with-label-left': labelPosition === 'left',
          'ari-ui-form-item-with-label-top': !labelPosition || labelPosition === 'top'
        }
      )}
      style={{ width, maxWidth }}
    >
      {label && <div className="ari-ui-form-item-label">{label}:&nbsp;</div>}
      <div className="ari-ui-form-item-component">
        <Component
          {...rest}
          style={style}
          ref={ref}
        />
        {
          error
            ? <div className="ari-ui-form-item-error">{error}</div>
            : null
        }
      </div>
    </div>
  )
})

const withForm = Component => FormItem(Component);

FormItem.propTypes = {
  /**
   * Error to display.
   */
  error: PropTypes.string,
  /**
   * Label for FormItem.
   */
  label: PropTypes.string,
  /**
   * Determines position of label.
   */
  labelPosition: PropTypes.oneOf(['left', 'top']),
  /**
   * Style applied to FormItem.
   */
  style: PropTypes.object
}

export default withForm;