/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import {
  Card,
  CardBody,
  Container,
  Row,
} from 'reactstrap';
import UploadFile from './components/uploadFile';
// import ResumeFile from './components/resumeFile';

// const Asignation = props => (
class Asignation extends PureComponent {
  constructor() {
    super();
    this.state = {
      // nRecordLoad: 0,
      // nRecordIncidences: 0,
    };
  }

  // recordsCounts = (values) => {
  //   this.setState({
  //     nRecordLoad: values.insert,
  //     nRecordIncidences: values.arrError.length,
  //   });
  // };

  render() {
    return (
      <Container className="dashboard">
        <Card>
          <CardBody>
            <Row>
              <UploadFile
                title="Cargar de archivo mora"
                recordsCounts={this.recordsCounts}
                // {...props}
              />
              {/* <ResumeFile
                title="Resumen carga"
                nRecordLoad={this.state.nRecordLoad}
                nRecordIncidences={this.state.nRecordIncidences}
              /> */}
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
// );

export default Asignation;
