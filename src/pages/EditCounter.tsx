import React, { useRef, useState } from "react";
import styles from "../styles/Counter.module.css";
import { CounterModel, Formula } from "../types/types";
import html2canvas from "html2canvas";
import { CheckCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import FormulaFormEdit from "../components/FormulaFormEdit";

const EditCounter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const model = location.state?.model;
  const [counterModel, setCounterModel] = useState<CounterModel>(
    model || {
      label: "",
      code: "",
      labelShort: "",
      periodicity: "Daily",
      dateStartLimit: dayjs("1970-01-01"),
      dateEndLimit: dayjs("9999-12-31"),
      family: "",
      onMonday: true,
      onTuesday: true,
      onWednesday: true,
      onThursday: true,
      onFriday: true,
      onSaturday: true,
      onSunday: true,
      formulas: [],
    }
  );
  const [errors, setErrors] = useState({
    code: "",
    periodicity: "",
    labelShort: "",
    dateStartLimit: "",
  });
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleBasicInfoChange = (field: keyof CounterModel, value: string) => {
    setCounterModel((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormulaChange = (index: number, updatedFormula: Formula) => {
    const newFormulas = [...counterModel.formulas];
    newFormulas[index] = updatedFormula;
    setCounterModel((prev) => ({ ...prev, formulas: newFormulas }));
  };

  const addFormula = () => {
    const newFormula: Formula = {
      label: "",
      rank: counterModel.formulas.length + 1,
      type: "default",
      description: "",
    };
    setCounterModel((prev) => ({
      ...prev,
      formulas: [...prev.formulas, newFormula],
    }));
  };

  const deleteFormula = (index: number) => {
    setCounterModel((prev) => ({
      ...prev,
      formulas: prev.formulas.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = {
      code: !counterModel.code.trim() ? "Code is required" : "",
      periodicity: !counterModel.periodicity.trim()
        ? "Periodicity is required"
        : "",
      dateStartLimit: !counterModel.dateStartLimit ? "Date is required" : "",
      labelShort: !counterModel.labelShort.trim()
        ? "Label short is required"
        : "",
      type: counterModel.formulas.some((formula) => formula.type === "default")
        ? "Type is required"
        : "",
      return: {
        entityType: counterModel.formulas.some(
          (formula) => formula.return?.entityType
        )
          ? ""
          : "Entity type is required",
        type: counterModel.formulas.some((formula) => !formula.return?.type)
          ? ""
          : "Type of return is required",
      },
    };

    if (
      newErrors.code ||
      newErrors.periodicity ||
      newErrors.labelShort ||
      newErrors.type ||
      newErrors.return.entityType ||
      newErrors.return.type
    ) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({
        code: "",
        periodicity: "",
        labelShort: "",
      });
    }

    const storedModels = JSON.parse(
      localStorage.getItem("counterModels") || "[]"
    );
    const existingModelIndex = storedModels.findIndex(
      (m: CounterModel) => m.code === counterModel.code
    );
    if (existingModelIndex > -1) {
      storedModels[existingModelIndex] = counterModel;
    } else {
      storedModels.push(counterModel);
    }
    localStorage.setItem("counterModels", JSON.stringify(storedModels));

    navigate("/");
  };
  const captureScreenshot = () => {
    if (formRef.current) {
      html2canvas(formRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "form-screenshot.png";
        link.click();
      });
    }
  };

  return (
    <div className={styles.counterContainer} ref={formRef}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <div
            style={{
              color: "black",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Cronexia / Compteurs</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className={styles.screenShotButton}
                onClick={captureScreenshot}
              >
                Capture d'ecran
              </button>
              <button
                className={styles.primaryButton}
                style={{ height: 40 }}
                onClick={() => navigate("/")}
              >
                <ArrowLeftOutlined style={{ marginRight: 5 }} />
                Tous mes compteurs{" "}
              </button>
            </div>
          </div>
          <div className={styles.formGridHeader}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nom de compteur</label>
              <input
                type="text"
                value={counterModel.label}
                onChange={(e) => handleBasicInfoChange("label", e.target.value)}
                className={styles.nameInput}
                placeholder="Entrez le label"
              />
            </div>
            <div style={{ display: "flex" }}>
              <div className={styles.formGroup} style={{ margin: 10 }}>
                <label className={styles.label}>Périodicité</label>
                <select
                  value={counterModel.periodicity}
                  onChange={(e) =>
                    handleBasicInfoChange("periodicity", e.target.value)
                  }
                  className={styles.periodocityInput}
                >
                  <option value="" disabled>
                    Entrez la périodicité
                  </option>
                  <option value="Daily"> Daily</option>
                  <option value="Weekly"> Weekly</option>
                  <option value="Monthly"> Monthly</option>
                  <option value="Yearly"> Yearly</option>
                  <option value="Custom"> Custom</option>
                </select>
                {errors.periodicity && (
                  <div className={styles.errorMessage}>
                    {errors.periodicity}
                  </div>
                )}
              </div>

              {model?.periodicity === "Custom" && (
                <>
                  <div className={styles.formGroup} style={{ marginTop: 10 }}>
                    <label className={styles.label}>Période de dates</label>
                    <DatePicker.RangePicker
                      value={[
                        counterModel.dateStartLimit
                          ? dayjs(counterModel.dateStartLimit)
                          : null,
                        counterModel.dateEndLimit
                          ? dayjs(counterModel.dateEndLimit)
                          : null,
                      ]}
                      onChange={(dates) => {
                        handleBasicInfoChange(
                          "dateStartLimit",
                          dates ? dates[0].format("YYYY-MM-DD") : null
                        );
                        handleBasicInfoChange(
                          "dateEndLimit",
                          dates ? dates[1].format("YYYY-MM-DD") : null
                        );
                      }}
                      format="YYYY-MM-DD"
                      className={styles.input}
                      style={{
                        width: "100%",
                        maxHeight: 30,
                      }}
                      placeholder={["Date de démarrage", "Date de fin"]}
                    />
                    {errors.dateStartLimit && (
                      <div className={styles.errorMessage}>
                        {errors.dateStartLimit}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Code</label>
              <input
                type="text"
                value={counterModel.code}
                onChange={(e) => handleBasicInfoChange("code", e.target.value)}
                className={styles.infoInput}
                placeholder="Entrez le code"
              />
              {errors.code && (
                <div className={styles.errorMessage}>{errors.code}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Label Court</label>
              <input
                type="text"
                value={counterModel.labelShort}
                onChange={(e) =>
                  handleBasicInfoChange("labelShort", e.target.value)
                }
                className={styles.infoInput}
                placeholder="Entrez le label court"
              />
              {errors.labelShort && (
                <div className={styles.errorMessage}>{errors.labelShort}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Famille</label>
              <input
                type="text"
                value={counterModel.family}
                onChange={(e) =>
                  handleBasicInfoChange("family", e.target.value)
                }
                className={styles.infoInput}
                placeholder="Entrez la famille"
              />
            </div>
          </div>
        </div>
        <div className={styles.formGroup} style={{ margin: "20px 20px" }}>
          <h3 className={styles.label}>Jours actifs</h3>
          <div className={styles.checkboxGroup}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div key={day} className={styles.checkbox}>
                <input
                  type="checkbox"
                  id={`on${day}`}
                  checked={!!counterModel[`on${day}` as keyof CounterModel]}
                  onChange={(e) =>
                    handleBasicInfoChange(
                      `on${day}` as keyof CounterModel,
                      e.target.checked ? true : false
                    )
                  }
                />
                <label htmlFor={`on${day}`} className={styles.checkboxLabel}>
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formulaWrapper}>
          <div className={styles.formulaHeader}>
            <h2 className={styles.sectionTitle}>Etapes</h2>
            <div className={styles.stepsDivider} />
          </div>

          {counterModel.formulas.map((formula, index) => (
            <>
              <FormulaFormEdit
                key={index}
                formula={formula}
                onChange={(updated) => handleFormulaChange(index, updated)}
                onDelete={() => deleteFormula(index)}
                errors={errors}
              />
              <div className={styles.stepsDivider} />
            </>
          ))}

          <button
            type="button"
            onClick={addFormula}
            className={styles.primaryButton}
            style={{ marginTop: 10 }}
          >
            Ajouter une etape
          </button>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.primaryButton}>
            <CheckCircleOutlined style={{ marginRight: 5 }} /> Valider le
            compteur
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCounter;