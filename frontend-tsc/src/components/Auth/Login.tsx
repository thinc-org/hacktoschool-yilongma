import React, { useState } from 'react'
import PocketBase from 'pocketbase';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';

const loginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
});

const pb = new PocketBase('https://pb.jjus.dev');

function Login() {
    const handleSubmit = async (values: { email?: string; password: string; }) => {
        await pb.collection('users').authWithPassword(values.email, values.password)
            .then((value) => {
                Cookies.set('token', value.token)
                Swal.fire({
                    title: "Success",
                    text: 'Yay',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    console.log('Logged in')
                    console.log(pb.authStore.isValid);
                    console.log(pb.authStore.token);
                    console.log(pb.authStore.model.id);

                })
            }).catch(() => {
                swal('Error', 'Wrong Username or Password', 'error')
            })
    }

    return (
        <div>
            <div className="grid h-screen place-items-center bg-[#F6F5F4]">


                <div className="w-full max-w-xs">
                    <Formik
                        onSubmit={(values) => {
                            // Alert the input values of the form that we filled
                            alert(JSON.stringify(values));
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
                                <div className="flex items-center justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Sign In
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

export default Login