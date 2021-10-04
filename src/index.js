import React from 'react';
import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PhoneInput from 'react-phone-input-2'
import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-input-2/lib/style.css'

const radios = [
    { name: 'Active', value: '0', url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280' },
    { name: 'Radio', value: '1', url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280' },
    { name: 'Radio', value: '2', url: 'https://images.pexels.com/photos/3686227/pexels-photo-3686227.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280' },
  ];

function ContactInfo(props) {
  return (
    <div>
      <h1>Name: {props.name}</h1>
      <h1>Phone: {props.phone}</h1>
      <h1>Pic: {props.radioValue}</h1>
      {props.radioValue
        ? <Image src={radios[props.radioValue].url}
               roundedCircle />
        : null
      }
    </div>
  );
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phone: null,
      radioValue: null,
      setRadioValue: null,
      isContactInfo: false,
    };
  }

  render() {
      if (this.state.isContactInfo) {
        return <ContactInfo name={this.state.name} phone={this.state.phone} radioValue={this.state.radioValue} />;
      } else {
        return (<Container>
          <Form onSubmit={this.onFormSubmit}>
            <Col xs={10} md={3}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                              name="name"
                              htmlSize="20"
                              placeholder="Enter name"
                              onChange={this.handleChange}/>
              </Form.Group>

              <Form.Label>Phone</Form.Label>
              <PhoneInput placeholder="Enter phone number"
                          country="ru"
                          value={this.state.phone}
                          onChange={ phone => this.setState({ phone })}/>
            </Col>
            <br/>
            <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Picture</Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row>
                    {radios.map((radio, idx) => (
                      <Col xs={6} md={4}>
                      <Image src={radio.url}
                             roundedCircle />
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <ButtonGroup className="mb-2">
                      {radios.map((radio, idx) => (
                        <Col xs={6} md={4}>
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={this.state.radioValue === radio.value}
                            onChange={(radioValue) => this.setState({ radioValue: radioValue.currentTarget.value })}
                          >
                            {radio.name}
                          </ToggleButton>
                        </Col>
                      ))}
                    </ButtonGroup>
                  </Row>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
            </Accordion>

            <br/>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>);
      }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log("hello there I am working");
    this.setState({ isContactInfo: true });
  }
}



ReactDOM.render(
  <ContactForm />,
  document.getElementById('root')
);
