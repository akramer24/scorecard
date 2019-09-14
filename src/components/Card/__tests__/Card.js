import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from '../Card';

configure({ adapter: new Adapter() });

const mockProps = {
  bordered: false,
  children: 'Test Card',
  className: 'test-card',
  footer: <div>Footer</div>,
  footerStyle: { backgroundColor: 'blue' },
  header: <div>Header</div>,
  headerStyle: { backgroundColor: 'gray' },
  id: 'test-card-id',
  padded: true,
  style: { backgroundColor: 'green' },
}

describe('Card', () => {
  let tree;
  let wrapper;

  beforeAll(() => {
    tree = render(<Card {...mockProps} />);
    wrapper = mount(<Card {...mockProps} />);
  })

  afterAll(() => {
    wrapper.unmount();
  });

  beforeEach(() => {
    wrapper.setProps(mockProps);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card {...mockProps} />, div);
  });

  it('renders expected Jest snapshot correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('renders the data inside it', () => {
    expect(wrapper.text()).toEqual('HeaderTest CardFooter');
  });

  it('has the CSS class "ari-ui-card"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-card')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-card-bordered" if bordered=true', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-card-bordered')
    ).toEqual(false);
    wrapper.setProps({ bordered: true });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-card-bordered')
    ).toEqual(true);
  });

  it('has the CSS class passed via props as className', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass(mockProps.className)
    ).toEqual(true);
    wrapper.setProps({ className: '' });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass(mockProps.className)
    ).toEqual(false);
  });

  it('renders a header if one is passed via props', () => {
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-header`)
        .length
    ).toEqual(1);
    wrapper.setProps({ header: null });
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-header`)
        .length
    ).toEqual(0);
  });

  it('passes headerStyle, if defined via props, to header', () => {
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-header`)
        .getDOMNode()
        .style
        ._values['background-color']
    ).toEqual('gray');
  });

  it('has a content div with CSS class "ari-ui-small-padding" if padded=true', () => {
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-content`)
        .hasClass('ari-ui-small-padding')
    ).toEqual(true);
    wrapper.setProps({ padded: false });
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-content`)
        .hasClass('ari-ui-small-padding')
    ).toEqual(false);
  });

  it('renders a footer if one is passed via props', () => {
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-footer`)
        .length
    ).toEqual(1);
    wrapper.setProps({ footer: null });
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-footer`)
        .length
    ).toEqual(0);
  });

  it('passes footerStyle, if defined via props, to footer', () => {
    expect(
      wrapper
        .find(`#${mockProps.id} .ari-ui-card-footer`)
        .getDOMNode()
        .style
        ._values['background-color']
    ).toEqual('blue');
  });
});