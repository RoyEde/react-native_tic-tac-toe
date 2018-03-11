import React, { Component } from 'react'
import { Modal, Picker, Text, TouchableHighlight, View } from 'react-native'

import Styles from './Styles'

export default class extends Component {
  handleClick (v) {
    this.props.handleChoice(v)
  }

  handleChange (v) {
    this.props.handleChange(v)
  }

  handleConfirm () {
    if (this.props.chosen === null && this.props.mode !== 2) window.alert('Please choose!')
    else this.props.handleConfirm()
  }

  render () {
    const mode = this.props.mode
    const chosen = this.props.chosen
    const dimensions = this.props.dimensions
    const landscape = dimensions.width > dimensions.height

    return (
      <Modal
        visible={this.props.start}
        onRequestClose={() => this.handleConfirm()}
        animationType='fade'
        transparent={true}
      >
        <View
          style={[
            landscape ? Styles.landscape.overlay : Styles.portrait.overlay,
            Styles.general.flex,
            Styles.general.row,
            Styles.general.flexCenter,
            Styles.general.bgTransparentWhite
          ]}
        >
          <View
            style={[
              landscape ? Styles.landscape.start : Styles.portrait.start,
              Styles.general.border,
              Styles.general.borderBlack,
              Styles.general.bgWhite,
              Styles.general.flex,
              Styles.general.flexCenter
            ]}
          >
            <Text
              style={[landscape ? Styles.landscape.h4 : Styles.portrait.h4, Styles.general.bold, Styles.general.centerText]}
            >
              Choose your side!
            </Text>
            <View
              style={[Styles.general.flex, Styles.general.row]}
            >
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor='#eee'
                onPress={() => this.handleClick(true)}
                style={[
                  landscape ? Styles.landscape.select : Styles.portrait.select,
                  landscape ? Styles.landscape.mTop : Styles.portrait.mTop,
                  Styles.general.flex,
                  Styles.general.flexCenter,
                  Styles.general.border,
                  Styles.general.borderGrey,
                  mode !== 2 ? Styles.general.show : Styles.general.hide,
                  chosen !== null ? (chosen ? Styles.general.bgChosen : Styles.general.bgWhite) : Styles.general.bgWhite
                ]}
              >
                <Text
                  style={[Styles.general.X, landscape ? Styles.landscape.h2 : Styles.portrait.h2]}
                >
                  X
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor='#eee'
                onPress={() => this.handleClick(false)}
                style={[
                  landscape ? Styles.landscape.select : Styles.portrait.select,
                  landscape ? Styles.landscape.mTop : Styles.portrait.mTop,
                  Styles.general.flex,
                  Styles.general.flexCenter,
                  Styles.general.border,
                  Styles.general.borderGrey,
                  mode !== 2 ? Styles.general.show : Styles.general.hide,
                  chosen !== null ? (!chosen ? Styles.general.bgChosen : Styles.general.bgWhite) : Styles.general.bgWhite
                ]}
              >
                <Text
                  style={[Styles.general.O, landscape ? Styles.landscape.h2 : Styles.portrait.h2]}
                >
                  O
                </Text>
              </TouchableHighlight>
            </View>
            <View
              style={[
                Styles.general.border,
                Styles.general.borderGrey,
                Styles.general.bgWhite,
                landscape ? Styles.landscape.mTop : Styles.portrait.mTop
              ]}
            >
              <Picker
                style={[
                  landscape ? Styles.landscape.type : Styles.portrait.type
                ]}
                selectedValue={mode}
                onValueChange={(itemValue, itemIndex) => this.handleChange(itemIndex)}
              >
                <Picker.Item
                  value={0}
                  label='Machine (Impossible)'
                />
                <Picker.Item
                  value={1}
                  label='Machine (Random)'
                />
                <Picker.Item
                  value={2}
                  label='1 vs 1'
                />
              </Picker>
            </View>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor='#eee'
              onPress={() => this.handleConfirm()}
              style={[
                Styles.general.border,
                Styles.general.borderGrey,
                Styles.general.roundButton,
                Styles.general.buttonPadding,
                landscape ? Styles.landscape.mTop : Styles.portrait.mTop,
                landscape ? Styles.landscape.button : Styles.portrait.button
              ]}
            >
              <Text
                style={[
                  landscape ? Styles.landscape.h4 : Styles.portrait.h4,
                  Styles.general.centerText
                ]}
              >
                Confirm
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}
