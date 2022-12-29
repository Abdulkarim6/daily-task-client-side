import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    console.log(user?.displayName, user?.email,);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddTask = data => {
        console.log(data);
        const image = data.image[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData);
        const url = `https://api.imgbb.com/1/upload?key=4ed344c3e8a3b6c0b0bf3b40ffd09f5b`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData.data);

                const addTask = {
                    userName: user?.displayName,
                    email: user?.email,

                    taskName: data.taskName,
                    taskDetail: data.taskDetail,
                    taskStartDate: data.taskStartDate,
                    finishingDate: data.taskfinishingDate,
                    taskTimeSpent: data.taskTimeSpent,
                    taskImg: imageData.data.url
                }

                console.log(addTask);
                //save task to database
                fetch('http://localhost:5000/addTask', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(addTask)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        if (result.acknowledged) {
                            // toast.success(`${data.name} added doctor successfully`);
                            // navigate('/dashboard/manageDoctors')
                        }
                    })

            });

    }

    return (
        <section>
            <div class="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit(handleAddTask)} class="space-y-6">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white">Add Your Task</h5>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input type="text" disabled id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={user?.displayName} />
                    </div>
                    <div>
                        <label for="taskName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task Name</label>
                        <input type="text" {...register("taskName", { required: 'taskName is Required' })} id="taskName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your task name" required />
                        {errors.taskName && <p className='text-red-500'>{errors.taskName.message}</p>}
                    </div>
                    <div>
                        <label for="taskStartDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task Start Date</label>
                        <input type="text" {...register("taskStartDate", { required: 'taskStartDate is Required' })} id="taskStartDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="dd/mm/yy" required />
                        {errors.taskStartDate && <p className='text-red-500'>{errors.taskStartDate.message}</p>}
                    </div>
                    <div>
                        <label for="taskfinishingDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task End Date</label>
                        <input type="text" {...register("taskfinishingDate", { required: 'taskfinishingDate is Required' })} id="taskfinishingDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="dd/mm/yy" required />
                        {errors.taskfinishingDate && <p className='text-red-500'>{errors.taskfinishingDate.message}</p>}
                    </div>

                    <div>
                        <label for="taskTimeSpent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task Time Spent</label>
                        <input type="text" {...register("taskTimeSpent", { required: 'taskTimeSpent is Required' })} id="taskTimeSpent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Hour/day/year" required />
                        {errors.taskTimeSpent && <p className='text-red-500'>{errors.taskTimeSpent.message}</p>}
                    </div>
                    {/* / */}
                    <div>
                        <label for="taskDetail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task Detail</label>
                        <textarea type="text" {...register("taskDetail", { required: 'taskDetail is Required' })} id="taskDetail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your Task Detail" required ></textarea>
                        {errors.taskDetail && <p className='text-red-500'>{errors.taskDetail.message}</p>}
                    </div>
                    {/* / */}
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" disabled id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={user?.email} />
                    </div>
                    <div>
                        <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                        <input type="file" {...register("image", { required: 'file is Required' })} id="file" placeholder="Your Photo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        {errors.file && <p className='text-red-500'>{errors.file.message}</p>}
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default AddTask;