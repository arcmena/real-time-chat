import { Layout } from '../../../components/common';
import { render, fireEvent } from '../../../test-utils';

it('should render AuthView when user is undefined', () => {
    const { getByText, getByAltText } = render(<Layout />);

    expect(getByAltText(/actichat/i)).toBeInTheDocument();
    expect(getByText(/Hello there!/i)).toBeInTheDocument();
});

it('should close the auth modal when logged in', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(<Layout />);

    fireEvent.change(getByPlaceholderText(/Your badass nickname here/), { target: { value: 'Jhon Doe' } })
    fireEvent.click(getByText(/Enter!/))

    expect(queryByText(/Hello there!/i)).toBeNull();
    expect(queryByText(/Enter!/)).toBeNull();
});
