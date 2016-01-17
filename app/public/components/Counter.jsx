import React, { Component, PropTypes } from 'react'
import {Button} from 'antd'

class Counter extends Component {
  render() {
      console.log(this.props);
    const { increment, incrementIfOdd, incrementAsync, decrement } = this.props.action;
    return (
      <p>
        Clicked: {this.props.mycounter} timess
        {' '}
        <Button onClick={increment}>+</Button>
        {' '}
        <Button onClick={decrement}>-</Button>
        {' '}
        <Button onClick={incrementIfOdd}>Increment if odd</Button>
        {' '}
        <Button onClick={() => incrementAsync()}>Increment async!</Button>
      </p>
    )
  }
}

Counter.propTypes = {
    action: PropTypes.object.isRequired,
  mycounter: PropTypes.number.isRequired
}

export default Counter
