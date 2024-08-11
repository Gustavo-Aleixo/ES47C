import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import notification from '../src/components/Notification';
import ProfessorPage from '../src/pages/ProfessorPage';
import TeacherService from '../src/api/teacherService';

const professorPage = (
  <MemoryRouter>
    <ProfessorPage />
  </MemoryRouter>
);

jest.mock('../src/api/teacherService', () => {
  return {
    default: {
      createTeacher: jest.fn(),
    },
  };
});

jest.mock('../src/components/Notification', () => ({
  __esModule: true,
  default: jest.fn(),
}));


describe('ProfessorPage', () => {

  it('deve exibir os campos do formulário', () => {
    render(professorPage);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Area')).toBeInTheDocument();
  });


  it('deve validar o campo de email', async () => {
    render(professorPage);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });


  it('deve exibir mensagens de erro para campos obrigatórios', async () => {
    render(professorPage);

    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessages = screen.getAllByText('Campo obrigatório');
    expect(errorMessages.length).toBe(3);
  });


  it('deve limpar mensagens de erro ao digitar', async () => {
    render(professorPage);

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
      id: 3,
      createdAt: '2024-08-11T11:52',
      updatedAt: '2024-08-11T11:52',
      username: 'User',
      email: 'User@gmail',
      area: 'Area Teste'
    };

    const createTeacherMock = TeacherService.createTeacher as jest.Mock;
    createTeacherMock.mockResolvedValueOnce(mockResponse);


    render(professorPage);

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const areaInput = screen.getByLabelText('Area');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'User Teste' } });
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(areaInput, { target: { value: 'Area Teste' } });
      fireEvent.click(submitButton);
    });

    expect(createTeacherMock).toHaveBeenCalledWith({
      username: 'User Teste',
      email: 'usuario@example.com',
      area: 'Area Teste'
    });

    expect(notification).toHaveBeenCalledWith('Professor registrado com sucesso.', 'success');
  });


  it('deve exibir uma mensagem de erro quando TeacherService.createTeacher falhar', async () => {
    const mockError = {
      response: {
        status: 500,
        data: 'Erro interno do servidor',
      },
    };

    const createTeacherMock = TeacherService.createTeacher as jest.Mock;
    createTeacherMock.mockRejectedValue(mockError);

    render(professorPage);

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const areaInput = screen.getByLabelText('Area');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'User Teste' } });
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(areaInput, { target: { value: 'Area Teste' } });
      fireEvent.click(submitButton);
    });

    expect(notification).toHaveBeenCalledWith('Tente novamente', 'error');
  });
});