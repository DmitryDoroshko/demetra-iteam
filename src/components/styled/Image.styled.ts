import styled from "styled-components/macro";

type ImageProps = {
  src: string;
  objectFit?: string;
  maxWidth?: string;
};

export const ImageStyled = styled.img.attrs((props: ImageProps) => ({
  src: props.src
}))`
  object-fit: ${({objectFit}: ImageProps) => objectFit ? objectFit : "contain"};
  max-width: ${({maxWidth}: ImageProps) => maxWidth ? maxWidth : "none"};
`;

export const PlayButtonImageStyled = styled(ImageStyled)`
  position: absolute;
  top: 7.6rem;
  right: 1.5rem;
  cursor: pointer;
`;

