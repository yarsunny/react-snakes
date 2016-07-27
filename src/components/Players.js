import React from 'react';

export default class Players extends React.Component {
  render () {
    const { all, current } = this.props.players;
    return (
      <div>
      {
        all.map((p, index) => {
          return (
            <Player player={p} key={`player_${index}`} />
          );
        })
      }
      </div>
    )
  }
}

class Player extends React.Component {
  render () {
    const { id, pos, color } = this.props.player;
    return (
      <div style={{background: color}}>
        {id}-{pos}
      </div>
    )
  }
}
