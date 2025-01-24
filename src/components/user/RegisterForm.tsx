import React from "react";
import style from "./logForm.module.scss";
import { registerFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    <h2>{t("regbutton")}</h2>
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="fullname"
                            {...register("fullname", {
                                required: t("required"),
                                maxLength: {
                                    value: 20,
                                    message: t("message"),
                                },
                                minLength: {
                                    value: 4,
                                    message: t("message1"),
                                },
                            })}
                        />
                    </label>
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="login"
                            {...register("login", {
                                required: t("required"),
                                maxLength: {
                                    value: 20,
                                    message: t("message"),
                                },
                                minLength: {
                                    value: 4,
                                    message: t("message1"),
                                },
                            })}
                        />
                    </label>
                    <label htmlFor="">
                        <input
                            type="password"
                            placeholder="password"
                            {...register("password", {
                                required: t("required"),
                                maxLength: {
                                    value: 20,
                                    message: t("message"),
                                },
                                minLength: {
                                    value: 4,
                                    message: t("message1"),
                                },
                            })}
                        />
                    </label>

                    <button type="submit" className={style.submitButton}>
                        {t("regbutton")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
