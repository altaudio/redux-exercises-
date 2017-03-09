import React from 'react'
import _ from 'lodash'

class DisplayComments extends React.Component {

  // Render a list of the amount of comments passed in commmentsMax prop
  render() {
    // Get commentsMax amount of comments
    const comments = _.take(this.props.comments, this.props.commentsMax)

    return (
      <ul>
        {_.map(comments, (comment) => {
          return <li>{`${comment.name} commented: ${comment.comment}`}</li>
        }
        )}
      </ul>
    )
  }
}

export default DisplayComments
