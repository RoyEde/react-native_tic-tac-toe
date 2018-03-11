import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import Board from './components/Board'
import Start from './components/Start'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = {
      start: true,
      chosen: null,
      mode: 0,
      dimensions: Dimensions.get('window')
    }
  }

  componentWillMount () {
    Dimensions.addEventListener('change', (newDimensions) => this.resize(newDimensions['window']))
  }

  resize (newDimensions) {
    this.setState({dimensions: newDimensions})
  }

  handleChoice (v) {
    this.setState({
      chosen: v
    })
  }

  handleConfirm () {
    this.setState({
      start: false
    })
  }

  handleChange (v) {
    this.setState({mode: parseInt(v, 10)})
  }

  reset () {
    this.setState({
      start: true,
      chosen: null
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Board
          start={this.state.start}
          mode={this.state.mode}
          chosen={this.state.chosen}
          reset={() => this.reset()}
          dimensions={this.state.dimensions}
        />
        {
          this.state.start &&
          (
            <Start
              handleChoice={(v) => this.handleChoice(v)}
              handleChange={(v) => this.handleChange(v)}
              handleConfirm={() => this.handleConfirm()}
              chosen={this.state.chosen}
              mode={this.state.mode}
              dimensions={this.state.dimensions}
            />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
