import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TopbarSidebarButton extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

    return (
      <div>
        <button type="button" className="topbar__button topbar__button--desktop" onClick={changeSidebarVisibility}>
          <div className="topbar__button-icon topbar__logo" />
        </button>
        <button type="button" className="topbar__button topbar__button--mobile" onClick={changeMobileSidebarVisibility}>
          <div className="topbar__button-icon topbar__logo" />
        </button>
      </div>
    );
  }
}

export default TopbarSidebarButton;
