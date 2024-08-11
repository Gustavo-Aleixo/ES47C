import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../src/pages/RegisterPage';
import AuthService from '../src/api/authService';
import { useStore } from '../src/store/useStore';
import notification from '../src/components/Notification';

const registerPage = (
  <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
);

jest.mock('../src/api/authService', () => {
  return {
    default: {
      registerUser: jest.fn(),
    },
  };
});

jest.mock('../src/components/Notification', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../src/store/useStore', () => ({
  useStore: {
    getState: jest.fn(),
  },
}));

describe('RegisterPage', () => {

  it('deve exibir os campos do formulário', () => {
    render(registerPage);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });


  it('deve validar o campo de email', async () => {
    render(registerPage);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });


  it('deve validar o campo de senha', async () => {
    render(registerPage);

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'senha123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'senhaDiferente' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
  });


  it('deve exibir mensagens de erro para campos obrigatórios', async () => {
    render(registerPage);

    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessages = screen.getAllByText('Campo obrigatório');
    expect(errorMessages.length).toBe(4);
  });


  it('deve limpar mensagens de erro ao digitar', async () => {
    render(registerPage);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email inválido')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('Email inválido')).toBeNull();
    });
  });


  it('deve enviar o formulário com dados válidos', async () => {
    const mockResponse = {
      tokenResponse: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        expirationTime: 1723333350955
      },
      user: {
        id: 4,
        email: 'gustavoaleixo2000@dgmail.com',
        username: 'Gustavo'
      }
    };

    const registerUserMock = AuthService.registerUser as jest.Mock;
    registerUserMock.mockResolvedValueOnce(mockResponse);

    const setTokenResponseMock = jest.fn();
    const setUserMock = jest.fn();
    (useStore.getState as jest.Mock).mockReturnValue({ setTokenResponse: setTokenResponseMock, setUser: setUserMock });

    render(registerPage);

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'usuario' } });
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'senha123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'senha123' } });
      fireEvent.click(submitButton);
    });

    expect(registerUserMock).toHaveBeenCalledWith({
      username: 'usuario',
      email: 'usuario@example.com',
      password: 'senha123',
    });

    expect(setTokenResponseMock).toHaveBeenCalledWith(mockResponse.tokenResponse);
    expect(setUserMock).toHaveBeenCalledWith(mockResponse.user);
  });


  it('deve exibir uma mensagem de erro quando AuthService.registerUser falhar', async () => {
    const mockError = {
      response: {
        status: 500,
        data: 'Erro interno do servidor',
      },
    };

    const registerUserMock = AuthService.registerUser as jest.Mock;
    registerUserMock.mockRejectedValue(mockError);

    render(registerPage);

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'usuario' } });
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'senha123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'senha123' } });
      fireEvent.click(submitButton);
    });

    expect(notification).toHaveBeenCalledWith('Tente novamente', 'error');
  });
});