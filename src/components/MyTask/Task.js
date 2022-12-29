import React from 'react';

const Task = ({ task }) => {
    return (

        <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

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
                            <span className="text-gray-900 dark:text-white">{task.taskStatus}</span>
                            {/* <a href="#/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a> */}
                        </div>
                    </div>
                    <span className="text-gray-900 dark:text-white">Details: {task.taskDetail}</span>
                </div>
            </div>
        </div>

    );
};

export default Task;