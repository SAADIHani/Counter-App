import React from "react";
import styles from "./styles/App.module.css";
import CounterModelForm from "./pages/CounterModelForm";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModelsPage from "./pages/Home";
import EditCounter from "./pages/EditCounter";

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Cronixia / Compteurs</h1>
        </div>
      </header>
      <main className={styles.mainContent}>
        <Router>
          <Routes>
            <Route path="/" element={<ModelsPage />} />
            <Route path="/create-model" element={<CounterModelForm />} />
            <Route path="/edit-counter" element={<EditCounter />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
