import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const CompleteTask = () => {
    const { user } = useContext(AuthContext);
    const [deletingtask, setDeletingtask] = useState(null);
    // console.log(deletingtask);

    /* load user tasks from database start */
    const { data: completeTasks = [], refetch } = useQuery({
        queryKey: ['completeTasks'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/completeTasks?email=${user?.email}`);
                const data = await res.json()
                return data;
            }
            catch (error) {
            }
        }
    });
    // console.log(completeTasks);
    /* load user tasks from database End */


    /* React modal emplement start */
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(completeTask) {
        // console.log(completeTask, '42');
        setDeletingtask(completeTask);
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    /* React modal emplement End */

    /* Task delete action start */
    const successDeleteAction = deletingtask => {
        console.log('55', deletingtask);
        fetch(`http://localhost:5000/taskDeleteAction/${deletingtask._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`${deletingtask.taskName} Task deleted successfully`);
                    setIsOpen(false)
                    refetch()
                }
            })
    }
    /* Task delete action End */

    const handleTaskUnComplete = completeTask => {
        // console.log(completeTask);
        fetch(`http://localhost:5000/taskUncompleteAction/${completeTask._id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success(`${data.taskName} unCompleted done successfully`)
                    refetch()
                }
            })
    }

    return (
        <div>
            {/* loaded task show display operation start */}
            <h1 className="text-3xl font-bold text-center">Your Completed task : {completeTasks?.length}</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
                {
                    completeTasks?.length && completeTasks?.map(completeTask => completeTask?.taskStatus === "Completed" &&
                        <div key={completeTask._id} className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                            <img className="p-8 rounded-t-lg h-64" src={completeTask.taskImg} alt="img" />

                            <div className="px-5 pb-5">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Task Name:{completeTask.taskName}</h5>

                                <div className="">
                                    <div className='flex justify-between items-center'>
                                        <div className='flex flex-col'>
                                            <span className="text-gray-900 dark:text-white">Start Date: {completeTask.taskStartDate}</span>
                                            <span className="text-gray-900 dark:text-white">Finishing Date: {completeTask.finishingDate}</span>
                                            <span className="text-gray-900 dark:text-white">Time Spent: {completeTask.taskTimeSpent}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <button onClick={() => openModal(completeTask)} type="button" className="py-2 px-3 mb-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                                            <button onClick={() => handleTaskUnComplete(completeTask)} type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Not Complete</button>
                                        </div>
                                    </div>
                                    <span className="text-gray-900 dark:text-white">Details: {completeTask.taskDetail}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* loaded task show display operation End */}


            {/* react Modal body start */}
            <div>
                {/* <button onClick={openModal}>Open Modal</button> */}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className='font-semibold text-red-600'>Delete Action</h2>
                    <div className='m-3'>Are you sure you want to delete this Task?</div>
                    <button onClick={() => successDeleteAction(deletingtask)} type="button" className="py-2 px-3 mr-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes, I'm sure</button>
                    <button onClick={closeModal} type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">No, cancel</button>
                </Modal>
            </div>
            {/* react Modal body End */}
        </div>
    );
};

export default CompleteTask;