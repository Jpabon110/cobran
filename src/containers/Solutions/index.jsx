/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import {
  Card,
  CardBody,
  Container,
  Row,
  // Col,
  // FormGroup,
  // Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import SolutionsContent from './components/solutionsContent';


// const ConfigContent = props => (
class Solutions extends PureComponent {
  constructor() {
    super();
    this.state = {
      // nRecordLoad: 0,
      // nRecordIncidences: 0,
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <Container className="dashboard">
        <Card>
          <CardBody>
            <Row>
              <SolutionsContent
              title={'Solutions'}
              />
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

// const mapStateToProps = ({ resources }) => ({
//   settings: resources.settings,
//   loadingSetting: resources.loadingSetting,
//   loadingSettingUrlCustomer: resources.loadingSettingUrlCustomer,
//   settingsUrlCustomer: resources.settingsUrlCustomer,
//   loadingSettingUrlPre: resources.loadingSettingUrlPre,
//   settingsUrlPre: resources.settingsUrlPre,
//   settingsUrlPreInternal: resources.settingsUrlPreInternal,
//   loadingSettingUrlPreInternal: resources.loadingSettingUrlPreInternal,
// });


// const mapDispatchToProps = {
//   getSettings,
//   getSettingsUrlCustomerService,
//   getSettingsUrlPrePaid,
//   getSettingsUrlPrePaidInternal,
// };


export default connect(null, null, null, { forwardRef: true })(Solutions);
