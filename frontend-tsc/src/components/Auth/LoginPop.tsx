import React, { useState, useEffect, Fragment } from 'react'
import PocketBase from 'pocketbase';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react'

const loginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
});

const resetSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required")
});

const pb = new PocketBase('https://pb.jjus.dev');

function LoginPop() {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

    const handleLogin = async (values: { email: string; password: string; }, actions: FormikHelpers<{ email: string; password: string; }>, close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void) => {
        await pb.collection('users').authWithPassword(values.email, values.password)
            .then(() => {
                close();
                Toast.fire({
                    title: "Logged In",
                    text: 'Welcome ' + pb.authStore.model!.name,
                    icon: 'success',
                    timer: 1500
                }).then(() => {
                    window.location.reload();
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
                    isSubmitting: false
                })
            })
    }

    const [forgot, setForgot] = useState(false)

    const handlePasswordReset = async (values: { email: string; }, actions: any) => {
        await pb.collection('users').requestPasswordReset(values.email)
        .then(() => {
            Toast.fire({
                title: "Password Reset",
                text: 'Reset password link sent to mail.',
                icon: 'success',
                timer: 1500
            }).then(() => {
                setForgot(false);
                actions.resetForm();
            })
        })
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        id='login-button'
                        className={classNames(
                            open ? 'text-[#333333]' : "text-[#757575]",
                            'group inline-flex items-center rounded-lg bg-white text-base font-medium hover:text-[#333333] focus:outline-none p-2 -m-2'
                        )}
                        onClick={() => {setForgot(false)}}
                    >
                        <p>Login</p>
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="z-[2000] absolute mt-6 right-0 max-w-screen">
                            {({ close }) => (
                                <div className="overflow-hidden rounded-lg shadow-md">
                                    {!forgot ?
                                        <Formik
                                            onSubmit={(values, actions) => {
                                                handleLogin(values, actions, close)
                                            }}
                                            initialValues={{ email: "", password: "" }}
                                            validationSchema={loginSchema}>
                                            {({
                                                values,
                                                handleBlur,
                                                isSubmitting,
                                                resetForm
                                            }) => (
                                                <Form
                                                    className="bg-white shadow-md rounded p-10"
                                                >

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
                                                            placeholder="Enter email"
                                                            id="email" />
                                                        <ErrorMessage name='email' component='p' className='text-red-600 font-[Montserrat] font-[500] p-2' />
                                                    </div>
                                                    <div className="mb-2">
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
                                                    <div className="flex items-center justify-end whitespace-nowrap mb-4">
                                                        <label className="text-gray-700 text-sm font-semibold">
                                                            <a onClick={() => { setForgot(true); resetForm() }} className='text-blue-700'>Forgot password?</a>
                                                        </label>
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
                                                    <div className="flex items-center justify-center whitespace-nowrap">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2 ">
                                                            Don't have an account? <a className='text-blue-700' href='/register'>Sign Up!</a>
                                                        </label>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik> : 
                                        <Formik
                                            onSubmit={(values, actions) => {
                                                handlePasswordReset(values , actions)
                                            }}
                                            initialValues={{ email: ""}}
                                            validationSchema={resetSchema}>
                                            {({
                                                values,
                                                handleBlur
                                            }) => (
                                                <Form
                                                    className="bg-white shadow-md rounded p-10"
                                                >

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
                                                            placeholder="Enter email"
                                                            id="email" />
                                                        <ErrorMessage name='email' component='p' className='text-red-600 font-[Montserrat] font-[500] p-2' />
                                                    </div>
                                                    <div className="flex items-center justify-center whitespace-nowrap">
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="submit"
                                                        >
                                                            Forgot Password
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                        }
                                </div>
                            )}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>

    )
}

export default LoginPop