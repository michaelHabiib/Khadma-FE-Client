import { Type } from "@angular/core";

export interface Column {
    columnDef: string;
    header: string;
    cell?: Function;
    isVisable?: boolean;
    isDate?: boolean;
    isNumber?: boolean;
    isRoute? :boolean;
    GatherMangerNames?: Function
    content ?: string;
    actionFunctions?: {
        editAction?: Function,
        deleteAction?: Function
      };
    actionComponent?: Type<any>; // Type of Angular component
    routePath?: string;
    isIcon?: boolean;
    isDialog? : boolean;
  }
  