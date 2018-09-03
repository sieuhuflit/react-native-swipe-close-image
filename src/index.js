import React, { Component } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class SwipeToCloseImage extends Component {
  static propTypes = {
    resizeMode: PropTypes.string,
    backdropColor: PropTypes.string,
    imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    durationAnim: PropTypes.number,
    distanceDismiss: PropTypes.number,
    disableDragHorizontal: PropTypes.bool
  };
  static defaultProps = {
    resizeMode: 'contain',
    backdropColor: 'rgba(0,0,0,0.75)',
    durationAnim: 250,
    distanceDismiss: SCREEN_HEIGHT / 5,
    disableDragHorizontal: false
  };
  constructor(props) {
    super(props);
    this.animateOpenFinish = false;
    this.state = {
      activeImage: false,
      isDrag: false
    };
  }

  componentWillMount() {
    const { durationAnim, distanceDismiss, disableDragHorizontal } = this.props;
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.closeOpacity = new Animated.Value(0);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.animateOpenFinish,
      onMoveShouldSetPanResponder: () => this.animateOpenFinish,
      onPanResponderGrant: (event, gestureState) => {
        this.position.extractOffset();
      },
      onPanResponderMove: (event, gestureState) => {
        this.setState({ isDrag: true });
        this.position.setValue({
          x: disableDragHorizontal ? 0 : gestureState.dx,
          y: gestureState.dy
        });
        let opaValue = 1 - Math.abs(gestureState.dy) / (SCREEN_HEIGHT / 2);
        if (opaValue < 0) {
          opaValue = 0;
        }
        Animated.timing(this.closeOpacity, {
          toValue: opaValue,
          duration: 0
        }).start();
      },
      onPanResponderRelease: (event, gestureState) => {
        if (Math.abs(gestureState.dy) > distanceDismiss) {
          this.onClose();
        } else {
          this.animateOpenFinish = false;
          this.setState({ isDrag: false }, () => {
            Animated.parallel([
              Animated.timing(this.position, {
                toValue: 0,
                duration: durationAnim
              }),
              Animated.timing(this.closeOpacity, {
                toValue: 1,
                duration: durationAnim
              })
            ]).start(() => {
              this.animateOpenFinish = true;
            });
          });
        }
      }
    });
  }

  onOpen = imageRef => {
    const { durationAnim } = this.props;
    imageRef.measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;
      this.position.setValue({
        x: pageX,
        y: pageY
      });
      this.dimensions.setValue({
        x: width,
        y: height
      });
      this.setState(
        {
          activeImage: true
        },
        () =>
          this.viewFullScreenRef.measure(
            (dx, dy, dWidth, dHeight, dPageX, dPageY) => {
              Animated.parallel([
                Animated.timing(this.position.x, {
                  toValue: dPageX,
                  duration: durationAnim
                }),
                Animated.timing(this.position.y, {
                  toValue: dPageY,
                  duration: durationAnim
                }),
                Animated.timing(this.dimensions.x, {
                  toValue: dWidth,
                  duration: durationAnim
                }),
                Animated.timing(this.dimensions.y, {
                  toValue: dHeight,
                  duration: durationAnim
                }),
                Animated.timing(this.closeOpacity, {
                  toValue: 1,
                  duration: durationAnim
                })
              ]).start(() => {
                this.animateOpenFinish = true;
              });
            }
          )
      );
    });
  };

  onClose = () => {
    const { durationAnim } = this.props;
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: durationAnim
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: durationAnim
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: durationAnim
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: durationAnim
      }),
      Animated.timing(this.closeOpacity, {
        toValue: 0,
        duration: durationAnim
      })
    ]).start(() => {
      this.animateOpenFinish = false;
      this.setState({
        activeImage: false,
        isDrag: false
      });
    });
  };

  render() {
    const { backdropColor, imageSource } = this.props;
    const { activeImage, isDrag } = this.state;
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    };
    const fullScreenStyle = {
      resizeMode: this.props.resizeMode,
      top: 0,
      left: 0,
      height: null,
      width: null
    };
    const animatedCloseOpacity = {
      opacity: this.closeOpacity
    };
    const backdropStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: backdropColor
    };
    const newImageSource = isNaN(imageSource)
      ? { uri: imageSource }
      : imageSource;
    return (
      <Animated.View
        style={StyleSheet.absoluteFill}
        pointerEvents={activeImage ? 'auto' : 'none'}
      >
        <View
          style={{
            flex: 1,
            zIndex: 1000
          }}
          ref={c => (this.viewFullScreenRef = c)}
        >
          <Animated.View style={[backdropStyle, animatedCloseOpacity]} />
          {activeImage && (
            <Animated.Image
              {...this.panResponder.panHandlers}
              source={newImageSource}
              style={[fullScreenStyle, activeImageStyle]}
            />
          )}
          {!isDrag && (
            <TouchableWithoutFeedback onPress={this.onClose}>
              <Animated.View style={[styles.closeButton, animatedCloseOpacity]}>
                <Text style={styles.closeText}>Close</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 15
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  }
});

