import React, { useEffect, useState } from 'react'
import PocketBase from 'pocketbase';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
});

const regisSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const pb = new PocketBase('https://pb.jjus.dev');


function Register() {
    const navigate = useNavigate();
    const token = pb.authStore.token;

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    })


    const handleLogin = async (values: { email: string; password: string }) => {
        await pb.collection('users').authWithPassword(values.email, values.password)
            .then((value) => {
                Cookies.set('token', value.token)
                Swal.fire({
                    title: "Success",
                    text: 'Yay',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    navigate('/');
                })
            }).catch(() => {
                Swal.fire({
                    title: 'Error',
                    text: 'Wrong Username or Password',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
    }
    const handleRegister = async (values: { email: string; password: string; username: string; confirm: string; name: string; role: string; }) => {
        const data = {
            "username": values.username,
            "email": values.email,
            "emailVisibility": true,
            "password": values.password,
            "passwordConfirm": values.confirm,
            "name": values.name,
            "role": [values.role]
        };
        await pb.collection('users').create(data)
            .then(async () => {
                await pb.collection('users').requestVerification(values.email);
                console.log('Sent Email')
                handleLogin(values)
            })
    }

    return (
        <div>
            <div className="grid h-screen place-items-center bg-[#F6F5F4]">


                <div className="w-full max-w-xs md:max-w-lg">
                    <Formik
                        onSubmit={(values) => {
                            handleRegister(values)
                        }}
                        initialValues={{ username: "", email: "", password: "", name: "", confirm: "", role: "student" }}
                        validationSchema={regisSchema}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                noValidate onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-lg font-bold mb-2">
                                        Register
                                    </label>
                                </div>
                                <div className='flex flex-col md:flex-row gap-4'>
                                    <div className="w-full mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Username
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            placeholder="Enter username"
                                            id="username" />
                                    </div>
                                    <div className="w-full mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            placeholder="John Doe"
                                            id="name" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        E-Mail
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter email id / username"
                                        id="email" />
                                    <p className="text-red-600 font-[Montserrat] font-[500]">
                                        {errors.email && touched.email && errors.email}
                                    </p>
                                </div>
                                <div className='flex flex-col md:flex-row gap-4'>
                                    <div className="w-full mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Password
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password} />
                                        <p className="text-red-600 font-[Montserrat] font-[500]">
                                            {errors.password && touched.password && errors.password}
                                        </p>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="confirm"
                                            type="password"
                                            placeholder="******************"
                                            name="confirm"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirm} />
                                        <p className="text-red-600 font-[Montserrat] font-[500]">
                                            {errors.confirm && touched.confirm && errors.confirm}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Role
                                    </label>
                                    <div className='relative'>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="role"
                                            name="role"
                                            onChange={handleChange}
                                            value={values.role}
                                        >
                                            <option value="student">Student</option>
                                            <option value="instructor">Instructor</option>
                                        </select>

                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-6">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    )
}

export default Register