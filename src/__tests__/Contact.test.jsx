import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Contact from "../pages/Contact/Contact";

const user = userEvent.setup();

describe('Contact', () => {
  test('Contact should display correct texts', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText('Contact us:')).toBeInTheDocument();

    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: 'Full name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Subject' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument();
  });

  test('button Send should send the mail', async () => {
    render(<MemoryRouter><Contact /></MemoryRouter>);

    const fakeEmail = {
      username: 'John Doe',
      email: 'john@example.com',
      subject: 'First contact',
      message: 'Web Dev Job offer: we are interested in your profile'
    };

    const usernameInput = screen.getByRole('textbox', { name: 'Full name' });
    expect(usernameInput).toBeInTheDocument();
    await user.type(usernameInput, fakeEmail.username);
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    expect(emailInput).toBeInTheDocument();
    await user.type(emailInput, fakeEmail.email);
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();

    const subjectInput = screen.getByRole('textbox', { name: 'Subject' });
    expect(subjectInput).toBeInTheDocument();
    await user.type(subjectInput, fakeEmail.subject);
    expect(screen.getByDisplayValue('First contact')).toBeInTheDocument();

    const messageInput = screen.getByRole('textbox', { name: 'Message' });
    expect(messageInput).toBeInTheDocument();
    await user.type(messageInput, fakeEmail.message);
    expect(screen.getByDisplayValue('Web Dev Job offer: we are interested in your profile')).toBeInTheDocument();

    const sendButton = await screen.findByRole('button', { name: 'Send' });
    await user.click(sendButton);

    expect(usernameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(subjectInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  test('should display an error alert when a field is empty', async () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    const sendButton = await screen.findByRole('button', { name: 'Send' });
    await user.click(sendButton);
  });
});
