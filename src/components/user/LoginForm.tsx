import React from "react";
import { useForm } from "react-hook-form";
import style from "./logForm.module.scss";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

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
                            {...register("login", {
                                required: "это поле обязательно к заполнению",
                                maxLength: {
                                    value: 20,
                                    message: "максимальная длина 20 символов",
                                },
                                minLength: {
                                    value: 4,
                                    message: "минимальная длина 4 символа",
                                },
                            })}
                        />
                        <div className={style.errorText}>
                            {errors?.login && (
                                <p>{errors.login.message as string}</p>
                            )}
                        </div>
                    </label>
                    <label htmlFor="">
                        <input
                            type="password"
                            {...register("password", {
                                required: "это поле обязательно к заполнению",
                                maxLength: {
                                    value: 20,
                                    message: "максимальная длина 20 символов",
                                },
                                minLength: {
                                    value: 4,
                                    message: "минимальная длина 4 символа",
                                },
                            })}
                        />
                        <div className={style.errorText}>
                            {errors?.password && (
                                <p>{errors.password.message as string}</p>
                            )}
                        </div>
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            {...register("isAgreeToManagmentData", {
                                required: "вы должны согласиться с условиями",
                            })}
                        />
                        <div className={style.errorText}>
                            {errors?.isAgreeToManagmentData && (
                                <p>
                                    {
                                        errors.isAgreeToManagmentData
                                            .message as string
                                    }
                                </p>
                            )}
                        </div>
                    </label>
                    <input type="submit" value="Login" />
                    <p
                        className={style.register}
                        onClick={() => {
                            navigate("/register");
                        }}>
                        Зарегистрироваться
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
