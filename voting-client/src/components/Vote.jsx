import React from 'react';

export default React.createClass({
  getPair: function () {
    return this.props.pair || [];
  },
  hasVotedFor: function (entry) {
    return this.props.hasVoted === entry;
  },
  isDisabled: function () {
    return !!this.props.hasVoted;
  },
  render: function () {
    return (
      <div className='voting'>
        {this.getPair().map(entry => (
          
          <button key={entry}
                  disabled={this.isDisabled()}
                  onClick={() => this.props.vote(entry)} >

            <h1>{entry}</h1>

            {this.hasVotedFor(entry) ?
              <div className='label'>Voted</div> :
              null}

          </button>
        ))}
      </div>
    );
  }
});