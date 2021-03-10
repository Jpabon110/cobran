/* eslint-disable no-lonely-if */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import SidebarLink from './SidebarLink';
import { isUserAllowed, streachAllowed } from '../../../shared/utils';
import {
  getAllGestions,
  getAllGestionsMe,
  getDashboard,
  getDashboardMe,
} from '../../../redux/actions/gestionsActions';
import {
  getLastDateAssignment,
} from '../../../redux/actions/asignationActions';
import { isOptionAllowed } from '../../../helpers/functions';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      streachs: [],
    };
  }

  componentDidMount() {
    const streachs = streachAllowed();
    console.log('en el return del didMount streachs', streachs);

    this.setState({ streachs });
  }

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  streachsValidation = (value) => {
    const { streachs } = this.state;
    let cont = 0;
    console.log('streachs en la funcion validation', streachs);
    streachs.map((streach) => {
      if (value.localeCompare(streach.segment) === 0) {
        cont += 1;
      }
    });
    if (cont > 0) {
      return true;
    }
    return false;
  };

  hideSidebar2 = route => () => {
    const { onClick } = this.props;
    onClick();
    this.props.history.push(`${route}`);
    const isAdmin = isUserAllowed('admin');
    const query = QueryString.parse(this.props.location.search);
    if (!isAdmin) {
      if (query && query.limit) {
        this.props.getAllGestionsMe(({
          stretch: route,
          limit: query.limit,
          page: 1,
          intensity: 0,
        }) || '');
      } else {
        this.props.getAllGestionsMe(({
          stretch: route,
          page: 1,
          intensity: 0,
        }) || '');
      }
      this.props.getDashboardMe((route !== '') ? { stretch: route } : {});
    } else {
      if (query && query.limit) {
        this.props.getAllGestions(({
          stretch: route,
          limit: query.limit,
          page: 1,
          intensity: 0,
        }) || '');
      } else {
        this.props.getAllGestions(({ stretch: route, page: 1, intensity: 0 }) || '');
      }
      this.props.getDashboard((route !== '') ? { stretch: route } : {});
    }
  };

  hideSidebar3 = route => () => {
    const { onClick } = this.props;
    onClick();
    // this.props.history.push(`${route}`);

    this.props.getLastDateAssignment({ stretch: route.trim() });
  };

  render() {
    const {
      search,
    } = this.props.location;

    const limit = QueryString.parse(search);

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <div>
            {
              (isUserAllowed('admin')) && (
                <SidebarLink
                  title="Gestiones"
                  icon="lnr lnr-enter"
                  route={`/pages/gestions?page=1${limit.limit ? `&limit=${limit.limit}` : ''}`}
                  onClick={this.hideSidebar2('')}
                />
              )
            }
            {
              (isOptionAllowed(['admin', 'manager'])) && (
                <SidebarLink
                  title="Gestiones"
                  icon="lnr lnr-eye"
                  route="/pages/bossview"
                  onClick={this.hideSidebar2('')}
                />
              )
            }
            {
              (this.streachsValidation('1 A 30') || (isUserAllowed('admin'))) && (
                <SidebarLink
                  title="1 - 30"
                  route={`/pages/gestions?stretch=1%20A%2030${limit.limit ? `&limit=${limit.limit}` : ''}&page=1`}
                  strech="1 - 30"
                  onClick={this.hideSidebar2('1 A 30')}
                />
              )
            }
            {
              (this.streachsValidation('31 - 60') || (isUserAllowed('admin'))) && (
              <SidebarLink
                title="31 - 60"
                route={`/pages/gestions?stretch=31%20A%2060${limit.limit ? `&limit=${limit.limit}` : ''}&page=1`}
                strech="31 - 60"
                onClick={this.hideSidebar2('31 A 60')}
              />
              )
            }
            {
              (this.streachsValidation('61 - 90') || (isUserAllowed('admin'))) && (
              <SidebarLink
                title="61 - 90"
                route={`/pages/gestions?stretch=61%20A%2090${limit.limit ? `&limit=${limit.limit}` : ''}&page=1`}
                strech="61 - 90"
                onClick={this.hideSidebar2('61 A 90')}
              />
              )
            }
            {
              (this.streachsValidation('91+') || (isUserAllowed('admin'))) && (
              <SidebarLink
                title="91+"
                route={`/pages/gestions?stretch=91${limit.limit ? `&limit=${limit.limit}` : ''}&page=1`}
                strech="91+"
                onClick={this.hideSidebar2('91')}
              />
              )
            }
            {
              ((isUserAllowed('admin'))) && (
                <SidebarLink
                  title="A1 - 30"
                  route="/pages/asignation-streach?streach=1%20A%2030"
                  strech="A1 - 30"
                  onClick={this.hideSidebar3('1 A 30')}
                />
              )
            }
            {
              ((isUserAllowed('admin'))) && (
              <SidebarLink
                title="A31 - 60"
                route="/pages/asignation-streach?streach=31%20A%2060"
                strech="A31 - 60"
                onClick={this.hideSidebar3('31 A 60')}
              />
              )
            }
            {
              ((isUserAllowed('admin'))) && (
              <SidebarLink
                title="A61 - 90"
                route="/pages/asignation-streach?streach=61%20A%2090"
                strech="A61 - 90"
                onClick={this.hideSidebar3('61 A 90')}
              />
              )
            }
            {
              ((isUserAllowed('admin'))) && (
              <SidebarLink
                title="A91+"
                route="/pages/asignation-streach?streach=91"
                strech="A91+"
                onClick={this.hideSidebar3('91')}
              />
              )
            }
          </div>
          <div>
            {
            isOptionAllowed(['admin'])
            && (
              <Fragment>
                <SidebarLink
                  title="Usuarios"
                  icon="lnr lnr-users"
                  route="/pages/users"
                  onClick={this.hideSidebar}
                />
                <SidebarLink
                  title="Asignación"
                  icon="lnr lnr-list"
                  route="/pages/asignation"
                  onClick={this.hideSidebar}
                />
              </Fragment>
            )
          }
          </div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ gestion, asignation }) => ({
  gestions: gestion.gestions,
  disable: gestion.disable,
  countCases: gestion.countCases,
  limitCases: gestion.limitCases,
  infoLastDate: asignation.infoLastDate,
  loadLastDateAsigments: asignation.loadLastDateAsigments,
});


const mapDispatchToProps = {
  getAllGestions,
  getAllGestionsMe,
  getLastDateAssignment,
  getDashboard,
  getDashboardMe,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SidebarContent);
