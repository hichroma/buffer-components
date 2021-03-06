import React from 'react';
import PropTypes from 'prop-types';
import {
  calculateStyles,
} from '../lib/utils';
import {
  fontSizeMini,
  lineHeight,
} from '../style/font';
import {
  outerSpace,
  outerSpaceLight,
  white,
  mystic,
  geyser,
  torchRed,
  offWhite,
} from '../style/color';
import {
  borderWidth,
  borderRadius,
} from '../style/border';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '../style/animation';
import {
  boxShadowLevelOne,
  boxShadowLevelTwo,
} from '../style/dropShadow';

const Card = ({
  children,
  color,
  doublePadding,
  empty,
  faded,
  failed,
  hovered,
  noBorder,
  noPadding,
  onMouseEnter,
  onMouseLeave,
  reducedPadding,
  shadowHeight,
  draggingPlaceholder,
}) => {
  const style = calculateStyles({
    default: {
      padding: '1.5rem',
      fontSize: fontSizeMini,
      lineHeight,
      color: outerSpace,
      backgroundColor: white,
      border: `${borderWidth} solid ${mystic}`,
      borderRadius,
      transition: `box-shadow ${transitionAnimationTime} ${transitionAnimationType}`,
    },
    doublePadding: {
      padding: '3rem',
    },
    empty: {
      borderColor: geyser,
      borderStyle: 'dashed',
    },
    failed: {
      borderColor: torchRed,
    },
    faded: {
      opacity: 0.5,
    },
    noBorder: {
      border: `${borderWidth} solid transparent`,
    },
    noPadding: {
      padding: 0,
    },
    hovered: {
      boxShadow: boxShadowLevelOne,
    },
    // TODO: rename this to `backgroundColor` or similar
    color: {
      backgroundColor: offWhite,
    },
    reducedPadding: {
      padding: '1rem',
    },
    shadowHeightOne: {
      boxShadow: boxShadowLevelOne,
    },
    shadowHeightTwo: {
      boxShadow: boxShadowLevelTwo,
    },
    draggingPlaceholder: {
      border: `${borderWidth} dashed ${outerSpaceLight}`,
    },
  }, {
    doublePadding,
    empty,
    failed,
    faded,
    noBorder,
    noPadding,
    hovered,
    color,
    reducedPadding,
    shadowHeightOne: shadowHeight === 1,
    shadowHeightTwo: shadowHeight === 2,
    draggingPlaceholder,
  });
  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['off-white']),
  doublePadding: PropTypes.bool,
  empty: PropTypes.bool,
  faded: PropTypes.bool,
  failed: PropTypes.bool,
  hovered: PropTypes.bool,
  noBorder: PropTypes.bool,
  noPadding: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  reducedPadding: PropTypes.bool,
  shadowHeight: PropTypes.oneOf([0, 1, 2]),
  draggingPlaceholder: PropTypes.bool,
};

Card.defaultProps = {
  shadowHeight: 0,
  draggingPlaceholder: false,
};

export default Card;
