[![Build Status](https://travis-ci.org/RobertPTC/react-vimeo-oembed.svg?branch=master)](https://travis-ci.org/RobertPTC/react-vimeo-oembed)

# react-vimeo-oembed
**React component to embed Vimeo videos!**

## Installation

Install `react-vimeo-oembed` with [npm](https://www.npmjs.com/):

```
$ npm install react-vimeo-oembed --save
```

For [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) users:

```javascript
import ReactVimeoOembed from 'react-vimeo-oembed';
or
import { ReactVimeoOembed } from 'react-vimeo-oembed';
```

## Demo

Clone the repository and move into:

```console
$ git clone git@github.com:RobertPTC/react-vimeo-oembed.git
$ cd react-vimeo-oembed
```

Install dependencies:

```console
yarn install or npm i
```

Prepare the demo:

```console
yarn demo or npm run demo
```

Run the server:

Open your browser and go to [http://localhost:8080/](http://localhost:8080/)

<img src="https://raw.githubusercontent.com/RobertPTC/react-vimeo-oembed/master/imgs/demo.gif" alt="React Vimeo Oembed demo" />

## Props

| Name                      | Type        | Description                                                                                   |
| ---                       | ---         | ---                                                                                           |
| `videoId`                 | `Number`    | ID of the video you would like to show.                                                       |
| `options`                 | `Object`    | Options that determine how the video shows. Defaults to those found [here](https://developer.vimeo.com/apis/oembed)                                                                                           |
| `LoadingComponent`        | `Element`   | Loader element. Shows as the Vimeo script tag is loading.                                     |
| `errorCallback`           | `Function`  | Function called if something goes wrong loading the Vimeo Oembed Player. Supplied with error object as argument.                                                            |
| `scriptLoadCallback`      | `Function`  | Function called when Vimeo Oembed Player script has loaded. Supplied with the video JSON response as argument.                                                                  |
| `className`               | `String`   | Class applied to div containing the Vimeo Oembed Player. iframe.                                                                           |
| `style`                   | `Object`    | Style applied to div containing the Vimeo Oembed Player iframe.                               |

## Contribute

1. [Submit an issue](https://github.com/RobertPTC/react-vimeo-oembed/issues)
2. Fork the repository
3. Create a dedicated branch (never ever work in `master`)
4. Fix bugs or implement features
5. Write tests

### Thanks for using this component!
