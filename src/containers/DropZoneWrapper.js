import React, { Component } from 'react'
import DropZone from 'react-dropzone'

class DropZoneWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.acceptTypes = this.props.fileTypes && this.props.fileTypes.join(',') // @bug? for some reasons, string prop doesn't work

    this.dragEnter = this.onDragEnter.bind(this)
    //this.dragOver = this.onDragOver.bind(this)
    this.dragLeave = this.onDragLeave.bind(this)
    this.drop = this.onDrop.bind(this)
  }

  onDragEnter() {
    this.setState({
      active: true
    })
  }

  onDragOver() {}

  onDragLeave() {
    this.setState({
      active: false
    })
  }
  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      active: false
    })

    this.props.onDrop(acceptedFiles, rejectedFiles)
  }

  render() {
    return (
      <DropZone
        disableClick
        className="drop-zone"
        accept={this.acceptTypes}
        onDragEnter={this.dragEnter}
        onDragOver={this.dragOver}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}
      >
      {this.props.children}
      </DropZone>

    )
  }

}

export default DropZoneWrapper