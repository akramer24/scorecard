import React from 'react';
import classNames from 'classnames';
import * as FA from 'react-icons/fa';
import useComponentVisible from '../../hooks/useComponentVisible';
import { IconContext } from 'react-icons';

const Dropdown = props => {
  const { align, children, choices, className, color, icon } = props;
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const Icon = FA[icon];
  const caretStyle = color ? { borderBottom: `7px solid ${color}` } : {};
  const dropdownStyle = color ? { backgroundColor: color } : {};

  return (
    <div className="dropdown">
      <IconContext.Provider value={{ size: '35px', className: 'dropdown-icon' }}>
        <div
          className={classNames({ 'active-dropdown': isComponentVisible })}
          onClick={() => setIsComponentVisible(!isComponentVisible)}>
          <Icon />
        </div>
      </IconContext.Provider>
      {
        isComponentVisible
          ? <div className="dropdown-menu-container">
            <div className="dropdown-menu-caret" style={caretStyle} />
            <div
              ref={ref}
              className={classNames(
                'dropdown-menu',
                {
                  'dropdown-menu-left': !align || align === 'left',
                  'dropdown-menu-right': align === 'right',
                  [className]: className
                }
              )}
              style={dropdownStyle}
            >
              {
                choices
                  ? choices.map((c, idx) => {
                    const handleClick = () => {
                      c.onClick();
                      setIsComponentVisible(false);
                    }
                    return (
                      <span
                        key={c.value}
                        className={classNames(
                          'dropdown-menu-item',
                          {
                            'first-dropdown-item': idx === 0,
                            'last-dropdown-item': idx === choices.length - 1
                          }
                        )}
                        onClick={handleClick}
                      >
                        {c.value}
                      </span>
                    )
                  })
                  : <div>{children}</div>
              }
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default Dropdown;