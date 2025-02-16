import React from "react";
import style from "./logForm.module.scss";
import { registerFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Form, Input, Button } from "antd";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
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
        <Form onFinish={handleSubmit(onSubmit)}>
          <h2>{t("regbutton")}</h2>
          <Form.Item
            name="fullname"
            rules={[
              { required: true, message: t("required") },
              { max: 20, message: t("message") },
              { min: 4, message: t("message1") }
            ]}
          >
            <Input
              placeholder="fullname"
              {...register("fullname", {
                required: t("required"),
                maxLength: {
                  value: 20,
                  message: t("message")
                },
                minLength: {
                  value: 4,
                  message: t("message1")
                }
              })}
            />
          </Form.Item>
          <Form.Item
            name="login"
            rules={[
              { required: true, message: t("required") },
              { max: 20, message: t("message") },
              { min: 4, message: t("message1") }
            ]}
          >
            <Input
              placeholder="login"
              {...register("login", {
                required: t("required"),
                maxLength: {
                  value: 20,
                  message: t("message")
                },
                minLength: {
                  value: 4,
                  message: t("message1")
                }
              })}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("required") },
              { max: 20, message: t("message") },
              { min: 4, message: t("message1") }
            ]}
          >
            <Input.Password
              placeholder="password"
              {...register("password", {
                required: t("required"),
                maxLength: {
                  value: 20,
                  message: t("message")
                },
                minLength: {
                  value: 4,
                  message: t("message1")
                }
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("regbutton")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
