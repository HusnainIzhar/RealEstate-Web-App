import { useFormik } from "formik";
import React, { FC, useState, ReactNode, useEffect } from "react";
import * as yup from "yup";
import { styles } from "../../Styles/style";
import Input from "../ui/input";
import { useRegisterMutation } from "../../redux/features/auth/authAPI";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  handleBack: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter your Full Name"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your Email!"),
  password: yup
    .string()
    .required("Please enter your Password!")
    .min(8, "Password is too short - should be 8 chars minimum."),
  userType: yup
    .string()
    .required("Please select if you are a Real Estate Agent or not!"),
});

const Register: FC<Props> = ({ setRoute, handleBack }) => {
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { password: "", email: "", name: "", userType: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, userType }) => {
      const data = {
        name,
        email,
        password,
        userType,
      };
      await register(data);
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="w-[400px] flex flex-col">
    <FaArrowLeft
        onClick={handleBack}
      />
      <h1 className={`${styles.popupHeading}`}>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={values.name}
          onChange={handleChange}
        ></Input>
        {errors.name && touched.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        ></Input>
        {errors.email && touched.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        ></Input>
        {errors.password && touched.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
        <p className="font-semibold text-zinc-600 text-[12px] my-2">
          Are you a Real Estate Agent?
        </p>

        <ul className="grid gap-6 grid-cols-4">
          <li>
            <input
              type="radio"
              id="yes"
              name="userType"
              value="agent"
              className="hidden peer"
              onChange={handleChange}
            />
            <label
              htmlFor="yes"
              className="inline-flex items-center justify-center w-full p-3  text-gray-500 bg-white border border-gray-200 rounded cursor-pointer   peer-checked:text-white peer-checked:bg-[#1f1f29] peer-checked:border-none hover:text-gray-600 "
            >
              <div className="block">
                <div className=" text-xs font-semibold">Yes</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="no"
              name="userType"
              value="user"
              className="hidden peer"
              onChange={handleChange}
            />
            <label
              htmlFor="no"
              className="inline-flex items-center justify-center w-full p-3  text-gray-500 bg-white border border-gray-200 rounded cursor-pointer  peer-checked:text-white peer-checked:bg-[#1f1f29] peer-checked:border-none hover:text-gray-600 "
            >
              <div className="block">
                <div className=" text-xs font-semibold">No</div>
              </div>
            </label>
          </li>
        </ul>
        {errors.userType && touched.userType && (
          <span className="text-red-500 text-sm">{errors.userType}</span>
        )}
        <input
          type="submit"
          value="Create Account"
          className={`${styles.popupbtn} ${
            formik.values.email !== "" &&
            formik.values.name !== "" &&
            formik.values.password !== "" &&
            formik.values.userType !== ""
              ? "bg-[#1f1f29]"
              : "bg-[#4d4d4f]"
          }`}
          
        />
      </form>
    </div>
  );
};

export default Register;
