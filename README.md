[![NPM](https://img.shields.io/npm/v/@trbl/react-modal)](https://www.npmjs.com/@trbl/react-modal)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/@trbl/react-modal?label=zipped)
[![Supported by TRBL](https://img.shields.io/badge/supported_by-TRBL-black)](https://github.com/trouble)

# React Modal

A system for creating dialogs, drawers, mega-menus, popups, light-boxes, and whatchamacallits...modals, with fancy names. This library does the heavy-lifting and nothing more. You decide what it does, how it works, how it looks...and ultimately what its called.

## Highlights

- #### Modularization
  Get creative with your setup. Create a modal from anywhere with [Modal](./src/Modal.README.md) or [asModal](./src/asModal/README.md). Interact with a modal from anywhere with [useModal](./src/useModal/README.md) or [withModal](./src/useModal/README.md) — or quickly control them with the [Modal Toggler](./src/ModalToggler/README.md). Integrate into existing apps, retrofit existing components, and have fun.

- #### Portaling
  Keep your modal content contextual. Stop lifting state and drilling props, or throwing into [Redux](https://redux.js.org/). Just render the [Modal Container](./src/ModalContainer/README.md) anywhere in your app as a descendent of the [Modal Provider](./src/ModalProvider/README.md), and render your modal anywhere else. Also helpful in dealing with CSS stacking contexts.

- #### Accessibility
  Accessibility is important. [Modal Provider](./src/ModalProvider/README.md#accessibility), [asModal](./src/asModal/README.md#accessibility), and [ModalToggler](./src/ModalToggler/README.md#accessibility) come shipped with accessibility that closely follow the [WAI-ARIA](https://www.w3.org/WAI/intro/aria) guidelines on [modal dialogs](https://www.w3.org/TR/wai-aria-practices/#dialog_modal). You can also [customize anything](#agnostic-dom).

- #### Routing
  Control any modal with the URL. Share direct links, open on load, or navigate with the back button. Opt-in to use the [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API), or [do it yourself](./src/ModalProvider/README.md#routing) using your app's existing router.

- ####  CSS Classes
  Target any element and any state without additional legwork. [BEM](http://getbem.com/) classes come shipped. Transition classes too, using [React Transition Group](https://reactcommunity.org/react-transition-group/). Build literally any modal experience, and start challenging your designers for a change.

- #### Agnostic DOM
  Take complete control over the DOM. Things like custom markup, accessability, or additional event handling. Everything beyond core functionality is [extendable](https://www.npmjs.com/package/@trbl/react-html-element).

## Quick Start

### Installation

```bash
$ npm i @trbl/react-modal
$ # or
$ yarn add @trbl/react-modal
```

### Composition

```jsx
  import React from 'react';
  import {
    asModal,
    ModalContainer,
    ModalProvider,
    ModalToggler
  } from '@trbl/react-modal';

  const SomeComponent = asModal(() => return <div>Modal1</div>);

  const App = () => (
    <ModalProvider>
      <SomeComponent slug="modal1" />
      <ModalToggler slug="modal1">
        ...
      </ModalToggler>
      <ModalContainer />
    <ModalProvider>
  )

  export default App;
```

For more complex examples, see the [demo app](./demo/App.demo.js).

## Demo

```bash
$ git clone git@github.com:trouble/react-modal.git
$ yarn
$ yarn dev
$ open http://localhost:3000
```

## Documentation

  - [asModal](./src/asModal/README.md)
  - [Modal](./src/Modal.README.md)
  - [ModalContainer](./src/ModalContainer/README.md)
  - [ModalProvider](./src/ModalProvider/README.md)
  - [ModalToggler](./src/ModalToggler/README.md)
  - [useModal](./src/useModal/README.md)
  - [withModal](./src/withModal/README.md)

## Contribution

[Help us,](https://github.com/trouble/.github/blob/master/CONTRIBUTING.md) or let us [help you help us](https://github.com/trouble/.github/blob/master/SUPPORT.md).

## License

[MIT](https://github.com/trouble/react-modal/blob/master/LICENSE) Copyright (c) TRBL, LLC
