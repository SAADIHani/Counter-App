import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CounterModel } from "../types/types";
import styles from "../styles/Counter.module.css";
import {
  PlusCircleOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<CounterModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedModels = JSON.parse(
      localStorage.getItem("counterModels") || "[]"
    );
    setModels(storedModels);
  }, []);

  const handleCreateModel = () => {
    navigate("/create-model");
  };

  const handleDeleteModel = (index: number) => {
    const updatedModels = models.filter((_, i) => i !== index);
    setModels(updatedModels);
    localStorage.setItem("counterModels", JSON.stringify(updatedModels));
  };

  return (
    <div className={styles.modelsPageContainer}>
      <h2 style={{ color: "black" }}>Cronexia / Compteurs</h2>
      <div
        style={{
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Liste des compteurs:</h3>
        <button className={styles.primaryButton} onClick={handleCreateModel}>
          <PlusCircleOutlined style={{ marginRight: 10 }} />
          Ajouter un nouveau compteur
        </button>
      </div>

      <ul>
        {models?.map((model, index) => (
          <li
            key={index}
            style={{
              color: "black",
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <h3 className={styles.modelTitle}>
              {model?.code + " / " + model.label}
            </h3>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/edit-counter", { state: { model } })}
            >
              <EditOutlined style={{ marginRight: 10 }} />
              Modifier
            </button>
            <button className={styles.primaryButton}>
              <SettingOutlined style={{ marginRight: 10 }} />
              Exécuter
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => handleDeleteModel(index)}
            >
              <DeleteOutlined style={{ marginRight: 10 }} />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelsPage;
