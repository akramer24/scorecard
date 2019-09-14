import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import uniqid from 'uniqid';
import classNames from 'classnames';

const Dropdown = ({
  activeChoiceIndex,
  choices,
  choiceHeight,
  handleHoverChoice,
  handleSelectChoice,
  id,
  parentId
}) => {
  const maxToRender = 30;
  const maxToShow = 10;
  const [endIdx, setEndIdx] = useState(maxToRender);
  const getDropdownStyle = () => {
    const parent = document.querySelector(`#${parentId} .ari-ui-dropdown-parent`);
    if (parent) {
      const { top, left, height, width } = parent.getBoundingClientRect();
      return { top: top + height, left: left, width };
    }
  }

  const topBottomPadding = 3;
  const leftRightPadding = 5;

  let scrollIndex = endIdx;

  const handleScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 100) {
      scrollIndex += maxToRender;
      setEndIdx(scrollIndex);
    }
  }

  return ReactDOM.createPortal(
    <div
      className="ari-ui-dropdown"
      onScroll={handleScroll}
      style={{ ...getDropdownStyle(), maxHeight: choiceHeight * maxToShow }}
    >
      {
        choices && choices.slice(0, endIdx).map((c, idx) => {
          return (
            <div
              key={uniqid()}
              className={classNames(
                'ari-ui-dropdown-choice',
                {
                  'ari-ui-dropdown-choice-active': idx === activeChoiceIndex
                }
              )}
              onClick={handleSelectChoice}
              onMouseEnter={() => handleHoverChoice(idx)}
              style={{ height: choiceHeight - (2 * topBottomPadding), padding: `${topBottomPadding}px ${leftRightPadding}px` }}
            >
              {c}
            </div>
          )
        })
      }
    </div>,
    document.getElementById(id)
  )
}

Dropdown.defaultProps = {
  choiceHeight: 24,
  maxToShow: 10
}

export default Dropdown;