import { Message } from '../../../components/chat';
import { render } from '../../../test-utils';

const mockMessage = {
    "id": "0",
    "user": "Jhon Doe",
    "content": "Foo",
    "sentAt": "03/02/2021 at 10:00 PM"
}

const mockIncompleteMessage = {
    "id": "0",
    "content": "Foo",
}

it('should render without crashing', () => {
    const { 
        getByText,
    } = render(
        <Message 
            message={mockMessage} 
            user="Joanna Doe" 
        />
    );

    expect(getByText(/Foo/)).toBeInTheDocument();
    expect(getByText('JHON DOE - 03/02/2021 at 10:00 PM')).toBeInTheDocument();
});


it('should render just the message as mine when the user is the same as the sender', () => {
    const { 
        getByText,
        queryByText,
    } = render(
        <Message 
            message={mockMessage} 
            user="Jhon Doe" 
        />
    );

    expect(queryByText('JHON DOE - 03/02/2021 at 10:00 PM')).toBeNull();
    expect(getByText(/Foo/)).toBeInTheDocument();
});

it('should throw if message is missing any parameter', () => {
    expect(() => render(
        <Message 
            message={mockIncompleteMessage} 
            user="Jhon Doe" 
        />
    )).toThrow()
});
