import React, { useState, useEffect } from 'react'
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

const pb = new PocketBase('https://pb.jjus.dev');

function Login() {
    const navigate = useNavigate();
    const token = pb.authStore.token;

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    })

    const handleSubmit = async (values: { email: string; password: string; }) => {
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
                    title:'Error', 
                    text:'Wrong Username or Password', 
                    icon:'error',
                    showConfirmButton: false,
                    timer: 2000})
            })
    }

    return (
        <div>
            <div className="grid h-screen place-items-center bg-[#F6F5F4]">


                <div className="w-full max-w-xs">
                    <Formik
                        onSubmit={(values) => {
                            handleSubmit(values)
                        }}
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginSchema}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                noValidate onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-lg font-bold mb-2">
                                        Login
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Username
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
                                <div className="mb-6">
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
                                <div className="flex items-center justify-center mb-6">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Sign In
                                    </button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Don't have an account? <a className='text-blue-700' href='/register'>Sign Up!</a>
                                    </label>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    )
}

export default Login