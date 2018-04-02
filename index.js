import React from 'react';
import PropTypes from 'prop-types';

// TODO: open source: support function as children, render as prop

let embedVimeoVideoCallbackNumber = 0;

export class VimeoOembedPlayer extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      videoEmbed: '',
      videoLoading: true
    };
    this.script = null;
  }

  componentDidMount() {
    const { options, videoId, dimensions } = this.props;
    this.callbackName = `embedVimeoVideoCallback${embedVimeoVideoCallbackNumber}`;
    window[this.callbackName] = (video) => {
      this.setState({
        videoEmbed: video.html,
        videoLoading: false
      });
      options.callback(video);
    };
    this.createEmbedScript(this.props);
    embedVimeoVideoCallbackNumber += 1;
  }

  componentWillReceiveProps(nextProps) {
    const { videoId, options } = this.props;
    const nextPropsOptionKeys = Object.keys(nextProps.options);
    const previousOptionsKeys = Object.keys(options);
    let changedOptions = nextPropsOptionKeys.filter(key => nextProps.options[key] !== options[key]);
    const callbackIndex = changedOptions.indexOf('callback');
    const errorCallbackIndex = changedOptions.indexOf('errorCallback');
    const videoIdChanged = videoId !== nextProps.videoId;
    if (callbackIndex > -1) {
      changedOptions.splice(changedOptions.indexOf('callback'), 1);
    }
    if (changedOptions.length || videoIdChanged) {
      if (this.script) {
        this.script.remove();
      }
      this.createEmbedScript(nextProps);
    }
  }

  createEmbedScript(props) {
    if (props.videoId) {
      const script = document.createElement('script');
      const { options, errorCallback } = props;
      const optionsKeys = Object.keys(options);
      let url = `https://www.vimeo.com/api/oembed.json?url=http://www.vimeo.com/${props.videoId}&callback=${this.callbackName}`;
      if (options.width > options.maxwidth) {
        options.width = options.maxwidth;
      }
      if (options.height > options.maxheight) {
        options.height = options.maxheight;
      }
      optionsKeys.forEach((key, idx) => {
        const isLast = idx === optionsKeys.length - 1;
        if (key !== 'callback' && options[key]) {
          url = `${url}&${key}=${options[key]}`;
        }
      });
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', url);
      script.addEventListener('error', (e) => {
        errorCallback(e);
      });
      document.getElementsByTagName('head').item(0).appendChild(script);
      this.script = script;
    }
  }

  render() {
    const { options, videoId, LoadingComponent, className, style } = this.props;
    const { videoEmbed, videoLoading } = this.state;
    if (videoLoading) {
      return LoadingComponent ? <LoadingComponent /> : null;
    }
    return (
      <div className={className} style={style} dangerouslySetInnerHTML={{__html: videoEmbed}} />
    );
  }
}

VimeoOembedPlayer.defaultProps = {
  options: {
    api: false,
    autopause: true,
    autoplay: false,
    byline: true,
    callback: () => null,
    color: '',
    loop: false,
    player_id: '',
    portrait: true,
    title: true,
    xhtml: false
  },
  videoId: '',
  LoadingComponent: '',
  errorCallback: () => null,
  className: '',
  style: {}
};

VimeoOembedPlayer.propTypes = {
  videoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  LoadingComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  options: PropTypes.shape({
    api: PropTypes.bool,
    autopause: PropTypes.bool,
    byline: PropTypes.bool,
    callback: PropTypes.func,
    color: PropTypes.string,
    loop: PropTypes.bool,
    player_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    portrait: PropTypes.bool,
    title: PropTypes.bool,
    xhtml: PropTypes.bool
  }),
  errorCallback: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default VimeoOembedPlayer;
