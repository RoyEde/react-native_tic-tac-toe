import { Dimensions, StyleSheet } from 'react-native'

const D = Dimensions.get('window')

const variableStyles = (height, width, orientation) => {
  return {
    // Custom styled containers (Size)
    overlay: {
      width: width,
      height: height,
      top: 0,
      left: 0
    },
    start: {
      width: Math.floor(width / 1.1),
      height: Math.floor(orientation ? height / 1.6 : height / 2.9)
    },
    square: {
      width: Math.floor(orientation ? width / 12.8 : width / 3.6),
      height: Math.floor(orientation ? height / 7.2 : height / 6.4)
    },
    select: {
      width: Math.floor(orientation ? width / 16 : width / 9),
      height: Math.floor(orientation ? height / 9 : height / 16),
      marginLeft: Math.floor(orientation ? width / 16 : width / 12),
      marginRight: Math.floor(orientation ? width / 16 : width / 12)
    },
    type: {
      width: Math.floor(orientation ? width / 2.6 : width / 1.6)
    },
    button: {
      width: Math.floor(orientation ? width / 7.2 : width / 3.2)
    },
    mTop: {
      marginTop: Math.floor(orientation ? height / 36 : height / 64)
    },
    h1: {
      fontSize: Math.floor(orientation ? height / 12 : height / 16)
    },
    h2: {
      fontSize: Math.floor(orientation ? height / 22.5 : height / 32)
    },
    h4: {
      fontSize: Math.floor(orientation ? height / 24 : height / 35.6)
    }
  }
}

const portrait = StyleSheet.create(D.width > D.height ? variableStyles(D.width, D.height, false) : variableStyles(D.height, D.width, false))
const landscape = StyleSheet.create(D.width > D.height ? variableStyles(D.height, D.width, true) : variableStyles(D.width, D.height, true))

const general = StyleSheet.create({
  // Custom styled text (Colors)
  X: {
    color: '#ff0000'
  },
  O: {
    color: '#0000ff'
  },
  // Custom styled buttons & picker
  roundButton: {
    borderRadius: 7
  },
  buttonPadding: {
    padding: D.width >= 768 || D.height >= 768 ? 6 : 4
  },
  // Show & Hide
  show: {
    opacity: 1
  },
  hide: {
    opacity: 0
  },
  // Borders
  border: {
    borderWidth: D.width >= 768 || D.height >= 768 ? 2 : 1
  },
  borderBlack: {
    borderStyle: 'solid',
    borderColor: '#000'
  },
  borderGrey: {
    borderStyle: 'solid',
    borderColor: '#999'
  },
  // backgrounds
  bgWhite: {
    backgroundColor: '#fff'
  },
  bgTransparentWhite: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  bgChosen: {
    backgroundColor: '#eee'
  },
  // alignment & display
  flex: {
    display: 'flex'
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  centerText: {
    textAlign: 'center'
  },
  // font size & weight
  bold: {
    fontWeight: 'bold'
  }
})

export default {general, portrait, landscape}
