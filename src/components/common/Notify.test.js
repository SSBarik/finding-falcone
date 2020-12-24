import { render, screen } from '@testing-library/react';
import Notify from './Notify';

describe('Notify', () => {
  let mockError = { status: false, msg: '' };
  const handleClose = jest.fn();
    
  test('shows notify component with error message', () => {
    mockError = { status: true, msg: 'Server Error!' } ;
    render(
      <Notify 
        severity="error" 
        open={mockError.status} 
        message={mockError.msg}  
        handleClose={handleClose} 
      />
    );
    expect(screen.getByText(/server error/i)).toBeInTheDocument();
  });
   
  test('shows no notify component', () => {
    mockError = { status: false, msg: '' };
    render(
      <Notify 
        severity="error" 
        open={mockError.status} 
        message={mockError.msg}  
        handleClose={handleClose} 
      />
    );
    expect(screen.queryByText(/server error/i)).toBeNull();
  });
});
