/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility, title } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <div className="top_title">
              <strong>{title || ''}</strong>
            </div>
          </div>
          <div className="topbar__right">
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ topbar }) => ({
  title: topbar.title,
});

export default connect(mapStateToProps)(Topbar);
