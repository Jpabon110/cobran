/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import {
  Button, ButtonToolbar,
} from 'reactstrap';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import moment from 'moment';
import { css } from '@emotion/core';
import { MakeCols } from './makeColumns';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import { SheetJSFT } from './types';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      data: [],
      cols: [],
      loading: false,
      fileBlock: 'block',
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { files } = e.target;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    this.setState({ loading: true, fileBlock: 'none' });

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true, cellDates: true });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const arrCases = [];
      let guarantee = {};
      let record = {};

      this.setState({ data, cols: MakeCols(ws['!ref']) }, () => {
        // console.log('info de file', this.state.data);
        this.state.data.map((element) => {
          // if (element.Capital) {
          // console.log('info de file', moment(element.Vencimiento));
          // } else {
          //   console.log('no existe');
          // }
          guarantee = {
            rut: element['Aval Rut'] ? element['Aval Rut'] : undefined,
            name: element['Aval Nombre'] ? element['Aval Nombre'] : undefined,
            paternalSurname: element['Aval Apellido Paterno'] ? element['Aval Apellido Paterno'] : undefined,
            maternalSurname: element['Aval Apellido Materno'] ? element['Aval Apellido Materno'] : undefined,
            phone: element['Aval Telefono'] ? element['Aval Telefono'] : undefined,
            address: element['Aval Direccion'] ? element['Aval Direccion'] : undefined,
            commune: element['Aval Comuna'] ? element['Aval Comuna'] : undefined,
            region: element['Aval Region'] ? element['Aval Region'] : undefined,
            email: element['Aval Email'] ? element['Aval Email'] : undefined,
          };
          record = {
            rut: element.Rut ? element.Rut : undefined,
            idCases: element.ID ? element.ID : undefined,
            name: element.Nombre ? element.Nombre : undefined,
            paternalSurname: element.Paterno ? element.Paterno : undefined,
            maternalSurname: element.Materno ? element.Materno : undefined,
            capital: ((element.Capital) && (element.Capital >= 0)) ? element.Capital : undefined,
            accrued: element.Devengado ? element.Devengado : undefined,
            dayInArreas: element.Mora ? element.Mora : 0,
            ranking: element['Clasifiación'] ? element['Clasifiación'] : undefined,
            section: element.Tramo ? element.Tramo : undefined,
            provisionPercentage: element['% Provision'] ? element['% Provision'] : undefined,
            provision: element.Provision ? element.Provision : undefined,
            payment: element.Cuota ? element.Cuota : undefined,
            phone: element.Telefono ? element.Telefono : undefined,
            address: element.Direccion ? element.Direccion : undefined,
            commune: element.Comuna ? element.Comuna : undefined,
            region: element.Region ? element.Region : undefined,
            email: element.Emaill ? element.Emaill : undefined,
            contractDate: element.Curse ? element.Curse : undefined,
            brand: element.Marca ? element.Marca : undefined,
            model: element.Modelo ? element.Modelo : undefined,
            vehicleYear: element.Vehiculo ? element.Vehiculo : undefined,
            patent: element.Patente ? element.Patente : undefined,
            guarantee,
            ces: element.CES ? element.CES : undefined,
            vehicleStatus: element['Estado del vehículo'] ? element['Estado del vehículo'] : undefined,
            product: element.Producto ? element.Producto : undefined,
            paymentTotal: element['Cuotas Totales'] ? element['Cuotas Totales'] : undefined,
            feesPaid: element['Cuotas Pagadas'] ? element['Cuotas Pagadas'] : undefined,
            paymentOfArrears: element['Cuotas Mora'] ? element['Cuotas Mora'] : undefined,
            outstandingFees: element['Cuotas Pendientes Vcto'] ? element['Cuotas Pendientes Vcto'] : undefined,
            lastPaymentDate: element['Fecha Último Pago'] ? moment(element['Fecha Último Pago']) : undefined,
            commercialPhone: element['Teléfono Comercial Cliente'] ? element['Teléfono Comercial Cliente'] : undefined,
            phoneRef1: element['Teléfono Referencia 1'] ? element['Teléfono Referencia 1'] : undefined,
            descriptionRef1: element['Descripción Referencia 1'] ? element['Descripción Referencia 1'] : undefined,
            phoneRef2: element['Teléfono Referencia 2'] ? element['Teléfono Referencia 2'] : undefined,
            descriptionRedf2: element['Descripción Referencia 2'] ? element['Descripción Referencia 2'] : undefined,
            judicial: element.Judicial ? element.Judicial : undefined,
            expiration: element.Vencimiento ? moment(element.Vencimiento) : undefined,
          };
          arrCases.push(record);
          guarantee = {};
          record = {};
        });
      });
      // console.log(JSON.stringify(this.state.data, null, 2));
      // console.log(arrCases);
      this.props.uploadFile(arrCases, (info) => {
        this.props.recordsCounts(info);
        this.setState({ loading: false, fileBlock: 'block' });
      });
    };

    if (!this.state.file) {
      alert('Ingresar un archivo');
    } else {
      reader.readAsBinaryString(this.state.file);
    }
  }


  render() {
    const { uploadingFile } = this.props;

    console.log('uploadingFile', uploadingFile);
    return (
      <Fragment>
        <div>
          <br />
          <RingLoader
            css={override}
            sizeUnit="px"
            size={150}
            color="#ffc107"
            loading={this.state.loading}
          />
          <div className="dropzone dropzone--single" style={{ display: this.state.fileBlock }}>
            <div className="dropzone__input">
              <div className="dropzone__drop-here">
                <input
                  type="file"
                  id="file"
                  accept={SheetJSFT}
                  // style={{ display: 'none' }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <br />
        </div>
        <ButtonToolbar className="form__button-toolbar" style={{ justifyContent: 'flex-end' }}>
          <Button style={{ backgroundColor: '#595959', color: '#fff' }} disabled={uploadingFile} onClick={this.handleFile} type="submit">Subir</Button>
        </ButtonToolbar>
      </Fragment>

    );
  }
}

const mapStateToProps = ({
  uploadFileReducer,
}) => ({
  uploadingFile: uploadFileReducer.uploadingFile,
});

const mapDispatchToProps = {
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ExcelReader);
