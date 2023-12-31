import React from "react";

class Input extends React.Component {
  state = {
    text: ""
  }
onChange(e) {
    this.setState({text: e.target.value});
}
onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
}
render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Upiši poruku i pritisni ENTER ili klikni na Šalji"
            autoFocus={true}
          />
          <button>Šalji</button>
        </form>
      </div>
    );
  }
}

export default Input;