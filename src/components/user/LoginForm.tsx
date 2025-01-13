import React, { useState } from "react";
import style from "./logForm.module.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log(register("fullName"));

    const onSubmit = (data: any) => {
        alert(JSON.stringify(data));
    };

    return (
        <div className={style.authInput}>
            <div className={style.authInputCenter}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Вход</h2>
                    <label htmlFor="">
                        <input
                            type="text"
                            {...register("fullName", {
                                required: true,
                                maxLength: 20,
                                minLength: 4,
                            })}
                        />
                    </label>
                    <label htmlFor="">
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                maxLength: 20,
                                minLength: 4,
                            })}
                        />
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            {...register("isAccepted", { required: true })}
                        />
                    </label>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
