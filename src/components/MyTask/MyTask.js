import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { data: myTasks = [], refetch } = useQuery({
        queryKey: ['myTasks'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/myTasks?email=${user?.email}`);
                const data = await res.json()
                return data;
            }
            catch (error) {
            }
        }
    });

    // console.log(myTasks);

    const handleTaskComplete = id => {
        // console.log(id);
        fetch(`http://localhost:5000/task/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Task Completed Successfully');
                    refetch();
                    navigate('/completedTask');

                }
            })
    }

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                myTasks?.length && myTasks?.map(task =>
                    <div key={task._id} className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                        <img className="p-8 rounded-t-lg h-64" src={task.taskImg} alt="img" />

                        <div className="px-5 pb-5">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Task Name:{task.taskName}</h5>

                            <div className="">
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col'>
                                        <span className="text-gray-900 dark:text-white">Start Date: {task.taskStartDate}</span>
                                        <span className="text-gray-900 dark:text-white">Finishing Date: {task.finishingDate}</span>
                                        <span className="text-gray-900 dark:text-white">Time Spent: {task.taskTimeSpent}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        {
                                            task?.taskStatus === 'Completed' ?
                                                <button type="button" disabled class="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completed</button>
                                                :
                                                <button onClick={() => handleTaskComplete(task._id)} type="button" class="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Complete</button>
                                        }
                                    </div>
                                </div>
                                <span className="text-gray-900 dark:text-white">Details: {task.taskDetail}</span>
                            </div>
                        </div>
                    </div>

                )
            }
        </div>
    );
};

export default MyTask;