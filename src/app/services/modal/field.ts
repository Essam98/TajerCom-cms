export class Field {
    type: number;
    title: string;
    titleAr: string;
    hint : string;
    hintAr : string;
    errorMessageAr: string;
    errorMessage : string;
    isRequired : boolean;
    defaultValue : string;
    values : Lookup[];
    minimumValue : number;
    maximumValue: number; 
    description_EN?: string;
    title_AR?: string;
    description_AR?: string;

    fieldLength?: number;
    seekBarProgress?: number;
    regularExpression?: string; 
    shouldValidateRegex?: boolean;

  }
  export class Lookup{
    id : number;
    value : string;
    isSelected : boolean;
  }