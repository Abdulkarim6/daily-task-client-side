import { useQuery } from '@tanstack/react-query';
import Task from './Task';

const MyTask = () => {

    const { data: myTasks = [], refetch } = useQuery({
        queryKey: ['myTasks'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/myTasks');
                const data = await res.json()
                return data;
            }
            catch (error) {

            }
        }
    });

    console.log(myTasks);

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                myTasks?.length && myTasks?.map(task => <Task 
                key={task._id}
                task={task}
                ></Task>)
            }
        </div>
    );
};

export default MyTask;