/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  FormGroup,
  Col,
  Label,
} from 'reactstrap';
// import CloseIcon from 'mdi-react/CloseIcon';
// import classNames from 'classnames';
import { connect } from 'react-redux';
// import settings from '../../../shared/img/avatar-default.jpg';

class GestionDetails extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  handleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const { value } = this.props;
    return (
      <Col md={4}>
        <h2 style={{ fontWeight: '600' }}>Vehículo</h2> <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <FormGroup>
              <h4 className="h_for_cyphir2">Marca</h4>
              <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.brand}</Label>
            </FormGroup>
            <FormGroup>
              <h4 className="h_for_cyphir2">Modelo</h4>
              <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.model}</Label>
            </FormGroup>
            <FormGroup>
              <h4 className="h_for_cyphir2">Año</h4>
              <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.vehicleYear}</Label>
            </FormGroup>
            <FormGroup>
              <h4 className="h_for_cyphir2">Patente</h4>
              <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.patent}</Label>
            </FormGroup>
            <FormGroup>
              <h4 className="h_for_cyphir2">Estado del vehículo</h4>
              <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.vehicleStatus}</Label>
            </FormGroup>
        </div>
      </Col>
    );
  }
}

// const mapStateToProps = () => ({

// });


// const mapDispatchToProps = {

// };
export default connect(null, null, null, { forwardRef: true })(GestionDetails);
