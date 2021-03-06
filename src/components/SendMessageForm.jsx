import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import connect from '../connect';

@reduxForm({ form: 'newMessage' })
@connect()

class SendMessageForm extends React.Component {
  sendMessage = async ({ message }) => {
    const {
      sendMessage,
      showError,
      reset,
      currentChannelId,
      user,
    } = this.props;
    try {
      await sendMessage(message, currentChannelId, user);
    } catch (e) {
      showError(e);
      throw new SubmissionError(`${e.name}: ${e.message}`);
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid">
        <form className="form" onSubmit={handleSubmit(this.sendMessage)}>
          <div className="input-group mb-3">
            <Field className="col" name="message" placeholder="message" component="input" required type="text" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" disabled={submitting} type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
