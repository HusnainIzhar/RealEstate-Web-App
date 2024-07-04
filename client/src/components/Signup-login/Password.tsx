import { useFormik } from "formik";
import React, { FC, useEffect } from "react";
import * as yup from "yup";
import { styles } from "../../Styles/style";
import Input from "../ui/input";
import { useLoginMutation } from "../../redux/features/auth/authAPI";
import { toast } from "react-hot-toast";

type Props = {
  email: string;
  closeAlert: () => void;
};

const schema = yup.object().shape({
  password: yup.string().required("Please enter your Password!").min(8),
});

const LoginSec: FC<Props> = ({ email, closeAlert }) => {
  const [login, { isSuccess, error, data }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { password: "", email },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {

      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login Successful";
      closeAlert();
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, closeAlert, data?.message]);

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="w-[400px] flex flex-col">
      <h1 className={`${styles.popupHeading}`}>Login </h1>
      <p className="text-[12px] text-gray-800 font-OpenSans font-sm">
        Please enter your Password
      </p>
      <form onSubmit={handleSubmit}>
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
        <input
          type="submit"
          value="Login"
          className={`${styles.popupbtn} ${
            formik.values.password === "" ? "bg-[#4d4d4f]" : "bg-[#1f1f29]"
          }`}
        />
      </form>
    </div>
  );
};

export default LoginSec;
