import { Messages } from '../../../components/chat';
import { render } from '../../../test-utils';

const mockMessages = [
    {
        "id": "0",
        "user": "Jhon Doe",
        "content": "Foo",
        "sentAt": "03/02/2021 at 10:00 PM"
    },
    {
        "id": "2",
        "user": "Joanna Doe",
        "content": "Bar",
        "sentAt": "03/02/2021 at 10:02 PM"
    }
]

const mockIncompleteMessages = [
    {
        "id": "0",
        "content": "Foo",
    },
    {
        "id": "2",
        "user": "Joanna Doe",
        "sentAt": "03/02/2021 at 10:02 PM"
    }
]

it('should render without crashing', () => {
    const {
        getByText,
    } = render(
        <Messages
            messages={mockMessages}
            user="Joanna Doe" 
        />
    );

    expect(getByText('Foo')).toBeInTheDocument();
});


it('should render user message and others message in the respective sides', () => {
    const { 
        getByText,
        queryByText,
    } = render(
        <Messages 
            messages={mockMessages} 
            user="Joanna Doe" 
        />
    );

    // If the user is the sender, it shouldn't have the nickname and sentAt displayed 
    expect(queryByText('JOANNA DOE - 03/02/2021 at 10:02 PM')).toBeNull();

    expect(getByText('JHON DOE - 03/02/2021 at 10:00 PM')).toBeInTheDocument();
    expect(getByText('Foo')).toBeInTheDocument();
    expect(getByText('Bar')).toBeInTheDocument();
});

it('should throw if message array is missing any parameter', () => {
    console.error = jest.fn()

    expect(() => render(
        <Messages
            messages={mockIncompleteMessages} 
            user="Joanna Doe" 
        />
    )).toThrow()
});
