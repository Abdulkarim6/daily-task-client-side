import React from 'react';

const Footer = () => {
    return (
            <footer className="p-4 sticky top-[100vh] mt-4 bg-gray-200 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 daily task. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://www.linkedin.com/in/abdul-karim687/" className="mr-4 hover:underline md:mr-6">Contuct Linkedin</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=100022060838622" className="hover:underline">Contuct Facebook</a>
                    </li>
                </ul>
            </footer>

    );
};

export default Footer;