<<<<<<< HEAD

# :point_up_2: React native swipe close image

![Demo](https://imgur.com/a/94ewZye)

## Installation

```
npm install react-native-swipe-close-image --save
```

## Example

### Code

```js
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import SwipeCloseImage from 'react-native-swipe-close-image';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: ''
    };
  }

  onPressImage = () => {
    this.swipeToCloseRef.onOpen(this.imageRef);
    this.setState({
      imageSource:
        'https://facebook.github.io/react-native/docs/assets/favicon.png'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onPressImage}>
          <Image
            ref={c => {
              this.imageRef = c;
            }}
            source={{
              uri:
                'https://facebook.github.io/react-native/docs/assets/favicon.png'
            }}
            resizeMode="contain"
            style={styles.imageStyle}
          />
        </TouchableWithoutFeedback>
        <SwipeCloseImage
          ref={c => (this.swipeToCloseRef = c)}
          imageSource={this.state.imageSource}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 250,
    height: 200
  }
});
```

[Example](./example/README.md)

## Props

| Prop            |      Default      |   Type   | Description                          |
| :-------------- | :---------------: | :------: | :----------------------------------- |
| resizeMode      |      Contain      | `string` | Resize mode for the image            |
| backdropColor   | rgba(0,0,0,0.75)  | `string` | Backdrop color                       |
| durationAnim    |        250        | `number` | Milisecond animation                 |
| distanceDismiss | SCREEN_HEIGHT / 5 | `number` | Distance to auto dismiss close image |

## Author

Sieu Thai
