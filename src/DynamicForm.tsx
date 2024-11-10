import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Container,
} from "@mui/material";

type FieldConfig = {
  id: string;
  label: string;
  type: "text" | "checkbox" | "select";
  options?: string[];
  dependsOn?: string;
};

type FormProps = {
  fields: FieldConfig[];
};

const DynamicForm: React.FC<FormProps> = ({ fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [visibleFields, setVisibleFields] = useState<FieldConfig[]>(fields);

  useEffect(() => {
    const updatedFields = fields.filter((field) => {
      if (!field.dependsOn) return true;
      return formData[field.dependsOn];
    });
    setVisibleFields(updatedFields);
  }, [formData, fields]);

  const handleChange = (id: string, value: any) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Container>
      <h1>Création de Compteurs</h1>
      {visibleFields.map((field) => (
        <div key={field.id} style={{ marginBottom: "1em" }}>
          {field.type === "text" && (
            <TextField
              label={field.label}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              fullWidth
            />
          )}
          {field.type === "checkbox" && (
            <Checkbox
              checked={!!formData[field.id]}
              onChange={(e) => handleChange(field.id, e.target.checked)}
            />
          )}
          {field.type === "select" && (
            <Select
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              fullWidth
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      ))}
      <Button variant="contained" color="primary">
        Soumettre
      </Button>
    </Container>
  );
};

export default DynamicForm;
