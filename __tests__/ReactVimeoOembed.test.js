import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ReactVimeoOembed } from '../index.js';

configure({ adapter: new Adapter() });

describe ('ReactVimeoOembed', () => {
  it ('should be defined', () => {
    expect(ReactVimeoOembed).toBeDefined();
  });

  it ('should render', () => {
    const tree = shallow(<ReactVimeoOembed />);
    expect(tree).toMatchSnapshot();
  });

  it('should call createEmbedScript when componentDidMount', () => {
    const spy = jest.spyOn(ReactVimeoOembed.prototype, 'createEmbedScript');
    const props = {
      videoId: 262524875,
      options: {}
    };
    const wrapper = mount(<ReactVimeoOembed {...props} />);
    expect(spy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should have a script tag after mounting', () => {
    const props = {
      videoId: 262524875,
      options: {}
    };
    const wrapper = mount(<ReactVimeoOembed {...props} />);
    expect(wrapper.instance().script).toBeDefined();
    wrapper.unmount();
  });

  it('should have a callbackName', () => {
    global.embedVimeoVideoCallback3 = jest.fn();
    const props = {
      videoId: 262524875,
      options: {
        callback: () => null
      }
    };
    const wrapper = mount(<ReactVimeoOembed {...props} />);
    global.embedVimeoVideoCallback3({ html: '<div></div>' });
    expect(wrapper.instance().callbackName).toEqual('embedVimeoVideoCallback3');
    wrapper.unmount();
  });

  it('should change loading state to false when Vimeo data is fetched', () => {
    global.embedVimeoVideoCallback4 = jest.fn();
    const props = {
      videoId: 262524875,
      options: {
        callback: () => null
      }
    };
    const wrapper = mount(<ReactVimeoOembed {...props} />);
    global.embedVimeoVideoCallback4({ html: '<div></div>' });
    expect(wrapper.instance().state.videoLoading).toEqual(false);
    wrapper.unmount();
  });

  it('should set Vimeo embed player HTML in state when Vimeo data is fetched', () => {
    global.embedVimeoVideoCallback5 = jest.fn();
    const props = {
      videoId: 262524875,
      options: {
        callback: () => null
      }
    };
    const wrapper = mount(<ReactVimeoOembed {...props} />);
    global.embedVimeoVideoCallback5({ html: '<div></div>' });
    expect(wrapper.instance().state.videoEmbed).toEqual('<div></div>');
    wrapper.unmount();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
