import React, { Component } from 'react'

class SendImageButton extends Component {
  constructor(props) {
    super(props)

    this.acceptTypes = "image/*";
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.props.fileHandler(e.target.files)
    }
  }

  render() {
    return (
      <input type="file" accept={this.acceptTypes} onChange={this.handleChange}/>
    )
  }
}

export default SendImageButton