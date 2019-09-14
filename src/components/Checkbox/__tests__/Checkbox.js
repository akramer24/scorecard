import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Checkbox from '../Checkbox';

configure({ adapter: new Adapter() });

const mockProps = {
  autoFocus: false,
  checked: false,
  className: 'test-checkbox-class',
  disabled: false,
  id: 'test-checkbox-id',
  name: 'test-checkbox',
  onChange: jest.fn(),
  required: false
}

describe('Checkbox', () => {
  let tree;
  let wrapper;

  beforeAll(() => {
    tree = render(<Checkbox {...mockProps} />);
    wrapper = mount(<Checkbox {...mockProps} />);
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
    ReactDOM.render(<Checkbox {...mockProps} />, div);
  });

  it('renders expected Jest snapshot correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('renders the data inside it', () => {
    expect(wrapper.text()).toEqual('');
  });

  it('has the CSS class "ari-ui-checkbox"', () => {
    expect(
      wrapper
        .find(`#${mockProps.id}`)
        .last()
        .hasClass('ari-ui-checkbox')
    ).toEqual(true);
  });

  it('calls an onChange callback, if passed via props, when clicked', () => {
    wrapper
      .find(`#${mockProps.id}`)
      .last()
      .simulate('change');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });
});