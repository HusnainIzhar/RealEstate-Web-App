import React ,{FC}from "react";
import { useChangePasswordMutation } from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { styles } from "@/Styles/style";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  setRoute:(e:string)=>void
};

const ChangePassword:FC <Props> = ({setRoute}) => {
  const [changePassword, { isSuccess, error, isLoading }] =
    useChangePasswordMutation();
  const [passwords, setPasswords] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await changePassword(passwords);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password Changed");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <>
      <div className="flex flex-col gap-5 max-w-sm">
        <button onClick={()=> setRoute("profile")} className="flex gap-2 items-center text-xl"><BiArrowBack />Back</button>
        <input
          type="password"
          placeholder="Old Password"
          name="currentPassword"
          onChange={handleChange}
          className="border p-3 rounded-xl outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          onChange={handleChange}
          className="border p-3 rounded-xl outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          className="border p-3 rounded-xl outline-none"
        />
        <button onClick={handleSubmit} className={styles.BlackButton}>Update</button>
        </div>
    </>
  );
};

export default ChangePassword;
