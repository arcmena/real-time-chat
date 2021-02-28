import { useState } from 'react';

import { Input } from '../../../components/ui';
import { render, fireEvent } from '../../../test-utils';

it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Your name" />);

    expect(getByPlaceholderText(/Your name/)).toBeInTheDocument();
});

it('should have defaultValue', () => {
    const name = 'Foobar'
    const { getByPlaceholderText } = render(<Input placeholder="Your name" defaultValue={name} />)

    const input = getByPlaceholderText(/Your name/)

    expect(input.value).toBe(name)
});

const ControlledInput = ({ outsideValue }) => {
    const [value, setValue] = useState(outsideValue);

    return (
        <Input placeholder="Your name" value={value} onChange={(e) => setValue(e.target.value)} />
    )
}

it('should have controlled value', () => {
    const outsideValue = 'Foobar'
    const { getByPlaceholderText } = render(<ControlledInput outsideValue={outsideValue} />)

    const input = getByPlaceholderText(/Your name/)

    expect(input.value).toBe(outsideValue)

    let name = 'Barfoo'

    fireEvent.change(input, { target: { value: name } })

    expect(input.value).not.toBe(outsideValue)
    expect(input.value).toBe(name)
});

it('should change value when typed in', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Your name" />)

    let name = 'Foobar'
    const input = getByPlaceholderText(/Your name/)

    fireEvent.change(input, { target: { value: name } })

    expect(input.value).toBe(name)

    name = "Barfoo"
    fireEvent.change(input, { target: { value: name } })

    expect(input.value).not.toBe('Foobar')
    expect(input.value).toBe(name)
});
