import {
  isValidElement,
  useState
} from 'react';

import PropTypes from 'prop-types'

const Tabs = ({tabs, defaultTabIndex = 0}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(defaultTabIndex);

  const handleTabControlClick = index => e => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentTabIndex(index)
  }

  return (
    <div className='tabs'>
      <div className='tabs__controls'>
        { tabs.map((tab, tabIndex) => (
          <button key={`tab_control_${tabIndex}`} onClick={handleTabControlClick(tabIndex)} className={'tabs__control' + (tabIndex === currentTabIndex ? ' tabs__control--active' : '')}>
            {tab.title}
          </button>
        )) }
      </div>
      <div className='tabs__content-wrapper'>
        { tabs.map((tab, tabIndex) => (
          <div key={`tab_content_${tabIndex}`}  className={'tabs__content' + (tabIndex === currentTabIndex ? ' tabs__content--active' : '')}>
            {tab.component}
          </div>
        )) }
      </div>
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(function(propValue, key) {
    const obj = propValue[key];

    if (
      !(
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.title === 'string' &&
        isValidElement(obj.component)
      )
    ) {
      return new Error('Tab Element Error: ' + JSON.stringify(obj) + ' is a invalid tab element.')
    }
  }).isRequired,
  defaultTabIndex: PropTypes.number
}

export default Tabs;