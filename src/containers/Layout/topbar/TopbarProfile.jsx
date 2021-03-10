/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent, Fragment } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import TopbarMenuLink from './TopbarMenuLink';
import { logOut } from '../../../redux/actions/loginActions';
import { getMe } from '../../../redux/actions/meActions';
import Ava from '../../../shared/img/avatar-default.jpg';

class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  componentDidMount() {
    const { getMe } = this.props;
    getMe();
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  cerrarSesion = () => {
    this.props.logOut();

    if (this.props.redirect) {
      this.props.history.push('/pages/one');
    }
  }

  render() {
    const { collapse } = this.state;
    const { me, loading } = this.props;
    const { firstName = '', lastName = '', avatar = '' } = me;
    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          {
            loading
              ? (
                <Fragment>
                  <Skeleton circle height={50} width={50} />
                  <p className="topbar__avatar-name">
                    <Skeleton height={20} width={100} />
                  </p>
                  <DownIcon className="topbar__icon" />
                </Fragment>
              )
              : (
                <Fragment>
                  <img className="topbar__avatar-img" src={avatar || Ava} alt="avatar" />
                  <p className="topbar__avatar-name">
                    {
                      firstName
                        ? `${firstName} ${lastName}`
                        : 'loading'
                    }
                  </p>
                  <DownIcon className="topbar__icon" />
                </Fragment>
              )
          }
        </button>
        {collapse && <button type="button" className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <div>
              <TopbarMenuLink title="Perfil" path="/pages/profile" />
            </div>
            <div>
              <TopbarMenuLink title="Cambiar Contraseña" path="/pages/change-password" />
            </div>
            <div onClick={() => { this.props.logOut(); }}>
              <TopbarMenuLink title="Cerrar Sesión" path="#" />
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.me.loading,
  error: state.login.error,
  tokens: state.login.tokens,
  redirect: state.login.redirect,
  me: state.me.me,
});

const mapDispatchToProps = {
  logOut,
  getMe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopbarProfile);
