import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import AuthService from '../src/api/authService';
import { useStore } from '../src/store/useStore';
import notification from '../src/components/Notification';

const loginPage = (
  <MemoryRouter>
    <LoginPage />
  </MemoryRouter>
);

jest.mock('../src/api/authService', () => {
  return {
    default: {
      loginUser: jest.fn(),
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

describe('LoginPage', () => {

  it('deve exibir os campos do formulário', () => {
    render(loginPage);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });


  it('deve validar o campo de email', async () => {
    render(loginPage);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });


  it('deve exibir mensagens de erro para campos obrigatórios', async () => {
    render(loginPage);

    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessages = screen.getAllByText('Campo obrigatório');
    expect(errorMessages.length).toBe(2);
  });


  it('deve limpar mensagens de erro ao digitar', async () => {
    render(loginPage);

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

    const loginUserMock = AuthService.loginUser as jest.Mock;
    loginUserMock.mockResolvedValueOnce(mockResponse);

    const setTokenResponseMock = jest.fn();
    const setUserMock = jest.fn();
    (useStore.getState as jest.Mock).mockReturnValue({ setTokenResponse: setTokenResponseMock, setUser: setUserMock });

    render(loginPage);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'senha123' } });
      fireEvent.click(submitButton);
    });

    expect(loginUserMock).toHaveBeenCalledWith({
      email: 'usuario@example.com',
      password: 'senha123',
    });

    expect(setTokenResponseMock).toHaveBeenCalledWith(mockResponse.tokenResponse);
    expect(setUserMock).toHaveBeenCalledWith(mockResponse.user);
  });


  it('deve exibir uma mensagem de erro quando AuthService.loginUser falhar', async () => {
    const mockError = {
      response: {
        status: 500,
        data: 'Erro interno do servidor',
      },
    };

    const loginUserMock = AuthService.loginUser as jest.Mock;
    loginUserMock.mockRejectedValue(mockError);

    render(loginPage);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'senha123' } });
      fireEvent.click(submitButton);
    });

    expect(notification).toHaveBeenCalledWith('Usuário não cadastrado', 'error');
  });
});