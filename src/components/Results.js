import React from 'react';
import SortableResultItem from './results/SortableResultItem'

export default class Results extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      draggingIndex: null,
      data: this.props.players
    }
  }

  updateState (obj) {
    this.setState(obj);
  }

  render () {
    return (
      <div className="list">
      {
        this.state.data.map((playerStat, i) => {
          const { id, pos, color, path, diceLog, snakeBites, ladderHikes } = playerStat;
          return (
            <SortableResultItem
              key={i}
              updateState={this.updateState.bind(this)}
              items={this.state.data}
              draggingIndex={this.state.draggingIndex}
              sortId={i}
              outline="list">              
              <p>Player Id: {id}</p>
              <p>Dice thrown: {diceLog.length}</p>
              <p>Sixes rolled: {(diceLog.filter((dice) => dice === 6)).length}</p>
              <p>Snake bites: {snakeBites}</p>
              <p>Ladder hikes: {ladderHikes}</p>
            </SortableResultItem>
          )
        })
      }
      </div>
    )
  }
}
