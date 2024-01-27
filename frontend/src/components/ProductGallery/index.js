import React, { Component } from "react";
import {
  ChoiceContainer,
  ImageContainer,
  ImageSmall,
  Image,
  Wrapper,
  ImageCenterContainer,
} from "./ProductGallery";

class ProductGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: props.photos[0],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.selectedImage) {
      if (props.photos) {
        if (props.photos.length) {
          return {
            selectedImage: props.photos[0],
          };
        }
      }
    }

    return null;
  }

  changeSelectedImage = (image) => {
    this.setState({ selectedImage: image });
  };

  generateGallery() {
    if (!this.props.photos) {
      return <></>;
    }

    if (!this.props.photos.length) {
      return <></>;
    }

    return this.props.photos.map((image, index) => {
      return (
        <ImageContainer key={index}>
          <ImageSmall
            src={image}
            onClick={() => this.changeSelectedImage(image)}
          />
        </ImageContainer>
      );
    });
  }

  render() {
    return (
      <Wrapper>
        <ChoiceContainer>{this.generateGallery()}</ChoiceContainer>
        <ImageCenterContainer>
          <Image src={this.state.selectedImage} alt="main product photo" />
        </ImageCenterContainer>
      </Wrapper>
    );
  }
}

ProductGallery.defaultProps = {
  photos: [],
};

export default ProductGallery;
