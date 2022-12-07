import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

import { useDispatch } from "react-redux";
import { setName } from "../store/playerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({});

  const onSubmit = (data) => {
    dispatch(setName(data.name));
  };
  return (
    <form className="register" noValidate onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Enter your name" />
      <Button children="Play" />
    </form>
  );
};

export default Register;
