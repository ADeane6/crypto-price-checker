import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addCoin, removeCoin } from '../../redux/reducers';
import Select from 'react-select'

import 'react-select/dist/react-select.css'

class AddCoin extends Component {

  state = {
    selectedOption: '',
    selectedRemoveOption: ''
  }

  getAddOptions = () => {
    const trackedCoinNames = this.props.trackedCoins.map( coin => coin.name )
    return Object.keys( this.props.coins || {} )
      .filter( coin => !trackedCoinNames.includes( coin ) )
      .reduce( ( accumulator, key ) => {
        const value = this.props.coins[key]
        const coin = { name: value.name, symbol: value.symbol }
        return [...accumulator, { label: `${coin.name} (${coin.symbol})`, coin }]
      }, [] );
  }

  getRemoveOptions = () => {
    return this.props.trackedCoins.map( coin => ( { label: `${coin.name} (${coin.symbol})`, coin: coin.name } ) )
  }

  handleAddChange = ( selectedOption ) => {
    this.setState( { selectedOption } );
  }

  handleRemoveChange = ( selectedOption ) => {
    console.log( selectedOption )
    this.setState( { selectedRemoveOption: selectedOption } );
  }

  handleAdd = () => {
    this.props.actions.addCoin( this.state.selectedOption.coin )
    this.setState( { selectedOption: '' } )
  }

  handleRemove = ( selectedOption ) => {
    this.props.actions.removeCoin( this.state.selectedRemoveOption.coin )
    this.setState( { selectedRemoveOption: '' } )
  }

  render() {
    return (
      <div>
        <Select
          placeholder="Add coin"
          name="select-coin"
          value={this.state.selectedOption}
          onChange={this.handleAddChange}
          options={this.getAddOptions()}
          scrollMenuIntoView={false}
        />
        <button onClick={this.handleAdd}>Add coin</button>
        <Select
          placeholder="Remove coin"
          name="select-coin"
          value={this.state.selectedRemoveOption}
          onChange={this.handleRemoveChange}
          options={this.getRemoveOptions()}
          scrollMenuIntoView={false}
        />
        <button onClick={this.handleRemove}>Remove coin</button>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return { trackedCoins: state.coins };
};
function mapDispatchToProps( dispatch ) {
  return {
    actions: bindActionCreators( { addCoin, removeCoin }, dispatch ),
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( AddCoin );