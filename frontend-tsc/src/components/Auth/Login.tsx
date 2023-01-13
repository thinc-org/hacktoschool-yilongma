import React, { useState, useEffect } from 'react'
import PocketBase from 'pocketbase';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
});

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

function Login() {
    const navigate = useNavigate();
    const token = pb.authStore.token;

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

    const handleLogin = async (values: { email: string; password: string; }, actions: FormikHelpers<{ email: string; password: string; }>) => {
        await pb.collection('users').authWithPassword(values.email, values.password)
            .then((value) => {
                Toast.fire({
                    title: "Logged In",
                    text: 'Welcome ' + pb.authStore.model!.name,
                    icon: 'success',
                    timer: 1500
                }).then(() => {
                    navigate('/');
                })
            }).catch(() => {
                Toast.fire({
                    title: 'Error',
                    text: 'Wrong Username or Password',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
                actions.resetForm({
                    values: {
                        email: values.email,
                        password: ''
                    },
                    isSubmitting : false
                })
            })
    }

    return (
        <div>
            <div className="grid h-screen place-items-center bg-[#F6F5F4]">
                <div className="w-full max-w-xs">
                    <Formik
                        onSubmit={(values, actions) => {
                            handleLogin(values, actions)
                        }}
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginSchema}>
                        {({
                            values,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <Form
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
                                    <Field
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        name="email"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter email id / username"
                                        id="email" />
                                    <ErrorMessage name='email' component='p' className='text-red-600 font-[Montserrat] font-[500] p-2' />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Password
                                    </label>
                                    <Field
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="password"
                                        type="password"
                                        placeholder="******************"
                                        onBlur={handleBlur}
                                        value={values.password} />
                                    <ErrorMessage name='password' component='p' className='text-red-600 font-[Montserrat] font-[500] p-2' />
                                </div>
                                <div className="flex items-center justify-center mb-6">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Don't have an account? <a className='text-blue-700' href='/register'>Sign Up!</a>
                                    </label>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    )
}

export default Login