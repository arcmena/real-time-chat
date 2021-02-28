import { Modal } from '../../../components/ui';
import { render } from '../../../test-utils';

const DefaultModalView = () => <h1>Hello there!</h1>

it('should render without crashing when open is true', () => {
    const { getByText } = render(
        <Modal open={true}>
            <DefaultModalView />
        </Modal>
    );

    expect(getByText(/Hello there!/)).toBeInTheDocument();
});

it('should not render when open is false', () => {
    const { queryByText } = render(
        <Modal>
            <DefaultModalView />
        </Modal>
    );

    expect(queryByText(/Hello there!/)).toBeNull();
});
