import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Tabs = ({ defaultActiveTab, views }) => {
  const [viewNames, setViewNames] = useState(Object.keys(views));
  const [activeTab, setActiveTab] = useState(defaultActiveTab || viewNames[0]);

  return (
    <div className="ari-ui-tabs">
      <div className="ari-ui-tabs-bar">
        {
          viewNames.map(name => {
            return (
              <div
                key={name}
                className={classNames('ari-ui-tab', { 'ari-ui-tab-active': activeTab === name })}
                onClick={() => setActiveTab(name)}
              >
                {name}
              </div>
            )
          })
        }
      </div>
      <div className="ari-ui-tabs-content">
        {views[activeTab]}
      </div>
    </div>
  )
}

export default Tabs;