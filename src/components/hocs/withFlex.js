import React from 'react';
import classNames from 'classnames';

const withFlex = (Component, direction) => ({
  children,
  className,
  horizontalAlignment,
  style,
  verticalAlignment,
  wrap
}) => {
  let horizontalAlignmentClass;

  switch (horizontalAlignment) {
    case 'center':
      horizontalAlignmentClass = direction === 'row' ? 'ari-ui-justify-center' : 'ari-ui-align-center';
      break;
    case 'top':
      horizontalAlignmentClass = 'ari-ui-align-start';
      break;
    case 'bottom':
      horizontalAlignmentClass = 'ari-ui-align-end';
      break;
    case 'left':
      horizontalAlignmentClass = 'ari-ui-justify-start';
      break;
    case 'right':
      horizontalAlignmentClass = 'ari-ui-justify-end';
      break;
    case 'space-evenly':
      horizontalAlignmentClass = direction === 'row' ? 'ari-ui-justify-even' : 'ari-ui-align-even';
      break;
    case 'space-between':
      horizontalAlignmentClass = direction === 'row' ? 'ari-ui-justify-between' : 'ari-ui-align-between';
      break;
    case 'space-around':
      horizontalAlignmentClass = direction === 'row' ? 'ari-ui-justify-around' : 'ari-ui-align-around';
      break;
    default:
      horizontalAlignmentClass = direction === 'row' ? 'ari-ui-justify-start' : 'ari-ui-align-start';
  }

  let verticalAlignmentClass;

  switch (verticalAlignment) {
    case 'top':
      verticalAlignmentClass = 'ari-ui-align-start';
      break;
    case 'bottom':
      verticalAlignmentClass = 'ari-ui-align-end';
      break;
    case 'left':
      verticalAlignmentClass = 'justify-left';
      break;
    case 'right':
      verticalAlignmentClass = 'justify-right';
      break;
    case 'space-evenly':
      verticalAlignmentClass = direction === 'row' ? 'ari-ui-align-even' : 'ari-ui-justify-even';
      break;
    case 'space-between':
      verticalAlignmentClass = direction === 'row' ? 'ari-ui-align-between' : 'ari-ui-justify-between';
      break;
    case 'space-around':
      verticalAlignmentClass = direction === 'row' ? 'ari-ui-align-around' : 'ari-ui-justify-around';
      break;
    default:
      verticalAlignmentClass = direction === 'row' ? 'ari-ui-align-center' : 'ari-ui-justify-start';
  }

  return (
    <Component
      className={classNames(
        horizontalAlignmentClass,
        verticalAlignmentClass,
        {
          'ari-ui-flex-row': direction === 'row',
          'ari-ui-flex-column': direction === 'column',
          'ari-ui-wrap': wrap,
          [className]: className
        }
      )}
      style={style}
    >
      {children}
    </Component>
  )
}

export default withFlex;