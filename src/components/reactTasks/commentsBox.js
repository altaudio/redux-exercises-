import React from 'react'
import DisplayComments from './displayComments'

class CommentsBox extends React.Component {

  constructor() {
    super()

    // Declare comments array and current comment and name
    this.state = { comments: [
      { name: 'Dan Ellin', comment: 'This game is totes amazeballs' },
      { name: 'Gordon Miller', comment: 'I love grand designs me' },
      { name: 'Dan Ellin', comment: 'Gordon what is ur fave epsiode?' },
      { name: 'h8GrndDesgns', comment: 'Kevin is a idiot' },
      { name: 'Hello', comment: 'I Just watched the one with the windmill' }
    ],
      comment: '',
      name: '',
      moreComments: 'true',
      commentsMax: '4',
      moreCommentsLabel: 'Show All Comments' }
  }

  // When comment input field changes set comment in state
  commentChange(input) {
    this.setState({ comment: input.target.value })
  }

  // When name input changes set name in state
  nameChange(input) {
    this.setState({ name: input.target.value })
  }

  // When add comment button clicked add current name and comment to comments state, and clear both input fields
  addComment() {
    this.setState({ comments:
    [{ name: this.state.name, comment: this.state.comment },
      ...this.state.comments],
      comment: '',
      name: ''
    })
  }

  // Show more or less comments and change button text
  moreComments() {
    // Set more or less comments bool to inverse
    this.setState({ moreComments: !this.state.moreComments })

    // If more comments is true show all comments and change button text to show less comments
    if (this.state.moreComments) {
      this.setState({ commentsMax: this.state.comments.length, moreCommentsLabel: 'Show Less Comments' })
    } else {
    // if more comments is false, show 4 comments and hcange button text to show more comments
      this.setState({ commentsMax: '4', moreCommentsLabel: 'Show More Comments' })
    }
  }

  render() {
    return (
      <div>
        <h3>Comments</h3>
        <DisplayComments comments={this.state.comments} commentsMax={this.state.commentsMax} />
        <button onClick={() => this.moreComments()}>{this.state.moreCommentsLabel}</button>

        <h3>Add Comment</h3>
        <p>Name:</p>
        <input value={this.state.name} onChange={(value) => this.nameChange(value)} />

        <p>Comment:</p>
        <input value={this.state.comment} onChange={(value) => this.commentChange(value)} />

        <button onClick={() => this.addComment()}>Add Comment</button>

      </div>
    )
  }

}

export default CommentsBox

