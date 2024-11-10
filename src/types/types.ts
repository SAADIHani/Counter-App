export interface FunctionType {
  code:
    | "MAX"
    | "MODULO"
    | "MIN"
    | "PARTIE_ENTIERE"
    | "PARTIE_DECIMALE"
    | "ARRONDI"
    | "ABS"
    | "VALEUR_ABSOLUE";
  paramFirst: number;
  paramSecond: number;
}

export interface Calculation {
  param: string;
  operatorArithmetic?:
    | "Addition"
    | "Substraction"
    | "Multiplication"
    | "Division";
}

export interface ReturnType {
  entityType: "Calculation" | "Constant" | "Function" | "Variable" | "default";
  type: "Boolean" | "Float" | "Number";
  value?: string;
  function?: FunctionType;
  calculs?: Calculation[];
  variable?: string;
}

export interface Formula {
  label: string;
  rank: number;
  type: "default" | "Variable" | "Function" | "Calculation" | "Return";
  variableName?: string;
  description: string;
  value?: any;
  function?: FunctionType;
  calculs?: Calculation[];
  return?: ReturnType;
}

export interface CounterModel {
  label: string;
  code: string;
  labelShort: string;
  periodicity: string;
  dateStartLimit: Date | undefined;
  dateEndLimit: Date | undefined;
  family: string;
  onMonday: boolean;
  onTuesday: boolean;
  onWednesday: boolean;
  onThursday: boolean;
  onFriday: boolean;
  onSaturday: boolean;
  onSunday: boolean;
  formulas: Formula[];
}
