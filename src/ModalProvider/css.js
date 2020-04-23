import containerBaseClass from '../ModalContainer/baseClass';
import itemBaseClass from '../asModal/baseClass';

export default (classPrefix, zIndex) => {
  const prefix = classPrefix ? `${classPrefix}__` : '';
  return (`
    .${prefix}${containerBaseClass} {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: fixed;
      pointer-events: none;
      visibility: hidden;
      z-index: -1;
    }

    .${prefix}${containerBaseClass}--appear,
    .${prefix}${containerBaseClass}--appearDone,
    .${prefix}${containerBaseClass}--enter,
    .${prefix}${containerBaseClass}--enterDone,
    .${prefix}${containerBaseClass}--exit {
      pointer-events: all;
      visibility: visible;
      z-index: ${zIndex};
    }

    .${prefix}${itemBaseClass} {
      position: absolute;
      left: 0;
      top: 0;
      visibility: hidden;
      border: unset;
      background: unset;
      padding: unset;
    }

    .${prefix}${itemBaseClass}--appear,
    .${prefix}${itemBaseClass}--appearDone,
    .${prefix}${itemBaseClass}--enter,
    .${prefix}${itemBaseClass}--enterDone,
    .${prefix}${itemBaseClass}--exit {
      visibility: visible;
    }
  `);
};
