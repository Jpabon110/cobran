/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-script-url */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import {
  Card,
  CardBody,
  FormGroup,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getPortfolio,
  getDatePortfolio,
} from '../../../redux/actions/asignationActions';
import CreditPortfolio from './creditPortfolio';
// import ExcelReader from './ExcelReader';
import PrejudicialPortfolio from './prejudicialPortfolio';

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
    LLLL: 'MMMM',
    // LLLL: 'dddd, D [de] MMMM [de] YYYY',
  },
});

class projectedPortfolio extends PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getPortfolio();
    this.props.getDatePortfolio();
  }

  toUploadFileResume = () => {
    this.props.history.push('/pages/upload-file-resume');
  }

  toUploadFileResumeMora = () => {
    this.props.history.push('/pages/upload-file-mora');
  }

  render() {
    const {
      judicial, ranking, preliminaryRuling, notAssigned,
    } = this.props.portfolios;

    const {
      datePortfolio,
    } = this.props;

    console.log('datePortfolio', datePortfolio);


    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <Row>
              <div className="profile_info col-md-8 mb-0 mt-3">
                <FormGroup className="details_profile_columned" style={{ margin: 0 }}>
                  <h2 className="title_modal_contact mb-2">Cartera proyectada mes de <span style={{ color: '#9E9E9E' }}> {datePortfolio ? moment(datePortfolio.date).lang('es').format('MMMM') : ''} </span></h2>
                  <div className="top_linear_divaindo">___</div>
                </FormGroup>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  style={{ width: 'auto', height: '34px', marginTop: '1%' }}
                  onClick={this.toUploadFileResume}
                  className="asignar2 new_contact_button"
                >
                  Cargar provisión
                </button>
                <button
                  type="button"
                  style={{
                    width: 'auto', height: '34px', marginTop: '1%', marginLeft: '2%',
                  }}
                  onClick={this.toUploadFileResumeMora}
                  className="asignar2 new_contact_button"
                >
                  Actualizar mora
                </button>
              </div>
            </Row>
            <Row>
              {/* <ExcelReader /> */}
              <Col md={5}>
                <CreditPortfolio
                  title="Total"
                  nCases={((judicial) && (preliminaryRuling)) ? ((judicial.numberCases ? judicial.numberCases : 0) + (preliminaryRuling.numberCases ? preliminaryRuling.numberCases : 0)) : 0}
                  creditsAsign={((judicial) && (preliminaryRuling)) ? ((judicial.totalDebt ? judicial.totalDebt : 0) + (preliminaryRuling.totalDebt ? preliminaryRuling.totalDebt : 0)) : 0}
                />
                <CreditPortfolio
                  title="Judicial"
                  nCases={(judicial) ? (judicial.numberCases ? judicial.numberCases : 0) : 0}
                  creditsAsign={(judicial) ? (judicial.totalDebt ? judicial.totalDebt : 0) : 0}
                />
              </Col>
              <Col md={7}>
                <PrejudicialPortfolio
                  title="Prejudicial"
                  nCases={(preliminaryRuling) ? preliminaryRuling.numberCases : 0}
                  creditsAsign={(preliminaryRuling) ? preliminaryRuling.totalDebt : 0}
                  noAsign={(notAssigned) ? notAssigned.numberCases : 0}
                  tableValues={ranking}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

    );
  }
}

const mapStateToProps = ({ asignation }) => ({
  portfolios: asignation.portfolios,
  loadingPortfolio: asignation.loadingPortfolio,
  datePortfolio: asignation.datePortfolio,
});


const mapDispatchToProps = {
  getPortfolio,
  getDatePortfolio,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(projectedPortfolio);
