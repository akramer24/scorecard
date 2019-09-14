import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';
import Divider from '../Divider/Divider';

class Modal extends Component {
  static defaultProps = {
    clickMaskToClose: false,
    closeable: true,
    footer: null
  }

  constructor(props) {
    super(props);
    const div = document.createElement('div');
    div.id = 'modal-root';
    document.querySelector('body').appendChild(div);
  }

  componentWillUnmount() {
    const modalDiv = document.getElementById('modal-root');
    modalDiv.remove();
  }

  render() {
    const {
      children,
      className,
      clickMaskToClose,
      closeable,
      footer,
      id,
      onClose,
      title,
      visible,
      width
    } = this.props;

    if (visible) {
      return ReactDOM.createPortal(
        <div className="ari-ui-modal-container">
          <div className="ari-ui-modal-overlay" onClick={clickMaskToClose ? onClose : () => { }} />
          <div className="ari-ui-modal-dialog">
            <div className={classNames('ari-ui-modal', { [className]: className })} id={id} style={{ width }}>
              <div className="ari-ui-modal-header">
                <span className="ari-ui-modal-title">{title && title}</span>
                {closeable && <FaTimes className="ari-ui-modal-x" onClick={onClose} />}
              </div>
              {title && <Divider />}
              <div className="ari-ui-modal-content">
                {children}
              </div>
              {footer && <Divider />}
              {
                footer
                  ? (
                    <div className="ari-ui-modal-footer">
                      {footer}
                    </div>
                  )
                  : null
              }
            </div>
          </div>
        </div>,
        document.getElementById('modal-root')
      )
    }
    return null;
  }
}

Modal.propTypes = {
  /**
   * CSS class(es) applied to Modal.
   */
  className: PropTypes.string,
  /**
   * Determines whether or not clicking the mask closes Modal.
   */
  clickMaskToClose: PropTypes.bool,
  /**
   * Determines whether or not close "x" appears in top-right corner.
   */
  closeable: PropTypes.bool,
  /**
   * Modal footer content.
   */
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * CSS id applied to Modal.
   */
  id: PropTypes.string,
  /**
   * Callback triggered when 'x' is clicked or, if clickMaskToClose=true, mask is clicked.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Title of Modal.
   */
  title: PropTypes.string,
  /**
   * Determines whether or not Modal is visible.
   */
  visible: PropTypes.bool,
  /**
   * Width of Modal.
   */
  width: PropTypes.number
}

export default Modal;