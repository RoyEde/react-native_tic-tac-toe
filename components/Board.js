import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Square from './Square'

import Styles from './Styles'

export default class extends Component {
  constructor () {
    super()

    this.state = {
      cells: emptyIndexes(Array(9).fill(null)),
      nextX: true,
      human: null,
      ai: null
    }
  }

  componentWillReceiveProps (n) {
    this.setState({
      human: n.chosen ? 'X' : 'O',
      ai: !n.chosen ? 'X' : 'O'
    })

    if (n.mode < 2 && !n.start) {
      if (n.mode && !n.chosen) this.play(randMove())
      if (!n.mode && !n.chosen) this.play(4)
    }
  }

  reset () {
    this.setState({
      cells: emptyIndexes(Array(9).fill(null)),
      nextX: true
    })
    this.props.reset()
  }

  play (v) {
    const state = this.state
    const mode = this.props.mode
    const cells = state.cells.slice()

    if (win(cells, state.human) || win(cells, state.ai) || isNaN(cells[v])) return

    cells[v] = state.nextX ? 'X' : 'O'

    if (mode === 2 || (emptyIndexes(cells).length === 8 && !this.props.chosen)) {
      return this.setState({
        cells: cells,
        nextX: !this.state.nextX
      })
    }

    if (win(cells, state.human) || tie(cells)) {
      return this.setState({
        cells: cells,
        nextX: !state.nextX
      })
    }

    let move

    if (mode === 1) {
      move = randMove()

      while (isNaN(cells[move])) move = randMove()

      cells[move] = !state.nextX ? 'X' : 'O'
    }

    if (mode === 0) {
      move = aiPlay(cells, state.ai, state.human)
      cells[move] = !state.nextX ? 'X' : 'O'
    }

    this.setState({
      cells: cells
    })
  }

  render () {
    const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    const cells = this.state.cells
    const player = !this.state.nextX ? 'X' : 'O'
    const dimensions = this.props.dimensions
    const landscape = dimensions.width > dimensions.height

    return (
      <View
        style={[
          Styles.general.flex,
          Styles.general.flexCenter,
          Styles.general.column
        ]}
      >
        <View
          style={[Styles.general.flex, Styles.general.flexCenter]}
        >
          <Text
            style={[
              landscape ? Styles.landscape.h1 : Styles.portrait.h1,
              Styles.general.centerText
            ]}
          >
            Tic-Tac-Toe
          </Text>
          <Text
            style={[
              landscape ? Styles.landscape.h4 : Styles.portrait.h4,
              Styles.general.centerText,
              !this.props.start ? Styles.general.show : Styles.general.hide
            ]}
          >
            {`Mode: ${this.props.mode === 2 ? '1 vs 1' : this.props.mode === 1 ? 'AI-Random' : 'AI-Impossible'}`}
          </Text>
          <Text
            style={[
              landscape ? Styles.landscape.h4 : Styles.portrait.h4,
              Styles.general.centerText,
              !this.props.start ? Styles.general.show : Styles.general.hide
            ]}
          >
            {
              `${win(cells, player) ? `Won: ${win(cells, player)}`
                : (tie(cells) ? 'Tied' : (`Turn: ${this.state.nextX ? 'X' : 'O'}`))}`
            }
          </Text>
          <TouchableHighlight
            style={[
              landscape ? Styles.landscape.button : Styles.portrait.button,
              Styles.general.roundButton,
              Styles.general.buttonPadding,
              Styles.general.border
            ]}
            onPress={() => this.reset()}
            activeOpacity={0.8}
            underlayColor='#eee'
          >
            <Text
              style={[
                Styles.general.centerText,
                landscape ? Styles.landscape.h4 : Styles.portrait.h4
              ]}
            >
              Reset
            </Text>
          </TouchableHighlight>
        </View>
        <View
          style={[
            landscape ? Styles.landscape.mTop : Styles.portrait.mTop,
            Styles.general.border,
            Styles.general.borderBlack
          ]}
        >
          { board.map(i => (
            <View
              style={[Styles.general.flex, Styles.general.row]}
              key={i}
            >
              {i.map(j => (
                <Square
                  handleClick={() => this.play(j)}
                  value={
                    isNaN(cells[j]) ? cells[j] : ''
                  }
                  key={j}
                  dimensions={dimensions}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    )
  }
}

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const aiPlay = (cells, ai, human) => {
  const available = emptyIndexes(cells)
  const pattern = [4, 0, 8, 2, 6, 1, 5, 7, 3].filter(v => available.indexOf(v) !== -1)

  if (specialMove(cells, ai, available) !== false) return specialMove(cells, ai, available)

  if (specialMove(cells, human, available) !== false) return specialMove(cells, human, available)

  // check for loopholes in the strategy
  if (loophole(cells, human, available)) return loophole(cells, human, available)

  return pattern[0]
}

const specialMove = (cells, player, available) => {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (cells[b] === player && cells[b] === cells[c] && available.indexOf(a) !== -1) return a
    if (cells[c] === player && cells[c] === cells[a] && available.indexOf(b) !== -1) return b
    if (cells[a] === player && cells[a] === cells[b] && available.indexOf(c) !== -1) return c
  }
  return false
}

const loophole = (cells, player, available) => {
  const holes = [[5, 6, 1], [2, 6, 1], [0, 8, 7], [5, 7, 2], [2, 7, 3]] // list of loopholes and solutions. This will be updated.

  for (let i = 0; i < holes.length; i++) {
    if (cells[holes[i][0]] === player &&
      cells[holes[i][1]] === player &&
      available.length === 6 &&
      available.indexOf(holes[i][2] !== -1)) return holes[i][2]
  }

  return false
}

const win = (cells, player) => {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (cells[a] === player && cells[a] === cells[b] && cells[a] === cells[c]) {
      return player
    }
  }
  return false
}

const tie = (cells) => {
  for (let i = 0; i < cells.length; i++) {
    if (!isNaN(cells[i])) return false
  }

  return true
}

const randMove = () => Math.floor((Math.random() * 9))

const emptyIndexes = (cells) => cells.map((v, i) => v !== null ? v : i).filter(s => !isNaN(s))
