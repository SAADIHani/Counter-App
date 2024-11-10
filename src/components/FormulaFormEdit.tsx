import React from "react";
import { useState } from "react";
import styles from "../styles/FormulaForm.module.css";
import { Formula } from "../types/types";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

interface FormulaFormProps {
  formula: Formula;
  onChange: (updatedFormula: Formula) => void;
  onDelete: () => void;
  errors: void;
}

const FormulaFormEdit: React.FC<FormulaFormProps> = ({
  formula,
  onChange,
  onDelete,
  errors,
}) => {
  const [firstCalculation, setFirstCalculation] = useState<
    number | undefined
  >();
  const [firstCalculationForReturn, setFirstCalculationForReturn] = useState<
    number | undefined
  >();
  const handleChange = (field: keyof Formula, value: any) => {
    if (field === "type") {
      const {
        variableName,
        value: val,
        return: ret,
        function: func,
        calculs,
        ...rest
      } = formula;
      onChange({
        ...rest,
        [field]: value,
      });
    } else {
      onChange({ ...formula, [field]: value });
    }
  };

  return (
    <div className={styles.formulaContainer}>
      <div className={styles.formGrid}>
        <button className={styles.deleteButtonMin} onClick={onDelete}>
          <DeleteOutlined style={{ color: "black" }} />{" "}
        </button>
        <div className={styles.formField}>
          <label
            style={{
              display: "flex",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "black",
              marginBottom: "4px",
            }}
          >
            Label
          </label>
          <input
            type="text"
            value={formula.label}
            onChange={(e) => handleChange("label", e.target.value)}
            className={styles.formInput}
            placeholder="Entrez le label de la formule"
          />
        </div>

        <div className={styles.formField}>
          <label
            style={{
              display: "flex",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "black",
              marginBottom: "4px",
            }}
          >
            Type
          </label>
          <select
            value={formula?.type}
            onChange={(e) => {
              handleChange("type", e.target.value);
            }}
            className={styles.formSelect}
          >
            <option value="default">Choisir le type</option>
            <option value="Variable">Variable</option>
            <option value="Function">Function</option>
            <option value="Calculation">Calculation</option>
            <option value="Return">Return</option>
          </select>
          {errors?.type && (
            <div className={styles.errorMessage}>{errors?.type}</div>
          )}
        </div>
      </div>

      <div className={styles.formField}>
        <label
          style={{
            display: "flex",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "black",
            marginBottom: "4px",
          }}
        >
          Description
        </label>
        <input
          type="text"
          value={formula.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={styles.formInput}
          placeholder="Entrez la description de la formule"
        />
      </div>

      {formula?.type === "Variable" && (
        <>
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              Variable Name
            </label>
            <input
              type="text"
              value={formula.variableName || ""}
              onChange={(e) => handleChange("variableName", e.target.value)}
              className={styles.formInput}
              placeholder="Entrez le nom de la variable"
            />
          </div>
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              Value
            </label>
            <input
              type="text"
              value={formula.value || ""}
              onChange={(e) => handleChange("value", e.target.value)}
              className={styles.formInput}
              placeholder="Entrez le nom du value"
            />
          </div>
        </>
      )}

      {formula?.type === "Function" && (
        <div
          className={styles.functionFields}
          style={{ display: "flex", gap: 10 }}
        >
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              Function type
            </label>
            <select
              value={formula.function?.code}
              onChange={(e) =>
                handleChange("function", {
                  ...formula.function,
                  code: e.target.value,
                })
              }
              className={styles.formSelect}
            >
              <option value="MAX">MAX</option>
              <option value="MODULO">MODULO</option>
              <option value="MIN">MIN</option>
              <option value="PARTIE_ENTIERE">PARTIE_ENTIERE</option>
              <option value="PARTIE_DECIMALE">PARTIE_DECIMALE</option>
              <option value="ARRONDI">ARRONDI</option>
              <option value="ABS">ABS</option>
              <option value="VALEUR_ABSOLUE">VALEUR_ABSOLUE</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              First Parameter
            </label>
            <input
              type="text"
              value={formula.function?.paramFirst || ""}
              onChange={(e) =>
                handleChange("function", {
                  ...formula.function,
                  paramFirst: e.target.value,
                })
              }
              className={styles.formInput}
              placeholder="Entrez le premier paramètre"
            />
          </div>
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              Second Parameter
            </label>
            <input
              type="text"
              value={formula.function?.paramSecond || ""}
              onChange={(e) =>
                handleChange("function", {
                  ...formula.function,
                  paramSecond: e.target.value,
                })
              }
              className={styles.formInput}
              placeholder="Entrez le second paramètre"
            />
          </div>
        </div>
      )}

      {formula?.type === "Calculation" && (
        <div
          className={styles.calculationFields}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div
            className={styles.boxedCalculationItem}
            style={{ marginTop: 25 }}
          >
            <label style={{ color: "black", marginRight: 20 }}>
              Parameter 1
            </label>
            <input
              type="text"
              value={firstCalculation || ""}
              onChange={(e) => {
                setFirstCalculation(e.target.value);
              }}
              className={styles.formInputCalculation}
              placeholder="Entrez le paramètre"
            />
          </div>
          {formula.calculs?.map((calc, index) => (
            <div
              key={index}
              className={`${styles.calculationItem} ${
                index !== formula.calculs.length - 1
                  ? styles.boxedCalculationItem
                  : ""
              }`}
              style={{ display: "flex", marginTop: 25, gap: 10 }}
            >
              <div className={styles.formField}>
                <label style={{ color: "black", marginRight: 20 }}>
                  Operator
                </label>
                <select
                  value={calc.operatorArithmetic || ""}
                  onChange={(e) => {
                    const updatedCalculs = [...(formula.calculs || [])];
                    updatedCalculs[index] = {
                      ...calc,
                      operatorArithmetic: e.target.value,
                    };
                    onChange({ ...formula, calculs: updatedCalculs });
                  }}
                  className={styles.formSelect}
                >
                  <option value="Addition">Addition</option>
                  <option value="Substraction">Substraction</option>
                  <option value="Multiplication">Multiplication</option>
                  <option value="Division">Division</option>
                </select>
              </div>
              <div className={styles.formField}>
                <label style={{ color: "black", marginRight: 20 }}>
                  Parameter {index + 2}
                </label>
                <input
                  type="text"
                  value={calc.param || ""}
                  onChange={(e) => {
                    const updatedCalculs = [...(formula.calculs || [])];
                    updatedCalculs[index] = { ...calc, param: e.target.value };
                    onChange({ ...formula, calculs: updatedCalculs });
                  }}
                  className={styles.formInputCalculation}
                  placeholder="Entrez le paramètre"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              const newCalc = {
                param: firstCalculation,
                operatorArithmetic: "Addition",
              };

              onChange({
                ...formula,
                calculs: formula.calculs
                  ? [...formula.calculs, newCalc]
                  : [newCalc],
              });
            }}
            className={styles.primaryButton}
            style={{
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25,
            }}
          >
            <PlusCircleOutlined />
          </button>
        </div>
      )}

      {formula?.type === "Return" && (
        <div
          className={styles.returnFields}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              Entity Type
            </label>
            <select
              value={formula?.entityType}
              defaultValue={"default"}
              onChange={(e) =>
                handleChange("return", {
                  ...formula.return,
                  entityType: e.target.value,
                })
              }
              className={styles.formSelect}
            >
              <option value="default">choisir return entity type</option>
              <option value="Calculation">Calculation</option>
              <option value="Constant">Constant</option>
              <option value="Function">Function</option>
              <option value="Variable">Variable</option>
            </select>
            {errors.return?.entityType && (
              <div className={styles.errorMessage}>
                {errors.return?.entityType}
              </div>
            )}
          </div>
          <div className={styles.formField}>
            <label
              style={{
                display: "flex",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "black",
                marginBottom: "4px",
              }}
            >
              Type
            </label>
            <select
              value={formula.return?.type || ""}
              defaultValue={"default"}
              onChange={(e) =>
                handleChange("return", {
                  ...formula.return,
                  type: e.target.value,
                })
              }
              className={styles.formSelect}
            >
              <option value="default">choisir return type</option>
              <option value="Boolean">Boolean</option>
              <option value="Float">Float</option>
              <option value="Number">Number</option>
            </select>
            {errors.return?.type && (
              <div className={styles.errorMessage}>{errors.return?.type}</div>
            )}
          </div>
          {formula?.return?.entityType === "Function" && (
            <div
              className={styles.functionFields}
              style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
            >
              <div className={styles.formField}>
                <label
                  style={{
                    display: "flex",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "black",
                    marginBottom: "4px",
                  }}
                >
                  Function type
                </label>
                <select
                  value={formula.return?.function?.code}
                  onChange={(e) =>
                    handleChange("return", {
                      ...formula.return,
                      function: {
                        ...formula.return?.function,
                        code: e.target.value,
                      },
                    })
                  }
                  className={styles.formSelect}
                >
                  <option value="MAX">MAX</option>
                  <option value="MODULO">MODULO</option>
                  <option value="MIN">MIN</option>
                  <option value="PARTIE_ENTIERE">PARTIE_ENTIERE</option>
                  <option value="PARTIE_DECIMALE">PARTIE_DECIMALE</option>
                  <option value="ARRONDI">ARRONDI</option>
                  <option value="ABS">ABS</option>
                  <option value="VALEUR_ABSOLUE">VALEUR_ABSOLUE</option>
                </select>
                {errors.return?.entityType && (
                  <div className={styles.errorMessage}>
                    {errors.return?.entityType}
                  </div>
                )}
              </div>
              <div className={styles.formField}>
                <label
                  style={{
                    display: "flex",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "black",
                    marginBottom: "4px",
                  }}
                >
                  First Parameter
                </label>
                <input
                  type="text"
                  value={formula.return?.function?.paramFirst || ""}
                  onChange={(e) =>
                    handleChange("return", {
                      ...formula.return,
                      function: {
                        ...formula.return?.function,
                        paramFirst: e.target.value,
                      },
                    })
                  }
                  className={styles.formInput}
                  placeholder="Entrez le premier paramètre"
                />
              </div>
              <div className={styles.formField}>
                <label
                  style={{
                    display: "flex",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "black",
                    marginBottom: "4px",
                  }}
                >
                  Second Parameter
                </label>
                <input
                  type="text"
                  value={formula.return?.function?.paramSecond || ""}
                  onChange={(e) =>
                    handleChange("return", {
                      ...formula.return,
                      function: {
                        ...formula.return?.function,
                        paramSecond: e.target.value,
                      },
                    })
                  }
                  className={styles.formInput}
                  placeholder="Entrez le second paramètre"
                />
              </div>
            </div>
          )}
          {formula.return?.entityType === "Variable" && (
            <>
              <div className={styles.formField}>
                <label
                  style={{
                    display: "flex",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "black",
                    marginBottom: "4px",
                  }}
                >
                  Variable Name
                </label>
                <input
                  type="text"
                  value={formula.return?.variableName || ""}
                  onChange={(e) =>
                    handleChange("return", {
                      ...formula.return,
                      variableName: e.target.value,
                    })
                  }
                  className={styles.formInput}
                  placeholder="Entrez le nom de la variable"
                />
              </div>
            </>
          )}
          {formula.return?.entityType === "Constant" && (
            <div className={styles.formField}>
              <label
                style={{
                  display: "flex",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "black",
                  marginBottom: "4px",
                }}
              >
                Value
              </label>
              <input
                type="text"
                value={formula?.return?.value || ""}
                onChange={(e) =>
                  handleChange("return", {
                    ...formula.return,
                    value: e.target.value,
                  })
                }
                className={styles.formInput}
                placeholder="Entrez le nom du value"
              />
            </div>
          )}
          {formula?.return?.entityType === "Calculation" && (
            <div
              className={styles.calculationFields}
              style={{
                display: "flex",
                marginTop: 25,
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div className={styles.boxedCalculationItem}>
                <label style={{ color: "black", marginRight: 20 }}>
                  Parameter 1
                </label>
                <input
                  type="text"
                  value={firstCalculationForReturn || ""}
                  onChange={(e) => {
                    setFirstCalculationForReturn(e.target.value);
                  }}
                  className={styles.formInput}
                  placeholder="Entrez le paramètre"
                />
              </div>
              {formula?.return?.calculs?.map((calc, index) => (
                <div
                  key={index}
                  className={`${styles.calculationItem} ${
                    index !== formula?.return?.calculs.length - 1
                      ? styles.boxedCalculationItem
                      : ""
                  }`}
                >
                  <div
                    className={styles.formField}
                    style={{ display: "flex", gap: 10 }}
                  >
                    <div className={styles.formField}>
                      <label style={{ color: "black", marginRight: 20 }}>
                        Operator
                      </label>
                      <select
                        value={calc.operatorArithmetic || ""}
                        onChange={(e) => {
                          const updatedCalculs = [
                            ...(formula?.return?.calculs || []),
                          ];
                          updatedCalculs[index] = {
                            ...calc,
                            operatorArithmetic: e.target.value,
                          };
                          onChange({
                            ...formula,
                            return: {
                              ...formula?.return,
                              calculs: updatedCalculs,
                            },
                          });
                        }}
                        className={styles.formSelect}
                      >
                        <option value="Addition">Addition</option>
                        <option value="Substraction">Substraction</option>
                        <option value="Multiplication">Multiplication</option>
                        <option value="Division">Division</option>
                      </select>
                    </div>
                    <div style={{ display: "flex" }}>
                      <label style={{ color: "black", marginRight: 20 }}>
                        Parameter {index + 2}
                      </label>
                      <input
                        type="text"
                        value={calc.param || ""}
                        onChange={(e) => {
                          const updatedCalculs = [
                            ...(formula?.return?.calculs || []),
                          ];
                          updatedCalculs[index] = {
                            ...calc,
                            param: e.target.value,
                          };
                          onChange({
                            ...formula,
                            return: {
                              ...formula?.return,
                              calculs: updatedCalculs,
                            },
                          });
                        }}
                        className={styles.formInput}
                        placeholder="Entrez le paramètre"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const newCalc = {
                    param: firstCalculationForReturn,
                    operatorArithmetic: "Addition",
                  };

                  onChange({
                    ...formula,
                    return: {
                      ...formula?.return,
                      calculs: formula?.return?.calculs
                        ? [...formula?.return?.calculs, newCalc]
                        : [newCalc],
                    },
                  });
                }}
                className={styles.primaryButton}
                style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlusCircleOutlined />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormulaFormEdit;
