/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import Select from 'react-select';
import {
  Label,
  FormGroup,
  Col,
  Form,
} from 'reactstrap';
import map from 'lodash/map';
import NumberFormat from 'react-currency-format';

class creditPortfolio extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      ranking, onSubmitCalulate, stretch, mediumHigh, mediumLow, media, onChangeInput, lastDateAssignment,
    } = this.props;
    const tramoOptions = map(ranking, element => ({ value: element._id, label: element._id, averageDebt: element.averageDebt }));
    return (
      <Col md={11}>
        <FormGroup style={{ margin: 0 }}>
          <Form className="centralice_section ml-1" onSubmit={onSubmitCalulate}>
            <FormGroup>
              <Label className="label_porfolio">Tramo</Label>
              <Select
                options={tramoOptions}
                type="text"
                name="stretch"
                id="stretch"
                className="a_width"
                placeholder="seleccione"
                selected={stretch}
                onChange={onChangeInput('stretch')}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Medio Bajo</Label><br />
              <NumberFormat
                className="newArea"
                name="mediumLow"
                id="mediumLow"
                style={{ fontSize: '12px' }}
                decimalSeparator=","
                thousandSeparator="."
                onChange={onChangeInput('mediumLow')}
                value={mediumLow}
              />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Medio Alto</Label><br />
              <NumberFormat
                className="newArea"
                name="mediumHigh"
                id="mediumHigh"
                style={{ fontSize: '12px' }}
                decimalSeparator=","
                thousandSeparator="."
                onChange={onChangeInput('mediumHigh')}
                value={mediumHigh}
              />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Saldo media</Label><br />
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '18px' }}
                thousandSeparator="."
                value={parseFloat(media)}
              />
            </FormGroup>
            {
              (lastDateAssignment) && (
              <FormGroup>
                <Label className="label_porfolio">Fecha ultima asignacion</Label><br />
                <Label className="label_porfolio">{lastDateAssignment}</Label>
              </FormGroup>
              )
            }
            <button
              type="submit"
              style={{ width: '12rem', height: '34px', marginTop: '2%' }}
              className="asignar2 new_contact_button"
            >
              Calcular
            </button>
          </Form>
        </FormGroup>
      </Col>
    );
  }
}

export default creditPortfolio;
