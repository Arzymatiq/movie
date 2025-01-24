import React from "react";
import { useForm } from "react-hook-form";
import style from "./logForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
    const { t } = useTranslation<"translation">();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: any) => {
        alert(JSON.stringify(data));

        try {
            const action = await dispatch(loginFunc(data));
            if (loginFunc.fulfilled.match(action)) {
                navigate("/");
                window.location.reload();
            } else {
                alert(action.payload || "Ошибка входа.");
                data.login.setValue("");
                data.passWord.setValue("");
            }
        } catch (err) {
            console.error("Ошибка логина:", err);
        }
    };

    return (
        <div className={style.authInput}>
            <div className={style.authInputCenter}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>{t("login")}</h2>
                    <label htmlFor="">
                        <input
                            placeholder="login"
                            type="text"
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
                        <div className={style.errorText}>
                            {errors?.login && (
                                <p>{errors.login.message as string}</p>
                            )}
                        </div>
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
                                required: t("requiredcheckbox"),
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
                        {t("register")}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
