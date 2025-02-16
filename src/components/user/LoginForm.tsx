import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { Form, Input, Button, Checkbox } from "antd";
import style from "./logForm.module.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation<"translation">();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

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
        <Form onFinish={handleSubmit(onSubmit)}>
          <h2>{t("login")}</h2>
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
          <Form.Item
            name="isAgreeToManagmentData"
            valuePropName="checked"
            rules={[{ required: true, message: t("requiredcheckbox") }]}
          >
            <Checkbox
              {...(register("isAgreeToManagmentData"),
              {
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
            ></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <p
            className={style.register}
            onClick={() => {
              navigate("/register");
            }}
          >
            {t("register")}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
