/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
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
import React, { Component, Fragment } from 'react';
import {
  FormGroup, Col, Label, Button,
} from 'reactstrap';
// import NumberFormat from 'react-currency-format';
import { connect } from 'react-redux';
import remove from 'lodash/remove';
import map from 'lodash/map';
import showNotification from '../../../helpers/notification';
import { setRUTFormat } from '../../../helpers/functions';
import EditModal from '../../../shared/components/Modals/EditModal';

class GestionDetails extends Component {
  constructor() {
    super();
    this.state = {
      isOpenEditModal: false,
      justOne: true,
      addresses: [],
      phones: [],
      emails: [],
    };
  }

  componentDidMount() {
    // this.props.getRegions({ all: true }, (body) => {
    //   this.setState({ regions: body });
    // });
  }

  onClickContactoEditar = () => {
    this.setState({ isOpenEditModal: true });
  }

  onChangePhone = (key, index) => (e) => {
    const phones = [...this.state.phones];
    phones[index][key] = e.target.value.replace(/[^0-9\s]/gi, '').trim();
    this.setState({ phones });
  }

  onRemove = index => () => {
    const phones = [...this.state.phones];
    remove(phones, (_, i) => i === index);
    this.setState({ phones });
  }

  addPhone = () => {
    const phones = [...this.state.phones];
    phones.push({ code: '+56', number: '' });
    this.setState({ phones });
  }

  onChangeEmail = (key, index) => (e) => {
    const emails = [...this.state.emails];
    emails[index][key] = e.target.value;
    this.setState({ emails });
  }

  onRemoveEmail = index => () => {
    const emails = [...this.state.emails];
    remove(emails, (_, i) => i === index);
    this.setState({ emails });
  }

  addEmail = () => {
    const emails = [...this.state.emails];
    emails.push({ email: '' });
    this.setState({ emails });
  }

  onChangeAddress = (key, index) => (e) => {
    const addresses = [...this.state.addresses];

    if (key === 'region') {
      addresses[index][key] = {
        value: e.value,
        label: e.label,
      };
      addresses[index].commune = null;
      this.props.getCommuns({ region: e.value }, (body) => {
        addresses[index].coptions = body;
        this.setState({ addresses });
      });
    } else if (key === 'commune') {
      addresses[index][key] = e;
      this.setState({ addresses });
    } else {
      addresses[index][key] = e.target.value;
      this.setState({ addresses });
    }
  }

  onRemoveAddress = index => () => {
    const addresses = [...this.state.addresses];
    remove(addresses, (_, i) => i === index);
    this.setState({ addresses });
  }

  addAddress = () => {
    const addresses = [...this.state.addresses];
    addresses.push({
      street: '', commune: null, region: null, copts: [],
    });
    this.setState({ addresses });
  }

  toggleModalContactEdit = isOk => () => {
    // const isAdmin = isUserAllowed('admin') || isUserAllowed('manager');
    // const { id } = this.props.match.params;
    if (isOk) {
      this.onSubmit();
    } else {
      this.setState({ isOpenEditModal: false });
    }
  }

  findElement = (emails) => {
    let findIt = 0;
    // console.log('emails', emails);
    for (let index = 0; index < emails.length; index += 1) {
      const search = emails[index];
      for (let index2 = 0; index2 < emails.length; index2 += 1) {
        const compare = emails[index2];
        // console.log('search.value', search.value);
        // console.log('compare.value', compare.value);
        if (search.email === compare.email) {
          findIt += 1;
        }
      }
      if (findIt > 1) {
        return true;
      }
      findIt = 0;
    }

    return false;
  }

  findElementPhones = (phones) => {
    let findIt = 0;

    for (let index = 0; index < phones.length; index += 1) {
      const search = phones[index].number;
      for (let index2 = 0; index2 < phones.length; index2 += 1) {
        const compare = phones[index2].number;
        if (search === compare) {
          findIt += 1;
        }
      }
      if (findIt > 1) {
        return true;
      }
      findIt = 0;
    }

    return false;
  }

  onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const {
      emails,
      phones,
      id,
      rut,
    } = this.state;

    if (this.findElement(emails)) {
      showNotification({
        color: 'danger',
        title: 'Atención',
        text: 'Los correos no pueden repetirse.',
      });
      return;
    }

    if (this.findElementPhones(phones)) {
      showNotification({
        color: 'danger',
        title: 'Atención',
        text: 'Los numeros no pueden repetirse.',
      });
      return;
    }


    if ((phones.length === 0)) {
      showNotification({
        color: 'danger',
        title: 'Atención',
        text: 'Debe ingresar al menos un telefono.',
      });
      return;
    }

    if ((emails.length === 0)) {
      showNotification({
        color: 'danger',
        title: 'Atención',
        text: 'Debe ingresar al menos un email.',
      });
      return;
    }

    // console.log('emails', emails);
    // console.log('phones', phones);

    const data = {
      emails,
      phones,
    };

    this.props.updateContact(id, data, () => {
      this.props.resetGetContactByRut(rut);
      this.setState({ isOpenEditModal: false });
    });
  }


  render() {
    const { value, crmInfo } = this.props;
    if (crmInfo && this.state.justOne) {
      // console.log('crmInfo', crmInfo);
      const emailsCrm = map(crmInfo.emails, email => ({ email: email.email, fromTrinidad: email.fromTrinidad }));
      const phonesCrm = map(crmInfo.phones, phone => ({ code: phone.code, number: phone.number, fromTrinidad: phone.fromTrinidad }));
      const id = crmInfo._id;
      const rut = crmInfo.rut;
      this.setState({ emails: emailsCrm, phones: phonesCrm, justOne: false, id, rut });
    }

    const {
      emails,
      phones,
    } = this.state;

    // console.log('phones', phones);

    return (
      <Fragment>
        <EditModal
          isOpen={this.state.isOpenEditModal}
          // value={crmInfo || {}}
          emails={this.state.emails}
          phones={this.state.phones}
          onChangePhone={this.onChangePhone}
          onRemove={this.onRemove}
          addPhone={this.addPhone}
          toggle={this.toggleModalContactEdit}
          onChangeEmail={this.onChangeEmail}
          onRemoveEmail={this.onRemoveEmail}
          addEmail={this.addEmail}
          onChangeAddress={this.onChangeAddress}
          onRemoveAddress={this.onRemoveAddress}
          addAddress={this.addAddress}
        />
        <Col md={2} className="centralice_section2 ">
          <div style={{ display: 'flex' }}>
            <h2 style={{ fontWeight: '600' }}>Cliente</h2>
            {
              (crmInfo) && (
                <Button
                  className="asignar button_details button_profile_detail ml-2"
                  onClick={this.onClickContactoEditar}
                  id="added"
                >
                  Editar
                </Button>
              )
            }
          </div>
          <br />
          <Col style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <FormGroup>
            <h4 className="h_for_cyphir2">Rut</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{setRUTFormat(value.rut)}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Nombre</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{`${value.name} ${value.paternalSurname}`}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Teléfono</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.phone}</Label>
            <br />
            {
              (phones) && (
                map(phones, phone => (
                  <Fragment>
                    <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>
                      {phone.number} {' '}
                      { (phone.fromTrinidad === true) && (
                        <strong>(T)</strong>
                      ) }
                    </Label>
                    <br />
                  </Fragment>
                ))
              )
            }
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Email</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.email}</Label>
            {
              (emails) && (
                map(emails, email => (
                  <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>
                    {email.email} {' '}
                    {(email.fromTrinidad === true) && (
                      <strong>(T)</strong>
                    )}
                  </Label>
                ))
              )
            }
          </FormGroup>
          </Col>
        </Col>
      </Fragment>
    );
  }
}

// const mapStateToProps = () => ({

// });


// const mapDispatchToProps = {

// };
export default connect(null, null, null, { forwardRef: true })(GestionDetails);
