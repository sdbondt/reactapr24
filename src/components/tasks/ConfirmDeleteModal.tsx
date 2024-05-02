import React from 'react';
import { ConfirmDeleteProps } from '../../types/TaskTypes';
import Button from '../UI/Button';

const ConfirmDeleteModal: React.FC<ConfirmDeleteProps> = ({ toggleDeleteModal, deleteTaskHandler }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h6 className="text-lg font-semibold mb-4">Are you sure you want to delete this task?</h6>
        <div className="flex justify-between space-x-4">
          <Button onClick={deleteTaskHandler}>
            Yes
          </Button>
          <Button onClick={toggleDeleteModal} >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
