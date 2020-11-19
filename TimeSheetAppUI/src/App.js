import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";
import i18n from "./i18n";
import { withNamespaces } from "react-i18next";
import { I18nextProvider } from "react-i18next";

function App({ t }) {
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <Routes />
      </I18nextProvider>
    </div>
  );
}

export default withNamespaces()(App);
