import React from 'react';
import classNames from 'classnames';
import uniqid from 'uniqid';

const Form = ({
  columnWidth,
  content,
  direction,
  onSubmit
}) => {
  const handleSubmit = evt => {
    evt.stopPropagation();
    evt.preventDefault();
    onSubmit && onSubmit(evt);
  }

  return (
    <form
      className={classNames(
        'ari-ui-form',
        {
          'ari-ui-form-columns': direction === 'columns',
          'ari-ui-form-rows': direction === 'rows'
        }
      )}
      onSubmit={handleSubmit}
    >
      {content.map((group, idx) => {
        return (
          <div
            className={classNames({
              'ari-ui-form-row': direction === 'rows', 'ari-ui-form-column': direction === 'columns',
              'ari-ui-form-last-column': direction === 'columns' && idx === content.length - 1
            })}
            key={uniqid()}
            style={direction === 'columns' ? { maxWidth: columnWidth, width: columnWidth } : {}}
          >
            {group.map(el => React.cloneElement(
              el,
              {
                ...el.props,
                key: uniqid(),
                style: direction === 'rows' ? { maxWidth: columnWidth, width: columnWidth } : {}
              }
            ))}
          </div>
        )
      })}
    </form>
  )
}

Form.defaultProps = {
  columnWidth: 250,
  content: [],
  direction: 'columns'
}

export default Form;