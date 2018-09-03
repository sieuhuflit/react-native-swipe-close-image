# Product Name

> Short blurb about what your product does.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

One to two paragraph statement about your product and what it does.

![](https://github.com/sieuhuflit/react-native-swipe-close-image/blob/master/demo.gif)

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

[Example](./example/index.js)

## Props

| Prop            |      Default      |   Type   | Description                          |
| :-------------- | :---------------: | :------: | :----------------------------------- |
| resizeMode      |      Contain      | `string` | Resize mode for the image            |
| backdropColor   | rgba(0,0,0,0.75)  | `string` | Backdrop color                       |
| durationAnim    |        250        | `number` | Milisecond animation                 |
| distanceDismiss | SCREEN_HEIGHT / 5 | `number` | Distance to auto dismiss close image |

## Author

Sieu Thai – sieuhuflit@example.com

[https://github.com/sieuhuflit](https://github.com/sieuhuflit/)

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/badge/style-plastic-green.svg?longcache=true&style=plastic
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
