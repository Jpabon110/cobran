/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  Col, Button, ButtonToolbar, Label, Input, Row, FormGroup,
  Modal, ModalBody,
} from 'reactstrap';
import { registerLocale } from 'react-datepicker';
import { connect } from 'react-redux';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import map from 'lodash/map';
// import NumberFormat from 'react-currency-format';
// import Select from 'react-select';

registerLocale('es', es);

class ModalComponent extends Component {
  static defaultProps = {
    title: '',
    message: '',
    colored: false,
    header: false,
    selectedOption: null,
  };

  constructor() {
    super();
    this.state = {
      // _id: null,
      // phones: [
      //   {
      //     code: '',
      //     number: '',
      //   },
      // ],
    };
  }


  componentDidMount() {

  }

  render() {
    const {
      onChangePhone,
      onRemove,
      addPhone,
      // value,
      isOpen,
      emails,
      phones,
      // onChangeAddress,
      // onRemoveAddress,
      // addAddress,
      addEmail,
      onChangeEmail,
      onRemoveEmail,
      disableButtonCreate,
    } = this.props;

    // console.log('emails', emails);

    return (
      <div>
        <Modal
          isOpen={isOpen}
          toggle={this.props.toggle}
          className="modal-dialog modal-dialog--header"
          scrollable="true"
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.props.toggle(false)} />
            <h2 className="bold-text label_autofin  modal__title" style={{ fontWeight: 'bold' }}> <strong>Editar información de contacto</strong></h2>
          </div>
          <form className="form form--horizontal">
            <ModalBody>
              <Row>
                <Col md="12" className="mb-3">
                  {/* <h4 className="title_modal_contact"> Datos personales </h4> */}
                </Col>
                {/* <Col md="12" className="mb-4">
                  <Row>
                    <Col md="4" style={{ display: 'flex' }}>
                      <h4 className="title_modal_contact"> Direcciones </h4>
                      <Button className="plus_add" style={{ marginLeft: '5%' }} onClick={addAddress} color="success" size="sm">+</Button>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12">
                  {
                    map(value.addresses, (address, index) => (
                      <Row key={index} className="mt-6">
                        <Col sm="4">
                          <FormGroup>
                            <Label className="label_autofin" for="profile">Calle</Label>
                            <Input
                              className="mb-2"
                              onChange={onChangeAddress('street', index)}
                              value={address.street}
                              placeholder="Calle"
                              maxLength="50"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="3">
                          <FormGroup>
                            <Label className="label_autofin" for="profile">Región</Label>
                            <Select
                              options={this.state.regions}
                              type="text"
                              name="region"
                              id="region"
                              placeholder="seleccionar"
                              value={address.region}
                              onChange={onChangeAddress('region', index)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="3">
                          <FormGroup>
                            <Label className="label_autofin" for="profile">Comuna</Label>
                            <Select
                              options={address.coptions}
                              type="text"
                              name="commune"
                              id="commune"
                              placeholder="seleccionar"
                              value={address.commune}
                              isClearable="true"
                              onChange={onChangeAddress('commune', index)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="1" className="mt-4">
                          <Button className="mb-2 plus_add2" onClick={onRemoveAddress(index)} size="sm" block>
                            <span
                              className="lnr lnr-lnr lnr-trash"
                              style={{
                                fontWeight: 'bold', cursor: 'pointer',
                              }}
                            />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  }
                </Col> */}
                <Col md="12" className="mb-4">
                  <Row>
                    <Col md="4" style={{ display: 'flex' }}>
                      <h4 className="title_modal_contact"> Teléfono </h4>
                      <Button className="plus_add" style={{ marginLeft: '5%' }} onClick={addPhone} color="success" size="sm">+</Button>
                    </Col>
                    {/* <Col md="2">
                    </Col> */}
                  </Row>
                </Col>
                <Col sm="12">
                  {
                    map(phones, (phone, index) => (
                      <Row key={index} className="mt-6">
                        <Col sm="2">
                          <FormGroup>
                            <Label className="label_autofin" for="profile">Código</Label>
                            <Input
                              className="mb-2"
                              maxLength="3"
                              onChange={onChangePhone('code', index)}
                              value={phone.code}
                              placeholder="Código"
                              required
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label className="label_autofin" for="profile">Teléfono</Label>
                            <Input
                              className="mb-2"
                              maxLength="9"
                              minLength="9"
                              onChange={onChangePhone('number', index)}
                              value={phone.number}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="1" className="mt-4">
                          <Button className="mb-2 plus_add2" onClick={onRemove(index)} size="sm" block>
                            <span
                              className="lnr lnr-lnr lnr-trash"
                              style={{
                                fontWeight: 'bold', cursor: 'pointer',
                              }}
                            />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  }
                </Col>
                <Col md="12" className="mb-4">
                  <Row>
                    <Col md="4" style={{ display: 'flex' }}>
                      <h4 className="title_modal_contact"> Correo </h4>
                      <Button className="plus_add" style={{ marginLeft: '5%' }} onClick={addEmail} color="success" size="sm">+</Button>
                    </Col>
                    {/* <Col md="2">
                    </Col> */}
                  </Row>
                </Col>
                <Col sm="12">
                  {
                    map(emails, (email, index) => (
                      <Row key={index} className="mt-6">
                        <Col sm="4">
                          <FormGroup>
                            <Label className="label_autofin" for="profile">Correos Electrónicos</Label>
                            <Input
                              className="mb-2"
                              maxLength="50"
                              onChange={onChangeEmail('email', index)}
                              value={email.email}
                              type="email"
                              placeholder="Email"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="1" className="mt-4">
                          <Button className="mb-2 plus_add2" onClick={onRemoveEmail(index)} size="sm" block>
                            <span
                              className="lnr lnr-lnr lnr-trash"
                              style={{
                                fontWeight: 'bold', cursor: 'pointer',
                              }}
                            />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  }
                </Col>
              </Row>
            </ModalBody>
            <ButtonToolbar className="modal__footer">
              <Button className="asignar" onClick={this.props.toggle(false)}>Cancel</Button>{' '}
              <Button
                className="asignar just_this"
                id="added"
                onClick={this.props.toggle(true)}
                disabled={disableButtonCreate}
              >Guardar
              </Button>
            </ButtonToolbar>
          </form>
        </Modal>
      </div>
    );
  }
}

// const mapStateToProps = () => ({


// });


// const mapDispatchToProps = {


// };
export default connect(null, null, null, { forwardRef: true })(ModalComponent);

// export default ModalComponent;
