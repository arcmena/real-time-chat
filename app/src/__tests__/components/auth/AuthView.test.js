import { AuthView } from '../../../components/auth';
import { render } from '../../../test-utils';

it('should render without crashing', () => {
    const { getByText, getByPlaceholderText } = render(<AuthView />);

    expect(getByText(/Hello there!/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Your badass nickname here/)).toBeInTheDocument();
    expect(getByText(/Enter!/i)).toBeInTheDocument();
});
