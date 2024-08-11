import { act, fireEvent, render, screen, waitFor, } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WorkshopPage from '../src/pages/WorkshopPage';

const workshopPage = (
  <MemoryRouter>
    <WorkshopPage />
  </MemoryRouter>
);

jest.mock('../src/api/workshopService', () => {
  return {
    default: {
      createWorkshop: jest.fn(),
    },
  };
});

jest.mock('../src/api/teacherService', () => {
  return {
    default: {
      getAllTeachers: jest.fn(() => Promise.resolve([{
        "id": 1,
        "createdAt": "2024-08-09T19:57",
        "updatedAt": "2024-08-09T19:57",
        "username": "Workshop de Spring Boot",
        "email": "2024-04-14",
        "area": "Computação"
      }]))
    }
  }
});


jest.mock('../src/components/Notification', () => ({
  __esModule: true,
  default: jest.fn(),
}));


describe('WorkshopPage', () => {

  it('deve exibir os campos do formulário', async () => {
    await act(async () => { render(workshopPage) });

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Teacher')).toBeInTheDocument();
    expect(screen.getByLabelText('Data e Hora')).toBeInTheDocument();
    expect(screen.getByLabelText('Max Students')).toBeInTheDocument();

  });


  it('deve exibir mensagens de erro para campos obrigatórios', async () => {
    await act(async () => { render(workshopPage) });

    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessages = screen.getAllByText('Campo obrigatório');
    expect(errorMessages.length).toBe(4);
  });


  it('deve limpar mensagens de erro ao digitar', async () => {

    await act(async () => { render(workshopPage) });

    const maxStudentsInput = screen.getByLabelText('Max Students');
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.change(maxStudentsInput, { target: { value: 'teste' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('O valor deve ser um número inteiro maior que zero')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(maxStudentsInput, { target: { value: '10' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('O valor deve ser um número inteiro maior que zero')).toBeNull();
    });
  });

});





