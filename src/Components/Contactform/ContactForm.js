import React from "react";
import { Container } from "react-bootstrap";
import styles from '../../Styles/ContactForm.module.css';


export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
      <Container>
        <h3>Contact Me</h3>
        <form
          onSubmit={this.submitForm}
          action="https://formspree.io/xbjyonzw"
          method="POST"
          className= {styles.form}
        >
          <label>Name: </label>
          <input type="text" name='name' className={styles.messageInput} />
          <label>Email: </label>
          <input type="email" name="email" className={styles.messageInput} />
          <label>Message: </label>
          {/* <input type="text" name="message" /> */}
          <textarea className={styles.messageInput} name="message"></textarea>

          {status === "SUCCESS" ? <p>Thanks!</p> : <button>Submit</button>}
          {status === "ERROR" && <p>Ooops! There was an error.</p>}
        </form>
      </Container>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}