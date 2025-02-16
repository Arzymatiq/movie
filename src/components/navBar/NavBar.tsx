import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Menu, Dropdown, Button, Drawer } from "antd";
import { DownOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import style from "./navBar.module.scss";
import { updateToken } from "../../helpers/function";
import { logout } from "../../store/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useTheme } from "../../hooks/useTheme";

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const token = useMemo(() => localStorage.getItem("token"), []);
  const { user } = useAppSelector((state) => state.users);

  useEffect(() => {
    updateToken();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerVisible(false);
  };

  const logOut = () => {
    dispatch(logout());
    window.location.reload();
  };

  const { t } = useTranslation<"translation">();

  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || "en-US"
  );

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    searchParams.set("language", currentLang);
    setSearchParams(searchParams);
  }, [currentLang, searchParams, setSearchParams]);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);

    switch (lang) {
      case "ru":
        localStorage.setItem("language", "ru-RU");
        break;
      case "en":
        localStorage.setItem("language", "en-US");
        break;
      case "kr":
        localStorage.setItem("language", "ky-KR");
        break;
    }
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item onClick={() => handleChangeLanguage("ru")}>RU</Menu.Item>
      <Menu.Item onClick={() => handleChangeLanguage("en")}>EN</Menu.Item>
      <Menu.Item onClick={() => handleChangeLanguage("kr")}>KR</Menu.Item>
    </Menu>
  );

  const themeMunu = (
    <Menu>
      <div className={style.themeButtons}>
        <Menu.Item>
          <Button onClick={() => handleThemeChange("dark")}>{t("dark")}</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => handleThemeChange("green")}>
            {t("green")}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => handleThemeChange("light")}>
            {t("light")}
          </Button>
        </Menu.Item>
      </div>
    </Menu>
  );
  const accountMenu = (
    <Menu>
      {token ? (
        <>
          <Menu.Item>
            <h3>{user?.fullName || "Гость"}</h3>
          </Menu.Item>
          <Menu.Item>
            <h3>{user?.login || "Нет логина"}</h3>
          </Menu.Item>
          <Menu.Item onClick={() => logOut()}>{t("logout")}</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item onClick={() => handleNavigate("/register")}>
            {t("register")}
          </Menu.Item>
          <Menu.Item onClick={() => handleNavigate("/login")}>
            {t("login")}
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className={style.navBar}>
      <div className={style.navBar_center}>
        <div className={style.navBar_items}>
          <Button type="link" onClick={() => handleNavigate("/")}>
            {t("movie")}
          </Button>
          <Button type="link" onClick={() => handleNavigate("/series")}>
            {t("series")}
          </Button>
          <Dropdown overlay={languageMenu}>
            <Button>
              {currentLang.toUpperCase()} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <Dropdown overlay={themeMunu}>
          <Button icon={<UserOutlined />} style={{ width: "150px" }}>
            {t("theme")} <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={accountMenu}>
          <Button icon={<UserOutlined />} style={{ width: "150px" }}>
            {t("account")} <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          className={style.burgerMenu}
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Button type="link" onClick={() => handleNavigate("/")}>
          {t("movie")}
        </Button>
        <Button type="link" onClick={() => handleNavigate("/series")}>
          {t("series")}
        </Button>
        <Dropdown overlay={languageMenu}>
          <Button>
            {currentLang.toUpperCase()} <DownOutlined />
          </Button>
        </Dropdown>
        {token ? (
          <>
            <Button type="link" onClick={() => logOut()}>
              {t("logout")}
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => handleNavigate("/register")}>
              {t("register")}
            </Button>
            <Button type="link" onClick={() => handleNavigate("/login")}>
              {t("login")}
            </Button>
          </>
        )}
        <div className={style.themeButtons}>
          <Button onClick={() => handleThemeChange("dark")}>Dark</Button>
          <Button onClick={() => handleThemeChange("green")}>Green</Button>
          <Button onClick={() => handleThemeChange("programming")}>
            Programming
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default NavBar;
