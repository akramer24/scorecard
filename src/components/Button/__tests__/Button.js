import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from '../Button';

configure({ adapter: new Adapter() });

const mockProps = {
  children: 'Test Button',
  disabled: false,
  edge: 'straight',
  id: 'test-button-id',
  onClick: jest.fn()
}

describe('Button', () => {
  let tree;
  let wrapper;

  beforeAll(() => {
    tree = render(<Button {...mockProps} />);
    wrapper = mount(<Button {...mockProps} />);
  })

  afterAll(() => {
    wrapper.unmount();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper.setProps(mockProps);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...mockProps} />, div);
  });

  it('renders expected Jest snapshot correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('renders the data inside it', () => {
    expect(wrapper.text()).toEqual('Test Button');
  });

  it('calls an onClick callback when clicked', () => {
    wrapper.find(`#${mockProps.id}`).last().simulate('click');
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick callback when clicked if disabled=true', () => {
    wrapper.setProps({ disabled: true });
    wrapper.find(`#${mockProps.id}`).last().simulate('click');
    expect(mockProps.onClick).not.toHaveBeenCalled();
  });

  it('has the CSS class "ari-ui-btn"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-btn-default" by default', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-default')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-btn-disabled" if disabled=true', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-disabled')
    ).toEqual(false);
    wrapper.setProps({ disabled: true });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-disabled')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-btn-rounded-edge" if edge="round"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-rounded-edge')
    ).toEqual(false);
    wrapper.setProps({ edge: 'round' });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-rounded-edge')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-btn-primary" if appearance="primary"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-primary')
    ).toEqual(false);
    wrapper.setProps({ appearance: 'primary' });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-primary')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-btn-danger" if appearance="danger"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-danger')
    ).toEqual(false);
    wrapper.setProps({ appearance: 'danger' });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-danger')
    ).toEqual(true);
  });

  it('has the CSS class "ari-ui-btn-default" if appearance="default"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-default')
    ).toEqual(false);
    wrapper.setProps({ appearance: 'default' });
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-btn-default')
    ).toEqual(true);
  });
})