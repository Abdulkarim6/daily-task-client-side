import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext);

    const Completed = "Completed"

    const { data: checkTaskStatus = [], refetch } = useQuery({
        queryKey: ['checkTaskStatus'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/checkTaskStatus?email=${user?.email}&&Completed=${Completed}`);
                const data = await res.json()
                return data;
            }
            catch (error) {

            }
        }
    });

    // console.log(checkTaskStatus.myTasks, "myTasks");
    // console.log(checkTaskStatus.completedTask, "completedTask");
    // console.log(checkTaskStatus.notCompletedTask, "notCompletedTask");


    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                <img className="rounded-t-lg h-44" src="https://res.cloudinary.com/dqeaikamu/image/upload/v1672407895/daily-task/total_uhy7qq.jpg" alt="img" />

                <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">You have total task: {checkTaskStatus?.myTasks?.length}</h5>

                       <div className='flex justify-end'>
                        <Link to='/myTask' className="inline-flex items-center justify-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        My Task
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                <img className="rounded-t-lg h-44" src="https://res.cloudinary.com/dqeaikamu/image/upload/v1672407895/daily-task/completed-_fmt9tk.jpg" alt="img" />

                <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Your Completed task: {checkTaskStatus?.completedTask?.length}</h5>

                       <div className='flex justify-end'>
                        <Link to='/completedtask' className="inline-flex items-center justify-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Completed Task
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                <img className="rounded-t-lg h-44" src="https://res.cloudinary.com/dqeaikamu/image/upload/v1672407897/daily-task/nt_p0uvpr.jpg" alt="img" />

                <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Your not Completed task: {checkTaskStatus?.notCompletedTask?.length}</h5>

                     <div className='flex justify-end'>
                        <Link to='/myTask' className="inline-flex items-center justify-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            See Not Complted Task
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;