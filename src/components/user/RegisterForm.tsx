import React from "react";
import style from "./logForm.module.scss";
import { registerFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const action = await dispatch(registerFunc(data));

            if (registerFunc.fulfilled.match(action)) {
                navigate("/login");
            } else {
                alert(action.payload || "Ошибка регистрации.");
            }
        } catch (err) {
            console.error("Ошибка регистрации:", err);
        }
    };

    return (
        <div className={style.authInput}>
            <div className={style.authInputCenter}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Регистрация</h2>
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
                            type="text"
                            {...register("login", {
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

                    <button type="submit" className={style.submitButton}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
