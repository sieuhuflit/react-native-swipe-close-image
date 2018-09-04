# React native swipe close image

> A swipe close full screen image for Android and iOS

![](https://github.com/sieuhuflit/react-native-swipe-close-image/blob/master/demo.gif)

## Installation

```
npm install react-native-swipe-close-image --save
```

## Using

- Create SwipeCloseImage in render() with imageSource is the source of image (Can be local or remote url link)

```js
import SwipeCloseImage from 'react-native-swipe-close-image';
...
render() {
...
<SwipeCloseImage
  ref={c => (this.swipeToCloseRef = c)}
  imageSource={this.state.imageSource}
/>
...
}
```

- Then when want to open the image

```js
...
this.swipeToCloseRef.onOpen(this.imageRef);
...
```

### Code

```js
import SwipeCloseImage from 'react-native-swipe-close-image';

export default class App extends Component {
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

| Prop            |      Default      |      Type       | Description                                          |
| :-------------- | :---------------: | :-------------: | :--------------------------------------------------- |
| imageSource     |     required      | `string,number` | Link of the source url (Can be local or remote link) |
| onOpen          |     required      |   `function`    | Function to open the image                           |
| resizeMode      |      Contain      |    `string`     | Resize mode for the image                            |
| backdropColor   | rgba(0,0,0,0.75)  |    `string`     | Backdrop color                                       |
| durationAnim    |        250        |    `number`     | Milisecond animation                                 |
| distanceDismiss | SCREEN_HEIGHT / 5 |    `number`     | Distance to auto dismiss close image                 |

## Author

Sieu Thai – sieuhuflit@example.com

[https://github.com/sieuhuflit](https://github.com/sieuhuflit/)
