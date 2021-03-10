/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import jwtDecode from 'jwt-decode';
import {
  Card, CardBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import QueryString from 'query-string';
import Ava from '../../../shared/img/avatar-default.jpg';
import GestionsList from './GestionsList';
import { isUserAllowed } from '../../../shared/utils';
import { getMe } from '../../../redux/actions/meActions';
import { getDashboard, getDashboardMe } from '../../../redux/actions/gestionsActions';

const monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
const monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort(m, format) {
    if (/-MMM-/.test(format)) {
      return monthsShort[m.month()];
    }
    return monthsShortDot[m.month()];
  },
  weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
  longDateFormat: {
    LLLL: 'dddd, D [de] MMMM [de] YYYY',
  },
});

class GestionContent extends Component {
  constructor() {
    super();
    this.state = {
      // dashboard: {},
    };
  }

  componentDidMount() {
    const isAdmin = isUserAllowed('admin');
    const {
      search,
    } = this.props.location;
    let query = {};
    if (search) {
      query = QueryString.parse(search);
    }
    if (isAdmin) {
      // console.log('admin');
      // console.log(query);
      this.props.getDashboard((query.stretch) ? { stretch: query.stretch } : {});
    } else {
      // console.log('deve');
      this.props.getDashboardMe((query.stretch) ? { stretch: query.stretch } : {});
    }
  }

  setGestionsListRef = (e) => {
    this.GestionsListRef = e;
  };

  render() {
    const { me, dashboard } = this.props;
    // const { avatar, firstName, lastName } = this.props.currentUser;
    // const { firstName, lastName } = this.props.currentUser;
    // let instalment = null;

    return (
      <div className="dashboard container">
        <Card className="cardo_botton">
          <CardBody style={{ padding: '0px 10px' }}>
            <div className="profile_casos card" style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <div className="compacted col-md-5">
                <img className="topbar__avatar-img" style={{ height: '80px', width: '80px' }} src={Ava} alt="avatar" />
                <div className="profile_info col-md-8">
                  <h5>{moment().lang('es').format('LLLL')}</h5>
                  {/* <h3>Hola, {`${firstName} ${lastName}`}</h3> */}
                  <h3>Hola, {me.firstName || ''} {me.lastName || ''}</h3>
                  <h3> <strong>Que tengas un buen día</strong></h3>
                </div>
              </div>
              <div className="profile_info col-md-7">
                <h5>Tu resumen diario</h5>
                <div className="profile_info_calls">
                  <div className="profile_info" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <h1> <strong>{ (dashboard) ? (dashboard.noManaged) ? dashboard.noManaged : 0 : 0 }</strong> </h1>
                    <h5> <strong>No Gestionadas</strong></h5>
                  </div>
                  <div className="profile_info" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <h1> <strong>{ (dashboard) ? (dashboard.todayWith) ? dashboard.todayWith : 0 : 0 }</strong> </h1>
                    <h5> <strong>Con compromiso futuro</strong></h5>
                  </div>
                  <div className="profile_info" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <h1> <strong>{ (dashboard) ? (dashboard.todayOut) ? dashboard.todayOut : 0 : 0 }</strong> </h1>
                    <h5> <strong>Sin compromiso</strong></h5>
                  </div>
                  <div className="profile_info" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <h1> <strong>0</strong> </h1>
                    <h5> <strong>Compromisos hoy</strong></h5>
                  </div>
                  <div className="profile_info" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <h1> <strong>0</strong> </h1>
                    <h5> <strong>Todos</strong></h5>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <GestionsList
          ref={this.setGestionsListRef}
          history={this.props.history}
          location={this.props.location}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ me, gestion }) => ({
  me: me.me,
  loading: me.loading,
  dashboard: gestion.dashboard,
  dashboardMe: gestion.dashboardMe,
});


const mapDispatchToProps = {
  getMe,
  getDashboard,
  getDashboardMe,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GestionContent);
