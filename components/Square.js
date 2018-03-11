import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'

import Styles from './Styles'

export default class extends Component {
  handleClick () {
    this.props.handleClick()
  }

  render () {
    const value = this.props.value
    const dimensions = this.props.dimensions
    const landscape = dimensions.width > dimensions.height

    return (
      <TouchableHighlight
        style={[
          landscape ? Styles.landscape.square : Styles.portrait.square,
          Styles.general.flex,
          Styles.general.flexCenter,
          Styles.general.border,
          Styles.general.borderGrey,
          Styles.general.bgWhite
        ]}
        onPress={() => this.handleClick()}
        activeOpacity={0.8}
        underlayColor='#eee'
      >
        <Text
          style={[landscape ? Styles.landscape.h1 : Styles.portrait.h1, isNaN(value) ? Styles.general[value] : '']}
        >
          {value}
        </Text>
      </TouchableHighlight>
    )
  }
}
