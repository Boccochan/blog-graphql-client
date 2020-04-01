import * as React from 'react';

interface BlogProps {
  userName?: string;

  first?: number;

  last?: number;

  after?: string;

  before?: string;

  filter?: string[];
}

class Blog extends React.Component<BlogProps, {}> {
  render() {
    return (
      <div>
        {this.props.userName}
        {this.props.first}
        {this.props.last}
        {this.props.after}
        {this.props.before}
      </div>
    );
  }
}

export default Blog;
