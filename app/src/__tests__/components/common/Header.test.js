import { Header } from '../../../components/common';
import { render } from '../../../test-utils';

const altText = 'actichat'

it('should render without crashing', () => {
    const { getByAltText } = render(<Header />);

    expect(getByAltText(altText)).toBeInTheDocument();
});
