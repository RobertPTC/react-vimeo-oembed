import React from 'react';
import ReactDOM from 'react-dom';

import { ReactVimeoOembed } from '../index.js';

export const debounce = (fn, wait) => {
  let timeout = null;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, wait)
  }
}

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 300
    }
  }

  componentDidMount() {
    const debouncedResize = debounce(() => {
      this.windowResized();
    }, 500);
    window.addEventListener('resize', debouncedResize);
  }
  windowResized() {
    this.setState({
      width: this.containerDivRef.offsetWidth
    });
  }
  render() {
    const { width } = this.state;
    return (
      <div ref={containerDivRef => this.containerDivRef = containerDivRef}>
        <ReactVimeoOembed
          videoId={258238541}
        />
        <pre>
          <code>
            No Vimeo oembed options
          </code>
        </pre>
        <ReactVimeoOembed
          videoId={258238541}
          scriptLoadCallback={(video) => null}
          options={{
            width: 1000,
            maxwidth: 1020,
            title: false,
            portrait: false,
            byline: false,
            autoplay: true,
            maxheight: 500
          }}
        />
        <pre>
          <code>
            Vimeo oembed options: {'{ width: 1000, autoplay: true, maxwidth: 1020, title: false, portrait: false, byline: false, maxheight: 500 }'}
          </code>
        </pre>
        <ReactVimeoOembed
          videoId={258238541}
          scriptLoadCallback={(video) => console.log('video ', video)}
          options={{
            width,
            maxwidth: 1020,
            title: false,
            portrait: false,
            byline: false,
            maxheight: 500
          }}
        />
        <pre>
          <code>
            Vimeo oembed options: {'{ width: this.containerDivRef.offsetWidth, maxwidth: 1020, title: false, portrait: false, byline: false, maxheight: 500 }'}
          </code>
        </pre>
        <ReactVimeoOembed
          videoId={258238541}
          options={{
            height: 500,
            maxwidth: 1020,
            title: false,
            portrait: false,
            byline: false,
            maxheight: 500
          }}
        />
        <pre>
          <code>
            Vimeo oembed options: {'{ height: 500, maxwidth: 1020, title: false, portrait: false, byline: false, maxheight: 500 }'}
          </code>
        </pre>
      </div>
    )
  }
}

ReactDOM.render(
  <Example />,
  document.querySelector('main')
);
