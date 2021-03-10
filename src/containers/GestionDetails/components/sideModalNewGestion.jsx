/* eslint-disable no-useless-return */
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
  FormGroup,
  Col,
  Button, ButtonToolbar,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloseIcon from 'mdi-react/CloseIcon';
import { connect } from 'react-redux';
import {
  createGestion,
  getAllGestionsManagement,
} from '../../../redux/actions/gestionsActions';
import showNotification from '../../../helpers/notification';

class sideModalNewGestion extends Component {
  constructor() {
    super();
    this.state = {
      typeGestion: undefined,
      phone: undefined,
      email: undefined,
      statusCall: undefined,
      gloss: undefined,
      commitment: undefined,
      dateCommitment: undefined,
      task: undefined,
      justOne: false,
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const { phone, email } = this.props;
    const { justOne } = this.state;
    if (phone && !justOne && email) {
      this.setState({ phone, justOne: true, email });
    }
  }

  handleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  onChangeInput = key => (e) => {
    if ((key === 'statusCall')
        || (key === 'commitment')
        || (key === 'task')
        || (key === 'dateCommitment')) {
      this.setState({ [key]: e });
    } else if (key === 'phone') {
      this.setState({ [key]: e.target.value.replace(/[^0-9\s]/gi, '').trim() });
    } else if (key === 'typeGestion') {
      this.setState({ [key]: e, task: undefined });
    } else {
      this.setState({ [key]: e.target.value });
    }
  }

  onSubmitNewGestion = (e) => {
    if (e) {
      e.preventDefault();
    }

    const {
      typeGestion,
      phone,
      email,
      statusCall,
      gloss,
      commitment,
      dateCommitment,
      task,
    } = this.state;

    if (typeGestion === undefined) {
      showNotification({
        text: 'Debe seleccionar un tipo de géstion.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    if ((typeGestion) && (typeGestion.value === 'call') && (phone === undefined)) {
      showNotification({
        text: 'Debe ingresar un Teléfono.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    if ((typeGestion) && (typeGestion.value === 'call') && (statusCall === undefined)) {
      showNotification({
        text: 'Debe seleccionar un estado de la llamada.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    if ((typeGestion) && (typeGestion.value === 'email') && (email === undefined)) {
      showNotification({
        text: 'Debe ingresar un correo.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    if (commitment === undefined) {
      showNotification({
        text: 'Debe ingresar una fecha del compromiso.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    if ((commitment) && (commitment.value === 'with') && (dateCommitment === undefined)) {
      showNotification({
        text: 'Debe ingresar una fecha del compromiso.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    if (task === undefined) {
      showNotification({
        text: 'Debe seleccionar una tarea.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
      return;
    }

    const data = {
      typeGestion: typeGestion.value,
      phone,
      email,
      gloss,
      statusCall: (statusCall && statusCall.value) ? statusCall.value : undefined,
      commitment: commitment.value,
      dateCommitment,
      task: task.value,
    };

    // {
    //   "typeGestion":"call",
    //   "phone": "ReCall",
    //   "statusCall": "answer",
    //   "gloss": "se llamo y se llego a un compromiso de pago ",
    //   "commitment": "with",
    //   "dateCommitment": "2019-10-04",
    //   "task": ""
    // }

    this.sendData(data);
  }

  sendData = (data) => {
    const {
      match,
    } = this.props;

    const { id } = match.params;
    this.props.createGestion(id, data, () => {
      this.setState({
        editField: true,
        showButton: false,
        typeGestion: {},
        phone: '',
        email: '',
        statusCall: {},
        gloss: '',
        commitment: {},
        dateCommitment: null,
        task: null,
      });
      document.getElementById('cancelar').click();
      this.props.getAllGestionsManagement(id);
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { customizerClass,
      handleOpen } = this.props;
    const typesOptions = [
      { value: 'call', label: 'Llamada' },
      { value: 'email', label: 'Correo' },
      { value: 'faceToFace', label: 'Presencial' },
    ];
    const statusCall = [
      { value: 'answer', label: 'Contestada' },
      { value: 'noReplay', label: 'No Contesta' },
    ];
    const taskListCall = [
      { value: 'ReCall', label: 'Llamar de nuevo' },
      { value: 'none', label: 'ninguna' },
    ];
    const taskListEmail = [
      { value: 'answer', label: 'Escribir de nuevo' },
      { value: 'noReplay', label: 'No Contesta' },
    ];
    const commitmentOptions = [
      { value: 'with', label: 'Con compromiso' },
      { value: 'out', label: 'Sin compromiso' },
    ];

    return (
      <div className="customizer">
        <div className={customizerClass} style={{ overflowY: 'scroll' }}>
          <div className="customizer__title-wrap" style={{ borderBottom: '0px' }}>
            <h4>Nueva Géstion</h4>
            <button className="customizer__close-btn" type="button" onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>
            <Row style={{ justifyContent: 'center' }}>
              <Col md="10">
                <FormGroup>
                  <Label className="label_autofin" for="typeGestion">*Tipo de géstion</Label>
                  <Select
                    options={typesOptions}
                    type="text"
                    placeholder="seleccione"
                    name="typeGestion"
                    id="typeGestion"
                    value={this.state.typeGestion}
                    onChange={this.onChangeInput('typeGestion')}
                    typeGestionred
                  />
                </FormGroup>
              </Col>
              {
                ((this.state.typeGestion) && (this.state.typeGestion.value === 'call')) && (
                  <Fragment>
                    <Col sm="10">
                      <FormGroup>
                        <Label className="label_autofin" for="profile">*Teléfono</Label>
                        <Input
                          className="mb-2"
                          maxLength="9"
                          minLength="9"
                          onChange={this.onChangeInput('phone')}
                          value={this.state.phone}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="10">
                      <FormGroup>
                        <Label className="label_autofin" for="statusCall">*Estado</Label>
                        <Select
                          options={statusCall}
                          type="text"
                          placeholder="seleccione"
                          name="statusCall"
                          id="statusCall"
                          value={this.state.statusCall}
                          onChange={this.onChangeInput('statusCall')}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Fragment>
                )
              }
              {
                ((this.state.typeGestion) && (this.state.typeGestion.value === 'email')) && (
                  <Fragment>
                    <Col sm="10">
                      <FormGroup>
                        <Label className="label_autofin" for="profile">*Correo</Label>
                        <Input
                          className="mb-2"
                          maxLength="30"
                          minLength="30"
                          onChange={this.onChangeInput('email')}
                          value={this.state.email}
                        />
                      </FormGroup>
                    </Col>
                  </Fragment>
                )
              }
              <Col md="10">
                <FormGroup>
                  <Label className="label_autofin" for="type">Glosa</Label>
                  <Input
                    type="textarea"
                    maxLength="200"
                    minLength="30"
                    style={{ height: '100px' }}
                    name="clientActivity"
                    id="clientActivity"
                    className="newArea"
                    value={this.state.gloss}
                    onChange={this.onChangeInput('gloss')}
                  />
                </FormGroup>
              </Col>
              <Col md="10">
                <FormGroup>
                  <Label className="label_autofin" for="type">Compromiso</Label>
                  <Select
                    options={commitmentOptions}
                    type="text"
                    placeholder="seleccione"
                    name="type"
                    id="type"
                    value={this.state.commitment}
                    onChange={this.onChangeInput('commitment')}
                    required
                  />
                </FormGroup>
              </Col>
              {
                ((this.state.commitment) && (this.state.commitment.value === 'with')) && (
                  <Col md="10">
                    <FormGroup>
                      <Label className="label_autofin" for="type">Fecha Compromiso</Label>
                      <DatePicker
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        name="appointment"
                        id="appointment"
                        selected={this.state.dateCommitment}
                        onChange={this.onChangeInput('dateCommitment')}
                        required
                      />
                    </FormGroup>
                  </Col>
                )
              }
              <Col md="10">
                <FormGroup>
                  <Label className="label_autofin" for="type">*Tarea</Label>
                  <Select
                    options={((this.state.typeGestion) && (this.state.typeGestion.value === 'call')) ? taskListCall : taskListEmail}
                    type="text"
                    placeholder="seleccione"
                    name="type"
                    id="type"
                    value={this.state.task}
                    onChange={this.onChangeInput('task')}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          <ButtonToolbar className="modal__footer" style={{ justifyContent: 'flex-end' }}>
            <Button className="asignar" id="cancelar" onClick={handleOpen} style={{ fontSize: '10px' }}>Cancelar</Button>{' '}
            <button type="button" onClick={this.onSubmitNewGestion} className="btn2 greys">
              <span className="lnr lnr-file-add icon_standars" />
              Guardar géstion
            </button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gestion }) => ({
  gestionsManagement: gestion.gestionsManagement,
  disable: gestion.disable,
});

const mapDispatchToProps = {
  createGestion,
  getAllGestionsManagement,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(sideModalNewGestion);
