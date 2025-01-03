import { useFormik } from "formik";
import React, { FC, useEffect } from "react";
import * as yup from "yup";
import { styles } from "../../Styles/style";
import Input from "../ui/input";
import { useCheckMutation } from "../../redux/features/auth/authAPI";
import { signIn } from "next-auth/react";
import { FaFacebook ,FaGoogle} from "react-icons/fa";

type Props = {
  setRoute?: (route: string) => void;
  setEmail?: (email: string) => void;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your Email!"),
});

const LoginFirst: FC<Props> = ({ setRoute, setEmail }) => {
  const [check, { isSuccess, error, data }] = useCheckMutation();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      const data = { email };
      await check(data);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (setRoute && setEmail) {
        setRoute("Password");
        setEmail(formik.values.email);
      }
    }
    if (error) {
      if (setRoute) {
        setRoute("Signup");
      }
    }
  }, [isSuccess, error, formik.values.email, setEmail, setRoute]);

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="w-[400px] flex flex-col h-[260px] py-5">
      <p className="text-[12px] text-gray-800 font-OpenSans font-sm ">
        Please enter your Email ID/Username
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email ID"
          value={values.email}
          onChange={handleChange}
        ></Input>

        {errors.email && touched.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
        <input
          type="submit"
          value="Continue"
          className={`${styles.popupbtn} ${formik.values.email ===""? "bg-[#4d4d4f]":"bg-[#1f1f29]"}`}
        />
        <h5 className="text-center text-[12px] mt-[16px]">or Join with</h5>
        <div className="flex gap-3 justify-center mt-5">
        <FaGoogle className="text-[24px] cursor-pointer "
            onClick={() => signIn("google")}
          />
          <FaFacebook className="text-[24px] cursor-pointer"
            onClick={() => signIn("facebook")}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginFirst;
