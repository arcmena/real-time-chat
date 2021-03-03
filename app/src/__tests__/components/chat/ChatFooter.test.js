import { ChatFooter } from '../../../components/chat';
import { render, fireEvent } from '../../../test-utils';

beforeAll(() => console.error = jest.fn())

it('should render without crashing', () => {
    const { 
        getByPlaceholderText,
        getByAltText,
        debug
    } = render(
        <ChatFooter 
            content=""
            user="Jhon Doe"
        />
    );

    debug()

    expect(getByPlaceholderText('Send message')).toBeInTheDocument();
    expect(getByAltText('send')).toBeInTheDocument();
});

it('should call onChange when content input changes', () => {
    const onChange = jest.fn();

    const { 
        getByPlaceholderText
    } = render(
        <ChatFooter 
            content=""
            user="Jhon Doe"
            onChange={onChange}
        />
    );

    fireEvent.change(getByPlaceholderText('Send message'), { target: { value: 'Foo bar' } })
    
    expect(onChange).toBeCalledTimes(1);
});

it('should call onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn();

    const { 
        getByAltText
    } = render(
        <ChatFooter 
            content=""
            user="Jhon Doe"
            onSubmit={onSubmit}
        />
    );

    fireEvent.click(getByAltText('send'))
    
    expect(onSubmit).toBeCalledTimes(1);
});

it('passing content the input should contain the value', () => {
    let value = 'Foo';

    const { 
        getByPlaceholderText
    } = render(
        <ChatFooter 
            content={value}
            user="Jhon Doe"
        />
    );

    const input = getByPlaceholderText('Send message');

    expect(input.value).toBe(value);
});
